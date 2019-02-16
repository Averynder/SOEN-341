var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var app = express();
var Sequelize = require('sequelize');

const config = require('../config/config.json');

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        operatorsAliases: config.development.operatorsAliases,
    }
);

const User = sequelize.define('Users', {});


sequelize
    .authenticate()
    .then(() => {
        console.log("Connection works");
    })
    .catch(err => {
        console.log('Unable to connect!', err);
    })

router.get('/', function(req, res, next) {
    res.json(
    User.findOne({
        attributes: ['id', 'username'] // SELECT id, username
    })
    .then(user => {
        console.log(user.dataValues['username']);
    }));
    res.end();
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
});

module.exports = router;
