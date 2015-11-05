'use strict';

var userModel = require('../models/User');
var tokenModel = require('../models/Token');

//var fs = require('fs');
var node_dir = process.cwd();

var md5 = require('md5');

var User = {
  addUser: function (username, password, email, callback) {
    var hash = md5(password);
    userModel.add(username, hash, email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        mysql.getQuantity('memo', function (error, res) {
          if (error) {
            callback(error, null);
          } else {
            var defaultProduct = {
              name: 'memo',
              number: res[0].quantity
            }
            productModel.add(defaultProduct.name, defaultProduct.number, username, function (error, prodResult) {
              if (error) {
                callback(error, null);
              } else {
                callback(null, result);              
              }
              return;
            });
          }
        });
      }
      return;
    });
  },
  getUser: function (username, callback) {
    userModel.get(username, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result[0]);
      }
      return;
    });
  },
  deleteUser: function (username, callback) {
    productModel.delete(username, function (error, result) {
      if (error) {
        console.log('1');
        callback(error, null);
      } else {
        memoModel.getAll(username, function (error, memos) {
          if (error) {
            console.log('2');
            callback(error, null);
          } else {
            memos.forEach(function (memo) {
              fs.unlink(node_dir + '/memos/' + memo.id, function (error) {
                if (error) {
                  console.log('3');
                  callback(error, null);
                }
              });   
            });

            memoModel.deleteAll(username, function (error, result) {
              if (error) {
                console.log('4');
                callback(error, null);
              } else {
                tokenModel.deleteAll(username).then(function () {
                    targetModel.deleteAll(username, function (error, result) {
                      if (error) {
                        callback(error, null);
                      } else {
                        userModel.delete(username, function (error, result) {
                          if (error) {
                            callback(error, null);
                          } else {
                            callback(null, result);
                          }
                          return;
                        });
                      }
                      return;
                    });
                  return;
                });
              }
              return;
            });
          }
          return;
        });
      }
      return;
    }); 
  },
  setUserPass: function (username, password, callback) {
    userModel.setPass(username, password, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  },
  setUserEmail: function (username, email, callback) {
    userModel.setEmail(username, email, function (error, result) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
      return;
    });
  }
}

module.exports = User;