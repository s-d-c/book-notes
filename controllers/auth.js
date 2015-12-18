var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/signup', function(req, res) {
	res.render('auth/signup');
});

router.post('/signup', function(req, res) {
	if (req.body.password != req.body.password2) {
		req.flash('danger', 'Alas!  The passwords do not match.  Please re-enter.');
		res.redirect('/auth/signup');
	} else {
		db.user.findOrCreate({
			where: {
				email: req.body.email
			},
			defaults: {
				email: req.body.email,
				password: req.body.password,
				name: req.body.name
			}
		}).spread(function(user, created){
			if(created){
				res.redirect('/');
			} else {
				req.flash('danger', 'Email address already in use.');
				res.redirect('/auth/signup');
			}
		}).catch(function(err) {
			if(err.message) {
				//TODO error reporting
			} else {
				console.log(err);
			}
			res.redirect('/auth/signup');
		});
	}
});

router.get('/login', function(req, res) {
	res.render('auth/login');
});

router.post('/login', function(req, res) {
	db.user.authenticate(req.body.email, req.body.password, function(err, user){
		if(err) {
			res.send(err);
		} else if (user) {
			req.session.user = user.id;
			res.redirect('/');
		} else {
			// Invalid username or password error TODO
			res.redirect('/auth/login');
		}
	});
});

router.get('/logout', function(req, res) {
	//TODO send logout message
	req.session.user = false;
	res.redirect('/');
})



module.exports = router;