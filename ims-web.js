'use strict';

var express = require('express');
var app = express();
var config = require('./config/index');

app.use(express.static(__dirname + '/ims-web'));

app.start = function() {
	var server = app.listen(config.web_server.port, config.web_server.host, function () {
		let host = server.address().address;
		let port = server.address().port;

		console.log('Web-server listening at http://%s:%s', host, port);
	});
};
module.exports = app;