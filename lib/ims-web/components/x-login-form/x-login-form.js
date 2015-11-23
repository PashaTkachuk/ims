var self;
Polymer({
    is: "x-login-form",
    properties: {
        sessionService: String
    },
    ready: function() {
        self = this;
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
            app.user.isLogged = true;
            page.redirect(app.baseUrl);
        } else if (res.response.status === 'error') {
            this.isHidden = false;
            setTimeout(function(){
                self.isHidden = true;
            }, 5000);
        };
    },
    getRequestBody: function(){
        return '{"username":"' + this.username + '","password":"' + this.password + '"}';
    },
    keypressHandler: function (event, detail, sender){
        if (event.charCode === 13) this.sendRequest();
    }
});