'use strict';

var config = require('../../../config');
var tokenModel = require('../models/Token');
var userModel = require('../models/User');

var md5 = require('md5');
var Promise = require('bluebird');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport(config.mail));

var Token = {
    createToken: function (email, password) {
        var token = {
            value: md5(Math.random()),
            email: email,
            password: password
        };
        var href = 'http://' + config.web_server.host + ':' + config.web_server.port + '/#/login/' + email + '/' + token.value;
        var mailOptions = {
            from: 'IMS <no-reply@ims.com>',
            to: email,
            subject: 'Confirmation of registration ',
            text: 'Confirm link :  ' + href,
            html: '<b>Click the link to confirm your registration</b><br><a href="' + href + '">Confirm Email</a>'
        };

        return tokenModel.get(email)
            .then(function (result) {
                if (!result.length) {
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                    });
                } else {
                    throw new Error('This email already exist.')
                }
                return result;
            })
            .then(function (result) {
                return tokenModel.add(token).then(function (result) {
                    return result;
                });
            });
    },
    checkToken: function (email, token) {
        return tokenModel.get(email, token)
            .then(function (result) {
                if (result.length) {
                    return result[0].user_id;
                } else {
                    throw new Error('Token not found.');
                }
            })
            .then(function (user_id) {
                return userModel.create(user_id).then(function(result) {
                    return result;
                });
            });
    }
};

module.exports = Token;