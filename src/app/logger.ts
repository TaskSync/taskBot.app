import * as debug from 'debug'
import * as winston from 'winston'
import * as printf from 'printf'
import { LoggingWinston as StackDriver } from '@google-cloud/logging-winston'

// @ts-ignore
const { combine, timestamp } = winston.format
// @ts-ignore
const winston_format = winston.format.printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})

export type level = 'info' | 'verbose' | 'error'
export type log_fn = (...msg: any[]) => void

// TODO fix all the process.env['PROD'] and env['DEBUG_FILE']
export default class Logger {
  winston: winston.Logger

  // TODO read from env.DEBUG
  constructor() {
    const transports = process.env['PROD']
      ? [new StackDriver()]
      : [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
          }),
          new winston.transports.File({ filename: 'logs/combined.log' })
        ]

    // @ts-ignore
    this.winston = winston.createLogger({
      level: 'verbose',
      format: process.env['PROD']
        ? winston.format.json()
        : combine(timestamp(), winston_format),
      transports
    })
  }

  createLogger(name: string | TLoggerName, level: level = 'info'): log_fn {
    let labels
    if (typeof name == 'string') {
      labels = { name }
    } else {
      labels = name
      name = `${name.name}:${name.user_id}`
    }
    name += '-' + level
    const terminal = debug(name)
    return (...msgs) => {
      msgs[0] = (msgs[0] && msgs[0].toString()) || ''
      if (!process.env['PROD']) {
        terminal(...msgs)
      }
      // optional file logging
      if (!process.env['DEBUG_FILE']) return
      // TODO very bad way to add user_id to labels
      if (msgs[1] && msgs[1].user_id) {
        labels.user_id = msgs[1].user_id
      }
      this.winston.log({
        labels,
        message: process.env['PROD'] ? msgs : printf(...msgs),
        level
      })
    }
  }
}

export type TLoggerName = {
  name: string,
  user_id: number
}
