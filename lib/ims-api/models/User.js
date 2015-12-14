'use strict';

var db = require('../data/db_postgreSQL/user');

var User = {
  add: function (password, email, callback) {
    db.addUser(password, email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  get: function (user_id, callback) {
    db.getUser(user_id, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  getByEmail: function (email, callback) {
    db.getUserByEmail(email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  updateUser: function (user_id, fieldName, fieldValue, callback) {
    db.updateUser(user_id, fieldName, fieldValue, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  delete: function (user_id, callback) {
    db.deleteUser(user_id, function (error, result) {
      if (error) {
        callback(error, null);        
      } else {
        callback(null, result);        
      }
    });
  }
};

module.exports = User;