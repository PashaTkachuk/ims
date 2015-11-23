'use strict';

var postgresConfig = require('../../../../config/index').postgreSQL;
var pg      = require('pg');
var conString = "postgres://" + postgresConfig.username + ":" + postgresConfig.password + "@" + postgresConfig.host + "/" + postgresConfig.database;

var client = new pg.Client(conString);
client.connect();

var User = {
  getUser: function (username, callback) {
    let queryString = "SELECT * FROM user_account WHERE \"username\" LIKE \'" + username + "\'";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows']);
    });
  },
  addUser: function (username, password, email, callback) {
    let queryString = "INSERT INTO user_account (username, password, email) VALUES (\'" + username + "\', \'" + password + "\', \'" + email + "\')";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  setUserPass: function (username, callback) {
    let queryString = "SELECT * FROM user_account WHERE \"username\" LIKE \'" + username + "\'";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows'][0]);
    });
  },
  setUserEmail: function (username, callback) {
    let queryString = "SELECT * FROM user_account WHERE \"username\" LIKE \'" + username + "\'";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows'][0]);
    });
  },
  deleteUser: function (username, callback) {
    let queryString = "SELECT * FROM user_account WHERE \"username\" LIKE \'" + username + "\'";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows'][0]);
    });
  }
};

module.exports = User;

//
//exports.setUserPass = function (username, newPassword, callback) {
//  let queryString = 'UPDATE `profile` SET `password` ="' +  newPassword + '"  WHERE `username` = "' + username + '"';
//  client.connect(function(err) {
//    if(err) {
//      return console.error('could not connect to postgres', err);
//    }
//    let queryString = 'SELECT * FROM `profile` WHERE `username` = "' + username + '"';
//    client.query(queryString, function(err, result) {
//      if(err) {
//        callback(error, null);
//      }
//      client.end();
//      callback(null, rows);
//    });
//  });
//};
//
//exports.setUserEmail = function (username, newEmail, callback) {
//  let queryString = 'UPDATE `profile` SET `email` ="' +  newEmail + '"  WHERE `username` = "' + username + '"';
//  client.connect(function(err) {
//    if(err) {
//      return console.error('could not connect to postgres', err);
//    }
//    let queryString = 'SELECT * FROM `profile` WHERE `username` = "' + username + '"';
//    client.query(queryString, function(err, result) {
//      if(err) {
//        callback(error, null);
//      }
//      client.end();
//      callback(null, rows);
//    });
//  });
//};
//
//exports.deleteUser = function (username, callback) {
//  let queryString = 'DELETE from `profile` WHERE `username` = "' + username + '"';
//  client.connect(function(err) {
//    if(err) {
//      return console.error('could not connect to postgres', err);
//    }
//    let queryString = 'SELECT * FROM `profile` WHERE `username` = "' + username + '"';
//    client.query(queryString, function(err, result) {
//      if(err) {
//        callback(error, null);
//      }
//      client.end();
//      callback(null, rows);
//    });
//  });
//};