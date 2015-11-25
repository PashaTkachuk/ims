'use strict';

var postgresConfig = require('../../../../config/index').postgreSQL;
var pg      = require('pg');
var conString = "postgres://" + postgresConfig.username + ":" + postgresConfig.password + "@" + postgresConfig.host + "/" + postgresConfig.database;

var client = new pg.Client(conString);
client.connect();

var Message = {
  getFromDialog: function (dialog_id, callback) {
    let queryString = "SELECT message.message_id,message.body,message.sender,message.dialog,message.created_at, user_account.username as author_username, user_account.first_name as author_firstname, user_account.avatar as author_avatar FROM message INNER JOIN user_account ON user_account.user_id = message.sender WHERE message.dialog =" + dialog_id+ " ORDER BY message.created_at DESC";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  addMessage: function (body, sender_id, dialog_id, time, callback) {
    let queryString = "INSERT INTO message (body, sender, dialog, created_at) VALUES (\'" + body + "\', " + sender_id + ", " + dialog_id + ", to_timestamp(" + time + "))";
    client.query(queryString, function(message_error, message_result) {
      if(message_error) {
        return callback(message_error, null);
      }
      return callback(null, message_result);
    });
  },
  updateMessage: function (message_id, body, callback) {
    let queryString = "UPDATE message SET \"body\"=\'" +  body + "\' WHERE \"message_id\"=" + message_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  deleteMessage: function (message_id, callback) {
    let queryString = "DELETE from message_recipient WHERE \"message_id\"=" + message_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      let queryString = "DELETE from message WHERE \"message_id\"=" + message_id;
      client.query(queryString, function(error, result) {
        if(error) {
          return callback(error, null);
        }
        return callback(null, result);
      });
    });
  }
};

module.exports = Message;