'use strict';

var userModel = require('../models/User');
var sessionModel = require('../models/Session');
var socketModel = require('../models/Socket');
var statusModel = require('../models/Status');
var sessionConfig = require('./../../../config').session;
var Promise = require('bluebird');

var md5 = require('md5');

var Session = {
    addSession: function (email, userPassword, socket_id) {
        return userModel.check(email, userPassword)
            .then(function (pswmatch) {
                if (pswmatch) {
                    return pswmatch;
                } else {
                    throw new Error('Login fail');
                }
            })
            .then(function (result) {
                return userModel.getByEmail(email).then(function (user) {
                    return user;
                });
            })
            .then(function (user) {
                return userModel.getStatus(user.user_id).then(function (status) {
                    user.status = status;
                    return user;
                });
            })
            .then(function (user) {
                return statusModel.set(user.user_id, user.status).then(function () {
                    return user;
                });
            })
            .then(function (user) {
                return socketModel.setID(user.user_id, socket_id).then(function () {
                    return user;
                });
            })
            .then(function (user) {
                var sid = md5(user.user_id + sessionConfig.secret);
                return sessionModel.add(user.user_id, sid).then(function (result) {
                    return {status: true, user: user, sid: sid};
                });
            });
    },
    deleteSession: function (user_id) {
        return sessionModel.delete(user_id)
            .then(function (result) {
                return result;
            });
    },
    checkSession: function (user_id, sid, socket_id) {
        return sessionModel.get(user_id)
            .then(function (result) {
                if (sid === result) {
                    return user_id;
                } else {
                    throw new Error('User not login');
                }
            })
            .then(function (user_id) {
                return socketModel.setID(user_id, socket_id).then(function () {
                    return user_id;
                });
            })
            .then(function (user_id) {
                return statusModel.get(user_id).then(function (status) {
                    return status;
                });
            })
            .then(function (status) {
                return userModel.get(user_id).then(function (user) {
                    user.status = status;
                    return {status: true, user: user};
                });
            });
    }
};

module.exports = Session;