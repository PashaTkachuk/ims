Polymer({
	is: "x-login-register-form",
	properties: {
		tokenValue: {
			type: String,
			reflectToAttribute: true,
			notify: true,
			observer: 'tokenChanged'
		},
		from: {
			type: String,
			reflectToAttribute: true,
			notify: true
		}
	},
	ready: function() {
		this.select = 0;
		this.token = '';
		app.socket.on('check token feedback', this.handleCheckToken.bind(this));
	},
	tokenChanged: function (newValue, oldValue) {
		if (newValue != '' && this.email) {
			app.socket.emit('check token', {email: this.email, token: newValue});
			this.select = 1;
		} else {
			this.select = 0;
		}
	},
	handleCheckToken: function (data) {
		this.$.checkTokenToast.text = data.message;
		this.$.checkTokenToast.show();
		setTimeout(function(){
			window.location.hash = '/login';
		}, 3000);
	}
});