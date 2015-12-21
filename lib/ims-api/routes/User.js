'use strict';

var userService = require('../services/User');
var sessionService = require('../services/Session');
var md5 = require('md5');


var UserRouter = {
	createUser: function (sock, args, next) {
		var body = args[1];
		userService.addUser(body.password, body.email, function (error, result) {
			if (error) {
				sock.emit('update user feedback', {status: false});
			} else {
				sock.emit('update user feedback', {status: true});
			}
		});
	},
	updateAvatar: function(user_id, callback) {
		userService.updateUser(user_id, {avatar: "avatar_user_" + user_id}, function (error, result) {
			if (error) {
				return callback(error, null);
			} else {
				return callback(null, true);
			}
		});
	},
	updateUser: function (sock, args, next) {
		var body = args[1];
		if (body.password) {
			userService.setUserPass(body.user_id, body.password, function (error, result) {
				if (error) {
					sock.emit('update user feedback', {status: false});
				} else {
					sock.emit('update user feedback', {status: true});
				}
			});	
		} else {
			userService.updateUser(body.user_id, body.field, function (error, result) {
				if (error) {
					sock.emit('update user feedback', {status: false});
				} else {
					sock.emit('update user feedback', {status: true});
				}
			});
		}
	},
	deleteUser: function (sock, args, next) {
		userService.deleteUser(body.user_id, function (error, result) {
			if (error) {
				sock.emit('delete user feedback', {status: false});
			} else {
				sock.emit('delete user feedback', {status: true});
			}
		});
	}
};
module.exports = UserRouter;