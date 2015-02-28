var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var utils = require('./utils');
var config = require('./config');
var urlMap = require("./models/urlmap");
var accessLogger = require("./models/accesslogger");


var app = express();
var auth = utils.authenticate;


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(function(req, res, next) {
	//console.log(req.headers);
	//console.log(req.headers.referrer);
	

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});




app.use(bodyParser.json());       	// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({		// to support URL-encoded bodies
	extended: true
}));


utils.initDB(config.dburl, utils.initDB);
app.listen(config.port, config.ipaddress);



app.get('/:surl/', function (req, res) {
	
	var _surl = req.params.surl;
	
	urlMap.findOne({
		surl: _surl
	}, function (err, doc) {
	
		if (!err && doc!=null){
			res.redirect(301, doc.lurl);			console.log("\nTODO: Do the logging");
			
			var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			
			accessData = new accessLogger();
			accessData.processHeaders(req.headers);
			accessData.ip = ip;
			accessData.surl = _surl;
			accessData.accessed = new Date();
			
			accessData.save();
			
			console.log("\nIP: ",ip);//,' \n--- \n',req.connection);
			console.log("\nREFFERER: ",req.headers.referer);
			console.log("\nUser-Agent: ",req.headers['user-agent']);
			console.log("\n--------------------------------");
			//return console.log(req.headers,new Date(),doc);
		}
		else
			return res.status(404).send("nada");
	});
});

app.get('/api/v1/domains/', function(req, res) {
	return res.json({status:'ok', domains: config.domains});
});

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

app.post('/api/v1/lurl/new/', function(req, res) {
	if(req.body.lurl){
		auth(req, res, function (_user) {
			
			urlMapData  = new urlMap();
			urlMapData.user_id = _user._id;
			urlMapData.lurl = req.body.lurl;
			urlMapData.surl = [utils.generateRandomSequence()];  // generate new surl
			urlMapData.created = urlMapData.updated = new Date();
			
			urlMapData.save(function (err, doc) {						console.log("TODO: change code to guarantee unique surl");
				if(err){
					urlMapData.surl = [utils.generateRandomSequence()];	// retry on clash of random surl. i would prefer using the _id as the first surl but it is quiet long.
					urlMapData.save();
				}
				else
					return res.json({status:'ok', lurl: doc});
			});
		});
	}
	else
		return res.status(500).json({status: "err - insuficient data"});
});

app.post('/api/v1/lurl/get/', function(req, res) {
	if(req.body.page  && req.body.max_res){
		auth(req, res, function (_user) {
			
			urlMap.find({user_id: _user._id}).sort({updated:-1}).limit(req.body.max_res).skip(req.body.page * req.body.max_res).exec(function(err, _lurls){
				if(!err)	return res.json({status:'ok', lurls: _lurls});
					return res.status(500).json({status: "err - boom"});
			});
			
		});
	}
	else
		return res.status(500).json({status: "err - insuficient data"});
});

app.post('/api/v1/lurl/addsurl/', function(req, res) {
	if(req.body.lurl_id){
		auth(req, res, function (_user) {
			console.log(_user);
			
				urlMap.findOne({
					_id: req.body.lurl_id,
					user_id: _user._id
				}, function (err, doc) {
				
					if (!err && doc!=null){
						
						doc.surl.push(utils.generateRandomSequence()); 		console.log("TODO: change code to guarantee unique new surl");
						doc.updated = new Date();
						doc.markModified('surl');
						
						doc.save(function(err, _doc) {
							if(!err)	return res.json({status:'ok', lurl: _doc});
						});
					}
					else
						return res.status(404).json({status:"nada"});
				});
		});
	}
	else
		return res.status(500).json({status: "err - insuficient data"});
});


/*
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

