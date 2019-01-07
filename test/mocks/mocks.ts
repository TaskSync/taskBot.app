import { AxiosResponse } from 'axios'
import { MethodOptions } from 'googleapis-common'
// import * as sinon from 'sinon'
import { gmail_v1, tasks_v1 } from 'googleapis'
import { TGlobalFields } from '../../src/google/sync'

// sinon.stub(google, 'gmail', () => new Gmail('test@gmail.com'))

interface Thread extends gmail_v1.Schema$Thread {
  labelIds: string[]
}
type Label = gmail_v1.Schema$Label
type Message = gmail_v1.Schema$Message
type Task = tasks_v1.Schema$Task
type TaskList = tasks_v1.Schema$TaskList

// conditional and mapped types
// all methods returning a promise
type ReturnsPromise<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any
    ? ReturnType<T[K]> extends Promise<any>
      ? K
      : never
    : never
}[keyof T]
type AsyncMethods<T> = Pick<T, ReturnsPromise<T>>
// all class fields
// type NonFunctionPropertyNames<T> = {
//   [K in keyof T]: T[K] extends Function ? never : K
// }[keyof T]
// type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

type MockedAPI<T> = Partial<AsyncMethods<T>>

function ok<T>(data: T): AxiosResponse<T> {
  return {
    data,
    status: 200,
    statusText: 'OK',
    // TODO
    headers: {},
    // TODO?
    config: {}
  }
}

// TODO check if return not depended on the `data`
export class NotFound extends Error {
  // TODO
}

// ----- GMAIL

export class Gmail {
  // non-API
  email: string
  // API
  // TODO keep 'from' and 'to' directly in Thread
  threads: Thread[] = []
  labels: Label[] = []
  messages: Message[] = []
  historyId: string = '0'

  users = new GmailUsers(this)

  constructor() {
    this.email = 'mock@google.com'
  }

  addThread(
    from: string,
    subject: string,
    messages: string[],
    labels: string[] = []
  ) {
    const hid = (parseInt(this.historyId) + 1).toString()
    // create non existing labels
    // TODO extract
    for (const name of labels) {
      if (!this.getLabelIDs([name]).length) {
        const label: Label = {
          name,
          id: Math.random().toString()
        }
        this.labels.push(label)
      }
    }
    const labelIds = this.getLabelIDs(labels)
    const thread: Thread = {
      historyId: hid,
      id: Math.random().toString(),
      snippet: messages.join(' ').substr(0, 200),
      labelIds
    }
    // to = this.email
    thread.messages = messages.map(m => ({
      snippet: m,
      threadId: thread.id,
      historyId: hid,
      labelIds: labelIds,
      raw: 'TODO',
      payload: {}
    }))
    this.threads.push(thread)
  }

  getLabelIDs(labels: string[]) {
    debugger
    const ids = []
    for (const name of labels) {
      const i = this.labels.find(l => l.name == name)
      if (i) {
        ids.push(i.id)
      }
    }
    return ids
  }
}

class GmailChild {
  constructor(public gmail: Gmail) {}
}

export class GmailUsers extends GmailChild
  implements MockedAPI<gmail_v1.Resource$Users> {
  labels = new GmailUsersLabels(this.gmail)
  // drafts: Resource$Users$Drafts
  // history: Resource$Users$History
  messages = new GmailUsersMessages(this.gmail)
  // settings: Resource$Users$Settings
  threads = new GmailUsersThreads(this.gmail)

  async getProfile(
    params: gmail_v1.Params$Resource$Users$Getprofile & TGlobalFields,
    options?: MethodOptions,
    // TODO this sould error
    a?: string
  ): Promise<AxiosResponse<gmail_v1.Schema$Profile>> {
    return ok({
      emailAddress: this.gmail.email,
      historyId: String(this.gmail.historyId),
      messagesTotal: this.gmail.messages.length,
      threadsTotal: this.gmail.threads.length
    })
  }
}

export class GmailUsersMessages extends GmailChild
  implements MockedAPI<gmail_v1.Resource$Users$Messages> {
  async send(
    params: gmail_v1.Params$Resource$Users$Messages$Send & TGlobalFields
    // options?: MethodOptions
  ): Promise<AxiosResponse<Message>> {
    // TODO match the schema
    const threadId = Math.random().toString()
    return ok({
      threadId,
      ...params.requestBody
      // TODO missing fields?
    })
  }

  async insert(
    params: gmail_v1.Params$Resource$Users$Messages$Insert & TGlobalFields
    // options?: MethodOptions
  ): Promise<AxiosResponse<Message>> {
    const hid = (parseInt(this.gmail.historyId) + 1).toString()
    // TODO support `params.requestBody.raw`
    const msg = params.requestBody
    const thread: Thread = {
      historyId: hid,
      id: Math.random().toString(),
      snippet: 'foo bar',
      messages: [msg]
    }
    this.gmail.historyId = hid
    this.gmail.messages.push(msg)
    this.gmail.threads.push(thread)
    return ok(msg)
  }
}

