Polymer({
    is: "x-user-session",
    properties: {
        sessionState: {
            type: Boolean,
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
        this.sessionState = (getCookie("user_id") != '');
    },
    handleSessionResponse: function (event, res) {
        if (res.response.is_login) {
            this.sessionState = true;
            this.$.getUserInfoReq.generateRequest();
        } else {
            this.sessionState = false;
        }
    },
    _sessionStateChanged: function(newValue, oldValue) {
        if (!newValue) {
            window.location.hash = '/login';
        }
    },
    handleUserResponse: function (event, res) {
        var self = this;
        this.user = res.response;
        localStorage.setItem("user", JSON.stringify(res.response));
        app.socket.emit('change status', {user_id: self.user.user_id, status: "online"});
    }
});