'use strict';

var config = require('../../../config');
var tokenModel = require('../models/Token');

var md5 = require('md5');
var Promise = require('bluebird');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport(config.mail));

var Token = {
  createToken: function (email) {
    var token = {
      value: md5(Math.random()),
      email: email
    };
    var href = 'http://'+ config.web_server.host +':' + config.web_server.port + '/#/login/' + token.value;
    var mailOptions = {
      from: 'IMS <no-reply@ims.com>',
      to: email,
      subject: 'Confirmation of registration ',
      text: 'Confirm link :  ' + href,
      html: '<b>Click the link below to confirm your registration</b><br><a href="' + href + '">' + href + '</a>'
    };
    

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
    
    return tokenModel.add(token).then(function (result) {
      return result;
    });
        
  },
  checkToken: function (email, token) {
    return tokenModel.get(email).then(function (result) {
      if (result) {
        var found = false;
        for (let _token of result) {
          if (_token.token == token) {
            found = true;
            break;
          }
        }
        return found;
      } else {
        return result;
      }
      
    });
  }
};

module.exports = Token;