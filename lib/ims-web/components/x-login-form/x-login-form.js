var self;
Polymer({
    is: "x-login-form",
    properties: {
        sessionState: Boolean,
        observer: '_sessionStateChanged'
    },
    ready: function() {
        self = this;
        this.isHidden = true;
        this.sessionService = app.serviceUrl + '/session';
    },
    sendRequest: function(event, detail, sender) {
        if (!this.username) {
            this.$.uinput.focus();
            return;
        } else if (!this.password) {
            this.$.pinput.focus();
            return;
        } else {
            this.requestBody = this.getRequestBody();
            this.$.sessionRequest.generateRequest();
            return;
        }
    },
    handleResponse: function (event, res) {
        if (res.response.status === 'success') {
            this.sessionState = true;
            page.redirect(app.baseUrl);
        } else if (res.response.status === 'error') {
            this.isHidden = false;
            this.async(function() {
                this.isHidden = true;
            }, 3000);
        };
    },
    getRequestBody: function(){
        return '{"username":"' + this.username + '","password":"' + this.password + '"}';
    }
});