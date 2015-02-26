// client library for urls. api v1 user

function User(email, pwd, server) {

	if (email && pwd) {
		this.email = email;
		this.password = pwd;
		//this.server = server;
	}

	this.id = -1;
}

User.prototype = {

	constructor: User,

	createCookie: function () {
		$.cookie("u_email", this.email, {
			expires: 2000
		});
		$.cookie("u_password", this.password, {
			expires: 2000
		});
	},

	readCookie: function () {
		if ((typeof $.cookie("u_email") != 'undefined') && (typeof $.cookie("u_password") != 'undefined')) {
			this.email = $.cookie("u_email");
			this.password = $.cookie("u_password");
			console.log("READ COOKIES complete - ", this);
			return true;
		}
		return false;
	},

	clearCookie: function () {
		$.removeCookie("u_email");
		$.removeCookie("u_password");
	},

	logout: function (_forget) {
		if (_forget)
			this.clearCookie();
		this.email = this.password = null;
	},

	toJSON: function () {
		return {
			email: this.email,
			password: this.password
		};
	}

}