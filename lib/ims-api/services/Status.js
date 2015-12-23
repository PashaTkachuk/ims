'use strict';

var statusModel = require('../models/Status');
var contactModel = require('../models/Contact');
var socketModel = require('../models/Socket');
var Promise = require('bluebird');

var Status = {
    setStatus: function (user_id, status) {
        return statusModel.set(user_id, status).then(function (result) {
            return result;
        })
        .then(function (result) {
            return contactModel.getIDs(user_id).then(function (user_ids) {
                return user_ids;
            });
        })
        .then(function (user_ids) {
            return socketModel.getIDs(user_ids).then(function (socket_ids) {
                return socket_ids;
            });
        });
    },
    getStatus: function (user_id) {
        return statusModel.get(user_id).then(function (result) {
            return result;
        });
    }
};

module.exports = Status;