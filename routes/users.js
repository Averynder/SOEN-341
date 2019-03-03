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
connection.query('CALL ValidateEngineer();', function(error, results, fields) {
    if(error) throw error;
    console.log('The solution is: ', results);
});

// Server time, intially local time
var time = (new Date()).toLocaleString("en",{weekday:"long", month:"long", day:"numeric", year:"numeric", hour:"numeric", minute:"numeric", second:"numeric", hour12:false});
	// Reinitialization of time to keep it updated
	setInterval(() => {time = (new Date()).toLocaleString("en",{weekday:"long", month:"long", day:"numeric", year:"numeric", hour:"numeric", minute:"numeric", second:"numeric", hour12:false})},1000);


/* GET users listing. Do we still need this? 
app.get('/', function(req, res, next) {
	// Modify this query for the desired action on the database
	connection.query('select `Password` from `account user`', function (error, results, fields) {
	if (error) throw error;
	console.log('Operation is: ', results);
	});
	res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
})
*/
/* Database entries
var rl = require('readline').createInterface({

input : require('fs').createReadStream('catalogfix.txt')
});

rl.on('line', function(line) {
	var a = 10;
	var b = 14;
	var c = 27;
	var d = 30;
if (line.search(/(subject":".....,"catalog":.{5},)/) >= 0) {
	var classNumber = line.substring(line.search(/(subject)/)+a,line.search(/(subject)/)+b)+" "+line.substring(line.search(/(subject)/)+c,line.search(/(subject)/)+d);
	var a = 11;
	var b = 15;
	var c = 28;
	var d = 31;
	var courseTitle = line.substring(line.search(/(title)/)+8,line.search(/(","subject")/));
	var credits = line.substring(line.search(/(Unit)/)+7,line.search(/(Unit)/)+11)
	//var prereqs = line.substring(line.search(/(Course Prerequisite: )/)+21,line.lastIndexOf(/(",")/))
	//var coreqs =line.substring(line.search(/(Corequisite:)/)+a,line.search(/(; )/))
	connection.query("INSERT INTO `course`(classNumber,courseTitle,credits) VALUES("+classNumber+", "+courseTitle+", "+credits+")", function(error, results, fields) {
    if(error) throw error;
	console.log("Succesfully inserted: Title: "+ courseTitle+" classNumber: "+classNumber+" credits: "+credits);
	});
}
if (line.search(/(subject":".....,"catalog":.{6},)/) >= 0) {
	var a = 10;
	var b = 14;
	var c = 27;
	var d = 31;
	var classNumber = line.substring(line.search(/(subject)/)+a,line.search(/(subject)/)+b)+" "+line.substring(line.search(/(subject)/)+c,line.search(/(subject)/)+d);
	var courseTitle = line.substring(line.search(/(title)/)+8,line.search(/(","subject")/));
	var credits = line.substring(line.search(/(Unit)/)+7,line.search(/(Unit)/)+11)
	//var prereqs = line.substring(line.search(/(Course Prerequisite: )/)+21,line.lastIndexOf(/(",")/))
	//var coreqs =line.substring(line.search(/(Corequisite:)/)+a,line.search(/(; )/))
	connection.query("INSERT INTO `course`(classNumber,courseTitle,credits) VALUES("+classNumber+", "+courseTitle+", "+credits+")", function(error, results, fields) {
    if(error) throw error;
	console.log("Succesfully inserted: Title: "+ courseTitle+" classNumber: "+classNumber+" credits: "+credits);
	});
}    
}).on('close', function() {
    console.log('Inserted all courses.');
});
*/
app.get('/niels', (req, res, next)=>{
	res.json(time);
});

module.exports = app;
connection.end;
