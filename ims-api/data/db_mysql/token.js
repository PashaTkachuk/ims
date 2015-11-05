'use strict';

var config = require('../../../config/index').mysql;
var mysql      = require('promise-mysql');
var connection;

mysql.createConnection(config).then(function(conn){
    connection = conn;
});

exports.addToken = function (value, username) {
  var queryString = 'INSERT INTO `token` (`value`, `username`) VALUES ("' + value + '", "' + username + '")';
	return connection.query(queryString).then(function (rows) {
      return rows;
  }).catch(function (error) {
      console.log('insert ERROR', error);
  });
};

exports.getToken = function (username, callback) {
  var queryString = 'SELECT `id`,`value` FROM `token` WHERE `username` = "' + username + '" AND createDate>TIMESTAMPADD(HOUR, -2, CURRENT_TIMESTAMP) AND createDate<=CURRENT_TIMESTAMP';
	return connection.query(queryString).then(function (rows) {
      return rows;
  }).catch(function (error) {
      console.log('select ERROR', error);
  });
};

exports.deleteToken = function (id, callback) {
  var queryString = 'DELETE FROM `token`  WHERE `id` = "' + id + '"';
	return connection.query(queryString).then(function (rows) {
      return rows;
  }).catch(function (error) {
      console.log('delete ERROR', error);
  });
};

exports.deleteAllTokens = function (username, callback) {
  var queryString = 'DELETE FROM `token` WHERE `username` = "' + username + '"';
  return connection.query(queryString).then(function (rows) {
      return rows;
  }).catch(function (error) {
      console.log('delete ERROR', error);
  });
};