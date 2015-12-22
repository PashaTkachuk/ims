Polymer({
    is: "x-dialog-page",
    properties: {
        dialogId: {
            type: Number,
            reflectToAttribute: true,
            notify: true
        },
        user: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        }
    },
    attached: function() {
        app.socket.on('get messages feedback', this.handleGetMessages.bind(this));
        app.socket.emit('get message', {
            dialog_id: this.dialogId
        });
        app.socket.on('add message', this.receiveMessage.bind(this));
    },
    handleGetMessages: function (data) {
        if (data.status == 'success') {
            this.messages = data.messages;
        }
    },
    receiveMessage: function(message){
        this.push('messages', message);
    },
    sendMessage: function(event){
        event.preventDefault();
        var message = {
            body: this.outbox_message,
            sender: this.user.user_id,
            room_id: this.dialogId,
            created_at: Math.floor(Date.now() / 1000),
            author_email: this.user.email,
            author_firstname: this.user.first_name,
            author_avatar: this.user.avatar
        };
        app.socket.emit('add message', {message: message});
        this.outbox_message ='';
    },
    getMessageClass: function(message_author) {
        return (message_author == this.user.user_id) ? 'comment author-comment' : 'comment user-comment';
    },
    formatTime: function(time) {
        if (typeof time == 'number') {
            time = time * 1000;
        }
        var date = new Date(time);
        return date.toLocaleString();
    }
});