'use strict';

var messageService = require('../services/Message');
var Promise = require('bluebird');

var MessageRouter = {
	getMessagesHistory: function (sock, args, next) {
		var body = args[1];
		messageService.getMessagesHistory(body.user_id)
			.then(function (messages) {
				sock.emit('last messages feedback', {status: 'success', messages: messages});
			})
			.catch(function (error) {
				sock.emit('last messages feedback', {status: 'error'});
			});
	},
	getMessagesFromDialog: function (sock, args, next) {
		var body = args[1];
		messageService.getFromDialog(body.dialog_id)
			.then(function (messages) {
				sock.emit('get messages feedback', {status: 'success', messages: messages});
			})
			.catch(function (error) {
				sock.emit('get messages feedback', {status: 'error'});
			});
	},
	addMessage: function (sock, args, next) {
		var body = args[1];
		messageService.addMessage(body.message)
			.then(function (result) {
				for(let i of result) {
					if (i.status == 'online' || i.status == 'invisible') {
						if (i.socket_id == sock.id) {
							sock.emit('add message', body.message);
						} else {
							sock.sock.join(i.socket_id);
							sock.sock.broadcast.to(i.socket_id).emit('add message', body.message);
						}
					}
				}
			})
			.catch(function (error) {
				sock.emit('add message feedback', {status: 'error'});
			});
	}
};
module.exports = MessageRouter;