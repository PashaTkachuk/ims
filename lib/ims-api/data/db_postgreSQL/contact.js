'use strict';

var postgresConfig = require('../../../../config/index').postgreSQL;
var pg      = require('pg');
var conString = "postgres://" + postgresConfig.username + ":" + postgresConfig.password + "@" + postgresConfig.host + "/" + postgresConfig.database;

var client = new pg.Client(conString);
client.connect();

var Contact = {
  getContacts: function (user_id, callback) {
    let queryString = "SELECT user_account.user_id, user_account.username, user_account.email FROM user_account, contact_list WHERE contact_list.contact_id = user_account.user_id AND contact_list.user_id =" + user_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  addContact: function (user_id, contact_id, callback) {
    let queryString = "INSERT INTO contact_list (user_id, contact_id) VALUES (" + user_id + ", " + contact_id + ")";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  deleteContact: function (user_id, contact_id, callback) {
    let queryString = "DELETE from contact_list WHERE \"user_id\"=" + user_id + " AND \"user_id\"=" + contact_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  }
};

module.exports = Contact;