Polymer({
    is: "x-log-out",
    properties: {
        sessionState: {
            type: Boolean,
            reflectToAttribute: true,
            notify: true
        }
    },
    ready: function () {
        app.socket.on('delete session feedback', this.handleDeleteSessionEvent.bind(this));
    },
    sendReq: function () {
        var user_id = getCookie("user_id");
        if (user_id != '') {
            app.socket.emit('delete session', {user_id: user_id});
        }
    },
    handleDeleteSessionEvent: function (data) {
        if (data.status) {
            this.sessionState = false;
        } else {
            this.sessionState = true;
        }
    }
});