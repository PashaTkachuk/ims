'use strict';

var redis = require('../data/db_redis/user');
var Promise = require('bluebird');

var Session = {
    add: function (user_id, sid) {
        return redis.setSID(user_id, sid).then(function (result) {
            return result;
        });
    },
    get: function (user_id) {
        return redis.getSID(user_id).then(function (result) {
            return result;
        });
    },
    delete: function (user_id) {
        return redis.deleteSID(user_id).then(function (result) {
            return result;
        });
    }
};

module.exports = Session;