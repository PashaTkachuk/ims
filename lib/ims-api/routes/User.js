'use strict';

var userService = require('../services/User');
var sessionService = require('../services/Session');
var statusService = require('../services/Status');
var Promise = require('bluebird');


var UserRouter = {
	createUser: function (sock, args, next) {
		var body = args[1];
		userService.addUser(body.email, body.password)
			.then(function (result) {
				sock.emit('create user feedback', {status: true});
			})
			.catch(function (error) {
				sock.emit('create user feedback', {status: false});
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
			userService.setUserPass(body.user_id, body.password)
				.then(function (result) {
					sock.emit('update user feedback', {status: true});
				})
				.catch(function (error) {
					sock.emit('update user feedback', {status: false});
				});
		} else {
			userService.updateUser(body.user_id, body.field)
				.then(function (result) {
					sock.emit('update user feedback', {status: true});
				})
				.catch(function (error) {
					sock.emit('update user feedback', {status: false});
				});
		}
	},
	deleteUser: function (sock, args, next) {
		var body = args[1];
		userService.deleteUser(body.user_id)
			.then(function (result) {
				sock.emit('delete user feedback', {status: true});
			})
			.catch(function (error) {
				sock.emit('delete user feedback', {status: false});
			});
	},
	setUserStatus: function (sock, args, next) {
		var body = args[1];
		statusService.setStatus(body.user_id, body.status)
			.then(function (result) {
				for(let i of result) {
					if (i.status == 'online' || i.status == 'invisible') {
						sock.sock.join(i.socket_id);
						sock.sock.broadcast.to(i.socket_id).emit('status changed', {user_id: body.user_id, status: body.status});
					}
				}
			})
			.catch(function (error) {
				sock.emit('set status feedback', {status: false});
			});
	},
	getUserStatus: function (sock, args, next) {
		var body = args[1];
		statusService.getStatus(body.user_id)
			.then(function (result) {
				sock.emit('get user status feedback', {status: true, user_status: result});
			})
			.catch(function (error) {
				sock.emit('get user status feedback', {status: false});
			});
	}

};
module.exports = UserRouter;