function View() {
	this.pages = [$("#intro"), $("#login"), $("#signup"), $("#profile")];
	this.stack = [];
	
	this.messageClearSchdeule = null;
	this.messagePane = $("#message");
	
	this.defaultDisplayDomain = 'http://urls.rahulroy9202.in/';
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
		$('#urls-list').html("");
		$('#urls-details').html("");
		
	},
	
	handleDomainToggle: function() {
		var tmp = $('#domain-select').html();
		//console.log('DD-',$('#domain-select').html(),$('#default-domain').html());
		$('#domain-select').html($('#default-domain').html());
		$('#default-domain').html(tmp)
		app.view.defaultDisplayDomain = tmp;
	},
	renderProfileData: function() {
		
	},
	
	renderLurlDetails: function(data) {
		console.log("viw-",data);
	},
	
	renderLurls: function(_data) {
		var html = "";
		for(var i in _data.lurls){
			
			var text = _data.lurls[i].lurl.toString();
			
			if(text.length > 40)
				text = text.substr(0,37) + '...';
			
			 html = html + '<li title="' + _data.lurls[i].lurl + '" class="lurl_list" onClick="app.showLurlDetails(&quot;' + i +'&quot;);"><a href="#n" ><h4>' + text + '</h4></a></li>';
		}
		
		$('#urls-list').html(html);
	},
	
	showMessage: function(_message, _duration) {
		var self = this;			//setup scope. necause setTimeout changes scope to windows i guess.
		if(self.messageClearSchdeule != null){
			window.clearTimeout(self.messageClearSchdeule);		//reset timer
		}
		self.messagePane.html(_message);
		self.messageClearSchdeule = window.setTimeout( function() {
			self.messagePane.html("");
			self.messageClearSchdeule = null;
		}, 2000);
	}

}