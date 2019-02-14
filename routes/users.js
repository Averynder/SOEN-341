var express = require('express');
var mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({
	connectionLimit: 20,
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'soen341'
});

connection.connect();
connection.query('select * from `account user`', function(error, results, fields) {
    if(error) throw error;
    console.log('The solution is: ', results);
});



/* GET users listing. */
app.get('/', function(req, res, next) {
	// Modify this query for the desired action on the database
	connection.query('INSERT INTO `account user`(`Netname`, `Password`) values ("D0loresH4ze","samsepi0l")', function (error, results, fields) {
	if (error) throw error;
	res.send/*(JSON.stringify(results))-This will show the results in the web page itself, uncomment to try*/;
	});
})


app.listen(3000, function() {
  console.log('Listening on port 3000!');
});
module.exports = app;
connection.end;


