var express = require('express');
var mysql = require('mysql2');
var app = express();
var fs = require('fs');

var connection = mysql.createConnection({
	connectionLimit: 20,
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'soen341'
});

connection.connect();
connection.query('SELECT*FROM `teacher`;', function(error, results, fields) {
    if(error) throw error;
    console.log('The solution is: ', results);
});
/*
connection.query('CALL ValidateEngineer();', function(error, results, fields) {
    if(error) throw error;
    console.log('The solution is: ', results);
});
*/

// Server time, intially local time
var time = (new Date()).toLocaleString("en",{weekday:"long", month:"long", day:"numeric", year:"numeric", hour:"numeric", minute:"numeric", second:"numeric", hour12:false});
	// Reinitialization of time to keep it updated
	setInterval(() => {time = (new Date()).toLocaleString("en",{weekday:"long", month:"long", day:"numeric", year:"numeric", hour:"numeric", minute:"numeric", second:"numeric", hour12:false})},1000);


// Database entries
if(false) {
	var rl = require('readline').createInterface({
		input : require('fs').createReadStream('routes/SOENcatalog.txt')
	});

	rl.on('line', function(line) {
    var a = 10;
    var b = 14;
		var c = 27;
		var d = 30;
		if ((line.search(/("career":"UGRD")/) >= 0) &&
			(line.search(/(Course Co-requisite)/) == -1 ) &&
			(line.search(/(Course Corequisite)/) == -1 )) {
			var classNumber = line.substring(line.search(/(subject)/)+a,line.search(/(subject)/)+b)+" "+line.substring(line.search(/(subject)/)+c,line.search(/(subject)/)+d);
			var a = 11;
			var b = 15;
			var c = 28;
			var d = 31;
			var courseTitle = line.substring(line.search(/(title)/)+8,line.search(/(","subject")/));
			var credits = line.substring(line.search(/(Unit)/)+7,line.search(/(Unit)/)+11)
			var prereqs = line.substring(line.search(/(Prerequisite:)/)+13,line.search('","crosslisted'));
			var coreqs = null;
			/*connection.query("INSERT INTO `course`(classNumber,courseTitle,credits) VALUES("+classNumber+", "+courseTitle+", "+credits+")", function(error, results, fields) {
				if(error) throw error;*/
			console.log(/*"Succesfully inserted: Title: "+ courseTitle+" classNumber: "+classNumber+" credits: "+credits*/" prereqs: "+prereqs);
			//});
		}
		if ((line.search(/("career":"GRAD")/) >= 0) &&
			(line.search(/(Course Co-requisite)/) == -1) &&
			(line.search(/(Course Corequisite)/) == -1)) {
			var a = 10;
			var b = 14;
			var c = 27;
			var d = 31;
			var classNumber = line.substring(line.search(/(subject)/)+a,line.search(/(subject)/)+b)+" "+line.substring(line.search(/(subject)/)+c,line.search(/(subject)/)+d);
			var courseTitle = line.substring(line.search(/(title)/)+8,line.search(/(","subject")/));
			var credits = line.substring(line.search(/(Unit)/)+7,line.search(/(Unit)/)+11)
			var prereqs = line.substring(line.search(/(Prerequisite:)/)+13,line.search('","crosslisted'));
			var coreqs =null;
			/*connection.query("INSERT INTO `course`(classNumber,courseTitle,credits) VALUES("+classNumber+", "+courseTitle+", "+credits+")", function(error, results, fields) {
				if(error) throw error;*/
			console.log(/*"Succesfully inserted: Title: "+ courseTitle+" classNumber: "+classNumber+" credits: "+credits+*/" prereqs: "+prereqs);
			//});
		}
	});
}

/* GET users listing. */
app.get('/', function(req, res, next) {
  res.json([{
    time: time,
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});



module.exports = app;
