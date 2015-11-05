'use strict';

//var config = require('../../../config');
//var tokenModel = require('../models/Token');
//
//var md5 = require('MD5');
//var Promise = require('bluebird');
//
//var nodemailer = require('nodemailer');
//var transporter = nodemailer.createTransport(config.mail);

var Token = {
  createToken: function (username, email, typeOfToken) {
    var token = {
      value: md5(Math.random()),
      username: username
    }
    if (typeOfToken === 'passwordReset') {
      var href = 'http://localhost/#/profile/' + token.value;
      var mailOptions = {
        from: 'Target-maker & Voice-memos <no-reply@tm-vm.com>',
        to: email,
        subject: 'Password Reset',
        text: 'Reset link :  ' + href,
        html: '<b>Click the link below to reset your password</b><br><a href="' + href + '">' + href + '</a>'
      };
    } else if (typeOfToken === 'registerUser') {
      var href = 'http://localhost/#/login/' + token.value;
      var mailOptions = {
        from: 'Target-maker & Voice-memos <no-reply@tm-vm.com>',
        to: email,
        subject: 'Confirmation of registration ',
        text: 'Confirm link :  ' + href,
        html: '<b>Click the link below to confirm your registration</b><br><a href="' + href + '">' + href + '</a>'
      };
    }
    

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }          
    });
    
    return tokenModel.add(token).then(function (result) {
      return result;
    });
        
  },
  checkToken: function (username, token) {
    return tokenModel.get(username).then(function (result) {
      if (result) {
        var found = false;
        for (var i in result) {
          if (result[i].value == token) {
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
}

module.exports = Token;