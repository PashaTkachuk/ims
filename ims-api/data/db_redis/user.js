'use strict';

var config = require('../../../config/index').redis;
var redis = require("redis"),
  client = redis.createClient(config);

exports.setSID = function (key, value, callback) {
  client.lpush("user:sid:" + key, value, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
    return;
  });
};

exports.getSIDS = function (key, callback) {
  client.llen("user:sid:" + key, function (error, listLength) {
    if (error) {
      callback(error, null);
    } else {
    	client.lrange("user:sid:" + key, 0, listLength - 1, function (error, result) {
    		if (error) {          
          callback(error, null);
        } else {
          callback(null, result);
        }
        return;
    	});
    }
    return;
  });

};

exports.deleteSID = function (key, value, callback) {
	client.lrem("user:sid:" + key, 0, value, function (error, result) {
		if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
	});
};