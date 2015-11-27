var self;
Polymer({
    is: "x-dialog-page",
    properties: {
        dialogId: {
            type: Number,
            reflectToAttribute: true,
            notify: true
        }
    },
    attached: function() {
        self = this;
        this.user =JSON.parse(localStorage.getItem("user"));
        this.serviceMessagesUrl = app.serviceUrl + '/message/' + this.dialogId;
        this.$.getMessagesRequest.generateRequest();
        app.socket.emit('switch room', {
            newRoom: this.dialogId
        });
        app.socket.on('message', this.receiveMessage);
    },
    receiveMessage: function(message){
        self.push('messages', message);
    },
    sendMessage: function(event){
        event.preventDefault();
        var message = {
            body: this.outbox_message,
            sender: this.user.user_id,
            dialog: this.dialogId,
            created_at: Date.now(),
            author_username: this.user.username,
            author_firstname: this.user.first_name,
            author_avatar: this.user.avatar
        };
        app.socket.emit('message', message);
        this.outbox_message ='';
    },
    getMessageClass: function(message_author) {
        return (message_author == this.user.user_id) ? 'comment author-comment' : 'comment user-comment';
    },
    formatTime: function(time) {
        var date = new Date(time);
        return date.toLocaleString();
    }
});