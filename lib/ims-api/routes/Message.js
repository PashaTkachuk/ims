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
	},
	addMessage: function (req, res) {
		messageService.addMessage(req.body.message_body, req.cookies.user_id, req.body.recipient_ids, function (error, result) {
			if (error) { 
				res.status(500).send(error);
			} else {
				let response = {
						status: 'success'
					};
                res.status(200).send(response);
			}
		});
	},
	updateMessage: function (req, res) {
		messageService.updateMessage(req.params.id, req.body.message_body, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	},
	deleteMessage: function (req, res) {
		messageService.deleteMessage(req.params.id, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send('User successfully deleted from contact list.');
			}
		});
	}
};
module.exports = ContactRouter;