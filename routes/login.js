var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var app = express();
var Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
})

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection works");
    })
    .catch(err => {
        console.log('Unable to connect!', err);
    });

router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
});
