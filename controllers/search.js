var db = require('../models');
var express = require('express');
var request = require('request');
var xmlParser = require('xml2js').parseString;
var router = express.Router();

router.get('/', function(req, res){
	var data;
	res.render('search', {data: data});
});

router.post('/title', function(req, res){
	var list;
	var title = req.body.title;
	var key = process.env.SECRET_KEY;
	var url = 'https://www.goodreads.com/search/index.xml?key=' + key + '&q=' + title;
	
	request(url, function(error, response, body){
		if(error){
			console.log(err);
			return;
		}
		else if(!error && response.statusCode === 200) {
			xmlParser(body, function(err, result) {
				list = result.GoodreadsResponse.search[0].results[0].work;
				//console.log(list[0].best_book[0].id[0]._);
			});
			res.render('title-results', {list: list,
										title: title});
		}
	});
});

router.post('/author', function(req, res){
	var list;
	var author = req.body.author;
	var key = process.env.SECRET_KEY;
	var url = 'https://www.goodreads.com/search/index.xml?key=' + key + '&q=' + author;

	request(url, function(error, response, body){
		if(error){
			console.log(err);
			return;
		}
		else if(!error && response.statusCode === 200) {
			xmlParser(body, function(err, result) {
				list = result.GoodreadsResponse.search[0].results[0].work;
			});
			res.render('author-results', {list: list,
										 author: author});
		}
	});
});



module.exports = router;