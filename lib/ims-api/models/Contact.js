'use strict';

var db = require('../data/db_postgreSQL/contact');
var Promise = require('bluebird');

var Contact = {
    getAll: function (user_id) {
        return db.getContacts(user_id).then(function (result) {
            return result;
        });
    },
    add: function (user_id, contact_email) {
        return db.addContact(user_id, contact_email).then(function (result) {
            return result;
        });
    },
    delete: function (user_id, contact_id) {
        return db.deleteContact(user_id, contact_id).then(function (result) {
            return result;
        });
    },
    getRoom: function (user_id, contact_id) {
        return db.getRoom(user_id, contact_id).then(function (result) {
            return result;
        });
    },
    addDialog: function (user_id, contact_id) {
        return db.createDialog(user_id, contact_id).then(function (result) {
            return result;
        });
    }
};

module.exports = Contact;