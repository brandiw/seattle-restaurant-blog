var express = require('express');
var router = express.Router();
var db = require('../models');

router.post('/', function(req, res){
  db.comment.create({
    name: req.body.name,
    articleId: req.body.articleId,
    content: req.body.content
  }).then(function(createdComment){
    res.redirect('/articles/' + createdComment.articleId);
  });
});

module.exports = router;
