'use strict';

var userModel = require('../models/User');
var sessionModel = require('../models/Session');
var sessionConfig = require('./../../../config').session;

var md5 = require('md5');

var Session = {
  addSession: function (email, userPassword, callback) {
    userModel.check(email, userPassword, function (error, pswmatch) {
      if (pswmatch) {
        userModel.getByEmail(email, function (error, rows) {
          if (error) {
            callback(error, null);
          } else {
            var sid = md5(rows[0].user_id + sessionConfig.secret);
            sessionModel.add(rows[0].user_id, sid, function (error, result) {
              if (error) {
                callback(error, null);
              } else {
                callback(null, {status: true, user: rows[0], sid: sid});
              }
              return;
            });
          }
        });
      } else {
        callback(null, {status: false});
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
      return;
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
              userModel.get(user_id, function (error, rows) {
                if (error) {
                  callback(error, null);
                } else {
                  callback(null, {status: true, user: rows[0]});
                }
                return;
              });
              return;
            }
          }
          callback(null, false);
        }
      });
    } else {
      callback(null, {status: false});
    }
    return;
  }
};

module.exports = Session;