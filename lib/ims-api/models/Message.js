'use strict';

var db = require('../data/db_postgreSQL/message');
var Promise = require('bluebird');

var Message = {
    getFromDialog: function (dialog_id) {
        return db.getFromRoom(dialog_id).then(function (result) {
            return result;
        });
    },
    getRooms: function (user_id) {
        return db.getRooms(user_id).then(function (result) {
            return result;
        });
    },
    add: function (body, sender_id, room_id, time) {
        return db.addMessage(body, sender_id, room_id, time).then(function (result) {
            return result;
        });
    }
};

module.exports = Message;