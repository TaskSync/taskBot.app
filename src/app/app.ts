import * as firebase from 'firebase-admin'
import * as fs from 'fs'
import * as google from 'googleapis'
import { test_user } from '../../config-accounts'
import { Credentials as GoogleCredentials } from 'google-auth-library/build/src/auth/credentials'
import RootSync from '../sync/root'
import { IConfig, IAccount, IConfigAccount, TRawEmail } from '../types'
import Connections from './connections'
import Logger from './logger'
import * as merge from 'deepmerge'
import * as moment from 'moment-timezone'
import { OAuth2Client } from 'google-auth-library'
import * as removeHtmlComments from 'remove-html-comments'
import { Base64 } from 'js-base64'

const email_invitation = removeHtmlComments(
  fs.readFileSync('www/pages/content/email-invitation.md')
).data
const email_welcome = removeHtmlComments(
  fs.readFileSync('www/pages/content/email-welcome.md')
).date

export class App {
  syncs: RootSync[] = []
  firebase: firebase.app.App
  log_info = this.logger.createLogger('app')
  auth: OAuth2Client
  // TODO merge with `this.auth` once googleapis are up to date
  auth_email: any

  constructor(
    public config: IConfig,
    public logger: Logger,
    public connections: Connections
  ) {
    this.firebase = firebase.initializeApp({
      credential: firebase.credential.cert(config.firebase.admin),
      // TODO move to the config
      databaseURL: config.firebase.url
    })
    if (!process.env['TEST']) {
      this.listenToAccountsChanges()
    } else {
      this.syncs.push(this.createUserInstance(this.config, test_user.config))
    }
    this.auth = new OAuth2Client(
      config.google.client_id,
      config.google.client_secret,
      config.google.redirect_url
    )
    // TODO merge with auth once googleapis are up to date
    this.auth_email = new google.auth.OAuth2(
      config.google.client_id,
      config.google.client_secret,
      config.google.redirect_url
    )
    this.auth_email.credentials = {
      access_token: this.config.service.google_tokens.access_token,
      refresh_token: this.config.service.google_tokens.refresh_token
    }
  }

  async listenToAccountsChanges() {
    // ACCOUNTS
    const accounts_ref = this.firebase.database().ref('/accounts')
    accounts_ref.on('child_added', (s: firebase.database.DataSnapshot) => {
      const account: IAccount = s.val()
      if (!this.isAccountEnabled(account)) {
        return false
      }
      if (!account.welcome_email_sent) {
        this.sendServiceEmail(
          account.email,
          `Welcome to ${this.config.service.name}`,
          email_welcome
        )
        this.patchAccount(account.uid, { welcome_email_sent: true })
      }
      const sync = this.createUserInstance(this.config, account.config)
      this.syncs.push(sync)
    })
    accounts_ref.on('child_removed', (s: firebase.database.DataSnapshot) => {
      const account: IAccount = s.val()
      this.removeUserInstance(account.config.user.id)
    })
    accounts_ref.on('child_changed', (s: firebase.database.DataSnapshot) => {
      const account: IAccount = s.val()
      this.removeUserInstance(account.config.user.id)
      if (!this.isAccountEnabled(account)) {
        return false
      }
      const sync = this.createUserInstance(this.config, account.config)
      this.syncs.push(sync)
    })
  }

  isAccountEnabled(account: IAccount) {
    // handle dev accounts
    if (process.env['PROD'] && account.dev) {
      return false
    }
    if (!process.env['PROD'] && !account.dev) {
      return false
    }
    // skip disabled ones
    if (!account.sync_enabled || !account.client_data.sync_enabled) {
      return false
    }
    // skip when no access token
    if (!account.config.google.access_token) {
      return false
    }
    return true
  }

  removeUserInstance(user_id: string) {
    this.log_info(`Remove sync for user ${user_id}`)
    const sync = this.syncs.find(sync => sync.config.user.id === user_id)
    if (!sync) return false
    sync.state.drop('Enabled')
    this.syncs = this.syncs.filter(s => s !== sync)
    return true
  }

