'use strict';

var statusModel = require('../models/Status');
var Promise = require('bluebird');

var Status = {
  setStatus: function (user_id, status) {
    return statusModel.set(user_id, status).then(function (result) {
      return result;
    });
  },
  getStatus: function (user_id) {
    return statusModel.get(user_id).then(function (result) {
      return result;
    });
  }
};

module.exports = Status;