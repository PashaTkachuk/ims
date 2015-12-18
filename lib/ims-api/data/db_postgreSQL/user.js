'use strict';

var postgresConfig = require('../../../../config/index').postgreSQL;
var pg      = require('pg');
var conString = "postgres://" + postgresConfig.username + ":" + postgresConfig.password + "@" + postgresConfig.host + "/" + postgresConfig.database;

var client = new pg.Client(conString);
client.connect();

var User = {
  getUser: function (user_id, callback) {
    let queryString =
        "SELECT users.user_id, users.email, profile.name, profile.avatar, profile.phone " +
        "FROM users " +
        "INNER JOIN profile " +
        "ON users.user_id = profile.user_id AND users.user_id =" + user_id;

    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows']);
    });
  },
  checkUserPassword: function (email, password, callback) {
    let queryString =
        "SELECT (password = crypt('" + password + "', password)) AS pswmatch " +
        "FROM users WHERE \"email\" LIKE \'" + email + "\'";

    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows'][0]['pswmatch']);
    });
  },
  getUserByEmail: function (email, callback) {
    let queryString =
        "SELECT users.user_id, users.email, profile.name, profile.avatar, profile.phone " +
        "FROM users " +
        "INNER JOIN profile " +
        "ON users.user_id = profile.user_id AND users.email LIKE \'" + email + "\'";

    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows']);
    });
  },
  addUser: function (email, password, callback) {
    let queryString = "INSERT INTO user_account (password, email) VALUES (\'" + password + "\', \'" + email + "\')";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  updateUser: function (user_id, fieldName, fieldValue, callback) {
    let queryString = "UPDATE profile SET \"" + fieldName + "\"=\'" +  fieldValue + "\' WHERE user_id =" + user_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  updatePassword: function (user_id, password, callback) {
    let queryString = "UPDATE users SET password=crypt(" +  password + ", gen_salt('bf')) WHERE user_id =" + user_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  deleteUser: function (user_id, callback) {
    let queryString = "DELETE from users WHERE user_id =" + user_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  }
};

module.exports = User;