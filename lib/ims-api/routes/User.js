'use strict';

var userService = require('../services/User');
var sessionService = require('../services/Session');
var md5 = require('md5');

var UserRouter = {
	createUser: function (req, res) {
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
	readUser: function (req, res) {
		userService.getUser(req.cookies.user_id, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	},
	updateAvatar: function (req, res) {
		userService.updateUser(req.cookies.user_id, {avatar: "avatar_user_" + req.cookies.user_id}, function (error, result) {
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
	updateUser: function (req, res) {
		if (req.body.newPassword) {
			let hash = md5(req.body.newPassword);
			userService.setUserPass(req.cookies.user_id, hash, function (error, result) {
				if (error) {
					let response = {
						status: 'error',
						error: error
					};
					res.status(200).send(response);
				} else {
					let response = {
						status: 'success',
						text: 'You have successfully changed your password'
					};
					res.status(201).send(response);
				}
			});	
		} else {
			userService.updateUser(req.cookies.user_id, req.body, function (error, result) {
				if (error) {
					let response = {
						status: 'error',
						error: error
					};
					res.status(200).send(response);
				} else {
					let response = {
						status: 'success',
						text: 'You have successfully changed your email'
					};
					res.status(201).send(response);
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