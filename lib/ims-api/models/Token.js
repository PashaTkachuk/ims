'use strict';

var db = require('../data/db_postgreSQL/token');
var Promise = require("bluebird");

var Token = {
  add: function (token) {
  	return db.addToken(token.value, token.email).then(function (result) {
      return result;
    });
  },
  get: function(email) {
    return db.getToken(email).then(function (token) {
      return token;
    });
  }
};

module.exports = Token;