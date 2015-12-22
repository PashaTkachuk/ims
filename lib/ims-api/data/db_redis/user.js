'use strict';

var config = require('../../../../config/index').redis;
var Promise = require('bluebird');
var redis = require("redis"),
    client = redis.createClient(config);

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

exports.setSID = function (user_id, sid) {
    return client.setAsync("user:sid:" + user_id, sid)
        .then(function(result) {
            return result;
        });
};

exports.getSID = function (user_id) {
    return client.getAsync("user:sid:" + user_id)
        .then(function(result) {
           return result;
        });
};

exports.deleteSID = function (user_id) {
    return client.delAsync("user:sid:" + user_id)
        .then(function(result) {
            return result;
        });
};

exports.setStatus = function (user_id, status) {
    return client.setAsync("user:status:" + user_id, status)
        .then(function(result) {
            return result;
        });
};

exports.getStatus = function (user_id) {
    return client.getAsync("user:sid:" + user_id)
        .then(function(result) {
            return result;
        });
};

exports.setSocketID = function (user_id, socketID) {
    return client.setAsync("user:socket:" + user_id, socketID)
        .then(function(result) {
            return result;
        });
};

exports.getSocketID = function (user_id) {
    return client.getAsync("user:socket:" + user_id)
        .then(function(result) {
            return result;
        });
};