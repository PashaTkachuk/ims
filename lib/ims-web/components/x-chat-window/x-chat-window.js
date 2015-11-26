var self;
Polymer({
    is: "x-chat-window",
    properties: {
        user: {
            type: Object
        },
        dialog: {
            type: Number,
            reflectToAttribute: true,
            notify: true,
            observer: '_dialogChanged'
        }
    },
    ready: function() {
        self=this;
        this.serviceMessagesUrl = app.serviceUrl + '/message/';
    },
    _dialogChanged: function(newValue, oldValue) {
        if (newValue) {
            this.serviceMessagesUrl = this.serviceMessagesUrl + newValue;
            this.$.getMessagesRequest.generateRequest();
            app.socket.emit('open dialog', newValue);
        }
    },
    receiveMessage: function(message){
        self.push('messages', message);
    },
    sendMessage: function(event){
        event.preventDefault();
        var message = {
            body: this.outbox_message,
            sender: this.user.user_id,
            dialog: this.dialog,
            created_at: Date.now(),
            author_username: this.user.username,
            author_firstname: this.user.first_name,
            author_avatar: this.user.avatar
        };
        app.socket.emit('message', this.dialog, message);
        //this.push('messages', message);
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