function View() {
	this.pages = [$("#intro"), $("#login"), $("#signup"), $("#profile")];
	this.stack = [];
	
	this.messageClearSchdeule = null;
	this.messagePane = $("#message");
}


//$('#remember').prop('checked')  

View.prototype = {
	
	constructor: View,
	
	/*
	back: function () {
		this.show(stack.pop());
	},
	*/	
	
	show: function(_page, _stack_it) {
		/*
		TODO -  Handle State.
		if(_stack_it)
			stack.push(this.current);
		*/
		for (var i in this.pages) {
			this.pages[i].toggle(false);
		}
		this.current = _page;
		this.current.toggle(true);
	},

	reflectLogin: function() {
		$('#user_logout_button').toggle(true);
		$('#brand').html("  -  " + app.user.email);
		$('#brand').click(app.showUserProfile);
		
	},
	
	reflectLogout: function() {
		$('#user_logout_button').toggle(false);
		$('#brand').html( "  -  by rahulroy9202@gmail.com");
		$('#brand').click(null);
		
	},
	
	renderProfileData: function() {
		
	},
	
	renderLurlDetails: function() {
		
	},
	
	showMessage: function(_message, _duration) {
		var self = this;	//setup scope. necause setTimeout changes scope to windows i guess.
		if(self.messageClearSchdeule != null){
			//TODO restet timer
		}
		self.messagePane.html(_message);
		self.messageClearSchdeule = window.setTimeout( function() {
			self.messagePane.html("");
		}, 2000);
	}

}