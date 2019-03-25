var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var async = require('async');
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')
var cors = require('cors')
var session = require('express-session');
var logger = require('morgan');
//var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var mysql = require("mysql2");
// This class will run the DB script when called
var DBcheck = require('./routes/DBcheck');


var databaseRefresh = new DBcheck;

var connection = mysql.createConnection({
	connectionLimit: 20,
	host: "127.0.0.1",
	user: "root",
	password: "password",
	database: "soen341"
});
connection.connect();

var cookiesRouter = require('./routes/cookiesV');
var https = require('https');
var rompt =require('prompt');
var fs = require('fs');
var bodyParser = require('body-parser');
const Course = require('./routes/Course');
const MyDoublyLinkedList = require('./routes/MyDoublyLinkedList');
// require('users.js')();

// usersRouter.runDatabase();

const LectureSequence = require('./routes/LectureSequence');
const LabSequence = require('./routes/LabSequence');
const TutorialSequence = require('./routes/TutorialSequence');


const Stack = require('./routes/Stack');
const SpanningTree = require('./routes/SpanningTree');
var app = express();
var waterfall = require('async-waterfall');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cors());
//app.use(passport.initialize());
//app.use(passport.session());

// var user = new usersRouter;



//require('./passport') // importing passport.js with as a parameter the imported passport library from above
const selenium = require('./selenium'); // importing passport.js with as a parameter the imported passport library from above

function hasLoggedIn(req, res, next) {
  if (req.session.info) {
    return next();
  }

  res.sendStatus(401);
}

app.post('/concordia', function (req, res, next) {
  try {
    selenium.login(req.body.netname, req.body.password)
      .then(info => {
        if (!info) {
          res.sendStatus(401);
        } else {
          req.session.info = JSON.parse(info);
          res.sendStatus(200);
        }
      });
  } catch (err) {
    console.log(err);
  }
});

app.get('/grades', hasLoggedIn, (req, res, next) => {
  res.send(req.session.info);
});

app.get('/logout', hasLoggedIn, (req, res, next) => {
  req.session.destroy(err => console.log(err));
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

app.get("/seqQuery", function(req, res, next) {
	async.waterfall([
		function(callback){
			// do this first
			connection.query("SELECT * FROM `course`", function (err, result, fields) {
				if (err) throw err;
				callback(null, result);
			});

		},
		function(arg1, callback){
			// do this 2nd
			res.json
			(
				JSON.stringify([
					{
						result2: arg1,
					},
				])
			);
		}
	]);
});
app.get("/semQuery", function(req, res, next) {
	async.waterfall([
		function(callback){
			connection.query("SELECT * FROM `laboratory`", function (err, result, fields) {
				if (err) throw err;
				callback(null, result);
			});

		},
		function(arg1, callback){
			connection.query("SELECT * FROM `lecture`", function (err, result, fields) {
				if (err) throw err;
				callback(null, arg1, result);
			});

		},
		function(arg1, arg2, callback){
			async.waterfall([
				function(callback){
					connection.query("SELECT * FROM `tutorial`", function (err, result, fields) {
						if (err) throw err;
						callback(null, result);
					});

				},
				function(arg3, callback)
				{
					async.waterfall([
						function(callback){
							// do this first
							connection.query("SELECT * FROM `course`", function (err, result, fields) {
								if (err) throw err;
								callback(null, result);
							});

						},
						function(arg4, callback){
							// do this 2nd
							res.json
							(
								JSON.stringify([
									{
										lectures: arg2,
										tutorials: arg3,
										labs: arg1,
										result2: arg4,
									},
								])
							);
						}
					]);
					/*
					res.json
					(
						JSON.stringify([
							{
								lectures: arg2,
								tutorials: arg3,
								labs: arg1,
							},
						])
					);
					*/
				},
			]);
		}
	]);
});

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));


// view engine setup (keep this)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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

	databaseRefresh.runDatabase();


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

};






// var testme = new DBcheck;
// var courselisty = new MyDoublyLinkedList();
//
//
// async.waterfall([task100,task200], function() {
// 	console.log('tasks done!');
// });
//
//
//
// function task100(done) {
// 	console.log('1. Lets delete old db');
//
// 	testme.runDatabase();
//
// 	done();
//
// };
//
//
// function task200(done) {
// 	console.log('1. Lets delete old db');
//
//
// 	console.log("test ");
//
// 	done();
//
// };



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
