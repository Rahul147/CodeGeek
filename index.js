var express = require('express');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

//set middle wares(not ready yet)


app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.render('home');	
});

app.get('/about', function(req, res){
	res.render('about');
});





app.listen(app.get('port'), function(req, res) {
	console.log('Listening on port ' + app.get('port') + " Press Cntrl-C to exit");
});