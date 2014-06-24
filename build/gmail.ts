///<reference path="asyncmachine-task.d.ts"/>
///<reference path="../node_modules/asyncmachine/lib/asyncmachine.d.ts"/>
///<reference path="../d.ts/async.d.ts"/>
///<reference path="../d.ts/imap.d.ts"/>
///<reference path="../d.ts/global.d.ts"/>
import settings = require('../settings');
import Imap = require("imap");
require("sugar");
import asyncmachine = require('asyncmachine');
import am_task = require('./asyncmachine-task');
import rsvp = require('rsvp');
import async = require('async');

Object.merge(settings, {
    gmail_max_results: 300
});

export class Message {
    subject: string = null;

    body: string = null;

    labels: string[] = null;

    id: number = null;

    query = null;

    fetch_id = 0;

    	constructor(id: number, subject: string, labels: string[], body?: string) {
        this.id = id;
        this.subject = subject;
        this.labels = labels;
        this.body = body;
    }
}

export class Query extends asyncmachine.AsyncMachine {
    Fetching = {
        blocks: ["Idle"]
    };

    Idle = {
        blocks: ["Fetching"]
    };

    FetchingQuery = {
        implies: ["Fetching"],
        blocks: ["FetchingResults", "QueryFetched"]
    };

    QueryFetched = {
        implies: ["Fetching"],
        blocks: ["FetchingQuery", "FetchingResults"]
    };

    FetchingResults = {
        implies: ["Fetching"],
        requires: ["QueryFetched"],
        blocks: ["FetchingQuery"]
    };

    ResultsFetched = {
        blocks: ["FetchingMessage", "FetchingResults", "FetchingQuery"]
    };

    FetchingMessage = {
        implies: ["Fetching"],
        blocks: ["MessageFetched"],
        requires: ["FetchingResults"]
    };

    MessageFetched = {
        implies: ["Fetching"],
        blocks: ["FetchingMessage"],
        requires: ["FetchingResults"]
    };

    ResultsFetchingError = {
        implies: ["Idle"],
        blocks: ["FetchingResults", "ResultsFetched"]
    };

    active = true;

    last_update = 0;

    next_update = 0;

    headers = {
        bodies: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
        struct: true
    };

    connection = null;

    query = "*";

    update_interval = 10 * 1000;

    fetch = null;

    msg = null;

    	results: IHash<Message> = null;

    constructor(connection, query, update_interval) {
        super();

        this.register("QueryFetched", "Fetching", "Idle", "FetchingQuery", "FetchingResults", "ResultsFetchingError", "FetchingMessage", "MessageFetched", "ResultsFetched");

        this.debug("[query:\"" + query + "\"]", 1);

        this.results = {};
        this.connection = connection;
        this.query = query;
        this.update_interval = update_interval;
    }

    FetchingQuery_enter() {
        this.last_update = Date.now();
        this.next_update = this.last_update + this.update_interval;
        this.log("performing a search for " + this.query);
        var tick = this.clock("FetchingQuery");
        this.connection.imap.search([["X-GM-RAW", this.query]], (err, results) => {
            if (!this.is("FetchingQuery", tick + 1)) {
                return;
            }
            return this.add("FetchingResults", err, results);
        });
        return true;
    }

    FetchingQuery_FetchingResults(states, err, results) {
        this.log("Found " + results.length + " search results");
        if (!results.length) {
            this.add("ResultsFetched");
            return true;
        }
        this.fetch = this.connection.imap.fetch(results, this.headers);
        this.fetch.on("message", this.addLater("FetchingMessage"));
        this.fetch.once("error", this.addLater("ResultsFetchingError"));
        return this.fetch.once("end", this.addLater("ResultsFetched"));
    }

    FetchingMessage_enter(states, msg) {
        var attrs = null;
        var body_buffer = "";
        var body = null;
        this.msg.once("body", (stream, data) => {
            stream.on("data", (chunk) => body_buffer += chunk.toString("utf8"));
            return stream.once("end", () => body = Imap.parseHeader(body_buffer));
        });
        this.msg.once("attributes", (data) => attrs = data);
        return this.msg.once("end", () => this.add("MessageFetched", msg, attrs, body));
    }

