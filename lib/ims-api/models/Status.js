'use strict';

var redis = require('../data/db_redis/user');
var Promise = require('bluebird');

var Status = {
    set: function (user_id, status) {
        return redis.setStatus(user_id, status).then(function (result) {
            return result;
        });
    },
    get: function (user_id) {
        return redis.getStatus(user_id).then(function (result) {
            return result;
        });
    }
};

module.exports = Status;