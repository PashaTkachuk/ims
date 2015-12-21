'use strict';

var contactService = require('../services/Contact');

var ContactRouter = {
	addContact: function (sock, args, next) {
		var body = args[1];
		contactService.addContact(body.user_id, body.email, function (error, result) {
			if (error) {
				sock.emit('add to roster feedback', {status: false});
			} else {
				sock.emit('add to roster feedback', {status: true});
			}
		});
	},
	getContacts: function (sock, args, next) {
		var body = args[1];
		contactService.getAllContacts(body.user_id, function (error, result) {
			if (error) {
				sock.emit('get roster feedback', {status: false});
			} else {
				sock.emit('get roster feedback', {status: true, roster: result});
			}
		});
	},
	deleteContact: function (sock, args, next) {
		var body = args[1];
		contactService.deleteContact(body.user_id, body.contact_id, function (error, result) {
			if (error) {
				sock.emit('delete from roster feedback', {status: false});
			} else {
				sock.emit('delete from roster feedback', {status: true});
			}
		});
	},
	getRoom: function (sock, args, next) {
		var body = args[1];
		contactService.getRoom(body.user_id, body.contact_id, function (error, result) {
			if (error) {
				sock.emit('get room feedback', {status: false});
			} else {
				sock.emit('get room feedback', {status: true, room_id: result});
			}
		});
	}
};
module.exports = ContactRouter;