'use strict';

var config = require('../../../config/index').mysql;
var mysql      = require('mysql');
var connection = mysql.createConnection(config);

connection.connect();

exports.getUser = function (username, callback) {
  var queryString = 'SELECT * FROM `profile` WHERE `username` = "' + username + '"';
  connection.query(queryString, function (error, rows) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
    return;
  });
};

exports.addUser = function (username, password, email, callback) {
  var queryString = 'INSERT IGNORE INTO `profile` (`username`, `password`, `email`) VALUES ("' + username + '", "' + password + '", "' + email + '")';
  connection.query(queryString, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
    return;
	});
};

exports.setUserPass = function (username, newPassword, callback) {
  var queryString = 'UPDATE `profile` SET `password` ="' +  newPassword + '"  WHERE `username` = "' + username + '"';
	connection.query(queryString, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
    return;
	});
};

exports.setUserEmail = function (username, newEmail, callback) {
  var queryString = 'UPDATE `profile` SET `email` ="' +  newEmail + '"  WHERE `username` = "' + username + '"';
  connection.query(queryString, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
    return;
  });
};

exports.deleteUser = function (username, callback) {
    var queryString = 'DELETE from `profile` WHERE `username` = "' + username + '"';
    connection.query(queryString, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
};