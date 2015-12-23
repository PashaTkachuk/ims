Polymer({
	is: "x-login-register-form",
	properties: {
		tokenValue: {
			type: String,
			reflectToAttribute: true,
			notify: true,
			observer: 'tokenChanged'
		}
	},
	ready: function() {
		this.select = 0;
		this.token = '';
		app.socket.on('check token feedback', this.handleCheckToken.bind(this));
		app.socket.on('create user feedback', this.handleCreateUser.bind(this));
	},
	tokenChanged: function (newValue, oldValue) {
		if (newValue != '') {
			app.socket.emit('check token', {email: localStorage.getItem("user_email"), token: newValue});
			this.select = 1;
		} else {
			this.select = 0;
		}
	},
	handleCheckToken: function (data) {
		if (data.status) {
			app.socket.emit('create user', {email: localStorage.getItem("user_email"), password: localStorage.getItem("user_password")});
		} else {
			this.$.checkTokenToast.show();
		}
	},
	handleCreateUser: function (data) {
		if (data.status) {
			this.$.userCreatedToast.show();
		}
	}
});