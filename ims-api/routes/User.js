var userService = require('../services/User');
var sessionService = require('../services/Session');
var md5 = require('md5');

var UserRouter = {
	createUser: function (req, res) {
		userService.addUser(req.body.username, req.body.password, req.body.email, function (error, result) {
			if (error) { 
				res.status(500).send(error);
				return;
			} else {
				var response = {
						status: 'success',
						text: 'You alredy registered'
					}
				res.status(200).send(response);
				return;
			}
		});
	},
	readUser: function (req, res) {
		//res.status(200).send("Hello User2!");
		userService.getUser(req.cookies.username, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	},
	updateUser: function (req, res) {
		if (req.body.newPassword) {
			var hash = md5(req.body.newPassword);
			userService.setUserPass(req.cookies.username, hash, function (error, result) {
				if (error) { 
					res.status(500).send(error);
					return;
				} else {
					res.status(201).send('You have successfully changed your password');
					return;
				}
			});	
		} else if (req.body.newEmail) {
			userService.setUserEmail(req.cookies.username, req.body.newEmail, function (error, result) {
				if (error) { 
					res.status(500).send(error);
					return;
				} else {
					res.status(201).send('You have successfully changed your email');
					return;
				}
			});
		} else {
			res.status(200).send('User data is not changed');
		}
	},
	deleteUser: function (req, res) {
		userService.deleteUser(req.cookies.username, function (error, result) {
			if (error) {
				res.status(500).send(error);
				return;
			} else {
				sessionService.deleteSession(req.cookies.username, req.signedCookies.sid, function (error, result) {
					if (error) {
						res.status(500).send(error);
						return;
					}
				});
				res.status(200).send('User successfully deleted');
				return;
			}
		});
	}
}

module.exports = UserRouter;