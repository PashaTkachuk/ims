'use strict';

var postgresConfig = require('../../../../config/index').postgreSQL;
var pg      = require('pg');
var conString = "postgres://" + postgresConfig.username + ":" + postgresConfig.password + "@" + postgresConfig.host + "/" + postgresConfig.database;

var client = new pg.Client(conString);
client.connect();

var Message = {
  getFromRoom: function (room_id, callback) {
    let queryString =
        "SELECT message.message_id,message.body,message.sender,message.room_id, message.created_at, profile.name as author_name, profile.avatar as author_avatar " +
        "FROM message " +
        "INNER JOIN profile " +
        "ON profile.user_id = message.sender " +
        "WHERE message.room_id =" + room_id +
        " ORDER BY message.created_at ASC";
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result);
    });
  },
  getRooms: function (user_id, callback) {
    let queryString =
        "SELECT DISTINCT room.room_id, room.name, room.last_message_id, room.last_updated_at " +
        "FROM room " +
        "INNER JOIN room_users " +
        "ON room_users.room_id = room.room_id AND room_users.user_id= " + user_id +
        " GROUP BY room.room_id" +
        " ORDER BY room.last_updated_at DESC";
    client.query(queryString, function(error, rooms) {
      if(error) {
        return callback(error, null);
      }
      rooms = rooms['rows'];
      var i = 0;
      rooms.forEach(function (room, index) {
          let message_id = room.last_message_id;
          let queryString =
              "SELECT "+ index +"as index, message.message_id,message.body,message.sender,message.room_id,message.created_at,profile.name as author_name,profile.avatar as author_avatar FROM message " +
              "INNER JOIN profile ON profile.user_id = message.sender " +
              "WHERE message.message_id =" + message_id;
          client.query(queryString, function(error, result) {
            if(error) {
              return callback(error, null);
            }
            let message = result['rows'][0];
            rooms[message['index']].message = message;
            if (rooms.length == ++i) {
              return callback(null, rooms);
            }
          });
      });
    });
  },
  getRoomUser: function (user_id, callback) {
    let queryString =
        "SELECT DISTINCT room.room_id, room.name, room.last_message_id " +
        "FROM room " +
        "INNER JOIN room_users " +
        "ON room_users.room_id = room.room_id AND room_users.user_id= " + user_id;
    client.query(queryString, function(error, result) {
      if(error) {
        return callback(error, null);
      }
      return callback(null, result['rows']);
    });
  },
  addMessage: function (body, sender_id, dialog_id, time, callback) {
    let queryString = "INSERT INTO message (body, sender, dialog, created_at) VALUES (\'" + body + "\', " + sender_id + ", " + dialog_id + ", to_timestamp(" + time + "))";
    client.query(queryString, function(message_error, message_result) {
      if(message_error) {
        return callback(message_error, null);
      }
      return callback(null, message_result);
    });
  }
};

module.exports = Message;