'use strict';

var messageModel = require('../models/Message');

var Message = {
  getFromDialog: function (dialog_id,  callback) {
    messageModel.getFromDialog(dialog_id, function (error, result) {
      if (error) {
        return callback(error, null);
      } else {
        return callback(error, result);
      }
    });
  },
  getMessagesHistory: function (user_id,  callback) {
    messageModel.getRooms(user_id, function (error, result) {
      if (error) {
        return callback(error, null);
      } else {
        return callback(error, result);
      }
    });
  },
  addMessage: function (message, callback) {
    messageModel.add(message.body, message.sender, message.dialog, message.created_at, function (error, result) {
      if (error) {
        return callback(error, null);
      } else {
        return callback(error, result);
      }
    });
  }
};

module.exports = Message;