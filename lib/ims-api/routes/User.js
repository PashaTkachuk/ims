'use strict';

var userService = require('../services/User');
var sessionService = require('../services/Session');
var md5 = require('md5');

var UserRouter = {
	createUser: function (sock, args, next) {
		var body = args[1];
		userService.addUser(req.body.password, req.body.email, function (error, result) {
			if (error) { 
				res.status(500).send(error);
			} else {
				let response = {
						status: 'success',
						text: 'You alredy registered'
					};
                res.status(200).send(response);
			}
		});
	},
	updateAvatar: function (sock, args, next) {
		var body = args[1];
		userService.updateUser(r.user_id, {avatar: "avatar_user_" + req.cookies.user_id}, function (error, result) {
			if (error) {
				let response = {
					status: 'error',
					error: error
				};
				res.status(200).send(response);
			} else {
				let response = {
					status: 'success',
					text: 'You have successfully changed your data'
				};
				res.status(201).send(response);
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
	deleteUser: function (req, res) {
		userService.deleteUser(req.cookies.user_id, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				sessionService.deleteSession(req.cookies.user_id, req.signedCookies.sid, function (error, result) {
					if (error) {
						res.status(500).send(error);
					}
				});
				res.status(200).send('User successfully deleted');
			}
		});
	}
};
module.exports = UserRouter;