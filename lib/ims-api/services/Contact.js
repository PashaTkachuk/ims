'use strict';

var contactModel = require('../models/Contact');

var Contact = {
  addContact: function (user_id, contact_username, callback) {
    contactModel.add(user_id, contact_username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(error, result);
      }
      return;
    });
  },
  getAllContacts: function (user_id, callback) {
    contactModel.getAll(user_id, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  getDialog: function (first_user_id, second_user_id, callback) {
    contactModel.getDialog(first_user_id, second_user_id, function (error, dialog_id) {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, dialog_id);
      }
    });
  },
  deleteContact: function (user_id, contact_id, callback) {
    contactModel.delete(user_id, contact_id, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = Contact;