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
  updateUser: function (username, fieldName, fieldValue, callback) {
    let queryString = "UPDATE user_account SET \"" + fieldName + "\"=\'" +  fieldValue + "\' WHERE \"username\" LIKE \'" + username + "\'";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  deleteUser: function (username, callback) {
    let queryString = "DELETE from user_account WHERE \"username\" LIKE \'" + username + "\'";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  }
};

module.exports = User;