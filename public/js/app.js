var app;

$(document).ready(function() {
	app = new App();
	
});

function App() {
	//for secured connection. I don't have a certificate. so cannot do https over urls.rahulroy9202.in
	this.server = new UrlsServer("https://urls-rahulroy9202.rhcloud.com");
	this.view = new View();
	this.view.show(this.view.pages[0]);
	this.user = new User();
	
	if(this.user.readCookie()){
		this.server.login(this.user, function(data){
			console.log(data);
			if(data.status === 'ok') {
				app.showUserProfile();
				app.user.isLoggedIn = true;
			}
		});
	}
}


App.prototype = {
	
	constructor: App,	
	
	login: function() {	
		app.user = new User($('#login-username').val(), $('#login-password').val(), $('#remember').prop('checked'));
		app.server.login(app.user, app.cb_login);
	},
	
	logout: function() {
		app.user.logout(true);		//true removes cookies too.
		app.view.show(app.view.pages[0]);
	},
	
	signup: function() {
		if($('#signup-password').val() ==  $('#signup-password-confirm').val()){
			app.user = new User($('#signup-username').val(), $('#signup-password').val());
			app.server.signup(app.user, app.cb_signup);
		}
	},
	
	showUserProfile: function() {
		app.view.show(app.view.pages[3]);
		app.view.reflectLogin();
	},
	
	cb_login: function (data) {

		if(data.status === 'ok'){
			app.showUserProfile();
			if(app.user.remember)
				app.user.createCookie();
		}
		else
			alert("error - ", data.status);
	},
	
	cb_signup: function (data) {

		if(data.status === 'ok'){
			app.view.showMessage("Signup Success");
			app.view.show(app.view.pages[0]);
		}
		else
			app.view.showMessage("Signup Wrror - Please Try Again");
	}
	


}