    FetchingMessage_exit() {
        var events = ["body", "attributes", "end"];
        events.forEach((event) => this.msg.removeAllListeners(event));
        return this.msg = null;
    }

    FetchingMessage_MessageFetched(states, msg, attrs, body) {
        var id = attrs["x-gm-msgid"];
        var labels = attrs["x-gm-labels"] || [];
        if (!this.results[id]) {
            this.log("New msg \"" + body.subject + "\" (" + (labels.join(",")) + ")");
            this.results[id] = new Message(id, body.subject, labels);
            this.results[id].fetch_id = this.clock("FetchingResults");
            this.trigger("new-msg", this.results[id]);
        } else {
            this.results[id].fetch_id = this.clock("FetchingResults");
        }
        return this.add("HasMonitored");
    }

    FetchingResults_exit() {
        var tick = this.clock("FetchingResults");
        Object.each(this.results, function(id, msg) {
            console.log(msg.fetch_id4);
            if (msg.fetch_id === tick) {
                return;
            }
            this.trigger("removed-msg", msg);
            return delete this.results[id];
        });
        if (this.fetch) {
            var events = ["message", "error", "end"];
            events.forEach((event) => this.fetch.removeAllListeners(event));
            return this.fetch = null;
        }
    }

    ResultsFetchingError_enter(err) {
        this.log("fetching error", err);
        this.add("Idle");
        if (err) {
            throw new Error(err);
        }
    }
}
export class Connection extends asyncmachine.AsyncMachine {
    queries: Query[] = null;

    queries_executing: Query[] = null;

    queries_executing_limit: number = 3;

    	imap: imap.Imap = null;

    query_timer = null;

    settings: IGtdBotSettings = null;

    box = null;

    fetch = null;

    Connecting = {
        requires: ["Active"],
        blocks: ["Connected", "Disconnecting", "Disconnected"]
    };

    Connected = {
        requires: ["Active"],
        blocks: ["Connecting", "Disconnecting", "Disconnected"],
        implies: ["BoxClosed"]
    };

    Ready = {
        requires: ["BoxOpened"]
    };

    Idle = {
        requires: ["Ready"],
        block: ["ExecutingQueries"]
    };

    Active = {};

    ExecutingQueries = {
        blocks: ["Idle"]
    };

    QueryFetched = {
        requires: ["Ready"]
    };

    Disconnecting = {
        blocks: ["Connected", "Connecting", "Disconnected"]
    };

    DisconnectingQueries = {
        requires: ["Disconnecting"]
    };

    Disconnected = {
        blocks: ["Connected", "Connecting", "Disconnecting"]
    };

    Fetching = {
        blocks: ["Idle"],
        requires: ["ExecutingQueries"]
    };

    OpeningBox = {
        requires: ["Connected"],
        blocks: ["BoxOpened", "BoxClosing", "BoxClosed"]
    };

    BoxOpened = {
        requires: ["Connected"],
        depends: ["Connected"],
        blocks: ["OpeningBox", "BoxClosed", "BoxClosing"]
    };

    BoxClosing = {
        blocks: ["BoxOpened", "OpeningBox", "Box"]
    };

    BoxClosed = {
        blocks: ["BoxOpened", "OpeningBox", "BoxClosing"]
    };

    BoxOpeningError = {
        drops: ["BoxOpened", "OpeningBox"]
    };

    constructor(settings) {
        super();

        this.queries = [];
        this.queries_executing = [];
        this.settings = settings;

        this.register("Disconnected", "Disconnecting", "Connected", "Connecting", "Idle", "Active", "ExecutingQueries", "OpeningBox", "Fetching", "BoxOpened", "BoxClosing", "BoxClosed", "Ready", "QueryFetched", "BoxOpeningError");

        this.debug("[connection]", 1);
    }

    addQuery(query, update_interval) {
        this.log("Adding query '" + query + "'");
        return this.queries.push(new Query(this, query, update_interval));
    }

