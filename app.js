var express = require('express');
var session = require('express-session');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var request = require('request');
var db = require('./models');
var bcrypt = require('bcrypt');
var flash = require('connect-flash');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);

app.use(express.static(__dirname + '/static'));

app.use(flash());

app.use(session({
	secret: '49jcjkfcamskdogotnmxvbmld643',
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next) {
	if(req.session.user) {
		db.user.findById(req.session.user).then(function(user) {
			req.currentUser = user;
			next();
		});
	} else {
		req.currentUser = false;
		next();
	}
});

app.use(function(req, res, next){
	res.locals.currentUser = req.currentUser;
	// TODO pass alerts
	res.locals.alerts = req.flash();
	next();
})

app.use('/auth', require('./controllers/auth'));
app.use('/my-books', require('./controllers/my-books'));
app.use('/search', require('./controllers/search'));


app.get('/', function(req, res){
	res.render('index');
});


app.listen(process.env.PORT || 3000);