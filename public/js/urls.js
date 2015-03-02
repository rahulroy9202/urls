// client library for urls. api v1
function UrlsServer(_url) {
	this.url = _url;
	this.getDomains();
	//this.user = null;
}


UrlsServer.prototype = {
	
	constructor: UrlsServer,
	
	login: function(_user, _cb) {
		CustomAJAX('POST', this.url + '/api/v1/login/',{email: _user.email, password: _user.password}, _cb);
	},
	
	signup: function(_user, _cb) {
		CustomAJAX('POST', this.url + '/api/v1/signup/',{email: _user.email, password: _user.password}, _cb);
	},
	
	fetchLurl: function(_user, _page, _max_res, _cb) {
		CustomAJAX('POST', this.url + '/api/v1/lurl/get/',{email: _user.email, password: _user.password, page: _page, max_res: _max_res}, _cb);
	},
	
	addSurl: function(_user, _lurlid, _cb) {
		CustomAJAX('POST', this.url + '/api/v1/lurl/addsurl/',{email: _user.email, password: _user.password, lurl_id: _lurlid}, _cb);
	},
	
	newLurl: function(_user, _lurl, _cb) {
		CustomAJAX('POST', this.url + '/api/v1/lurl/new/',{email: _user.email, password: _user.password, lurl: _lurl}, _cb);
	},
	
	getDomains: function(_cb) {
		self = this;			//scope setup. required for callback.
		CustomAJAX('GET', this.url + '/api/v1/domains/',{}, function(data) {
			if(data.status==='ok')
				self.domains = data.domains;
			else
				self.getDomains();
			console.log(self,data);
		});
	}
	
	

}




function CustomAJAX(_type, _url, _data, _cb) {
	console.log("CustomAJAX- \n", arguments);
	
	$.ajax({
		url: _url,
		data: _data,
		type: _type,
		dataType: "json",
		success: function(json) {
			console.log("result- \n", json);
			if (typeof(_cb) === 'function') {
				_cb(json);
			}
		},
		error: function(xhr, _status, errorThrown) {
			_cb({status: _status, err: errorThrown});
			console.log("Status: " + status);
		},
	});
}