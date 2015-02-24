#!/bin/env node
//  URL Shortner
var urls = require('./urls');


var app = urls();
app.initialize();
app.start();

