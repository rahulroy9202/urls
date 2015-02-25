var mongoose = require("mongoose");
var userModel = require("./models/user");

module.exports.initDB = function (_url) {
	
    var options = {
        db: {native_parser: true},
        server: {
			poolSize: 5,
			socketOptions: {keepAlive: 1}
		}
    }
	
	mongoose.connect(_url, options);
    var db = mongoose.connection;
	
    db.on('error', function(error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });
	
    db.on('reconnected', function() {
        console.log('MongoDB reconnected!');
    });
	
    db.on('disconnected', function() {
        console.log('MongoDB disconnected!');
        mongoose.connect(_url, options);
    });
	
    db.once('open', function() {
        console.log('MongoDB connection opened!');
    })
	
    db.once('connected', function() {
        console.log("----connected to database at %s", _url);
    });
	
	return db;
}


module.exports.authenticate = function (req, res, callback) {
	
	//email and password expected in req.body
	if(req.body.email && req.body.password){
		userModel.findOne({ email: req.body.email }, function(err, user) {
			if (err) {
				return res.json({status: "err - auth fail"});
			}
			if (user === null) {
				return res.json({status: "err - no user match"});
			}
			else {
				if(user.validPassword(req.body.password))
					return callback({_id: user._id, email: user.email});
				return res.json({status: "err - wrong pwd"});
			}

		});
	}
}


module.exports.signup = function (req, res, callback) {

	if(req.body.email && req.body.password){
		var userData = new userModel();
		userData.email = req.body.email;
		userData.password = userData.generateHash(req.body.password);
		
		userData.save(function(err, user) {
            if (err) return res.json({status: "err - signup fail"});
			return callback({_id: user._id, email: user.email});
        });
		
	}
}