var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var app = express();
var Sequelize = require('sequelize');
var passport = require('passport');

const config = require('../config/config.json');
const bodyParser = require('body-parser');

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

app.use(
    bodyParser.urlencoded({
        extended: true
    }),
    bodyParser.json()
);


sequelize
    .authenticate()
    .then(() => {
        console.log("Connection works");
    })
    .catch(err => {
        console.log('Unable to connect!', err);
    })

router.post('/', function(req, res, next) {
    console.log('POST req received');
    console.log('setting cookie.username to: ' + req.body.username);
    res.cookie('username', req.body.username, { httpOnly: true });
    console.log('setting cookie.password to: ' + req.body.password);
    res.cookie('password', req.body.password, { httpOnly: true });
    console.log(req.body);
    /*passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        redirect('/');
    });
    */
    next();
});

router.get('/', function(req, res, next) {
    res.json(
    User.findOne({
        attributes: ['id', 'username'] // SELECT id, username
    })
    .then(user => {
        console.log(user.dataValues['username']);
    }));
    res.end();
});

module.exports = router;
