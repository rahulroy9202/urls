// client library for urls. api v1 user

function User(_email, _pwd, _rem) {

	if (_email && _pwd) {
		this.email = _email;
		this.password = _pwd;
	}
	this.remember = _rem || false;
	this.isLoggedIn = false;
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
		this.isLoggedIn = false;
	},
	
	toJSON: function () {
		return {
			email: this.email,
			password: this.password
		};
	}

}