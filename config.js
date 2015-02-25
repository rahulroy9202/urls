module.exports = {
	ipaddress : process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
	port : process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
	dburl : "mongodb://cloud9:cloud9@kahana.mongohq.com:10099/doba"
};