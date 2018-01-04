var express = require('express');
var async = require('async');
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
  var tags = [];
  if(req.body.tags){
    tags = req.body.tags.split(',');
  }

  db.article.create(req.body).then(function(createdArticle){
    if(tags.length > 0){
      //do tag stuff
      async.forEach(tags, function(t, callback){
        //Add the tag to the tag table
        db.tag.findOrCreate({
          where: {content: t.trim()}
        }).spread(function(tag, wasCreated){
          if(tag){
            //This part is what adds the relationship in the join table
            createdArticle.addTag(tag);
          }
          //Calling this function is like saying this is all done
          callback(null);
        })
      }, function(){
        //Happens when ALL the calls have been resolved
        res.redirect('/articles/' + createdArticle.id);
      });
    }
    else {
      res.redirect('/articles/' + createdArticle.id);
    }
  }).catch(function(err){
    console.log('err', err);
    res.send('uh oh!');
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
    include: [db.author, db.comment, db.tag]
  }).then(function(article){
    res.render('articles/single', { result: article });
  });
});

module.exports = router;
