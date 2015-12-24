Polymer({
    is: "x-register-form",
    properties: {
        accountService: String
    },
    attached: function () {
        app.socket.on('create token feedback', this.handleCreateToken.bind(this));
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
            localStorage.setItem("user_email", this.email);
            localStorage.setItem("user_password", this.password);
            app.socket.emit('create token', {email: this.email});
        }
    },
    handleConfirm: function () {
        if (this.password != this.confirmPassword) {
            this.$.pcinput.invalid = true;
        } else if (this.password === this.confirmPassword) {
            this.$.pcinput.invalid = false;
        }
    },
    handleCreateToken: function (data) {
        if (data.status) {
            this.$.createTokenToast.text = data.message;
            this.$.createTokenToast.show();
        } else {
            this.$.createTokenToast.text = data.message;
            this.$.createTokenToast.show();
        }
    }
});