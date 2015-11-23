'use strict';

var userModel = require('../models/User');

var md5 = require('md5');

var User = {
  addUser: function (username, password, email, callback) {
    let hash = md5(password);
    userModel.add(username, hash, email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(error, 'You successful create new user');
      }
    });
  },
  getUser: function (username, callback) {
    userModel.get(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  deleteUser: function (username, callback) {
    userModel.delete(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  setUserPass: function (username, password, callback) {
    userModel.updateUser(username, 'password', password, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  setUserEmail: function (username, email, callback) {
    userModel.updateUser(username, 'email', email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = User;