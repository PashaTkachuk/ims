'use strict';

var postgresConfig = require('../../../../config/index').postgreSQL;
var pg      = require('pg');
var conString = "postgres://" + postgresConfig.username + ":" + postgresConfig.password + "@" + postgresConfig.host + "/" + postgresConfig.database;

var client = new pg.Client(conString);
client.connect();

var Contact = {
  getContacts: function (user_id, callback) {
    let queryString =
        "SELECT users.user_id, users.email, profile.name, profile.avatar, profile.phone " +
        "FROM users " +
        "INNER JOIN profile ON users.user_id = profile.user_id AND users.user_id IN (" +
          "SELECT roster.contact_id FROM roster " +
          "INNER JOIN user_roster ON user_roster.roster_id = roster.roster_id AND user_roster.roster_id="+ user_id +")";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  addContact: function (user_id, contact_email, callback) {
    let queryString = "SELECT users.user_id FROM users WHERE users.email =\'" + contact_email + "\'";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      let contact_id = result['rows'][0].user_id;
      let queryString = "INSERT INTO roster (roster_id, contact_id) VALUES ((SELECT roster_id FROM user_roster WHERE user_id ="+ user_id +"), "+contact_id+")";
      client.query(queryString, function(error, result) {
        if(error) {
          return callback(error, null);
        }
        return callback(null, result);
      });
    });

  },
  deleteContact: function (user_id, contact_id, callback) {
    let queryString = "DELETE from roster WHERE \"roster_id\"=(SELECT roster_id FROM user_roster WHERE user_id ="+ user_id +") AND \"contact_id\"=" + contact_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  getRoom: function (user_id, contact_id, callback) {
    let queryString = "SELECT room_users.room_id FROM room_users WHERE room_users.user_id="+user_id+" OR room_users.user_id =" + contact_id + "GROUP BY room_users.room_id HAVING COUNT(room_users.room_id) = 2 ";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
        return callback(null, result['rows'][0]['room_id']);
    });
  },
  createDialog: function (user_id, contact_id, callback) {
    let queryString = "INSERT INTO dialog (type) VALUES ('private') RETURNING dialog_id";
    client.query(queryString, function(error, create_dialog_result) {
      if(error) {
        return callback(error, null);
      }
      var dialog_id = create_dialog_result['rows'][0]['dialog_id'];
      let queryString = "INSERT INTO dialog_contact (dialog_id, user_id) VALUES ("+dialog_id+", "+user_id+")";
      client.query(queryString, function(error, result) {
        if(error) {
          return callback(error, null);
        }
        let queryString = "INSERT INTO dialog_contact (dialog_id, user_id) VALUES ("+dialog_id+", "+contact_id+")";
        client.query(queryString, function(error, result) {
          if(error) {
            return callback(error, null);
          }
          return callback(null, dialog_id);
        });
      });
    });
  }
};

module.exports = Contact;