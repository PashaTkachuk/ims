Polymer({
    is: "x-history-page",
    properties: {
        user: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        }
    },
    attached: function() {
        app.socket.on('last messages feedback', this.handleGetLastMessages.bind(this));
        app.socket.emit('get message history', {user_id: this.user.user_id});
    },
    handleGetLastMessages: function (data) {
        if (data.status == 'success') {
            this.dialogs = data.messages;
        }
    }
});