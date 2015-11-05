'use strict';

var tokenService = require('../services/Token');
//var Promise = require('bluebird');

var TokenRouter = {
	createToken: function (req, res) {
		var username = req.cookies.username || req.body.username;
		req.session.username = username;
		tokenService.createToken(req.session.username, req.body.email, req.body.typeOfToken).then(function (result) {
			if (result) {
				res.status(201).send('token was created');
			} else {
				res.status(201).send('token was not created');
			}
		});
	},
	readToken: function (req, res) {		
		tokenService.checkToken(req.session.username, req.params.value).then(function (result) {
			if (typeof result === 'undefined') {
				res.status(500).send('error');
			} else {
				res.status(200).send(result);
			}
		});
	}
}

module.exports = TokenRouter;