'use strict';

var contactModel = require('../models/Contact');
var socketModel = require('../models/Socket');

var Contact = {
    addContact: function (user_id, contact_email) {
        return contactModel.add(user_id, contact_email).then(function (result) {
            return result;
        });
    },
    getAllContacts: function (user_id) {
        return contactModel.getAll(user_id).then(function (result) {
            return result;
        })
        .then(function (result) {
            return socketModel.getIDs(result).then(function (socket_ids) {
                return {contacts: result, socket_ids: socket_ids};
            });
        });
    },
    getRoom: function (first_user_id, second_user_id) {
        return contactModel.getRoom(first_user_id, second_user_id).then(function (result) {
            return result;
        });
    },
    deleteContact: function (user_id, contact_id) {
        return contactModel.delete(user_id, contact_id).then(function (result) {
            return result;
        });
    }
};

module.exports = Contact;