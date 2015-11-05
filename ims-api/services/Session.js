'use strict';

var userModel = require('../models/User');
var sessionModel = require('../models/Session');

var md5 = require('md5');

var Session = {
  addSession: function (username, userPassword, sid, callback) {
    sessionModel.add(username, sid, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
    //userModel.get(username, function (error, rows) {
    //  if (error) {
    //    callback(error, null);
    //  } else {
    //    var isRegistered = (rows.length == 1) ? true : false;
    //    if (isRegistered) {
    //      var isCorrectlyData = (username == rows[0].username && rows[0].password == md5(userPassword));
    //      if (isCorrectlyData) {
    //        sessionModel.add(username, sid, function (error, result) {
    //          if (error) {
    //            callback(error, null);
    //          } else {
    //            callback(null, rows);
    //          }
    //          return;
    //        });
    //      } else {
    //        callback(null, false);
    //      }
    //    } else {
    //      callback(null, false);
    //    }
    //    return;
    //  }
    //});
  },
  deleteSession: function (username, sid, callback) {    
    sessionModel.delete(username, sid, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  checkSession: function (username, sid, callback) {
    if (username && sid) {
      sessionModel.get(username, function (error, result) {
        if (error) {
          callback(error, null);
        } else {
          for (var i in result) {
            if (sid === result[i]) {
              callback(null, true);
              return;
            }
          }
          callback(null, false);
        }
        return;
      });
    } else {
      callback(null, false);
    }
    return;
  }
}

module.exports = Session;