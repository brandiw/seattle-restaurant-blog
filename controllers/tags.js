var express = require('express');
var async = require('async');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
  db.tag.findAll().then(function(tags){
    res.render('tags/all', {tags: tags});
  });
});

router.get('/:id', function(req, res){
  db.tag.findOne({
    where: {id: req.params.id},
    include: [db.article]
  }).then(function(tag){
    res.render('tags/single', {tag: tag});
  });
});

router.delete('/:id', function(req, res){
  db.tag.findOne({
    where: {id: req.params.id},
    include: [db.article]
  }).then(function(tag){
    async.forEach(tag.articles, function(a, callback){
      tag.removeArticle(a);
      callback(null);
    }, function(){
      //Runs when everything is done
      db.tag.destroy({
        where: {id: req.params.id}
      }).then(function(deletedItem){
        res.send('all good');
      }); //end of destroy
    }); //end of async.forEach
  }); //end of findOne
});

module.exports = router;
