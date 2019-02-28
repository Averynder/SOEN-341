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
var https = require('https');
var readlineSync = require('readline-sync');


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

// Get Course Descriptions
app.get('/opendata', function(req, res) {
	//Scanner type variable to choose discipline
	var choice = readlineSync.question("COMP or SOEN ");
	// SOEN COURSES
	if (choice == "SOEN"){	
		for(i=0;i<46;i++){
			var w = 32001;	
			w = w+i;	
			var x = 'https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/0'+w;	
			https.get(x, (response) => {
				response.on('data', (d) => {
					process.stdout.write('\n'+d+'\n');
						});
			}).on('error', (e) => {
				console.log(e);
				});
		}
		var rem = [42553, 44220, 44221, 47100, 47101, 47209, 47979, 48218, 48693, 48873, 48957, 49308];
		for(i=0;i<rem.length;i++){
			var x = 'https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/0'+rem[i];	
			https.get(x, (response) => {
				response.on('data', (d) => {
					process.stdout.write('\n'+d+'\n');
						});
			}).on('error', (e) => {
				console.log(e);
				});
		}
	}
	
	// COMP COURSES
	else{
		// Added choice for levels or else the result is too big for console
		var level = readlineSync.question("100,200,300,400 or GRAD?");
		if (level = "100"){
			https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/040329', (response) => {
				response.on('data', (d) => {
					process.stdout.write('\n'+d+'\n');
						});
			}).on('error', (e) => {
				console.log(e);
				});	
		}
			if(level = "200"){
				for(i=0;i<38;i++){
					var w = 5326;	
					w = w+i;	
					var x = 'https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/00'+w;	
					https.get(x, (response) => {
						response.on('data', (d) => {
							process.stdout.write('\n'+d+'\n');
								});
					}).on('error', (e) => {
						console.log(e);
						});
				}	
				https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/0403331', (response) => {
					response.on('data', (d) => {
						process.stdout.write('\n'+d+'\n');
					});
				}).on('error', (e) => {
					console.log(e);
					});
			}			
			
				if(level = "300"){
					for(i=0;i<25;i++){
					var w = 5391;	
					w = w+i;	
					var x = 'https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/00'+w;	
					https.get(x, (response) => {
						response.on('data', (d) => {
							process.stdout.write('\n'+d+'\n');
							});
					}).on('error', (e) => {
						console.log(e);
						});
					}	
				}
					if (level = "400"){
						for(i=0;i<47;i++){
						var w = 5446;	
						w = w+i;	
						var x = 'https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/00'+w;	
						https.get(x, (response) => {
							response.on('data', (d) => {
								process.stdout.write('\n'+d+'\n');
								});
						}).on('error', (e) => {
							console.log(e);
							});
						}
					}
					if (level = "GRAD"){
						for(i=0;i<36;i++){
						var w = 5500;	
						w = w+i;	
						var x = 'https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/00'+w;	
						https.get(x, (response) => {
							response.on('data', (d) => {
								process.stdout.write('\n'+d+'\n');
							});
						}).on('error', (e) => {
							console.log(e);
							});
							
						}
						for(i=0;i<31;i++){
						var w = 5567;	
						w = w+i;	
						var x = 'https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/00'+w;	
						https.get(x, (response) => {
							response.on('data', (d) => {
								process.stdout.write('\n'+d+'\n');
							});
						}).on('error', (e) => {
							console.log(e);
							});	
						}
						var rem = [5603, 5605, 5615, 5617, 5619, 5620, 5621, 5625, 5656, 5661, 5702, 5703, 5720, 5724, 5731];
						for(i=0;i<rem.length;i++){
							var x = 'https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/00'+rem[i];	
							https.get(x, (response) => {
								response.on('data', (d) => {
									process.stdout.write('\n'+d+'\n');
								});
							}).on('error', (e) => {
								console.log(e);
								});
	
						}
						for(i=0;i<29;i++){
						var w = 40329;	
						w = w+i;	
						var x = 'https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/0'+w;	
						https.get(x, (response) => {
							response.on('data', (d) => {
								process.stdout.write('\n'+d+'\n');
							});
						}).on('error', (e) => {
							console.log(e);
							});
						}
						var rem = [44019, 46579, 46580, 46581, 46582, 46583, 46584, 46585, 46586, 47980, 48285, 48454, 48956, 48967,49296, 49309, 49310];
						for(i=0;i<rem.length;i++){
							var x = 'https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/0'+rem[i];	
								https.get(x, (response) => {
									response.on('data', (d) => {
										process.stdout.write('\n'+d+'\n');
									});
								}).on('error', (e) => {
									console.log(e);
									});
						}
					}
	}						
	res.end();
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
