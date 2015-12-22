'use strict';

var redis = require('../data/db_redis/user');
var Promise = require('bluebird');

var Socket = {
    setID: function (user_id, socket_id) {
        return redis.setSocketID(user_id, socket_id).then(function (result) {
            return result;
        });
    },
    getID: function (user_id) {
        return redis.getSocketID(user_id).then(function (result) {
            return result;
        });
    }
};

module.exports = Socket;