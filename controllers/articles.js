var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
  db.article.findAll({
    include: [db.author]
  }).then(function(articles){
    res.render('articles/all', {results: articles});
  });
});

router.post('/', function(req, res){
  db.article.create(req.body).then(function(createdArticle){
    res.redirect('/articles/' + createdArticle.id);
  }).catch(function(err){
    res.send('uh oh!', err);
  });
});

router.delete('/:id', function(req, res){
  console.log('Delete route. ID = ', req.params.id);
  db.article.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(deleted){
    console.log('deleted = ', deleted);
    res.send('success');
  }).catch(function(err){
    console.log('An error happened', err);
    res.send('fail');
  });
});

router.get('/new', function(req, res){
  db.author.findAll().then(function(authors){
    res.render('articles/new', {authors: authors});
  });
});

router.get('/:id', function(req, res){
  db.article.findOne({
    where: {id: req.params.id},
    include: [db.author]
  }).then(function(article){
    res.render('articles/single', { result: article });
  });
});

module.exports = router;
