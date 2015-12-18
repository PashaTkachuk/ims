'use strict';

var db = require('../data/db_postgreSQL/message');

var Message = {
  getFromDialog: function (dialog_id, callback) {
    db.getFromRoom(dialog_id, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows']);
    });
  },
  getRooms: function (user_id, callback) {
    db.getRooms(user_id, function(error, dialogs) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, dialogs);
    });
  },
  add: function (body, sender_id, dialog_id, time, callback) {
    db.addMessage(body, sender_id, dialog_id, time, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  }
};

module.exports = Message;