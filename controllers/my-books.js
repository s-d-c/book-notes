var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var currentUser = req.session.user;
	db.notebook.findAll({
		where: {
			userId: currentUser
		}
	}).then(function(notebooks){

		res.render('my-books', {notebooks: notebooks});
	});
	
});

router.post('/', function(req, res) {
	var title = req.body.title;
	var author = req.body.author;
	var goodreads_id = req.body.goodreads_id;
	var imageUrl = req.body.imageUrl;
	var userId = req.session.user;

	db.notebook.findOrCreate({where: {goodreads_id: goodreads_id,
										userId: userId},
							defaults: {title: title,
										author: author,
										imageUrl: imageUrl,
										status: 'closed',
										userId: userId}
									});
	res.redirect('/my-books');
});

router.get('/:notebookId', function(req, res){
	var passNotebook;
	var passNotes;
	db.notebook.findById(req.params.notebookId).
		then(function(notebook){
			passNotebook = notebook;
			db.note.findAll({where: {notebookId: notebook.id }}).
				then(function(notes){
					passNotes = notes;
					res.render('show', {notebook: passNotebook,
										notes: passNotes});
			});
	});
});

router.post('/:notebookId', function(req, res){
	var contentHeading = req.body.contentHeading;
	var content = req.body.content;
	var notebookId = req.body.notebookId;
	var notes;
	var notebook;
		db.note.create({ heading: contentHeading,
							content: content,
							notebookId: notebookId
						}).then(function(note){
							res.redirect('/my-books/' + req.body.notebookId);
		});
});

router.delete('/:notebookId', function(req, res){
	console.log(req.body.notebookId);
	db.notebook.destroy({
		where: {
			id: req.body.notebookId
		}
	}).then(function(){
		res.redirect('/my-books');
	})	
});

	




module.exports = router;