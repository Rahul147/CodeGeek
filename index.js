var express = require('express');

var app = express();

//this is used when we want to dynamically set port using the env variables 
app.set('port', process.env.PORT || 3000);

//nome route 
app.get('/', function(req, res) {
	res.send('Hello, World!');
});






app.listen(app.get('port'), function(req, res) {
	console.log('Listening on port ' + app.get('port') + " Press Cntrl-C to exit");
});