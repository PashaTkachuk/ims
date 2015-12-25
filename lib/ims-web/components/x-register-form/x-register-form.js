Polymer({
    is: "x-register-form",
    properties: {
        accountService: String
    },
    attached: function () {
        app.socket.on('create token feedback', this.handleCreateToken.bind(this));
    },
    sendRequest: function() {
        if (this.$.einput.invalid || !this.email) {
            this.$.einput.$.input.focus();
        } else if (this.$.pinput.invalid || !this.password) {
            this.$.pinput.$.input.focus();
        } else if (!this.confirmPassword) {
            this.$.pcinput.$.input.focus();
        } else {
            if (app.socket.connected) {
                app.socket.emit('create token', {email: this.email, password: this.password});
            }
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
        this.$.createTokenToast.text = data.message;
        this.$.createTokenToast.show();
    }
});