var self;
Polymer({
    is: "x-user-session",
    properties: {
        sessionState: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
            notify: true,
            observer: '_sessionStateChanged'
        },
        user: {
            type: Object,
            reflectToAttribute: true,
            notify: true
        }
    },
    ready: function () {
        app.socket.on('session feedback', this.handleGetSessionEvent.bind(this));
        var sid = getCookie("sid");
        var user_id = getCookie("user_id");
        if (sid != '' && user_id != '') {
            app.socket.emit('check session', {sid: sid, user_id: user_id});
        }
    },
    handleGetSessionEvent: function (data) {
        if (data.status) {
            this.user = data.user;
            this.sessionState = true;
        } else {
            this.sessionState = false;
        }
    },
    _sessionStateChanged: function(newValue, oldValue) {
        if (!newValue && oldValue) {
            setCookie("sid", "");
            setCookie("user_id", "");
            window.location.hash = '/login';
        } else if (!newValue ) {
            window.location.hash = '/login';
        } else {
            document.querySelector('app-router').go('/history');
        }
    }
});