'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var config = require('./config');

var user_router = require('./ims-api/routes/User');
var session_router = require('./ims-api/routes/Session');
var token_router = require('./ims-api/routes/Token');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.session.secret, config.session.cookie));

app.use(session({
    secret: config.session.secret,
    name: config.session.name,
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: config.session.cookie.path,
        httpOnly: config.session.cookie.httpOnly,
        expires: new Date(Date.now() + 3600*24*31*1000)
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

router.get('/token/:value', token_router.readToken);
router.post('/token', token_router.createToken);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send({
		message: err.message,
		error: {}
	});
});

app.start = function() {
	var server = app.listen(config.server.port, config.server.host, function () {
		let host = server.address().address;
		let port = server.address().port;

		console.log('Server listening at http://%s:%s', host, port);
	});
};

module.exports = app;