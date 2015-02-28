var mongoose = require("mongoose");
var userModel = require("./models/user");

module.exports.initDB = function (_url, _cb) {
	
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
        //mongoose.disconnect();
    });
	
    db.on('reconnected', function() {
        console.log('MongoDB reconnected!');
    });
	
    db.on('disconnected', function() {
        console.log('MongoDB disconnected!');
        
		if(typeof(_cb)==='function'){
			console.log(_url, options);
			setTimeout(function () {
				_cb(_url)
				//mongoose.connect(_url, options);
			}, 100)
		}

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
				return res.status(500).json({status: "err - auth fail", error: err});
			}
			if (user === null) {
				return res.status(401).json({status: "err - no user match"});
			}
			else {
				if(user.validPassword(req.body.password))
					return callback({_id: user._id, email: user.email});
				return res.status(401).json({status: "err - wrong pwd"});
			}

		});
	}
	else
		return res.status(500).json({status: "err - auth fail - data missing"});
}


module.exports.signup = function (req, res, callback) {

	if(req.body.email && req.body.password){
		var userData = new userModel();
		userData.email = req.body.email;
		userData.password = userData.generateHash(req.body.password);
		
		userData.save(function(err, user) {
            if (err) return res.status(500).json({status: "err - signup fail", error: err});
			return callback({_id: user._id, email: user.email});
        });
		
	}
	else
		return res.status(500).json({status: "err - auth fail - data missing"});
}


module.exports.generateRandomSequence = function () {
    var str = "";
    while (str.length < 5) {
        str = Math.random().toString(36).slice(2);
    }
    return str;
}
