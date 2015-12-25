'use strict';

var db = require('../data/db_postgreSQL/token');
var Promise = require("bluebird");

var Token = {
  add: function (token) {
  	return db.addToken(token.value, token.email, token.password).then(function (result) {
      return result;
    });
  },
  get: function(email, token) {
    return db.getToken(email, token).then(function (result) {
      return result;
    });
  }
};

module.exports = Token;