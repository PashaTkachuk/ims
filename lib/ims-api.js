'use strict';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var config = require('./../config/index');

io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('connected');

	socket.emit('message', { body: 'Hello!', username: "server" });
	socket.on('message', function(message){
		console.log('Receive message: body=>' + message.body + "   by=> " + message.username);
	});
	socket.on('disconnect', function(){
		io.emit('disconnected');
		console.log('user disconnected');
	});
});

app.start = function() {
	var _server = server.listen(config.server.port, config.server.host, function () {
		let host = _server.address().address;
		let port = _server.address().port;

		console.log('Server listening at http://%s:%s', host, port);
	});
};

module.exports = app;