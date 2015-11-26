'use strict';

var contactService = require('../services/Contact');

var ContactRouter = {
	addContact: function (req, res) {
		contactService.addContact(req.cookies.user_id, req.body.contact_id, function (error, result) {
			if (error) { 
				res.status(500).send(error);
			} else {
				let response = {
						status: 'success',
						text: 'You already added user to contact list.'
					};
                res.status(200).send(response);
			}
		});
	},
	getContacts: function (req, res) {
		contactService.getAllContacts(req.cookies.user_id, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
	},
	deleteContact: function (req, res) {
		contactService.deleteContact(req.cookies.user_id, req.params.id, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send('User successfully deleted from contact list.');
			}
		});
	},
	getContactDialog: function (req, res) {
		contactService.getDialog(req.cookies.user_id, req.params.id, function (error, result) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).json({dialog_id: result});
			}
		});
	}
};
module.exports = ContactRouter;