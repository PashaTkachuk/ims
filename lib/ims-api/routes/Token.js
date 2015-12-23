'use strict';

var tokenService = require('../services/Token');
var Promise = require('bluebird');

var TokenRouter = {
	createToken: function (sock, args, next) {
		var body = args[1];
		tokenService.createToken(body.email)
			.then(function (result) {
				sock.emit('create token feedback', {status: true});
			})
			.catch(function (error) {
				sock.emit('create token feedback', {status: false});
			});
	},
	readToken: function (sock, args, next) {
		var body = args[1];
		tokenService.checkToken(body.email, body.token)
			.then(function (result) {
				sock.emit('check token feedback', {status: result});
			})
			.catch(function (error) {
				sock.emit('check token feedback', {status: false});
			});
	}
};

module.exports = TokenRouter;