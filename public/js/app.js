var app;

$(document).ready(function() {
	app = new App();
});

function App() {
	
	this.max_results = 50;
	this.current_page = 0;
	
	//for secured connection. I don't have a certificate. so cannot do https over urls.rahulroy9202.in
	this.server = new UrlsServer("https://urls-rahulroy9202.rhcloud.com");
	this.view = new View();
	this.view.show(this.view.pages[1]);
	this.user = new User();
	
	if(this.user.readCookie()){
		this.server.login(this.user, function(data) {
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
		app.view.reflectLogout();
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
		app.showLurlList();
	},
	
	showLurlDetails: function( _id ) {
		console.log(_id);
		app.view.renderLurlDetails(app.user.lurls[+_id]);
	},
	
	showLurlList: function() {
			app.server.fetchLurl(app.user, app.current_page, app.max_results, app.cb_showLurlList);
	},
	
	newLurl: function() {
		var _lurl = $('#new-lurl').val();
		if(_lurl != '') {
			app.server.newLurl(app.user, _lurl, app.cb_newLurl);
			$('#btn-confirm').prop("disabled",true);
		}
		else
			$('#new-lurl').attr("placeholder", "please paste url here");
	},
	
	cb_newLurl: function(data) {
		if(data.status === 'ok'){
			app.view.showMessage(" done - new short url ready");
			$('#new-lurl').val('');
			$('#btn-confirm').prop("disabled",false);
			app.current_page = 0;
			app.showLurlList();
		}
	},
	
	cb_showLurlList: function(data) {
		if(data.status === 'ok')
			app.view.renderLurls(data);
			app.user.lurls = data.lurls;
			
	},
	
	cb_login: function (data) {
	
		if(data.status === 'ok'){
			app.showUserProfile();
			if(app.user.remember)
				app.user.createCookie();
		}
		else
			app.view.showMessage(" login error - please try again");
	},
	
	cb_signup: function (data) {

		if(data.status === 'ok'){
			app.view.showMessage(" signup success");
			app.view.show(app.view.pages[0]);
		}
		else
			app.view.showMessage(" signup error - please try again");
	}
	


}