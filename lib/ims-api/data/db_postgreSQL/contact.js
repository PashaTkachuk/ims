'use strict';

var postgresConfig = require('../../../../config/index').postgreSQL;
var pg      = require('pg');
var conString = "postgres://" + postgresConfig.username + ":" + postgresConfig.password + "@" + postgresConfig.host + "/" + postgresConfig.database;

var client = new pg.Client(conString);
client.connect();

var Contact = {
  getContacts: function (user_id, callback) {
    let queryString = "SELECT contact_list.dialog_id, user_account.user_id, user_account.email, user_account.name, user_account.avatar, user_account.skype, user_account.phone FROM user_account, contact_list WHERE contact_list.contact_id = user_account.user_id AND contact_list.user_id =" + user_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  addContact: function (user_id, contact_email, callback) {
    var self =this;
    let queryString = "SELECT user_account.user_id FROM user_account WHERE user_account.email =\'" + contact_email + "\'";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      var contact_id = result['rows'][0].user_id;
      self.createDialog(user_id, contact_id, function(error, dialog_id) {
        if (error) {
          return callback(error, null);
        }
        let queryString = "INSERT INTO contact_list (user_id, contact_id, dialog_id) VALUES (" + user_id + ", " + contact_id + " , " + dialog_id + ")";
        client.query(queryString, function (error, result) {
          if (error) {
            return callback(error, null);
          }
          return callback(null, result)
        });
      });
    });

  },
  deleteContact: function (user_id, contact_id, callback) {
    let queryString = "DELETE from contact_list WHERE \"user_id\"=" + user_id + " AND \"contact_id\"=" + contact_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  getContactsDialog: function (user_id, contact_id, callback) {
    let queryString = "SELECT dialog_contact.dialog_id FROM dialog_contact WHERE dialog_contact.user_id="+user_id+" OR dialog_contact.user_id =" + contact_id + "GROUP BY dialog_contact.dialog_id HAVING COUNT(dialog_contact.dialog_id) = 2 ";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
        return callback(null, result['rows'][0]['dialog_id']);
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