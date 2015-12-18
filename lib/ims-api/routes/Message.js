'use strict';

var messageService = require('../services/Message');

var ContactRouter = {
	getMessagesHistory: function (sock, args, next) {
		var body = args[1];
		messageService.getMessagesHistory(body.user_id, function (error, messages) {
			if (error) {
				sock.emit('last messages feedback', {status: 'error'});
			} else {
				sock.emit('last messages feedback', {status: 'success', messages: messages});
			}
		});
	},
	getMessagesFromDialog: function (sock, args, next) {
		var body = args[1];
		messageService.getFromDialog(body.dialog_id, function (error, messages) {
			if (error) {
				sock.emit('get messages feedback', {status: 'error'});
			} else {
				sock.emit('get messages feedback', {status: 'success', messages: messages});
			}
		});
	}
};
module.exports = ContactRouter;