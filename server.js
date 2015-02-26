var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var utils = require('./utils');
var config = require('./config');
var urlMap = require("./models/urlmap");


var app = express();
var auth = utils.authenticate;

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());       	// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({		// to support URL-encoded bodies
	extended: true
}));

app.use(function(req, res, next) {
	//console.log(req.headers);
	//console.log(req.headers.referrer);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

utils.initDB(config.dburl);
app.listen(config.port, config.ipaddress);

app.post('/api/v1/login/', function(req, res) {
	auth(req, res, function (_user) {
		console.log(_user);
		return res.json({status:'ok', user: _user});
	});
});

app.post('/api/v1/signup/', function(req, res) {
	utils.signup(req, res, function (_user) {
		console.log(_user);
		return res.json({status:'ok', user: _user});
	});
});

app.get('/:surl/', function (req, res) {

	var _surl = req.params.surl;

	urlMap.findOne({
		surl: _surl
	}, function (err, doc) {
	
		if (!err && doc!=null){
			res.redirect(301, doc.lurl);
			//do the logging
		}
		else
			return res.status(404).send({status: "nada"});
		
	});

});


/*
app.post('/api/v1/surl/new/', function(req, res) {
	auth(req, res, function (_user) {
		console.log(_user);
		return res.json({status:'ok', user: _user});
	});
});

app.post('/api/v1/surl/get/', function(req, res) {
	auth(req, res, function (_user) {
		console.log(_user);
		return res.json({status:'ok', user: _user});
	});
});

app.post('/api/v1/surl/all/:page/', function(req, res) {
	auth(req, res, function (_user) {
		console.log(_user);
		return res.json({status:'ok', user: _user});
	});
});
*/





/*
app.get('/:surl', function(req, res) {
	
    res.send('everything ok - server');
});


app.get('/url/', function(req, res) {
	
    res.send('2 everything ok - server');
});


app.post('/:surl', function(req, res) {
	console.log(req.url);
	console.log(req.body);
	//console.log(req.headers);
	res.json({status:'everything ok - server'});
});

*/

