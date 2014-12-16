// Generated by CoffeeScript 1.8.0
(function() {
  /* @flow weak */;
  var GmailQuery, ILabel, IMessage, IMessagePart, IQuery, ITask, ITaskList, ITaskLists, ITasks, IThread, IThreads, Promise, States, TaskListSync, ago, coroutine, moment, timestamp, type, typedef, _ref;

  States = require('./task-list-sync-states');

  _ref = require('./api-types'), ITaskList = _ref.ITaskList, ITaskLists = _ref.ITaskLists, IQuery = _ref.IQuery, IThread = _ref.IThread, IThreads = _ref.IThreads, ITask = _ref.ITask, ITasks = _ref.ITasks, IMessage = _ref.IMessage, IMessagePart = _ref.IMessagePart, ILabel = _ref.ILabel;

  GmailQuery = require('./gmail-query').GmailQuery;

  Promise = require('bluebird');

  coroutine = Promise.coroutine;

  type = require('../type');

  typedef = require('tracery');

  timestamp = require('internet-timestamp');

  ago = require('ago');

  moment = require('moment');

  TaskListSync = (function() {
    TaskListSync.prototype.data = null;

    TaskListSync.prototype.name = null;

    TaskListSync.prototype.list = null;

    TaskListSync.defineType('list', ITaskList, 'ITaskList');

    TaskListSync.prototype.tasks_api = null;

    TaskListSync.prototype.states = null;

    TaskListSync.prototype.tasks = null;

    TaskListSync.prototype.tasks_completed_from = null;

    TaskListSync.prototype.threads = null;

    TaskListSync.defineType('labels', [ILabel], '[ILabel]');

    TaskListSync.prototype.sync = null;

    TaskListSync.prototype.query = null;

    TaskListSync.prototype.etags = null;

    TaskListSync.prototype.completions_tasks = null;

    function TaskListSync(name, data, sync) {
      this.name = name;
      this.data = data;
      this.sync = sync;
      this.states = new States;
      this.states.setTarget(this);
      if (process.env['DEBUG']) {
        this.states.debug('TaskList / ', process.env['DEBUG']);
      }
      this.gmail_api = this.sync.gmail_api;
      this.tasks_api = this.sync.tasks_api;
      this.tasks_in_threads = [];
      this.tasks = [];
      this.threads = [];
      this.etags = {};
      this.completions_threads = {};
      this.completions_tasks = {};
      this.last_sync_time = null;
      this.query = new GmailQuery(this.sync.gmail, this.data.query, true);
      this.query.states.pipeForward('ThreadsFetched', this);
      this.query.states.pipeForward('MsgsFetched', this);
    }

    TaskListSync.prototype.Restart_enter = function() {
      return this.states.add('Syncing');
    };

    TaskListSync.prototype.Syncing_enter = function() {
      return this.timer = new Date();
    };

    TaskListSync.prototype.Synced_enter = function() {
      this.last_sync_time = new Date() - this.timer;
      this.timer = null;
      console.log("Synced in: " + this.last_sync_time + "ms");
      return this.synced_timeout = setTimeout(this.states.addLater('Restart'), 1000);
    };

    TaskListSync.prototype.Synced_exit = function() {
      if (this.synced_timeout) {
        return clearTimeout(this.synced_timeout);
      }
    };

    TaskListSync.prototype.FetchingTasks_FetchingTasks = TaskListSync.FetchingTasks_enter;

    TaskListSync.prototype.SyncingThreadsToTasks_enter = coroutine(function*() {
      var interrupt;
      interrupt = this.states.getInterruptEnter('SyncingThreadsToTasks');
      (yield Promise.all(this.threads.threads.map(coroutine((function(_this) {
        return function*(thread) {
          var task, task_completed, thread_not_completed;
          task = _this.getTaskForThread(thread.id);
          if (task) {
            task_completed = _this.taskWasCompleted(task.id);
            thread_not_completed = _this.gmail.threadWasNotCompleted(thread.id);
            if (task_completed && task_completed.unix() < thread_not_completed.unix()) {
              return (yield _this.uncompleteTask(task.id, interrupt));
            }
          } else {
            return (yield _this.createTaskFromThread(thread, interrupt));
          }
        };
      })(this)))));
      if (typeof interrupt === "function" ? interrupt() : void 0) {
        return;
      }
      return this.states.add(['ThreadsToTasksSynced', 'Synced']);
    });

    TaskListSync.prototype.SyncingTasksToThreads_enter = coroutine(function*() {
      var interrupt;
      interrupt = this.states.getInterruptEnter('SyncingTasksToThreads');
      (yield Promise.all(this.tasks.items.map(coroutine((function(_this) {
        return function*(task) {
          var task_not_completed, thread, thread_completed, thread_id;
          if (!task.title || task.parent) {
            return;
          }
          thread_id = _this.taskLinkedToThread(task);
          if (thread_id) {
            thread_completed = _this.gmail.threadWasCompleted(thread_id);
            task_not_completed = _this.taskWasNotCompleted(task.id);
            if (!(_this.gmail.threadSeen(thread_id)) || (thread_completed && thread_completed.unix() < task_not_completed.unix())) {
              return (yield _this.uncompleteThread(thread_id, interrupt));
            }
          } else {
            return thread = (yield _this.createThreadForTask(task, interrupt));
          }
        };
      })(this)))));
      if (interrupt()) {
        return;
      }
      return this.states.add(['TasksToThreadsSynced', 'Synced']);
    });

    TaskListSync.prototype.SyncingCompletedThreads_enter = coroutine(function*() {
      var interrupt;
      interrupt = this.states.getInterruptEnter('SyncingCompletedThreads');
      (yield Promise.all(this.completions_threads.map(coroutine((function(_this) {
        return function*(row, thread_id) {
          var task, task_not_completed;
          if (!row.completed) {
            return;
          }
          task = _this.getTaskForThread(thread_id);
          if (!task) {
            return;
          }
          task_not_completed = _this.taskWasNotCompleted(task.id);
          if (task_not_completed && row.time.unix() > task_not_completed.unix()) {
            return (yield _this.completeTask(task.id, interrupt));
          }
        };
      })(this)))));
      if (interrupt()) {
        return;
      }
      return this.states.add(['CompletedThreadsSynced', 'Synced']);
    });

    TaskListSync.prototype.SyncingCompletedTasks_enter = coroutine(function*() {
      var interrupt;
      interrupt = this.states.getInterruptEnter('SyncingCompletedTasks');
      (yield Promise.all(this.completions_tasks.map(coroutine((function(_this) {
        return function*(row, task_id) {
          var task, thread_id, thread_not_completed;
          if (!row.completed) {
            return;
          }
          task = _this.getTask(task_id);
          if (!task) {
            return;
          }
          thread_id = _this.taskLinkedToThread(task);
          thread_not_completed = _this.gmail.threadWasNotCompleted(thread_id);
          if (thread_not_completed && row.time.unix() > thread_not_completed.unix()) {
            return (yield _this.completeThread(thread_id, interrupt));
          }
        };
      })(this)))));
      if (interrupt()) {
        return;
      }
      return this.states.add(['CompletedTasksSynced', 'Synced']);
    });

    TaskListSync.prototype.PreparingList_enter = coroutine(function*() {
      var interrupt, list, r, _i, _len, _ref1;
      interrupt = this.states.getInterruptEnter('PreparingList');
      list = null;
      this.def_title = this.data.labels_in_title || this.sync.config.labels_in_title;
      _ref1 = this.sync.task_lists;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        r = _ref1[_i];
        if (this.name === r.title) {
          list = r;
          break;
        }
      }
      if (!list) {
        list = (yield this.createTaskList(this.name, interrupt));
        console.log("Creating tasklist '" + this.name + "'");
      }
      this.list = type(list, ITaskList, 'ITaskList');
      return this.states.add('ListReady');
    });

    TaskListSync.prototype.FetchingThreads_enter = coroutine(function*() {
      var interrupt, non_completed_ids, query;
      interrupt = this.states.getInterruptEnter('FetchingThreads');
      if ((yield this.sync.isQueryCached(interrupt))) {
        this.states.add('ThreadsFetched');
        return;
      }
      query = (yield this.fetchQuery(interrupt));
      if (typeof interrupt === "function" ? interrupt() : void 0) {
        return;
      }
      this.threads = type(query, IThreads, 'IThreads');
      non_completed_ids = query.threads.map(function(thread) {
        return thread.id;
      });
      this.query.processThreadsCompletions(non_completed_ids);
      return this.states.add('ThreadsFetched');
    });

    TaskListSync.prototype.FetchingTasks_enter = coroutine(function*() {
      var check_completion_ids, interrupt, promises;
      interrupt = this.states.getInterruptEnter('FetchingTasks');
      if (!this.tasks_completed_from || this.tasks_completed_from < ago(3, "weeks")) {
        this.tasks_completed_from = ago(2, "weeks");
      }
      promises = [this.fetchNonCompletedTasks(this.tasks_completed_from, interrupt)];
      if (!this.etags.tasks_completed) {
        check_completion_ids = this.tasks.map(function(task) {
          return task.id;
        });
        promises.push(this.fetchCompletedTasks(interrupt));
      }
      (yield Promise.all(promises));
      if (typeof interrupt === "function" ? interrupt() : void 0) {
        return;
      }
      if (check_completion_ids) {
        this.processTasksCompletions(check_completion_ids);
      }
      return this.states.add('TasksFetched');
    });

    TaskListSync.prototype.Synced_enter = function() {
      if (this.push_dirty) {
        return this.sync.setDirty();
      }
    };

    TaskListSync.prototype.Syncing_enter = function() {
      return this.push_dirty = false;
    };

    TaskListSync.prototype.processTasksCompletions = function(ids) {
      var non_completed_ids;
      non_completed_ids = this.tasks.map(function(task) {
        return task.id;
      });
      return (ids.difference(non_completed_ids)).forEach(function(id) {
        return this.completions_tasks[id] = {
          completed: true,
          time: moment()
        };
      });
    };

    TaskListSync.prototype.isQueryCached = coroutine(function*(interrupt) {
      var history_id;
      if (!this.gmail_history_id) {
        return;
      }
      history_id = (yield this.gmail.refreshHistoryId());
      if (typeof interrupt === "function" ? interrupt() : void 0) {
        return;
      }
      if (history_id === this.gmail_history_id) {
        console.log("[CACHED] threads' list");
        return true;
      }
    });

    TaskListSync.prototype.fetchNonCompletedTasks = coroutine(function*(interrupt) {
      var response, _base;
      response = (yield this.req(this.tasks_api.tasks.list, {
        tasklist: this.list.id,
        fields: "etag,items(id,title,notes,updated,etag,status)",
        maxResults: 1000,
        showCompleted: false,
        etag: this.etags.tasks
      }));
      if (response[1].statusCode === 304) {
        return console.log('[CACHED] tasks');
      } else {
        console.log('[FETCHED] tasks');
        this.etags.tasks = response[1].headers.etag;
        if ((_base = response[0]).items == null) {
          _base.items = [];
        }
        response[0].items.forEach((function(_this) {
          return function(task) {
            return _this.completions_tasks[task.id] = {
              completed: false,
              time: moment(task.completed)
            };
          };
        })(this));
        return this.tasks = type(response[0], ITasks, 'ITasks');
      }
    });

    TaskListSync.prototype.fetchCompletedTasks = coroutine(function*(update_min, interrupt) {
      var response, _base;
      response = (yield this.req(this.tasks_api.tasks.list, {
        updatedMin: timestamp(new Date(this.tasks_completed_from)),
        tasklist: this.list.id,
        fields: "etag,items(id,title,notes,updated,etag,status,completed)",
        maxResults: 1000,
        showCompleted: true,
        etag: this.etags.tasks_completed
      }));
      if (response[1].statusCode === 304) {
        return console.log('[CACHED] completed tasks');
      } else {
        console.log('[FETCHED] completed tasks');
        this.etags.tasks_completed = response[1].headers.etag;
        if ((_base = response[0]).items == null) {
          _base.items = [];
        }
        response[0].items = response[0].items.filter(function(item) {
          return item.status === 'completed';
        });
        response[0].items.forEach((function(_this) {
          return function(task) {
            return _this.completions_tasks[task.id] = {
              completed: true,
              time: moment(task.completed)
            };
          };
        })(this));
        return this.tasks_completed = type(response[0], ITasks, 'ITasks');
      }
    });

    TaskListSync.prototype.completeThread = coroutine(function*(id, interrupt) {
      console.log("Completing thread '" + id + "'");
      (yield this.gmail.modifyLabels(id, [], this.uncompletedThreadLabels(), interrupt));
      if (typeof interrupt === "function" ? interrupt() : void 0) {
        return;
      }
      return this.completions_threads[id] = {
        completed: true,
        time: moment()
      };
    });

    TaskListSync.prototype.uncompleteThread = coroutine(function*(id, interrupt) {
      console.log("Un-completing thread '" + id + "'");
      (yield this.gmail.modifyLabels(id, this.uncompletedThreadLabels(), [], interrupt));
      if (typeof interrupt === "function" ? interrupt() : void 0) {
        return;
      }
      return this.completions_threads[id] = {
        completed: false,
        time: moment()
      };
    });

    TaskListSync.prototype.createThreadForTask = coroutine(function*(task, interrupt) {
      return (yield this.gmail.createThread(this.createEmail(task.title), this.uncompletedThreadLabels(), interrupt));
    });

    TaskListSync.prototype.taskLinkedToThread = function(task) {
      var _ref1, _ref2;
      if ((_ref1 = task.notes) != null ? _ref1.match(/\bemail:\w+\b/) : void 0) {
        return ((_ref2 = task.notes) != null ? _ref2.match(/\bemail:(\w+)\b/) : void 0)[1];
      }
    };

    TaskListSync.prototype.linkTaskToThread = coroutine(function*(task, thread_id, interrupt) {
      if (task.notes == null) {
        task.notes = "";
      }
      task.notes = "" + task.notes + "\nemail:" + thread_id;
      (yield this.req(this.tasks_api.tasks.patch, {
        tasklist: this.list.id,
        task: task.id,
        userId: 'me',
        resource: {
          notes: task.notes
        }
      }));
      if (typeof interrupt === "function" ? interrupt() : void 0) {

      }
    });

    TaskListSync.prototype.uncompletedThreadLabels = function() {
      var _ref1;
      return [].concat(this.data['labels_new_task'] || [], ((_ref1 = this.sync.config.tasks.queries.labels_defaults) != null ? _ref1['labels_new_task'] : void 0) || []);
    };

    TaskListSync.prototype.uncompleteTask = coroutine(function*(task_id, interrupt) {
      var res;
      console.log("Un-completing task " + task_id);
      res = (yield this.req(this.tasks_api.tasks.patch, {
        tasklist: this.list.id,
        task: task_id,
        resource: {
          status: 'needsAction',
          completed: null
        }
      }));
      if (typeof interrupt === "function" ? interrupt() : void 0) {
        return;
      }
      return this.completions_tasks[task_id] = {
        completed: false,
        time: moment()
      };
    });

    TaskListSync.prototype.completeTask = coroutine(function*(task_id, interrupt) {
      console.log("Completing task " + task_id);
      (yield this.req(this.tasks_api.tasks.patch, {
        tasklist: this.list.id,
        task: task_id,
        resource: {
          status: 'completed'
        }
      }));
      if (typeof interrupt === "function" ? interrupt() : void 0) {
        return;
      }
      return this.completions_tasks[task_id] = {
        completed: true,
        time: moment()
      };
    });

    TaskListSync.prototype.getAllTasks = function() {
      return this.tasks.items.concat(this.tasks_completed.items || []);
    };

    TaskListSync.prototype.fetchThreadForTask = coroutine(function*(task, interrupt) {
      var thread_id, _ref1;
      thread_id = ((_ref1 = task.notes) != null ? _ref1.match(/\bemail:(\w+)\b/) : void 0)[1];
      return (yield this.fetchThread(thread_id, null, interrupt));
    });

    TaskListSync.prototype.req = coroutine(function*(method, params) {
      return (yield this.sync.req.apply(this.sync, arguments));
    });

    TaskListSync.prototype.syncTaskName = coroutine(function*(task, thread) {
      var res, title;
      title = this.getTaskTitleFromThread(thread);
      if (task.title !== title) {
        console.log("Updating task title to \"" + title + "\"");
        res = (yield this.req(this.tasks_api.tasks.patch, {
          tasklist: this.list.id,
          task: task.id,
          resource: {
            title: title
          }
        }));
        return task.title = title;
      }
    });

    TaskListSync.prototype.createTaskList = coroutine(function*(name, interrupt) {
      var res;
      res = (yield this.req(this.tasks_api.tasklists.insert, {
        resource: {
          title: name
        }
      }));
      return type(res[1].body, ITaskList, 'ITaskList');
    });

    TaskListSync.prototype.createTaskFromThread = coroutine(function*(thread, interrupt) {
      var res, title;
      type(thread, IThread, 'IThread');
      title = this.getTaskTitleFromThread(thread);
      console.log("Adding task '" + title + "'");
      res = (yield this.req(this.tasks_api.tasks.insert, {
        tasklist: this.list.id,
        resource: {
          title: title,
          notes: "email:" + thread.id
        }
      }));
      if (typeof interrupt === "function" ? interrupt() : void 0) {
        return;
      }
      return type(res[0], ITask, 'ITask');
    });

    TaskListSync.prototype.getTask = function(task_id) {
      return this.getAllTasks().find(function(task) {
        return task.id === task_id;
      });
    };

    TaskListSync.prototype.getTaskForThread = function(thread_id) {
      var task;
      type(thread_id, String);
      return task = this.getAllTasks().find(function(task) {
        var _ref1;
        return (_ref1 = task.notes) != null ? _ref1.match("email:" + thread_id) : void 0;
      });
    };

    TaskListSync.prototype.getTaskTitleFromThread = function(thread) {
      var label, labels, title, _i, _len, _ref1, _ref2;
      type(thread, IThread, 'IThread');
      title = this.gmail.getThreadTitle(thread);
      _ref1 = this.getlabelsFromTitle(title), title = _ref1[0], labels = _ref1[1];
      _ref2 = this.data.labels_new_task;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        label = _ref2[_i];
        labels = labels.without(label);
      }
      if (this.sync.config.tasks.labels_in_title === 1) {
        return labels.concat(title).join(' ');
      } else {
        return [title].concat(labels).join(' ');
      }
    };


    /*
    	@name string
    	@return [ string, Array<Label> ]
     */

    TaskListSync.prototype.getlabelsFromTitle = function(title) {
      var label, labels, name, prefix, r, symbol, _i, _len, _ref1;
      type(title, String);
      labels = [];
      _ref1 = this.sync.config.auto_labels;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        r = _ref1[_i];
        symbol = r.symbol;
        label = r.label;
        prefix = r.prefix;
        name = r.shortcut ? r.shortcut : "\\w+";
        title = title.replace("\b" + symbol + "(" + name + ")\b", '', function(name) {
          return labels.push(prefix + (label || name));
        });
      }
      title = title.trim();
      type(name, String);
      type(labels, [String]);
      return [title, labels];
    };

    TaskListSync.prototype.taskWasCompleted = function(id) {
      var _ref1;
      if (((_ref1 = this.completions_tasks[id]) != null ? _ref1.completed : void 0) === true) {
        return this.completions_tasks[id].time;
      } else {
        return false;
      }
    };

    TaskListSync.prototype.taskWasNotCompleted = function(id) {
      var _ref1;
      if (((_ref1 = this.completions_tasks[id]) != null ? _ref1.completed : void 0) === false) {
        return this.completions_tasks[id].time;
      } else {
        return false;
      }
    };

    return TaskListSync;

  })();

  module.exports = TaskListSync;

}).call(this);
