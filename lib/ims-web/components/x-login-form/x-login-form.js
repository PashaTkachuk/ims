var self;
Polymer({
    is: "x-login-form",
    properties: {
        sessionState: {
            type: Boolean,
            reflectToAttribute: true,
            notify: true
        }
    },
    ready: function() {
        self = this;
        this.isHidden = true;
        app.socket.on('login feedback', this.handleLoginEvent.bind(this));
    },
    sendRequest: function(event, detail, sender) {
        if (!this.email) {
            this.$.einput.focus();
            return;
        } else if (!this.password) {
            this.$.pinput.focus();
            return;
        } else {
            if (app.socket.connected) {
                var body = {
                    email: this.email,
                    password: this.password
                };
                app.socket.emit('create session', body);
            }
        }
    },
    handleLoginEvent: function (data) {
        switch (data.status) {
            case "error":
                console.log("Server error");
                break;
            case "forbidden":
                this.isHidden = false;
                this.async(function() {
                    this.isHidden = true;
                }, 3000);
                break;
            case "success":
                setCookie("sid", data.sid);
                setCookie("user_id", data.user.user_id);
                app.user = data.user;
                app.isLogged = true;
                break;
            default:
                console.log("Unresolved response");
        }
    }
});