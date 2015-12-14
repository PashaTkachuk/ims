var self;
Polymer({
    is: "x-register-form",
    properties: {
        accountService: String
    },
    ready: function() {
        self = this;
        this.accountService = "http://127.0.0.1:3030/";
    },
    sendRequest: function(event, detail, sender) {
        if (!this.email) {
            this.$.einput.focus();
            return;
        } else if (!this.password) {
            this.$.pinput.focus();
            return;
        } else if (!this.confirmPassword) {
            this.$.pcinput.focus();
            return;
        } else {
            localStorage.setItem("email", this.email);
            localStorage.setItem("password", this.password);
        }
    },
    handleResponse: function (event, res) {
        if (res.response.status === 'success') {
            //this.$.registerSuccess.toggle();
        } else if (res.response.status === 'error') {
            this.isHidden = false;
        };
    },
    handleConfirm: function () {
        if (this.password != this.confirmPassword) {
            this.$.confirm.isInvalid = true;
        } else if (this.password === this.confirmPassword) {
            this.$.confirm.isInvalid = false;
        }
    },
    keypressHandler: function (event, detail, sender){
        if (event.charCode === 13) this.sendRequest();
    }
});