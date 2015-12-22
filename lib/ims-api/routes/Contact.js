'use strict';

var contactService = require('../services/Contact');
var Promise = require('bluebird');

var ContactRouter = {
	addContact: function (sock, args, next) {
		var body = args[1];
		contactService.addContact(body.user_id, body.email)
			.then(function (result) {
				sock.emit('add to roster feedback', {status: true});
			})
			.catch(function (error) {
				sock.emit('add to roster feedback', {status: false});
			});
	},
	getContacts: function (sock, args, next) {
		var body = args[1];
		contactService.getAllContacts(body.user_id)
			.then(function (result) {
				sock.emit('get roster feedback', {status: true, roster: result});
			})
			.catch(function (error) {
				sock.emit('get roster feedback', {status: false});
			});
	},
	deleteContact: function (sock, args, next) {
		var body = args[1];
		contactService.deleteContact(body.user_id, body.contact_id)
			.then(function (result) {
				sock.emit('delete from roster feedback', {status: true});
			})
			.catch(function (error) {
				sock.emit('delete from roster feedback', {status: false});
			});
	},
	getRoom: function (sock, args, next) {
		var body = args[1];
		contactService.getRoom(body.user_id, body.contact_id)
			.then(function (result) {
				sock.emit('get room feedback', {status: true, room_id: result});
			})
			.catch(function (error) {
				sock.emit('get room feedback', {status: false});
			});
	}
};
module.exports = ContactRouter;