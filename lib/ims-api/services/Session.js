'use strict';

var userModel = require('../models/User');
var sessionModel = require('../models/Session');

var md5 = require('md5');

var Session = {
  addSession: function (email, userPassword, sid, callback) {
    userModel.getByEmail(email, function (error, rows) {
      if (error) {
        callback(error, null);
      } else {
        let isRegistered = (rows.length == 1);
        if (isRegistered) {
          let isCorrectlyData = (email == rows[0].email && rows[0].password == md5(userPassword));
          if (isCorrectlyData) {
            sessionModel.add(rows[0].user_id, sid, function (error, result) {
              if (error) {
                callback(error, null);
              } else {
                callback(null, rows[0]);
              }
              return;
            });
          } else {
            callback(null, false);
          }
        } else {
          callback(null, false);
        }
      }
      return;
    });
  },
  deleteSession: function (user_id, sid, callback) {
    sessionModel.delete(user_id, sid, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  checkSession: function (user_id, sid, callback) {
    if (user_id && sid) {
      sessionModel.get(user_id, function (error, result) {
        if (error) {
          callback(error, null);
        } else {
          for (let i of result) {
            if (sid === i) {
              return callback(null, true);
            }
          }
          callback(null, false);
        }
      });
    } else {
      callback(null, false);
    }
    return;
  }
};

module.exports = Session;