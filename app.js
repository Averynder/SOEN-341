var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var cookiesRouter = require('./routes/cookiesV');
// var bodyParser = require('body-parser');


var app = express();

app.use(cookieParser());
app.use(session({secret: "Testing secret session."}));


// set a cookie with random number as ID
// we should link this id to the given username/password input
app.use(function (req, res, next) {
  // checks if the client has sent cookie
  var cookie = req.cookies.cookieID;
  // creates new cookies if there isn't already one
  if (cookie === undefined) {
    // the username and password below should be eventually linked to the user input
    var randomID = 2;
    res.cookie('cookieID', randomID, { httpOnly: true });
    // res.cookie('cookieID2', 'password', { httpOnly: true });
    console.log('cookie has been set');
  } else {
    console.log('cookie already exists', cookie);
  }
  next();
});

// This sets a session for when the user visits a site. This session remembers the number of visits.
app.get('/api', function(req, res){
  if(req.session.userVisits){
    req.session.userVisits++;
  } else {
    req.session.userVisits = 1;
  }
	res.json({
		"visits": req.session.userVisits,
		"cookie": req.cookies.cookieID,
		"username": req.cookies.username,
		"password": req.cookies.password
	});
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
			if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (!user.validPassword(password)) {
					return done(null, false, { message: 'Incorrect password.' });
				}
			return done(null, user);
		});
	}
));

app.use(express.static(__dirname + '/public'));


//app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    //failureRedirect: '/login' }));


// view engine setup (keep this)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler  (keep this)
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
