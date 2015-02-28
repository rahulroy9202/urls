var mongoose = require('mongoose');

var loggerSchema = mongoose.Schema({

	surl: {
		type: String,
		required: true
	},
	
	user_agent: {
		type: String,
	},
	
	ip: {
		type: String,
	},
	
	referer: {
		type: String,
	},
	
	accessed: {
		type: Date,
		required: true
	}
});

loggerSchema.methods.processHeaders = function(headers) {
    this.user_agent = headers['user-agent'];
	this.referer = headers.referer;
};

module.exports = mongoose.model('accesslog', loggerSchema);