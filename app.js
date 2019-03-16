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
var https = require('https');
var rompt =require('prompt');
var fs = require('fs');
var bodyParser = require('body-parser');
const Course = require('./routes/Course');
const MyDoublyLinkedList = require('./routes/MyDoublyLinkedList');

const LectureSequence = require('./routes/LectureSequence');
const LabSequence = require('./routes/LabSequence');
const TutorialSequence = require('./routes/TutorialSequence');


const Stack = require('./routes/Stack');
const SpanningTree = require('./routes/SpanningTree');
var app = express();
var waterfall = require('async-waterfall');
//require('./selenium')(app);

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

// Handles the User Login Requests and Launches Selenium
var { Builder, By, Key, until } = require('selenium-webdriver');
var chrome = require('selenium-webdriver/firefox');

app.post('/Selenium', function(req,res,next) {
	var stringy = null;
	let driver = new Builder().forBrowser('firefox')
	//.setChromeOptions(new chrome.Options().headless()) // invisible chrome
		.setFirefoxOptions().build();
	try {
		let getDriver = new Promise(function (resolve, reject) {
			resolve(driver.get('https://my.concordia.ca/psp/upprpr9/?cmd=login&device=mobile')
			//.then(_ => driver.findElement(By.name('userid')).sendKeys(req.params.netname))
			//.then(_ => driver.findElement(By.name('pwd')).sendKeys(req.params.password, Key.RETURN)))
				.then(_ => driver.findElement(By.name('userid')).sendKeys(req.body.netname))
				.then(_ => driver.findElement(By.name('pwd')).sendKeys(req.body.password, Key.RETURN)))
		});
		getDriver.then(function (whateverwasresolved) {
			console.log("Got Inside1!");
			let getNetName = new Promise(function (resolve, reject) {
				resolve(sleep(30));
				//resolve(driver.wait(until.elementLocated(By.id('btnGrade')), 20000))
			});
			getNetName.then(function (whateverisreturnedfromnetname) {
				console.log("Got Inside2!");
				let getNetName2 = new Promise(function (resolve, reject) {
					resolve(driver.findElement(By.id('btnGrade')).click())
				});
				getNetName2.then(function (whateverisreturnedfromnetname) {
					console.log("Got Inside3!");
					//
					let getNetName3 = new Promise(function (resolve, reject) {
						resolve(sleep(30))
					});
					getNetName3.then(function (whateverisreturnedfromnetname) {
						console.log("Got Inside4!");
						//
						let getNetName4 = new Promise(function (resolve, reject) {
							resolve(driver.findElement(By.id('btnAllGrades')).click())
						});
						getNetName4.then(function (whateverisreturnedfromnetname) {
							console.log("Scrape Time!");
							driver.findElements(By.className("course mainsec")).then(function (elems) {
								var stringy = "";
								elems.forEach(function (elem) {
									elem.getText().then(function (textValue) {
										stringy += textValue;
										fs.writeFile('routes/PrevCourses.txt', stringy, 'utf-8', function (err) {
											if (err) throw err;
											console.log('Previous Courses are being gotten');
										});
										console.log(textValue); // Insert / Do Stuff From this point
									});
								});
							});
							/*
							let getNetName5 = new Promise(function(resolve,reject)
							{
								resolve(sleep(20))
							});
							getNetName5.then(function(whateverisreturnedfromnetname)
							{
								console.log("terminating");
								callback(null, stringy);
							});
							*/
						});
						//
					});
					//
				}).catch(function (rej) {
					//here when you reject the promise
					console.log("Failed to Login");
					driver.quit();
				});
			});
		});
	} catch (err) {
		console.log(err);
	} finally {
		res.end();
	}
});

