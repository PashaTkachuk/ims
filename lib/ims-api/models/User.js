'use strict';

var db = require('../data/db_postgreSQL/user');

var User = {
  add: function (username, password, email, callback) {
    db.addUser(username, password, email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  get: function (username, callback) {
    db.getUser(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  setPass: function (username, newPassword, callback) {
    db.setUserPass(username, newPassword, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  setEmail: function (username, newEmail, callback) {
    db.setUserEmail(username, newEmail, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  delete: function (username, callback) {
    db.deleteUser(username, function (error, result) {
      if (error) {
        callback(error, null);        
      } else {
        callback(null, result);        
      }
    });
  }
};

module.exports = User;