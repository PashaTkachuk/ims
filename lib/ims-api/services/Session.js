'use strict';

var userModel = require('../models/User');
var sessionModel = require('../models/Session');

var md5 = require('md5');

var Session = {
  addSession: function (username, userPassword, sid, callback) {
    userModel.get(username, function (error, rows) {
      if (error) {
        callback(error, null);
      } else {
        let isRegistered = (rows.length == 1);
        if (isRegistered) {
          let isCorrectlyData = (username == rows[0].username && rows[0].password == md5(userPassword));
          if (isCorrectlyData) {
            sessionModel.add(username, sid, function (error, result) {
              if (error) {
                callback(error, null);
              } else {
                callback(null, rows[0]);
              }
            });
          } else {
            callback(null, false);
          }
        } else {
          callback(null, false);
        }
      }
    });
  },
  deleteSession: function (username, sid, callback) {    
    sessionModel.delete(username, sid, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  checkSession: function (username, sid, callback) {
    if (username && sid) {
      sessionModel.get(username, function (error, result) {
        if (error) {
          callback(error, null);
        } else {
          for (let i of result) {
            if (sid === i) {
              callback(null, true);
            }
          }
          callback(null, false);
        }
      });
    } else {
      callback(null, false);
    }
  }
};

module.exports = Session;