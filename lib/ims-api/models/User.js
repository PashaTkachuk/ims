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
      return;
    });
  },
  get: function (user_id, callback) {
    db.getUser(user_id, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  check: function (email, password, callback) {
    db.checkUserPassword(email, password, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  getByEmail: function (email, callback) {
    db.getUserByEmail(email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
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
  updateUserPassword: function (user_id, password, callback) {
    db.updatePassword(user_id, password, function (error, result) {
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
      return;
    });
  }
};

module.exports = User;