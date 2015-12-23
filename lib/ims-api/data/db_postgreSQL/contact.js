'use strict';

var postgresConfig = require('../../../../config/index').postgreSQL;
var pg = require('pg');
var conString = "postgres://" + postgresConfig.username + ":" + postgresConfig.password + "@" + postgresConfig.host + "/" + postgresConfig.database;

var Promise = require("bluebird");
Promise.promisifyAll(pg, {
    filter: function (methodName) {
        return methodName === "connect"
    },
    multiArgs: true
});

Promise.promisifyAll(pg);

var client = new pg.Client(conString);
client.connect();

var Contact = {
    getContacts: function (user_id) {
        let queryString =
            "SELECT users.user_id, users.email, profile.name, profile.avatar, profile.phone " +
            "FROM users " +
            "INNER JOIN profile ON users.user_id = profile.user_id AND users.user_id IN (" +
            "SELECT roster.contact_id FROM roster " +
            "INNER JOIN user_roster ON user_roster.roster_id = roster.roster_id AND user_roster.roster_id=" + user_id + ")";

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'];
        });
    },
    getContactsIDs: function (user_id) {
        let queryString =
            "SELECT roster.contact_id as user_id FROM roster " +
            "INNER JOIN user_roster ON user_roster.roster_id = roster.roster_id AND user_roster.roster_id=" + user_id;

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'];
        });
    },
    addContact: function (user_id, contact_email) {
        let queryString = "SELECT users.user_id FROM users WHERE users.email =\'" + contact_email + "\'";
        return client.queryAsync(queryString)
            .then(function (result) {
                let user_id = result['rows'][0].user_id;
                if (user_id) {
                    return user_id;
                } else {
                    throw new Error("User not exist");
                }
            })
            .then(function(contact_id){
                let queryString = "INSERT INTO roster (roster_id, contact_id) VALUES ((SELECT roster_id FROM user_roster WHERE user_id =" + user_id + "), " + contact_id + ")";
                return client.queryAsync(queryString).then(function (result) {
                    return contact_id;
                });
            })
            .then(function(contact_id) {
                let queryString = "INSERT INTO roster (roster_id, contact_id) VALUES ((SELECT roster_id FROM user_roster WHERE user_id =" + contact_id + "), " + user_id + ")";
                return client.queryAsync(queryString).then(function (result) {
                    return result;
                });
            });
    },
    deleteContact: function (user_id, contact_id) {
        let queryString = "DELETE from roster WHERE \"roster_id\"=(SELECT roster_id FROM user_roster WHERE user_id =" + user_id + ") AND \"contact_id\"=" + contact_id;
        return client.queryAsync(queryString).then(function (result) {
            return result;
        });
    },
    getRoom: function (user_id, contact_id) {
        let queryString = "SELECT room_users.room_id FROM room_users WHERE room_users.user_id=" + user_id + " OR room_users.user_id =" + contact_id + "GROUP BY room_users.room_id HAVING COUNT(room_users.room_id) = 2 ";
        return client.queryAsync(queryString).then(function (result) {
            return result['rows'][0]['room_id'];
        });
    },
    createDialog: function (user_id, contact_id) {
        let queryString = "INSERT INTO dialog (type) VALUES ('private') RETURNING dialog_id";
        return client.queryAsync(queryString).then(function (result) {
            return result['rows'];
        });
    }
};

module.exports = Contact;