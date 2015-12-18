'use strict';

var sessionService = require('../services/Session');
var md5 = require('md5');

var SessionRouter = {
	createSession: function (sock, args, next) {
		var body = args[1];
		sessionService.addSession(body.email, body.password, function (error, result) {
			if (error) {
				sock.emit('login feedback', {status: 'error'});
			} else if (!result.status){
				sock.emit('login feedback', {status: 'forbidden'});
			} else {
				sock.emit('login feedback', {status: 'success', sid: result.sid, user: result.user});
			}
		});
	},
	deleteSession: function (sock, args, next) {
		var body = args[1];
		sessionService.deleteSession(body.user_id, body.sid, function (error, result) {
			if (error) {
				sock.emit('delete session feedback', {status: false});
			} else {
				sock.emit('delete session feedback', {status: true});
			}
		});
	},
 	checkSession: function (sock, args, next) {
		var body = args[1];
 		sessionService.checkSession(body.user_id, body.sid, function (error, result) {
			if (error) {
				sock.emit('session feedback', {status: false});
			} else if (!result.status){
				sock.emit('session feedback', {status: false});
			} else {
				sock.emit('session feedback', {status: true, user: result.user});
			}
		});
 	}
};

module.exports = SessionRouter;