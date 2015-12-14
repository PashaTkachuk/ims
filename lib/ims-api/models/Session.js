'use strict';

var redis = require('../data/db_redis/user');

var Session = {
  add: function (user_id, sid, callback) {
    redis.setSID(user_id, sid, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  get: function (user_id, callback) {
    redis.getSIDS(user_id, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
  delete: function (user_id, value, callback) {
    redis.deleteSID(user_id, value, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = Session;