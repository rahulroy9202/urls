var mongoose = require('mongoose');

var loggerSchema = mongoose.Schema({

	surl: {
		type: [String],
		required: true
	},
	
	data: {
		type: String,
		required: true
	},
	
	accessed: {
		type: Date,
		required: true
	}
});

loggerSchema.methods.processHeaders = function(headers) {
    //this.
};

module.exports = mongoose.model('accesslog', loggerSchema);