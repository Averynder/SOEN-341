var express = require('express');
var router = express.Router();
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
		connectionLimit: 20,
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'soen341'
});

connection.connect();
connection.query('select 1+1 as solution', function(error, results, fields) {
    if(error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();

// Listen to POST requests to /users.
app.post('/users', function(req, res) {
  // Get sent data.
  var user = req.body;
  // Do a MySQL query.
  var query = connection.query('INSERT INTO `account user` SET ?', user, function(err, result) {
    // Neat!
  });
  res.end('Success');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

// /* GET users listing. */
// router.get('/', function(req, res, next) {
// 	// Comment out this line:
//   //res.send('respond with a resource');
//
//   // And insert something like this instead:
//   res.json([{
//   	id: 1,
//   	username: "samsepi0l"
//   }, {
//   	id: 2,
//   	username: "D0loresH4ze"
//   }]);
// });

module.exports = router;
