'use strict';

var messageModel = require('../models/Message');

var Message = {
  getFromDialog: function (dialog_id) {
    return messageModel.getFromDialog(dialog_id).then(function (result) {
      return result;
    });
  },
  getMessagesHistory: function (user_id) {
    return messageModel.getRooms(user_id).then(function (result) {
      return result;
    });
  },
  addMessage: function (message) {
    return messageModel.add(message.body, message.sender, message.room_id, message.created_at).then(function (result) {
      return result;
    });
  }
};

module.exports = Message;