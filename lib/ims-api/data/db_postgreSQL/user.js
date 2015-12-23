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

var User = {
    getUser: function (user_id) {
        let queryString =
            "SELECT users.user_id, users.email, profile.name, profile.avatar, profile.phone " +
            "FROM users " +
            "INNER JOIN profile " +
            "ON users.user_id = profile.user_id AND users.user_id =" + user_id;

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'][0];
        });
    },
    checkUserPassword: function (email, password) {
        let queryString =
            "SELECT (password = crypt('" + password + "', password)) AS pswmatch " +
            "FROM users WHERE \"email\" LIKE \'" + email + "\'";

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'][0]['pswmatch'];
        });
    },
    getUserByEmail: function (email) {
        let queryString =
            "SELECT users.user_id, users.email, profile.name, profile.avatar, profile.phone " +
            "FROM users " +
            "INNER JOIN profile " +
            "ON users.user_id = profile.user_id AND users.email LIKE \'" + email + "\'";

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'][0];
        });
    },
    addUser: function (email, password) {
        let queryString = "INSERT INTO users (email, password) VALUES (\'" + email + "\', crypt(\'" + password + "\', gen_salt('bf'))) RETURNING user_id";
        return client.queryAsync(queryString)
            .then(function (result) {
                return result['rows'][0]['user_id'];
            })
            .then(function (user_id) {
                let queryString = "INSERT INTO user_status (user_id) VALUES (" + user_id + ")";
                return client.queryAsync(queryString).then(function (result) {
                    return user_id;
                })
            })
            .then(function (user_id) {
                let queryString = "INSERT INTO profile (user_id) VALUES (" + user_id + ")";
                return client.queryAsync(queryString).then(function (result) {
                    return user_id;
                })
            })
            .then(function (user_id) {
                let queryString = "INSERT INTO user_roster (user_id) VALUES (" + user_id + ")";
                return client.queryAsync(queryString).then(function (result) {
                    return user_id;
                })
            })
            .then(function (user_id) {
                let queryString = "INSERT INTO user_roster (user_id) VALUES (" + user_id + ")";
                return client.queryAsync(queryString).then(function (result) {
                    return user_id;
                })
            });
    },
    updateUser: function (user_id, fieldName, fieldValue) {
        let queryString = "UPDATE profile SET \"" + fieldName + "\"=\'" + fieldValue + "\' WHERE user_id =" + user_id;
        return client.queryAsync(queryString).then(function (result) {
            return result;
        });
    },
    updatePassword: function (user_id, password) {
        let queryString = "UPDATE users SET password=crypt(" + password + ", gen_salt('bf')) WHERE user_id =" + user_id;
        return client.queryAsync(queryString).then(function (result) {
            return result;
        });
    },
    getUserStatus: function (user_id) {
        let queryString = "SELECT user_status.status FROM user_status WHERE user_id =" + user_id;
        return client.queryAsync(queryString).then(function (result) {
            return result['rows'][0]['status'];
        });
    },
    deleteUser: function (user_id) {
        let queryString = "DELETE from users WHERE user_id =" + user_id;
        return client.queryAsync(queryString).then(function (result) {
            return result;
        });
    }
};

module.exports = User;