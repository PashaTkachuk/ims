'use strict';

var sessionService = require('../services/Session');

var SessionRouter = {
	createSession: function (req, res) {
		var email = req.body.email;
		sessionService.addSession(email, req.body.password, req.sessionID, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {					
				if (result) {
					res.cookie('sid', req.sessionID, {path: req.session.cookie.path, httpOnly: false, expires: req.session.cookie.expires, signed: true});
					res.cookie('email', email, {path: req.session.cookie.path, httpOnly: false, expires: req.session.cookie.expires});
					res.cookie('user_id', result.user_id, {path: req.session.cookie.path, httpOnly: false, expires: req.session.cookie.expires});
					let response = {
						status: 'success',
						text: 'You have successfully logged'
					};
					res.status(200).send(response);
				} else {
					let response = {
						status: 'error',
						text: 'Error entered data'
					};
					res.status(200).send(response);
				}
			}
		});
	},
	deleteSession: function (req, res) {
		sessionService.deleteSession(req.cookies.user_id, req.signedCookies.sid, function (error, result) {
			if (error) {
				let response = {
					status: 'error',
					error: error
				};
				res.status(500).send(response);
			} else {
					res.clearCookie('user_id');
					res.clearCookie('sid');
					req.session.destroy();
					let response = {
						status: 'success',
						text: 'You successfully log out'
					};
					res.status(200).send(response);
			}
		});
	},
 	checkSession: function (req, res) {
 		sessionService.checkSession(req.cookies.user_id, req.signedCookies.sid, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				if (!result) {
					res.clearCookie('email');
					res.clearCookie('sid');
				}
				res.status(200).json({is_login: result});
			}
		});
 	}
};

module.exports = SessionRouter;