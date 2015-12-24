'use strict';

var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var ss = require('socket.io-stream');
var router = require('socket.io-events')();
var fs = require('fs');

var config = require('./../config');

var user_router = require('./ims-api/routes/User');
var session_router = require('./ims-api/routes/Session');
var contact_router = require('./ims-api/routes/Contact');
var message_router = require('./ims-api/routes/Message');
var token_router = require('./ims-api/routes/Token');

router.on('create session', session_router.createSession);
router.on('check session', session_router.checkSession);
router.on('delete session', session_router.deleteSession);

router.on('get roster', contact_router.getContacts);
router.on('get room', contact_router.getRoom);
router.on('create room', contact_router.createRoom);
router.on('add to roster', contact_router.addContact);
router.on('delete from roster', contact_router.deleteContact);

router.on('create user', user_router.createUser);
router.on('update user', user_router.updateUser);
router.on('delete user', user_router.deleteUser);

router.on('set status', user_router.setUserStatus);
router.on('get user status', user_router.getUserStatus);

router.on('create token', token_router.createToken);
router.on('check token', token_router.readToken);

router.on('get message history', message_router.getMessagesHistory);
router.on('get message', message_router.getMessagesFromDialog);
router.on('add message', message_router.addMessage);

io.use(router);

io.on('connection', function(socket) {
	io.emit('connected');

	ss(socket).on('profile-image', function(stream, data) {
		let filename = "media/images/profile/avatar_user_" + data.user_id;
		var picStream = fs.createWriteStream(filename);
		stream.pipe(picStream);
		picStream.on('close', function() {
			user_router.updateAvatar(data.user_id, function (error, result) {
				if (error) {
					ss(socket).emit('profile-image changed', {status: false});
				} else {
					ss(socket).emit('profile-image changed', {status: true});
				}
			});
		});
	});

	socket.on('disconnect', function(){
		console.log("disconnected");
	});
});

app.start = function() {
	server.listen(config.server.port, config.server.host, function () {
		console.log('Server listening at http://%s:%s', config.server.host, config.server.port);
	});
};

module.exports = app;