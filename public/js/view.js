function View() {
	this.pages = [$("#intro"), $("#login_signup"), $("#profile")];
}

View.prototype = {
	
	constructor: View,
	
	show: function (_page) {
		for (var i in this.pages) {
			if (_page == this.pages[i]) {
				this.pages[i].toggle(true);
				this.current = _page;
				continue;
			}
			this.pages[i].toggle(false);
		}
	},

	initProfilePage: function () {
		
	}

}