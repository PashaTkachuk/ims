'use strict';

var config = require('../../../../config/index').redis;
var Promise = require('bluebird');
var redis = require("redis"),
    client = redis.createClient(config);

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

exports.setSID = function (user_id, sid) {
    return client.hsetAsync("user:" + user_id, "sid", sid)
        .then(function(result) {
            return result;
        });
};

exports.getSID = function (user_id) {
    return client.hgetAsync("user:" + user_id, "sid")
        .then(function(result) {
           return result;
        });
};

exports.deleteSession = function (user_id) {
    return client.delAsync("user:" + user_id)
        .then(function(result) {
            return result;
        });
};

exports.setStatus = function (user_id, status) {
    return client.hsetAsync("user:" + user_id, "status", status)
        .then(function(result) {
            return result;
        });
};

exports.getStatus = function (user_id) {
    return client.hgetAsync("user:" + user_id, "status")
        .then(function(result) {
            return result;
        });
};

exports.setSocketID = function (user_id, socketID) {
    return client.hsetAsync("user:" + user_id, "socket", socketID)
        .then(function(result) {
            return result;
        });
};

exports.getSocketIDs = function (user_ids) {
    return new Promise(function(resolve, reject) {
        var socket_ids = [];
        var users_count = user_ids.length;
        for (let user of user_ids) {
            let user_id = user.user_id;
            client.hgetAsync("user:" + user_id, "status").then(function (status) {
                return status;
            })
            .then(function (status) {
                 client.hgetAsync("user:" + user_id, "socket").then(function (socket_id) {
                     socket_ids.push({user_id: user_id, status: status, socket_id: socket_id});
                     if (--users_count == 0) {
                         resolve(socket_ids);
                     }
                 });
            });
        }
    });
};