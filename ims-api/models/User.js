'use strict';

var User = {
  add: function (username, password, email, callback) {
    mysql.addUser(username, password, email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  get: function (username, callback) {
    mysql.getUser(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  setPass: function (username, newPassword, callback) {
    mysql.setUserPass(username, newPassword, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  setEmail: function (username, newEmail, callback) {
    mysql.setUserEmail(username, newEmail, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  delete: function (username, callback) {
    mysql.deleteUser(username, function (error, result) {
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