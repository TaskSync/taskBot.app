// Generated by CoffeeScript 1.8.0
(function() {
  module.exports = {
    debug: true,
    google: {
      scopes: ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/gmail.modify']
    },
    client_id: "900809192866-270pemf710e7me8l9aaptsirjmkvit66.apps.googleusercontent.com",
    client_secret: "TohSI-VXNRKKNq0cYTkS72S6",
    access_token: "ya29.wAAeYiqwJRHzvoovWd-HYq8uCSgI1MsNPP7ycdKW2N6fbv5VncIfrE75lgaHWVXJRO820T2SWtUomQ",
    refresh_token: "1/_8oijYG4_aDpK4qz9VK5A4y3Wa7Tw5PbFZy-A4ynb0EMEudVrK5jSpoR30zcRFq6",
    gmail_username: 'gtd.box.sandbox@gmail.com',
    gmail_password: 'wikwikwik',
    gmail_host: 'gmail.com',
    auto_labels: [
      {
        symbol: '!',
        shortcut: 'na',
        label: 'Next Action',
        prefix: 'S/'
      }, {
        symbol: '!',
        shortcut: 'a',
        label: 'Action',
        prefix: 'S/'
      }, {
        symbol: '!',
        shortcut: 'p',
        label: 'Pending',
        prefix: 'S/'
      }, {
        symbol: '!',
        shortcut: 'sd',
        label: 'Some day',
        prefix: 'S/'
      }, {
        symbol: '!',
        shortcut: 'e',
        label: 'Expired',
        prefix: 'S/'
      }, {
        symbol: '!',
        shortcut: 'c',
        label: 'Current',
        prefix: 'S/'
      }, {
        symbol: '##',
        prefix: 'RP/',
        create: true
      }, {
        symbol: '#',
        prefix: 'P/',
        create: true
      }, {
        symbol: '^',
        prefix: 'R/',
        create: true
      }, {
        symbol: '*',
        prefix: 'L/'
      }
    ],
    status_labels: ['S/Next action', 'S/Action', 'S/Pending', 'S/Some day', 'S/Expired'],
    label_queries: {
      'label:inbox': [[], ['S/Finished', 'S/Pending']],
      'label:inbox OR label:s-next-action -label:s-finished -label:s-expired -label:s-pending': [['V/now']],
      'label:v-now ( label:s-finished OR label:s-expired OR label:s-pending )': [[], ['V/now', 'Inbox']],
      'label:s-current ( label:s-finished OR label:s-next-action OR label:s-action OR label:s-pending )': [[], ['S/Action', 'S/Next action', 'S/Pending', 'S/Finished', 'S/Expired']],
      'label:s-finished ( label:s-next-action OR label:s-action OR label:s-pending )': [[], ['S/Action', 'S/Next action', 'S/Pending']],
      'label:s-expired ( label:s-next-action OR label:s-action OR label:s-pending )': [[], ['S/Action', 'S/Next action', 'S/Pending']],
      'label:s-someday': [[], ['S/Next Action', 'S/Action']],
      'label:s-next-action': [[], ['S/Action']],
      'label:s-pending': [[], ['S/Next Action']],
      'label:inbox label:s-next-action OR label:s-action OR label:s-pending OR label:s-expired': [[], ['Inbox']],
      'label:v-now -label:inbox -label:s-next-action -label:s-action -label:s-pending -label:s-expired': [[], ['V/now']]
    },
    status_map: {
      na: 'S/Next action',
      a: 'S/Action',
      p: 'S/Pending',
      sd: 'S/Some day',
      ex: 'S/Expired'
    },
    tasks: {
      labels_in_title: 3,
      queries: {
        labels_defaults: {
          email_unmatched: ['S/Finished'],
          new_task: ['R/Task'],
          task_completed: {
            add: ['S/Finished']
          }
        },
        '!Waiting': {
          query: 'label:s-pending',
          labels_new_task: ['S/Pending'],
          task_completed: {
            remove: ['S/Pending']
          }
        }
      }
    }
  };

}).call(this);
