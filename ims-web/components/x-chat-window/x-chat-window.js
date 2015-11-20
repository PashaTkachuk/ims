var _self;
Polymer({
    is: "x-chat-window",
    ready: function() {
        _self = this;
        this.socket = io.connect('http://localhost:3000');
        this.socket.on('connected', this.userConnected);
        this.socket.on('disconnected', this.userDisconnected);
        this.socket.on('message', this.receiveMessage);
        this.username = "pasha";
        this.messages = [
            {
                body: "Message 1",
                username: "user"
            },
            {
                body: "Message 2",
                username: "pasha"
            }
        ];
    },
    userConnected: function(){

    },
    userDisconnected: function(){

    },
    receiveMessage: function(message){
        _self.push('messages', { body: message.body, username: message.username });
    },
    sendMessage: function(){
        this.socket.emit('message', {body: this.message, username: this.username});
        this.push('messages', { body: this.message, username: this.username });
        this.message ='';
    },
    isAuthor:function(username) {
        return username == this.username;
    }
});