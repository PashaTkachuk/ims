'use strict';

var db = require('../data/db_postgreSQL/user');
var Promise = require('bluebird');

var User = {
    add: function (email, password) {
        return db.addUser(email, password).then(function (result) {
            return result;
        });
    },
    get: function (user_id) {
        return db.getUser(user_id).then(function (result) {
            return result;
        });
    },
    getStatus: function (user_id) {
        return db.getUserStatus(user_id).then(function (result) {
            return result;
        });
    },
    check: function (email, password) {
        return db.checkUserPassword(email, password).then(function (result) {
            return result;
        });
    },
    getByEmail: function (email) {
        return db.getUserByEmail(email).then(function (result) {
            return result;
        });
    },
    updateUser: function (user_id, fieldName, fieldValue) {
        return db.updateUser(user_id, fieldName, fieldValue).then(function (result) {
            return result;
        });
    },
    updateUserPassword: function (user_id, password) {
        return db.updatePassword(user_id, password).then(function (result) {
            return result;
        });
    },
    delete: function (user_id) {
        return db.deleteUser(user_id).then(function (result) {
            return result;
        });
    }
};

module.exports = User;