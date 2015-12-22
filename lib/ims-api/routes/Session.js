'use strict';

var sessionService = require('../services/Session');
var Promise = require('bluebird');
var md5 = require('md5');

var SessionRouter = {
	createSession: function (sock, args, next) {
		var body = args[1];
		sessionService.addSession(body.email, body.password)
			.then(function (result) {
				sock.emit('login feedback', {status: 'success', sid: result.sid, user: result.user});
			})
			.catch(function (error) {
				sock.emit('login feedback', {status: 'forbidden'});
			});
	},
	deleteSession: function (sock, args, next) {
		var body = args[1];
		sessionService.deleteSession(body.user_id, body.sid)
			.then(function (result) {
				sock.emit('delete session feedback', {status: true});
			})
			.catch(function (error) {
				sock.emit('delete session feedback', {status: false});
			});
	},
 	checkSession: function (sock, args, next) {
		var body = args[1];
 		sessionService.checkSession(body.user_id, body.sid)
			.then(function (result) {
				if (!result.status){
					sock.emit('session feedback', {status: false});
				} else {
					sock.emit('session feedback', {status: true, user: result.user});
				}
			})
			.catch(function (error) {
				sock.emit('session feedback', {status: false});
			});
 	}
};

module.exports = SessionRouter;