'use strict';

var messageModel = require('../models/Message');

var Message = {
  getFromUser: function (first_user_id, second_user_id, callback) {
    messageModel.getFromUser(first_user_id, second_user_id, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(error, result);
      }
    });
  },
  addMessage: function (body, sender_id, recipient_ids, callback) {
    messageModel.add(body, sender_id, recipient_ids, function (error, result) {
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