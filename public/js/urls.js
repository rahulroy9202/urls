// client library for urls. api v1
function UrlsServer(_url) {
	this.url = _url;
	this.user = null;
}


UrlsServer.prototype = {
	
	constructor: UrlsServer,
	
	login: function(_user, _cb) {
		CustomAJAX('POST', this.url + '/api/v1/login/',{email: _user.email, password: _user.password}, _cb);
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
		error: function(xhr, status, errorThrown) {
			console.log("Status: " + status);
		},
	});
}