'use strict';

var contactModel = require('../models/Contact');

var Contact = {
  addContact: function (user_id, contact_id, callback) {
    contactModel.add(user_id, contact_id, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(error, result);
      }
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