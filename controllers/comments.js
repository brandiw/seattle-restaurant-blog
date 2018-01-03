var express = require('express');
var router = express.Router();
var db = require('../models');

router.post('/', function(req, res){
  console.log('req.body', req.body);
  res.send('comments post route stub');
});

module.exports = router;
