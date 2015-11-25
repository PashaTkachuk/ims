'use strict';

//var contactService = require('../services/Contact');

var ChatRouter = {
    disconnected: function(socket){
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
    }
};
module.exports = ChatRouter;