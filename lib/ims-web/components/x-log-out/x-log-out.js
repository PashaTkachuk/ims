Polymer({
    is: "x-log-out",
    properties: {
        sessionState: {
            type: Boolean,
            reflectToAttribute: true,
            notify: true
        }
    },
    sendReq: function () {
       this.$.logOutReq.generateRequest();
    },
    handleLogOutResponse: function (event, res) {
        if (res.response.is_login) {
            this.sessionState = true;
        } else {
            this.sessionState = false;
        }
    }
});