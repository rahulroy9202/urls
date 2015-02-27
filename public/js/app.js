var app;

$(document).ready(function() {
	app = new App();
	
});

function App() {
	
	//this.view = new View();
	//this.view.show(this.view.pages[0]);
	this.user = new User();
	
	if(this.user.readCookie()){

	}
}


App.prototype = {
	
	constructor: App,	
	
	login: function() {
		app.user = new User($('#login-username').val(),$('#login-password').val());
		app.lmsServer.login(app.user.toJSON(), app.cb_login);
	},
	
	showUserProfile: function() {
		app.view.show(app.view.pages[3]);
		app.lmsServer.getLeaves(app.user.toJSON(), app.cb_getLeaves);
	},
	
	showAdminPage: function() {
		app.view.show(app.view.pages[4]);
		app.lmsServer.getLeavesAdmin(app.user.toJSON(), app.cb_getAdminLeaves);
	},
	
	cb_login: function (data) {
		console.log(data);
		
		app.user.id = data.id;
				
	}
	


}