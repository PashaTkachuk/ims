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
        var sid = getCookie("sid");
        var user_id = getCookie("user_id");
        if (sid != '' && user_id != '') {
            app.socket.emit('delete session', {sid: sid, user_id: user_id});
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