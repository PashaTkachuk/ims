'use strict';

var userModel = require('../models/User');
var Promise = require('bluebird');
var md5 = require('md5');

var User = {
    addUser: function (password, email) {
        return userModel.add(password, email).then(function (result) {
            return result;
        });
    },
    getUser: function (user_id) {
        return userModel.get(user_id).then(function (result) {
            return result;
        });
    },
    deleteUser: function (user_id) {
        return userModel.delete(user_id).then(function (result) {
            return result;
        });
    },
    setUserPass: function (user_id, password) {
        return userModel.updateUserPassword(user_id, password).then(function (result) {
            return result;
        });
    },
    updateUser: function (user_id, body) {
        for (var key in body) {
            return userModel.updateUser(user_id, key, body[key]).then(function (result) {
                return result;
            });
        }
    }
};

module.exports = User;