'use strict';

var db = require('../data/db_postgreSQL/contact');

var Contact = {
  getAll: function (user_id, callback) {
    db.getContacts(user_id, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows']);
    });
  },
  add: function (user_id, contact_id, callback) {
    db.addContact(user_id, contact_id, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  delete: function (user_id, contact_id, callback) {
    db.deleteContact(user_id, contact_id, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  }
};

module.exports = Contact;