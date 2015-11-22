'use strict';

var postgresConfig = require('../../../../config/index').postgreSQL;
var pg      = require('pg');
var conString = "postgres://" + postgresConfig.username + ":" + postgresConfig.password + "@" + postgresConfig.host + "/" + postgresConfig.database;

var client = new pg.Client(conString);

exports.getUser = function (username, callback) {
  client.connect(function(error) {
    if(error) {
      return console.error('could not connect to postgres', error);
    }
    let queryString = "SELECT * FROM profile WHERE 'username' = " + username;
    client.query(queryString, function(error, result) {
      if(error) {
        callback(error, null);
      }
      client.end();
      callback(null, result);
    });
  });
};

exports.addUser = function (username, password, email, callback) {
  client.connect(function(error) {
    if(error) {
      console.error('could not connect to postgres', error);
      callback(error, null);
    }
    let queryString = "INSERT INTO profile (name, username, email, password) VALUES ('{" + username + "}', '{" + username + "}', '{" + email + "}', '{" + password + "}')";
    client.query(queryString, function(error, result) {
      console.log(error, result);
      if(error) {
        return callback(error, null);
      }
      client.end();
      callback(null, result);
    });
  });
};

exports.setUserPass = function (username, newPassword, callback) {
  let queryString = 'UPDATE `profile` SET `password` ="' +  newPassword + '"  WHERE `username` = "' + username + '"';
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    let queryString = 'SELECT * FROM `profile` WHERE `username` = "' + username + '"';
    client.query(queryString, function(err, result) {
      if(err) {
        callback(error, null);
      }
      client.end();
      callback(null, rows);
    });
  });
};

exports.setUserEmail = function (username, newEmail, callback) {
  let queryString = 'UPDATE `profile` SET `email` ="' +  newEmail + '"  WHERE `username` = "' + username + '"';
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    let queryString = 'SELECT * FROM `profile` WHERE `username` = "' + username + '"';
    client.query(queryString, function(err, result) {
      if(err) {
        callback(error, null);
      }
      client.end();
      callback(null, rows);
    });
  });
};

exports.deleteUser = function (username, callback) {
  let queryString = 'DELETE from `profile` WHERE `username` = "' + username + '"';
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    let queryString = 'SELECT * FROM `profile` WHERE `username` = "' + username + '"';
    client.query(queryString, function(err, result) {
      if(err) {
        callback(error, null);
      }
      client.end();
      callback(null, rows);
    });
  });
};