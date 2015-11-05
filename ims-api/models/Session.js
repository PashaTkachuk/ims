'use strict';

var redis = require('../data/db_redis/user');

var Session = {
  add: function (username, sid, callback) {
    redis.setSID(username, sid, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  get: function (username, callback) {
    redis.getSIDS(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  delete: function (username, value, callback) {
    redis.deleteSID(username, value, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  }
};

module.exports = Session;