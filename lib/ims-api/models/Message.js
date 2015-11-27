'use strict';

var db = require('../data/db_postgreSQL/message');

var Message = {
  getFromDialog: function (dialog_id, callback) {
    db.getFromDialog(dialog_id, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows']);
    });
  },
  getLast: function (user_id, callback) {
    db.getDialogs(user_id, function(error, dialogs) {
      if(error) {
        return callback(error, null);
      }
      var last_dialogs =[];
      for (let dialog of dialogs) {
        db.getLastInDialog(dialog, function(error, result) {
          if(error) {
            return callback(error, null);
          }
          last_dialogs.push(result);
          if (last_dialogs.length == dialogs.length) {
            return callback(null, last_dialogs)
          }
        });
      }
    });
  },
  add: function (body, sender_id, dialog_id, time, callback) {
    db.addMessage(body, sender_id, dialog_id, time, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  put: function (message_id, body, callback) {
    db.updateMessage(message_id, body, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  delete: function (message_id, callback) {
    db.deleteMessage(message_id, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  }
};

module.exports = Message;