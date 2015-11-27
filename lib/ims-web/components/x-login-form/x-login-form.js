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
            app.isLogged = true;
            document.querySelector('app-router').go('/inbox');
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