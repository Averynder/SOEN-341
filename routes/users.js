var express = require('express');
var mysql = require('mysql2');
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
	connection.query('select `Password` from `account user`', function (error, results, fields) {
	if (error) throw error;
	console.log('Operation is: ', results);
	});
	res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
})
/* Script to place time in correct spot and format*/
app.get('/', (req, res) => {
    res.send('<script>var r=new Date().valueOf() + ( ' + (new Date().getTimezoneOffset()) +
        ' - (new Date().getTimezoneOffset()) ) * -60000;' +
        'setInterval(()=>{document.body.innerHTML = (new Date(r+=1000)).toLocaleString("en",{weekday:"long", month:"long", day:"numeric", year:"numeric", hour:"numeric", minute:"numeric", second:"numeric", hour12:false})},1000);' +
        '</script>');
});

module.exports = app;
connection.end;
