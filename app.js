var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')
var cors = require('cors')
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var cookiesRouter = require('./routes/cookiesV');
var MyDoublyLinkedList = require('./routes/MyDoublyLinkedList');
var https = require('https');
var rompt =require('prompt');
var fs = require('fs');
var bodyParser = require('body-parser');
var Course = require('./routes/Course');

var app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
	secret: 'keyboard cat',
	saveUninitialized: false,
	resave: false,
	cookie: {
		maxAge: 1000 * 60 * 60 // 1 hour
	}
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


var sequelize = require('./sequelize'); // get running instance of Sequelize
require('./passport')(passport, sequelize); // importing passport.js with as a parameter the imported passport library from above

app.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) {
			res.end('/home');
		} else {
			req.login(user, function(error) {
				res.end('/');
			});
		}
	})(req, res, next);
});

app.get('/logout', (req, res, next) => {
	req.logout();
	res.end();
});

app.get('/check', function(req, res, next) {
	if (req.user) { console.log('logged in'); }
	if (!req.user) { console.log('logged out'); }
	res.end();
});

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
		"netname": req.cookies.netname,
		"password": req.cookies.password
	});
});

app.get('/concordia', function(req, res) {
	https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/000106', (response) => {
		response.on('data', (d) => {
			process.stdout.write(d);
		});
	}).on('error', (e) => {
		console.log(e);
	});

	//Scanner type variable to choose discipline
	var schema ={
		properties:{
			choice:{
				message:"COMP OR SOEN"
			}
		}
	};
	rompt.start()
	rompt.get(schema, function (err, result) {

	// SOEN COURSES
	if (result.choice == "SOEN")
	{

		https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/schedule/filter/*/SOEN/*', (response) => {
		response.on('data', (d) => {
			// START here
			fs.writeFile('routes/SOENschedule.txt', d, (err) => {
				if (err) throw err;
				console.log('Schedule written!');
			});
		});
		}).on('error', (e) => {
			console.log(e);
			});

		https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/catalog/filter/SOEN/*/*', (response) => {
		response.on('data', (d) => {
			process.stdout.write(d);
			fs.writeFile('routes/SOENcatalog.txt', d, (err) => {
				if (err) throw err;
				console.log('Catalog written!');
				fs.readFile('routes/SOENcatalog.txt', 'utf-8', function(err, data){
					if (err) throw err;
					var fix = data.replace(/},/gim, '},\n');
					fs.writeFile('routes/SOENcatalog.txt', fix, 'utf-8', function (err) {
					if (err) throw err;
					console.log('Catalog is ordered');
					});
				});
			});
		});
		}).on('error', (e) => {
			console.log(e);
			});
	res.end();
	}
	// COMP COURSES
	if (result.choice == "COMP"){
		https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/schedule/filter/*/COMP/*' , (response) => {
		response.on('data', (d) => {
			fs.writeFile('routes/COMPschedule.txt', d, (err) => {
				if (err) throw err;
				console.log('Schedule written!');
			});
		});
		}).on('error', (e) => {
			console.log(e);
			});
		https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/catalog/filter/COMP/*/*', (response) => {
		response.on('data', (d) => {
			process.stdout.write(d);
			fs.writeFile('routes/COMPcatalog.txt', d, (err) => {
				if (err) throw err;
				console.log('\nCatalog written!\n');
			});
			fs.readFile('routes/COMPcatalog.txt', 'utf-8', function(err, data){
			if (err) throw err;
				var fix = data.replace(/},/gim, '},\n');
				fs.writeFile('routes/COMPcatalog.txt', fix, 'utf-8', function (err) {
				if (err) throw err;
					console.log('Catalog is ordered');
				});
			});
		});
		}).on('error', (e) => {
			console.log(e);
			});
	res.end();
	}
	})



});

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));


// view engine setup (keep this)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/MyDoublyLinkedList',MyDoublyLinkedList);
app.use('/Course',Course);

//app.use('/login', loginRouter);

var fileUploaded = {};

app.post('/upload', (req,res,next) => {

 var filedata = req.body.contentFile;
 var filename = req.body.filename;
 console.log("file name: ", filename);
 console.log("file content: ", filedata);
 fileUploaded[filename] = filedata; //if you wanna use it later...
  res.end()
})

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
