'use strict';

//var mysql = require('../../data/db_mysql/token');
//var Promise = require("bluebird");

var Token = {
  add: function (token) {
  	return mysql.addToken(token.value, token.username).then(function (result) {
      return result;
    });
  },
  get: function(username) {
    return mysql.getToken(username).then(function (token) {
      return token;
    });
  },
  delete: function(id) {
    return mysql.deleteToken(id).then(function (result) {
      return result;
    });
  },
  deleteAll: function(username) {
    return mysql.deleteAllTokens(username).then(function (result) {
      return result;
    });
  }
};

module.exports = Token;