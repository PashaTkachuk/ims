var _self;
Polymer({
    is: "x-chat-window",
    properties: {
        outbox_message: {
            type: String
        }
    },
    ready: function() {
        _self = this;
        this.dialog_id = 1;
        this.user_avatar ='avatar_user_1.jpg';
    },
    attached: function() {
        this.socket = io.connect('http://localhost:3000');
        this.socket.on('connected', this.userConnected);
        this.socket.on('disconnected', this.userDisconnected);
        this.socket.on('message', this.receiveMessage);
    },
    userConnected: function(){

    },
    userDisconnected: function(){

    },
    receiveMessage: function(message){
        _self.push('messages', message);
    },
    sendMessage: function(event){
        event.preventDefault();
        var message = {
            body: this.outbox_message,
            sender: app.user.user_id,
            dialog: this.dialog_id,
            created_at: Date.now(),
            author_username: app.user_account.username,
            author_firstname: app.user_account.first_name,
            author_avatar: app.user_account.avatar
        };
        this.socket.emit('message', message);
        this.push('messages', message);
        this.outbox_message ='';
    },
    getMessageClass: function(message_author) {
        return (message_author == app.user.user_id) ? 'comment author-comment' : 'comment user-comment';
    },
    formatTime: function(time) {
        var date = new Date(time);
        return date.toLocaleString();
    }
});