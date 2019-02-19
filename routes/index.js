var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());


// app.get('/', function(req, res){
//   res.cookie('myCookie', 'cookieValue');
//   res.end('Helloooo');
// });



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
