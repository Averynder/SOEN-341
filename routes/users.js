var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

/*
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'test'
});

connection.connect();
connection.query('select 1+1 as solution', function(error, results, fields) {
    if(error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();
*/



/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
  next();
});



module.exports = router;
