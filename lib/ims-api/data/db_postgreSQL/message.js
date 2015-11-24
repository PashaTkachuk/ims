'use strict';

var postgresConfig = require('../../../../config/index').postgreSQL;
var pg      = require('pg');
var conString = "postgres://" + postgresConfig.username + ":" + postgresConfig.password + "@" + postgresConfig.host + "/" + postgresConfig.database;

var client = new pg.Client(conString);
client.connect();

var Message = {
  getFromUser: function (first_user_id, second_user_id, callback) {
    let queryString = "SELECT DISTINCT message.message_id,message.body,message.sender,message.dialog,message.created_at FROM dialog, dialog_contact, message WHERE dialog.dialog_id = dialog_contact.dialog_id AND dialog.type LIKE 'private' AND dialog_contact.user_id ="+first_user_id+" OR dialog_contact.user_id ="+second_user_id+" ORDER BY message.created_at DESC";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  addMessage: function (body, sender_id, recipient_ids, callback) {
    let queryString = "INSERT INTO message (body, sender) VALUES (\'" + body + "\', " + sender_id + ") RETURNING message_id";
    client.query(queryString, function(message_error, message_result) {
      if(message_error) {
        return callback(message_error, null);
      }
      var message_id = message_result;
      for (let i in recipient_ids) {
        let queryString = "INSERT INTO message_recipient (message_id, sender) VALUES (" + message_id + ", " + recipient_ids[i] + ")";
        var query = client.query(queryString);
        query.on('error', function(error) {
          return callback(message_error, null);
        });
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