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


connection.query('select* from `account user`', function(error, results, fields) {
    if(error) throw error;
    console.log('The solution is: ', results);
});

connection.end();

// GET users listing. 
router.get('/users', function(req, res, next) {
	// Comment out this line:
  res.send('respond with a resource');
  // And insert something like this instead:
  res.json([{
  	Netname: "D0loresH4ze",
  	Password: "samsepi0l"
  }]);
});



// Listen to POST requests to /users.
app.post('/users', function(req, res) {
  // Get sent data.
  var user = req.body;
  // Do a MySQL query.
  var query = connection.query('INSERT INTO `account user`(`Netname, `Password`)values("D0loresH4ze","samsepi0l")', user, function(err, result) {
    // Neat!
  });
  res.end('Success');
});

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});

module.exports = router;
