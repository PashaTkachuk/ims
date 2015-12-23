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
    addToken: function (token, email) {
        let queryString = "INSERT INTO token (token, email) VALUES (\'" + token + "\', \'" + email + "\')";

        return client.queryAsync(queryString).then(function (result) {
            return result;
        });
    },
    getToken: function (email) {
        let queryString =
            "SELECT token FROM token WHERE \"email\" LIKE \'" + email + "\'";

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'];
        });
    }
};

module.exports = Token;