var express = require('express');
var bodyParser = require('body-parser');
var utils = require('./utils');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());       	// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({		// to support URL-encoded bodies
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var dburl = "mongodb://cloud9:cloud9@kahana.mongohq.com:10099/doba";

utils.initDB(dburl);
app.listen(port, ipaddress);

app.get('/:surl', function(req, res) {
    res.send('everything ok - server');
});

app.post('/:surl', function(req, res) {
	console.log(req.url);
	console.log(req.body);
	console.log(req.headers);
	res.json({status:'everything ok - server'});
});
