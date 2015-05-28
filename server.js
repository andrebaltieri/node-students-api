var mongoose = require('mongoose');
var http = require('http');
var app = require('./config/express')();
var port = process.env.PORT || 8080;

mongoose.connect('mongodb://ndestd2015:ndestd2015@ds034878.mongolab.com:34878/node-students');

http.createServer(app).listen(port, function(){
    console.log('Server up and runnning on port ' + port);
});