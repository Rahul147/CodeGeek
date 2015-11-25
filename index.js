var express = require('express');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.use(require('body-parser').urlencoded({extended: true}));

var formidable = require('formidable');

var credencials = require('./credencials.js');

app.use(require('cookie-parser')(credencials.cookieSecret));

//set middle wares(not ready yet)


app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.render('home');	
});

app.get('/home', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/contact', function(req, res) {
	res.render('contact', {csrf: 'CSRF tokem here'});
});

app.get('/thankyou', function(req, res) {
	res.render('thankyou');	
});

app.post('/process', function(req, res) {
	console.log('Form: ' + req.body.form);
	console.log('CSRF: ' + req.body._csrf);
	console.log('Email: ' + req.body.email);
	console.log('Questions: ' + req.body.ques);
	res.redirect(303, '/thankyou');

});


app.get('/file-upload', function(req, res){
  var now = new Date();
  res.render('file-upload',{
    year: now.getFullYear(),
    month: now.getMonth() 
	});
});


app.post('/file-upload/:year/:month',
  function(req, res){
 
    // Parse a file that was uploaded
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, file){
      if(err)
        return res.redirect(303, '/error');
      console.log('Received File');
 
      // Output file information
      console.log(file);
      console.log(fields);
      res.redirect( 303, '/thankyou');
  });
});






app.use(function(req, res) {
	res.type('text/html');
	res.status(404);
	res.render('404');
});

app.use(function(req, res) {
	res.type('text/html');
	res.status(500);
	res.render('500');

});



app.listen(app.get('port'), function(req, res) {
	console.log('Listening on port ' + app.get('port') + " Press Cntrl-C to exit");
});