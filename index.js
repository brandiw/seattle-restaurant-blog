//Require the stuff I need, make any global variables I need
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var moment = require('moment');
var app = express();
var db = require('./models');

//Set and Use statements to set set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));
app.use(function(req, res, next){
  res.locals.moment = moment;
  next();
});

//Controllers
app.use('/articles', require('./controllers/articles.js'));
app.use('/authors', require('./controllers/authors.js'));
app.use('/comments', require('./controllers/comments.js'));

//Routes
app.get('/', function(req, res){
  res.render('home');
});

//Listen on port 3000
app.listen(3000);