function sleep(seconds)
{
	var e = new Date().getTime() + (seconds * 1000);
	while (new Date().getTime() <= e) {}
}
function regexPreviousCourses(stringy)
{
	console.log(stringy);
}


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
	/*https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/description/filter/000106', (response) => {
		response.on('data', (d) => {
			process.stdout.write(d);
		});
	}).on('error', (e) => {
		console.log(e);
	});*/

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
		{	https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/catalog/filter/SOEN/*/*', (response) => {
			response.on('data', (d) => {
				process.stdout.write(d);
				fs.writeFile('routes/SOENcatalog.txt', d, (err) => {
					if (err) throw err;
					console.log('Catalog written!');
					fs.readFile('routes/SOENcatalog.txt', 'utf-8', function(err, data){
						if (err) throw err;
						var fix = data.replace(/},{/gim, '},\n{');
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

			https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/schedule/filter/*/SOEN/*', (response) => {
				response.on('data', (d) => {
					fs.appendFile('routes/SOENschedule.txt', d, (err) => {
						if (err) throw err;
						console.log('Schedule written!');
						fs.readFile('routes/SOENschedule.txt', 'utf-8', function(err, data){
							if (err) throw err;
							var fix = data.replace(/},{/gim, '},\n{');
							fs.writeFile('routes/SOENschedule.txt', fix, 'utf-8', function (err) {
								if (err) throw err;
								console.log('Schedule is ordered');
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
		if (result.choice == "COMP")
		{
			https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/catalog/filter/COMP/*/*', (response) => {
				response.on('data', (d) => {
					process.stdout.write(d);
					fs.appendFile('routes/COMPcatalog.txt', d, (err) => {
						if (err) throw err;
						console.log('Catalog written!');
						fs.readFile('routes/COMPcatalog.txt', 'utf-8', function(err, data){
							if (err) throw err;
							var fix = data.replace(/},{/gim, '},\n{');
							fs.writeFile('routes/COMPcatalog.txt', fix, 'utf-8', function (err) {
								if (err) throw err;
								console.log('Catalog is ordered');
							});
						});
					});
				});
			}).on('error', (e) => {
				console.log(e);
			});
			https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/schedule/filter/*/COMP/*', (response) => {
				response.on('data', (d) => {
					fs.appendFile('routes/COMPschedule.txt', d, (err) => {
						if (err) throw err;
						console.log('Schedule written!');
						fs.readFile('routes/COMPschedule.txt', 'utf-8', function(err, data){
							if (err) throw err;
							var fix = data.replace(/},{/gim, '},\n{');
							fs.writeFile('routes/COMPschedule.txt', fix, 'utf-8', function (err) {
								if (err) throw err;
								console.log('Schedule is ordered');
							});
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
app.use('/LectureSequence',LectureSequence);
app.use('/LabSequence',LabSequence);
app.use('/TutorialSequence',TutorialSequence);


app.use('/Stack',Stack);
app.use('/SpanningTree',SpanningTree);
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
// Server time, intially local time
var time = new Date().toLocaleString("en", {
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false
});
// Reinitialization of time to keep it updated
setInterval(() => {
  time = new Date().toLocaleString("en", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  });
}, 1000);

//Time for Update
var updateTime = new Date("March 12, 8:00").toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  });
 var FirstRun ={
		properties:{
			run:{
				message:"Do you want to refresh(YES/NO)"
			}
		}
	};
	rompt.start()
	rompt.get(FirstRun, function (err, result){		
if(time == updateTime || result.run == "YES"){
	databaseRefresh();
}else{
	console.log("Current time is "+time+", next mandatory update is "+updateTime);
};
	});
setInterval(()=>{ if(time == updateTime){databaseRefresh();}}, 60000);
	
databaseRefresh = ()=>{
	// Need to add means of opening localhost3001/concordia
	console.log("Updating")
	app.get('/concordia', function(req, res) {
		https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/schedule/filter/*/SOEN/*', (response) => {
			response.on('data', (d) => {
				fs.writeFileSync('routes/SOENschedule.txt', d, (err) => {
					if (err) throw err;
					console.log('SOEN Schedule updated!');
				});
			});
		}).on('error', (e) => {
				console.log(e);
				});
		https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/catalog/filter/SOEN/*/*', (response) => {
			response.on('data', (d) => {
				fs.writeFileSync('routes/SOENcatalog.txt', d, (err) => {
					if (err) throw err;
					console.log('SOEN Catalog updated!');
					fs.readFileSync('routes/SOENcatalog.txt', 'utf-8', function(err, data){
						if (err) throw err;
						var fix = data.replace(/},/gim, '},\n');
							fs.writeFileSync('routes/SOENcatalog.txt', fix, 'utf-8', function (err) {
							if (err) throw err;
							console.log('SOEN Catalog is ordered');
							});
					});
				});
			});
		}).on('error', (e) => {
			console.log(e);
			});
			
		https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/schedule/filter/*/COMP/*', (response) => {
			response.on('data', (d) => {
				fs.writeFileSync('routes/COMPschedule.txt', d, (err) => {
					if (err) throw err;
					console.log('COMP Schedule updated!');
					});
			});
		}).on('error', (e) => {
				console.log(e);
				});
		https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/catalog/filter/COMP/*/*', (response) => {
			response.on('data', (d) => {
				fs.writeFileSync('routes/COMPcatalog.txt', d, (err) => {
					if (err) throw err;
					console.log('COMP Catalog updated!');
						fs.readFileSync('routes/COMPcatalog.txt', 'utf-8', function(err, data){
							if (err) throw err;
							var fix = data.replace(/},/gim, '},\n');
							fs.writeFileSync('routes/COMPcatalog.txt', fix, 'utf-8', function (err) {
								if (err) throw err;
								console.log('COMP Catalog is ordered');
							});
						});
				});
			});
		}).on('error', (e) => {
			console.log(e);
			});
	res.end();
	});
	// then re-initialize the database variables with regex and then remove old entries
	// then add new entries
	console.log("Finished Updating");
}

// Tests to try two classes
// var tryme = new Course("lol","lol","lol","lol","lol","lol");
// tryme.catalog = "nahh";
// console.log("new catalog value:");
// console.log(tryme.catalog);
//
//
// var trythis = new MyDoublyLinkedList();
// trythis.addLast(10);
// trythis.addLast(11);
// trythis.addLast(12);
// trythis.addLast(13);
// console.log("LL size before delete:");
// console.log(trythis.size);
// trythis.remove(12);
// console.log("LL size after delete:");
// console.log(trythis.size);


module.exports = app;
