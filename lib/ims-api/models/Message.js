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