'use strict';

var userModel = require('../models/User');
var sessionModel = require('../models/Session');
var sessionConfig = require('./../../../config').session;
var Promise = require('bluebird');

var md5 = require('md5');

var Session = {
    addSession: function (email, userPassword) {
        return userModel.check(email, userPassword)
            .then(function (pswmatch) {
                if (pswmatch) {
                    return pswmatch;
                } else {
                    throw new Error('Login fail');
                }
            })
            .then(function(result) {
                return userModel.getByEmail(email).then(function (user) {
                    return user;
                });
            })
            .then(function(user) {
                var sid = md5(user.user_id + sessionConfig.secret);
                return sessionModel.add(user.user_id, sid).then(function (result) {
                    return {status: true, user: user, sid: sid};
                });
            });
    },
    deleteSession: function (user_id, sid) {
        return sessionModel.delete(user_id, sid).then(function (result) {
            return result;
        });
    },
    checkSession: function (user_id, sid) {
        return sessionModel.get(user_id)
            .then(function (result) {
                if (sid === result) {
                    return user_id;
                } else {
                    throw new Error('User not login');
                }
            })
            .then(function (user_id) {
                return userModel.get(user_id).then(function (user) {
                    return {status: true, user: user};
                });
            });
    }
};

module.exports = Session;