    Connecting_enter(states) {
        var data = this.settings;
        this.imap = new Imap({
            user: data.gmail_username,
            password: data.gmail_password,
            host: data.gmail_host || "imap.gmail.com",
            port: 993,
            tls: true,
            debug: this.settings.debug ? console.log : void 0
        });

        this.imap.connect();
        var tick = this.clock("Connecting");
        return this.imap.once("ready", () => {
            if (!this.is("Connecting", tick + 1)) {
                return;
            }
            return this.add("Connected");
        });
    }

    Connecting_exit(states) {
        if (!~states.indexOf("Connected")) {
            this.imap.removeAllListeners("ready");
            return this.imap = null;
        }
    }

    Connected_enter() {
        return this.add("OpeningBox");
    }

    Connected_exit() {
        var tick = this.clock("Connected");
        return this.imap.end(() => {
            if (tick !== this.clock("Connected")) {
                return;
            }
            this.imap = null;
            return this.add("Disconnected");
        });
    }

    OpeningBox_enter() {
        var tick = this.clock("OpeningBox");
        this.imap.openBox("[Gmail]/All Mail", false, (err, box) => {
            if (!this.is("OpeningBox", tick + 1)) {
                return;
            }
            return this.add(["BoxOpened", "Ready"], err, box);
        });
        return true;
    }

    BoxOpened_enter(states, err, box) {
        if (err) {
            this.add("BoxOpeningError", err);
            return false;
        }
        return this.box = box;
    }

    BoxOpeningError_enter(err) {
        throw new Error(err);
    }

    BoxClosing_enter() {
        var tick = this.clock("BoxClosing");
        return this.imap.closeBox(() => {
            if (!this.is("BoxClosing", tick + 1)) {
                return;
            }
            return this.add("BoxClosed");
        });
    }

    Ready_enter() {
        return this.add("ExecutingQueries");
    }

    Active_enter() {
        return this.add("Connecting");
    }

    Connected_Active() {
        return this.add("Connecting");
    }

    ExecutingQueries_enter() {
        while (this.queries_executing.length < this.queries_executing_limit) {
            var query = this.queries.sortBy("next_update").filter((item) => !this.queries_executing.some((s) => s.query === item.query)).filter((item) => !item.next_update || item.next_update < Date.now()).first();

            if (!query) {
                break;
            }

            this.log("activating " + query.query);
            this.log("concurrency++");
            this.queries_executing.push(query);
            query.add("FetchingQuery");
            this.add("Fetching");
            var tick = query.clock("FetchingQuery");
            query.once("Results.Fetched.enter", () => {
                if (tick !== query.clock("FetchingQuery")) {
                    return;
                }
                this.queries_executing = this.queries_executing.filter((row) => row !== query);
                this.drop("Fetching");
                this.add("QueryFetched", query);
                return this.log("concurrency--");
            });
        }
        var func = () => this.ExecutingQueries_enter();
        return this.query_timer = setTimeout(func, this.minInterval_());
    }

    ExecutingQueries_Disconnecting(states, force) {
        this.drop("Active");
        if (this.query_timer) {
            clearTimeout(this.query_timer);
        }
        if (this.queries_executing.every((query) => query.is("Idle"))) {
            return;
        }
        this.add("DisconnectingQueries");
        var tick = this.clock("BoxClosing");
        return async.forEach(this.queries_executing, (query, done) => {
            query.drop("Fetching");
            return query.once("Idle", done);
        }, () => {
            if (!this.is("ExecutingQueries", tick)) {
                return;
            }
            return this.add("BoxClosing");
        });
    }

    Fetching_exit() {
        return !this.queries_executing.some((query) => query.is("Fetching"));
    }

    Disconnected_enter(states, force) {
        if (this.any("Connected", "Connecting")) {
            this.add("Disconnecting", force);
            return false;
        } else if (this.is("Disconnecting")) {
            return false;
        }
    }

    Disconnecting_exit() {
        return this.add("Disconnected");
    }

    hasMonitoredMsgs() {
        return this.queries.some((query) => query.is("HasMonitored"));
    }

    minInterval_() {
        return Math.min.apply(null, this.queries.map((ch) => ch.update_interval));
    }
}
