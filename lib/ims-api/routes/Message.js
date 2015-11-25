'use strict';

var messageService = require('../services/Message');

var ContactRouter = {
	getMessagesFromUser: function (req, res) {
		messageService.getFromUser(req.cookies.user_id, req.params.user_id, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	}
};
module.exports = ContactRouter;