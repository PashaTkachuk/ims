'use strict';

var messageModel = require('../models/Message');
var socketModel = require('../models/Socket');
var Promise = require('bluebird');

var Message = {
    getFromDialog: function (dialog_id) {
        return messageModel.getFromDialog(dialog_id).then(function (result) {
            return result;
        });
    },
    getMessagesHistory: function (user_id) {
        return messageModel.getRooms(user_id).then(function (result) {
            return result;
        });
    },
    addMessage: function (message) {
        return messageModel.add(message.body, message.sender, message.room_id, message.created_at)
            .then(function (result) {
                return result;
            })
            .then(function (result) {
                return messageModel.getRoomUsers(message.room_id).then(function (user_ids) {
                    return user_ids;
                });
            })
            .then(function (user_ids) {
                return socketModel.getIDs(user_ids).then(function (socket_ids) {
                    return socket_ids;
                });
            });
    }
};

module.exports = Message;