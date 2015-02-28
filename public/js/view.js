function View() {
	this.pages = [$("#intro"), $("#login"), $("#signup"), $("#profile")];
	this.stack = [];
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
		$('#brand').html( "urls " + "  -  " + app.user.email);
		$('#brand').click(app.showUserProfile);
		
	}

}