  createUserInstance(config: IConfig, user: IConfigAccount): RootSync {
    const config_user = merge(config, user)
    const sync = new RootSync(config_user, this.logger, this.connections)
    if (!process.env['TEST']) {
      // jump out of this tick
      sync.state.addNext('Enabled')
    }
    return sync
  }

  // ACCOUNTS

  async getAccount(uid: string): Promise<IAccount | null> {
    const ref = await this.firebase
      .database()
      .ref(`accounts`)
      .once('value')

    const accounts = ref.val()
    return accounts && accounts[uid]
  }

  async getAccountByEmail(email: string): Promise<IAccount | null> {
    const ref = await this.firebase
      .database()
      .ref('accounts')
      .orderByChild('email')
      .equalTo(email)
      .once('value')

    const accounts = ref.val()
    return (accounts && accounts[Object.keys(accounts)[0]]) || null
  }

  async patchAccount(uid: string, patch: Partial<IAccount>) {
    await this.firebase
      .database()
      .ref(`accounts/${uid}`)
      .update(patch)
  }

  async createAccount(
    // google_tokens: GoogleCredentials,
    uid: string,
    email: string,
    ip: string
    // enabled: boolean = false
  ) {
    if (await this.getAccount(uid)) {
      this.log_info(
        `Skipping creation of account for ${uid} (${email}) - already present`
      )
      return true
    }

    const registered = moment()
      .utc()
      .toISOString()

    let account: IAccount = {
      uid,
      email,
      registered,
      client_data: {
        sync_enabled: true
      },
      // requires an invitation
      invitation_granted: false,
      welcome_email_sent: false,
      // create a disabled account by default
      sync_enabled: false,
      ip,
      // create dev accounts in the dev env
      dev: !Boolean(process.env['PROD']),
      config: {
        user: {
          id: uid
        },
        // TODO make all google_token fields required (assert)
        google: {
          username: email
        }
      }
    }

    // add the account
    await this.firebase
      .database()
      .ref(`accounts/${uid}`)
      .set(account)

    this.log_info(`Added a new user ${uid} (${email})`)
    return true
  }

  // TODO type tokens
  async setGoogleAccessTokens(uid: string, tokens: any): Promise<boolean> {
    const account = await this.getAccount(uid)
    if (!account) {
      return false
    }

    const config = account.config
    config.google = merge(config.google, tokens)

    // set the updated config and enable the account
    await this.patchAccount(uid, {
      config,
      sync_enabled: true
    })

    if (!account.welcome_email_sent) {
      await this.sendServiceEmail(
        account.email,
        'Welcome to TaskBot.app',
        email_welcome
      )
    }

    return true
  }

  async sendServiceEmail(to: string, subject: string, content?: string) {
    let email = [
      `From: ${this.config.service.name} <${this.config.service.email}>`,
      `To: ${to}`,
      'Content-type: text/plain;charset=utf-8',
      'Content-Transfer-Encoding: quoted-printable',
      'MIME-Version: 1.0',
      `Subject: ${subject}`
    ].join('\r\n')

    if (content) {
      email += `\r\n\r\n${content.replace(`\n`, `\r\n`)}`
    }

    // TODO port Base64 to the gmail sync client
    const raw = Base64.encodeURI(email) as TRawEmail

    const ret = await new Promise((resolve, reject) => {
      this.connections.apis.gmail.users.messages.send(
        {
          userId: 'me',
          fields: 'threadId',
          // @ts-ignore
          resource: {
            raw: raw
          },
          // payload: { mimeType: 'text/html' },
          auth: this.auth_email
        },
        (err, body) => {
          if (err) return reject(err)
          resolve(body)
        }
      )
    })
    if (ret && ret.threadId) {
      this.log_info(`Sent email ${ret.threadId} to ${to}`)
      return true
    }
  }
}
