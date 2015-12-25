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

var Token = {
    addToken: function (token, email, password) {
        let queryString = "INSERT INTO token (token, email) VALUES (\'" + token + "\', \'" + email + "\')";

        return client.queryAsync(queryString)
            .then(function (result) {
                return result;
            })
            .then(function (result) {
                let queryString = "INSERT INTO users (email, password) VALUES (\'" + email + "\', crypt(\'" + password + "\', gen_salt('bf')))";
                return client.queryAsync(queryString).then(function (result) {
                    return result;
                })
            });
    },
    getToken: function (email, token) {
        let queryString =
            "SELECT users.user_id FROM token " +
            "INNER JOIN users ON token.email = users.email " +
            "WHERE users.email = \'" + email + "\' AND token.token = \'" + token + "\'";

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'];
        });
    }
};

module.exports = Token;