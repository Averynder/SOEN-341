var express = require('express');
var mysql = require('mysql2');
var app = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('soen341', 'root', 'password', {
	host: 'localhost',
	dialect: 'mysql'
});
const User = sequelize.import(__dirname + '/../models/user');

var connection = mysql.createConnection({
	connectionLimit: 20,
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'soen341'
});

connection.connect();
connection.query('select * from `Users`', function(error, results, fields) {
    if(error) throw error;
    console.log('The solution is: ', results);
});




/* GET users listing. */
app.get('/', function(req, res, next) {
	User
		.findOne()
		.then(function(user) {
			console.log(user.id);
			console.log(user.netname);
			console.log(user.password);
	});
	res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
})



module.exports = app;
connection.end;
