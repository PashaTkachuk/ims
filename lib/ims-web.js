'use strict';

var express = require('express');
var app = express();
var config = require('./../config/index');

app.use(express.static(__dirname + '/ims-web'));

app.use('/socket.io', express.static(process.cwd() + '/node_modules/socket.io-client/'));
app.use('/profile', express.static(process.cwd() + '/media/images/profile'));
app.start = function() {
	app.listen(config.web_server.port, config.web_server.host, function () {
		console.log('Web-server listening at http://%s:%s', config.web_server.host, config.web_server.port	);
	});
};
module.exports = app;