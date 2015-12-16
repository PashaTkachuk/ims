'use strict';

var postgresConfig = require('../../../../config/index').postgreSQL;
var pg      = require('pg');
var conString = "postgres://" + postgresConfig.username + ":" + postgresConfig.password + "@" + postgresConfig.host + "/" + postgresConfig.database;

var client = new pg.Client(conString);
client.connect();

var User = {
  getUser: function (user_id, callback) {
    let queryString = "SELECT user_account.user_id, user_account.email, user_account.avatar, user_account.name, user_account.phone, user_account.status FROM user_account WHERE user_id =" + user_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows']);
    });
  },
  checkUserPassword: function (user_id, password, callback) {
    let queryString = "SELECT (password = crypt('" + password + "', password)) AS pswmatch FROM users WHERE user_id=" + user_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows']['pswmatch']);
    });
  },
  getUserByEmail: function (email, callback) {
    let queryString = "SELECT * FROM user_account WHERE \"email\" LIKE \'" + email + "\'";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows']);
    });
  },
  addUser: function (password, email, callback) {
    let queryString = "INSERT INTO user_account (password, email) VALUES (\'" + password + "\', \'" + email + "\')";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  updateUser: function (user_id, fieldName, fieldValue, callback) {
    let queryString = "UPDATE user_account SET \"" + fieldName + "\"=\'" +  fieldValue + "\' WHERE user_id =" + user_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  deleteUser: function (user_id, callback) {
    let queryString = "DELETE from user_account WHERE user_id =" + user_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  }
};

module.exports = User;