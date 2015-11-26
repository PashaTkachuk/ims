'use strict';

var messageModel = require('../models/Message');

var Message = {
  getFromDialog: function (dialog_id,  callback) {
    messageModel.getFromDialog(dialog_id, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(error, result);
      }
    });
  },
  getLastMessages: function (user_id,  callback) {
    messageModel.getLast(user_id, function (error, result) {
      if (error) {
        return callback(error, null);
      } else {
        return callback(error, result);
      }
    });
  },
  addMessage: function (message, callback) {
    messageModel.add(message.body, message.sender, message.dialog_id, message.send_time, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(error, result);
      }
    });
  },
  updateMessage: function (message_id, body, callback) {
    messageModel.put(message_id, body, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  deleteMessage: function (message_id, callback) {
    messageModel.delete(message_id, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = Message;