'use strict';

var messageService = require('../services/Message');

var ContactRouter = {
	getMessages: function (req, res) {
		messageService.getLastMessages(req.cookies.user_id, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	},
	getMessagesFromDialog: function (req, res) {
		messageService.getFromDialog(req.params.dialog_id, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	}
};
module.exports = ContactRouter;