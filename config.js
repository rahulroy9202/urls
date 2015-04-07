module.exports = {
	ipaddress : process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
	port : process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,
	dburl : "mongodb://cloud9:cloud9@kahana.mongohq.com:10099/doba",
	domains : [
		'http://urls.rahulroy9202.in',
		'http://urls-rahulroy9202.rhcloud.com'  //shouldnot use the https because that will result in empty header referer to target website. why mess up their analytics. :D
	]
};