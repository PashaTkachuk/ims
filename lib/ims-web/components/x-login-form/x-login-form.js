var self;
Polymer({
    is: "x-login-form",
    properties: {
        sessionService: String
    },
    ready: function() {
        self = this;
        this.sessionService = "http://127.0.0.1:3030/";
    },
    sendRequest: function(event, detail, sender) {
        if (!this.username) {
            this.$.uinput.focus();
            return;
        } else if (!this.password) {
            this.$.pinput.focus();
            return;
        } else {
            this.$.sessionRequest.generateRequest();
            return;
        }
    },
    handleResponse: function (event, res) {
        if (res.response.status === 'success') {
            this.islogged = true;
        } else if (res.response.status === 'error') {
            this.isHidden = false;
            setTimeout(function(){
                self.isHidden = true;
            }, 5000);
        };
    },
    keypressHandler: function (event, detail, sender){
        if (event.charCode === 13) this.sendRequest();
    }
});