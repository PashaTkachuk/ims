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
            "SELECT roster_users.contact_id FROM roster_users " +
            "INNER JOIN roster ON roster.roster_id = roster_users.roster_id AND roster.user_id=" + user_id + ")";

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'];
        });
    },
    getContactsIDs: function (user_id) {
        let queryString =
            "SELECT roster_users.contact_id as user_id FROM roster_users " +
            "INNER JOIN roster ON roster.roster_id = roster_users.roster_id AND roster.user_id=" + user_id;

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'];
        });
    },
    addContact: function (user_id, contact_email) {
        let queryString = "SELECT users.user_id FROM users WHERE users.email =\'" + contact_email + "\'";
        return client.queryAsync(queryString)
            .then(function (result) {
                if (result['rows'].length) {
                    return result['rows'][0].user_id;
                } else {
                    throw new Error("User not exist");
                }
            })
            .then(function(contact_id){
                let queryString = "INSERT INTO roster_users (roster_id, contact_id) VALUES ((SELECT roster_id FROM roster WHERE user_id =" + user_id + "), " + contact_id + ")";
                return client.queryAsync(queryString).then(function (result) {
                    return contact_id;
                });
            })
            .then(function(contact_id) {
                let queryString = "INSERT INTO roster_users (roster_id, contact_id) VALUES ((SELECT roster_id FROM roster WHERE user_id =" + contact_id + "), " + user_id + ")";
                return client.queryAsync(queryString).then(function (result) {
                    return result;
                });
            });
    },
    deleteContact: function (user_id, contact_id) {
        let queryString = "DELETE from roster_users WHERE roster_id=(SELECT roster_id FROM roster WHERE user_id =" + user_id + ") AND contact_id=" + contact_id;
        return client.queryAsync(queryString)
            .then(function (result) {
                return result;
            })
            .then(function(result) {
                let queryString = "DELETE from roster_users WHERE roster_id=(SELECT roster_id FROM roster WHERE user_id =" + contact_id + ") AND contact_id=" + user_id;
                return client.queryAsync(queryString).then(function (result) {
                    return result;
                });
            });
    },
    getRoom: function (user_id, contact_id) {
        let queryString = "SELECT room_users.room_id FROM room_users WHERE room_users.user_id=" + user_id + " OR room_users.user_id =" + contact_id + "GROUP BY room_users.room_id HAVING COUNT(room_users.room_id) = 2 ";
        return client.queryAsync(queryString).then(function (result) {
            return result['rows'][0]['room_id'];
        });
    },
    createRoom: function (user_id, contact_id) {
        let queryString =
            "INSERT INTO room (name) VALUES (" +
                "(SELECT concat_ws(', '," +
                    "(SELECT name FROM profile WHERE user_id=" + user_id + ")," +
                    "(SELECT name FROM profile WHERE user_id=" + contact_id + "))" +
                ")" +
            ") " +
            "RETURNING room.room_id";

        return client.queryAsync(queryString)
            .then(function (result) {
                return result['rows'][0]['room_id'];
            })
            .then(function (room_id) {
                let queryString = "INSERT INTO room_users VALUES (" + room_id + ", " + user_id + ")";
                return client.queryAsync(queryString).then(function (result) {
                    return room_id;
                })
            })
            .then(function (room_id) {
                let queryString = "INSERT INTO room_users VALUES (" + room_id + ", " + contact_id + ")";
                return client.queryAsync(queryString).then(function (result) {
                    return room_id;
                })
            });
    }
};

module.exports = Contact;