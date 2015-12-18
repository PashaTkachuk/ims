'use strict';

var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var router = require('socket.io-events')();

var config = require('./../config');

var user_router = require('./ims-api/routes/User');
var session_router = require('./ims-api/routes/Session');
var contact_router = require('./ims-api/routes/Contact');
var message_router = require('./ims-api/routes/Message');

app.use(function (req, res, next) {
	res.set({
		'Access-Control-Allow-Origin': 'http://' + config.web_server.host + ':' + config.web_server.port,
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Access-Control-Allow-Origin',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
	});
	next();
});

//router.get('/contact', contact_router.getContacts);
//router.get('/contact/:id', contact_router.getContactDialog);
//router.post('/contact', contact_router.addContact);
//router.delete('/contact/:id', contact_router.deleteContact);

app.use(function(req, res) {
	res.status(404).send("Page Not Found");
});

router.on('create session', session_router.createSession);
router.on('check session', session_router.checkSession);
router.on('delete session', session_router.deleteSession);

router.on('create user', user_router.createUser);
router.on('update user', user_router.updateUser);

router.on('get message history', message_router.getMessagesHistory);
router.on('get message', message_router.getMessagesFromDialog);

io.use(router);

io.on('connection', function(socket) {
	io.emit('connected');

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