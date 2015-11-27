Polymer({
	is: "x-login-register-form",
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