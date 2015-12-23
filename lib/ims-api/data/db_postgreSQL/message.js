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

var Message = {
    getFromRoom: function (room_id) {
        let queryString =
            "SELECT message.message_id,message.body,message.sender,message.room_id, message.created_at, profile.name as author_name, profile.avatar as author_avatar " +
            "FROM message " +
            "INNER JOIN profile " +
            "ON profile.user_id = message.sender " +
            "WHERE message.room_id =" + room_id +
            " ORDER BY message.created_at ASC";

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'];
        });
    },
    getRooms: function (user_id) {
        let queryString =
            "SELECT DISTINCT room.room_id, room.name, message.message_id, profile.avatar as sender_avatar, profile.name as author_name, message.body as last_message, message.created_at " +
            "FROM room " +
            "INNER JOIN room_users ON room_users.room_id = room.room_id AND room_users.user_id=" + user_id + " " +
            "INNER JOIN message ON message.message_id = (" +
                "SELECT message.message_id FROM message " +
                "WHERE room.room_id = message.room_id " +
                "ORDER BY message.created_at DESC LIMIT 1) " +
            "INNER JOIN profile ON message.sender = profile.user_id " +
            "ORDER BY created_at DESC";

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'];
        });
    },
    getRoomUser: function (user_id) {
        let queryString =
            "SELECT DISTINCT room.room_id, room.name, room.last_message_id " +
            "FROM room " +
            "INNER JOIN room_users " +
            "ON room_users.room_id = room.room_id AND room_users.user_id= " + user_id;

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'];
        });
    },
    addMessage: function (body, sender_id, room_id, time) {
        let queryString = "INSERT INTO message (body, sender, room_id, created_at) VALUES (\'" + body + "\', " + sender_id + ", " + room_id + ", to_timestamp(" + time + "))";

        return client.queryAsync(queryString).then(function (result) {
            return result;
        });
    },
    getRoomUsers: function (room_id) {
        let queryString = "SELECT room_users.user_id FROM room_users WHERE room_users.room_id=" + room_id;

        return client.queryAsync(queryString).then(function (result) {
            return result['rows'];
        });
    }
};

module.exports = Message;