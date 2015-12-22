'use strict';

var socketModel = require('../models/Socket');
var Promise = require('bluebird');

var Socket = {
  setSocketID: function (user_id, socket_id) {
    return socketModel.setID(user_id, socket_id).then(function (result) {
      return result;
    });
  },
  getStatus: function (user_id) {
    return socketModel.getID(user_id).then(function (result) {
      return result;
    });
  }
};

module.exports = Socket;