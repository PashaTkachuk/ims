'use strict';

var messageModel = require('../models/Message');
var contactModel = require('../models/Contact');

var Message = {
  getFromUser: function (first_user_id, second_user_id, callback) {
    contactModel.getDialog(first_user_id, second_user_id, function (error, dialog_id) {
      if (error) {
        callback(error, null);
      }
      messageModel.getFromDialog(dialog_id, function (error, result) {
        if (error) {
          callback(error, null);
        } else {
          callback(error, result);
        }
      });
    });
  },
  addMessage: function (message, contact_id, callback) {
    contactModel.getDialog(message.sender, contact_id, function (error, dialog_id) {
      if (error) {
        callback(error, null);
      }
      if (dialog_id == null) {
        contactModel.addDialog(message.sender, contact_id, function (error, dialog) {
          if (error) {
            callback(error, null);
          }
          dialog_id = dialog;
        });
      }
      messageModel.add(message.body, message.sender, dialog_id, message.send_time, function (error, result) {
        if (error) {
          callback(error, null);
        } else {
          callback(error, result);
        }
      });
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