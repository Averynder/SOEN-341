var express = require('express');
var mysql = require('mysql2');
var app = express();


/* GET users listing. */
app.get('/', function(req, res, next) {
	res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
})



module.exports = app;
