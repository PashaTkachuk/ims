'use strict';

var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var config = require('./../config');
var router = express.Router();

var user_router = require('./ims-api/routes/User');
var session_router = require('./ims-api/routes/Session');
var contact_router = require('./ims-api/routes/Contact');
var message_router = require('./ims-api/routes/Message');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(cookieParser(config.session.secret, config.session.cookie));

app.use(function (req, res, next) {
	res.set({
		'Access-Control-Allow-Origin': 'http://' + config.web_server.host + ':' + config.web_server.port,
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Access-Control-Allow-Origin',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
	});
	next();
});

app.use(session({
	secret: config.session.secret,
	name: config.session.name,
	resave: false,
	saveUninitialized: false,
	cookie: {
		path: config.session.cookie.path,
		httpOnly: config.session.cookie.httpOnly,
		expires: new Date(Date.now() + 1000*3600*24*10*365)
	}
}));


app.use(router);

router.get('/user', user_router.readUser);
router.post('/user', user_router.createUser);
router.put('/user', user_router.updateUser);
router.delete('/user', user_router.deleteUser);

router.get('/session', session_router.checkSession);
router.post('/session', session_router.createSession);
router.delete('/session', session_router.deleteSession);

router.get('/contact', contact_router.getContacts);
router.get('/contact/:id', contact_router.getContactDialog);
router.post('/contact', contact_router.addContact);
router.delete('/contact/:id', contact_router.deleteContact);

router.get('/message', message_router.getMessages);
router.get('/message/:dialog_id', message_router.getMessagesFromDialog);

app.use(function(req, res) {
	res.status(404).send("Page Not Found");
});

io.on('connection', function(socket) {
	console.log('a user connected');
	io.emit('online');

	socket.on('open dialog', function(dialog_id){
		socket.join(dialog_id);
		console.log('Join to ' + dialog_id + ' dialog');
	});

	//socket.join('private');
	socket.on('message', function(id, message){
		io.to(id).emit('message', message);
		console.log('Receive message: body=>' + message.body + "   by=> " + message.username);
	});

	socket.on('disconnect', function(){
		io.emit('online');
		console.log('user disconnected');
	});
});

app.start = function() {
	server.listen(config.server.port, config.server.host, function () {
		console.log('Server listening at http://%s:%s', config.server.host, config.server.port);
	});
};

module.exports = app;