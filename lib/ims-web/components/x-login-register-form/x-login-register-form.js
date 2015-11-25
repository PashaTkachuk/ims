Polymer({
	is: "x-login-register-form",
	properties: {
		sessionState: Boolean
	},
	ready: function() {
		this.select = 0;
		this.token = '';
	},
	tokenChanged: function (oldValue, newValue) {
		if (newValue != '') {
			this.select = 1;
		} else {
			this.select = 0;
		}
	}
});