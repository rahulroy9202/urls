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
			if(data.status === 'ok'){
				app.showUserProfile();
				this.user.isLoggedIn = true;
			}
		});
	}
}


App.prototype = {
	
	constructor: App,	
	
	login: function() {
		app.user = new User($('#login-username').val(),$('#login-password').val());
		app.server.login(app.user, app.cb_login);
	},
	
	showUserProfile: function() {
		app.view.show(app.view.pages[3]);
		app.view.reflectLogin();
	},
	
	cb_login: function (data) {
		console.log(data);
		
		if(data.status === 'ok')
			app.showUserProfile();
		else
			alert("error - ", data.status);
		
	}
	


}