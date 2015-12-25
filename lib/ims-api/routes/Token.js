'use strict';

var tokenService = require('../services/Token');
var Promise = require('bluebird');

var TokenRouter = {
	createToken: function (sock, args, next) {
		var body = args[1];
		tokenService.createToken(body.email, body.password)
			.then(function (result) {
				sock.emit('create token feedback', {status: true, message: "Check and confirm your mail!"});
			})
			.catch(function (error) {
				sock.emit('create token feedback', {status: false, message: error.message});
			});
	},
	readToken: function (sock, args, next) {
		var body = args[1];
		tokenService.checkToken(body.email, body.token)
			.then(function (result) {
				sock.emit('check token feedback', {status: true, message: "User successful created."});
			})
			.catch(function (error) {
				sock.emit('check token feedback', {status: false, message: "Bad request. User not registered."});
			});
	}
};

module.exports = TokenRouter;