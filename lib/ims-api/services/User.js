'use strict';

var userModel = require('../models/User');

var md5 = require('md5');

var User = {
  addUser: function (password, email, callback) {
    let hash = md5(password);
    userModel.add(hash, email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(error, 'You successful create new user');
      }
    });
  },
  getUser: function (user_id, callback) {
    userModel.get(user_id, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result[0]);
      }
    });
  },
  deleteUser: function (user_id, callback) {
    userModel.delete(user_id, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  setUserPass: function (user_id, password, callback) {
    userModel.updateUserPassword(user_id, password, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  updateUser: function (user_id, body, callback) {
    for (var key in body) {
      userModel.updateUser(user_id, key, body[key], function (error, result) {
        if (error) {
          callback(error, null);
        } else {
          callback(null, result);
        }
        return;
      });
    }
    return;
  }
};

module.exports = User;