export class GmailUsersLabels extends GmailChild
  implements MockedAPI<gmail_v1.Resource$Users$Labels> {
  async list(
    params: gmail_v1.Params$Resource$Users$Labels$List & TGlobalFields
    // options?: MethodOptions
  ): Promise<AxiosResponse<gmail_v1.Schema$ListLabelsResponse>> {
    // TODO query
    return ok({
      labels: this.gmail.labels
    })
  }

  async patch(
    params: gmail_v1.Params$Resource$Users$Labels$Patch & TGlobalFields
    // options?: MethodOptions
  ): Promise<AxiosResponse<Label>> {
    const label = this.gmail.labels.find(l => l.id === params.id)
    Object.assign(label, params.requestBody)
    return ok(label)
  }

  async get(
    params: gmail_v1.Params$Resource$Users$Labels$Get & TGlobalFields
    // options?: MethodOptions
  ): Promise<AxiosResponse<Label>> {
    const label = this.gmail.labels.find(l => l.id === params.id)
    if (!label) {
      throw new NotFound()
    }
    return ok(label)
  }

  async create(
    params: gmail_v1.Params$Resource$Users$Labels$Create & TGlobalFields
    // options?: MethodOptions
  ): Promise<AxiosResponse<Label>> {
    const label = params.requestBody
    this.gmail.labels.push(label)
    return ok(label)
  }
}

import * as lucene from 'lucene-filter'
function query(threads: Thread[], labels: Label[], q: string) {
  function parse(query) {
    return query.replace(/label:([\w-!]+)/, 'label:/(,|^)$1(,|$)/')
  }
  // merge labels into a string
  threads = threads.map((thread: Thread) => {
    // TODO dont replace in text
    thread.label = thread.labelIds
      .map(id => labels.find(l => l.id == id).name)
      .join(',')
      .replace(/ /g, '-')
      .replace(/\//g, '-')
      .toLocaleLowerCase()
    return thread
  })
  return threads.filter(lucene(parse(q || '')))
}

export class GmailUsersThreads extends GmailChild
  implements MockedAPI<gmail_v1.Resource$Users$Threads> {
  async list(
    params: gmail_v1.Params$Resource$Users$Threads$List & TGlobalFields,
    options?: MethodOptions
  ): Promise<AxiosResponse<gmail_v1.Schema$ListThreadsResponse>> {
    let threads = this.gmail.threads

    // evaluate the search expression
    if (params.q) {
      threads = query(threads, this.gmail.labels, params.q)
    }

    return ok({
      threads
    })
  }

  async get(
    params: gmail_v1.Params$Resource$Users$Threads$Get & TGlobalFields,
    options?: MethodOptions
  ): Promise<AxiosResponse<Thread>> {
    const thread = this.gmail.threads.find(t => t.id === params.id)
    if (!thread) {
      throw new NotFound()
    }
    return ok(thread)
  }

  async modify(
    params: gmail_v1.Params$Resource$Users$Threads$Modify & TGlobalFields,
    options?: MethodOptions
  ): Promise<AxiosResponse<Thread>> {
    const thread = this.gmail.threads.find(t => t.id === params.id)
    if (!thread) {
      throw new NotFound()
    }
    const remove =
      (params.requestBody && params.requestBody.removeLabelIds) || []
    const add = (params.requestBody && params.requestBody.addLabelIds) || []
    // remove
    thread.labelIds = thread.labelIds.filter(id => !remove.includes(id))
    // add
    for (const id of add) {
      if (!thread.labelIds.includes(id)) {
        thread.labelIds.push(id)
      }
    }
    return ok(thread)
  }
}

// ----- TASKS

export class Tasks {
  tasks: Task[]
  lists: TaskList[]
}

export class TasksChild {
  constructor(public tasks: Tasks) {}
}

export class TasksTasks extends TasksChild {
  async list(
    params: tasks_v1.Params$Resource$Tasks$List & TGlobalFields,
    options?: MethodOptions
  ): Promise<AxiosResponse<tasks_v1.Schema$Tasks>> {
    // TODO
    return ok({
      // etag
      items: [],
      kind: 'tasks#tasks'
    })
  }

  async insert(
    params: tasks_v1.Params$Resource$Tasks$Insert & TGlobalFields,
    options?: MethodOptions
  ): Promise<AxiosResponse<Task>> {
    // TODO
    return ok({})
  }

  async patch(
    params: tasks_v1.Params$Resource$Tasks$Patch & TGlobalFields,
    options?: MethodOptions
  ): Promise<AxiosResponse<Task>> {
    // TODO
    return ok({})
  }

  async delete(
    params: tasks_v1.Params$Resource$Tasks$Patch & TGlobalFields,
    options?: MethodOptions
  ): Promise<AxiosResponse<void>> {
    // TODO
    return ok(void 0)
  }
}

export class TasksTasklists extends TasksChild {
  async list(
    params: tasks_v1.Params$Resource$Tasklists$List & TGlobalFields,
    options?: MethodOptions
  ): Promise<AxiosResponse<tasks_v1.Schema$TaskLists>> {
    // TODO
    return ok({
      // etag
      items: [],
      kind: 'tasks#taskLists'
    })
  }

  async insert(
    params: tasks_v1.Params$Resource$Tasklists$Insert & TGlobalFields,
    options?: MethodOptions
  ): Promise<AxiosResponse<TaskList>> {
    // TODO
    return ok({})
  }
}

// ----- PUBLIC API

const api = {
  gmail(version: string): Gmail {
    return new Gmail()
  }
}

export { api as google }
