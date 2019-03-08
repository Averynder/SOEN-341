var express = require("express");
var mysql = require("mysql2");
var app = express();
var fs = require("fs");
var rompt =require('prompt');

var connection = mysql.createConnection({
  connectionLimit: 20,
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "soen341"
});

connection.connect();
connection.query("SELECT*FROM `teacher`;", function(error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results);
});
/*
connection.query('CALL ValidateEngineer();', function(error, results, fields) {
    if(error) throw error;
    console.log('The solution is: ', results);
});
*/

// Server time, intially local time
var time = new Date().toLocaleString("en", {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false
});
// Reinitialization of time to keep it updated
setInterval(() => {
  time = new Date().toLocaleString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  });
}, 1000);

//Time for Update
var updateTime = new Date("March 12, 8:00").toLocaleDateString("en", {
    weekday: "long",
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
	console.log("Curent time is "+time+", next mandatory update is "+updateTime);
};
	});
databaseRefresh = ()=>{
	// Need to add means of opening localhost3001/concordia
	app.get('/concordia', function(req, res) {
		https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/schedule/filter/*/SOEN/*', (response) => {
			response.on('data', (d) => {
				fs.writeFileSync('routes/SOENscheduleUPD.txt', d, (err) => {
					if (err) throw err;
					console.log('SOEN Schedule updated!');
				});
			});
		}).on('error', (e) => {
				console.log(e);
				});
		https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/catalog/filter/SOEN/*/*', (response) => {
			response.on('data', (d) => {
				fs.writeFileSync('routes/SOENcatalogUPD.txt', d, (err) => {
					if (err) throw err;
					console.log('SOEN Catalog updated!');
					fs.readFileSync('routes/SOENcatalogUPD.txt', 'utf-8', function(err, data){
						if (err) throw err;
						var fix = data.replace(/},/gim, '},\n');
							fs.writeFileSync('routes/SOENcatalogUPD.txt', fix, 'utf-8', function (err) {
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
				fs.writeFileSync('routes/COMPscheduleUPD.txt', d, (err) => {
					if (err) throw err;
					console.log('COMP Schedule updated!');
					});
			});
		}).on('error', (e) => {
				console.log(e);
				});
		https.get('https://172:0c35de81ea4c5cef9ee6073c3a6752eb@opendata.concordia.ca/API/v1/course/catalog/filter/COMP/*/*', (response) => {
			response.on('data', (d) => {
				fs.writeFileSync('routes/COMPcatalogUPD.txt', d, (err) => {
					if (err) throw err;
					console.log('COMP Catalog updated!');
						fs.readFileSync('routes/COMPcatalogUPD.txt', 'utf-8', function(err, data){
							if (err) throw err;
							var fix = data.replace(/},/gim, '},\n');
							fs.writeFileSync('routes/COMPcatalogUPD.txt', fix, 'utf-8', function (err) {
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
}

// Database entries


if (true) {
  var rl = require("readline").createInterface({
    input: require("fs").createReadStream("routes/SOENcatalog.txt")
  });



  rl.on("line", function(line) {
    var a = 10;
    var b = 14;
    var c = 27;
    var d = 30;
    if (line.search(/("career":"UGRD")/) >= 0)
    {
      var subject =
          line.substring(
              line.search(/(subject)/) + a,
              line.search(/(subject)/) + b
          );
      var catalog =
          line.substring(
              line.search(/(subject)/) + c,
              line.search(/(subject)/) + d
          );
      var a = 11;
      var b = 15;
      var c = 28;
      var d = 31;
      var courseTitle = line.substring(
        line.search(/(title)/) + 8,
        line.search(/(","subject")/)
      );
      var credits = line.substring(
        line.search(/(Unit)/) + 7,
        line.search(/(Unit)/) + 11
      );

      var prereqs = "";
      // Prereqs
      if (line.search(/(Corequisite|Co-requisite)/) > -1)
      {
        var bool1 = line.search(/(Prerequisite)/) > -1;
        var bool2 = line.search(/(PREREQ)/) > -1;
        if (bool1)
        {
          if (line.search(/(Prerequisite)/) + 13 > line.search(/(Course Corequisite|Corequisite|Co-requisite|Never Taken)/))
          {
          	line = line.substring(line.search(/(Prerequisite)/));
            prereqs = line.substring
            (
                line.search(/(Prerequisite)/) + 13,
                line.search(/(Course Corequisite|Course Co-requisite|Corequisite|Co-requisite)/)
            );
          }
          else
          {
          	line = line.substring(line.search(/(Prerequisite)/));
            prereqs = line.substring
            (
                line.search(/(Prerequisite)/) + 13,
                line.search(/(Course Corequisite|Course Co-requisite|Corequisite|Co-requisite|Never Taken)/)
            );
          }
        }
        else if (bool2)
        {
          if (line.search(/(PREREQ)/) + 7 > line.search(/(Course Corequisite|Corequisite|Co-requisite|Never Taken)/))
          {
          	line = line.substring(line.search(/(PREREQ)/));
            prereqs = line.substring
            (
                line.search(/(PREREQ)/) + 7,
                line.search(/(Course Corequisite|Course Co-requisite|Corequisite|Co-requisite)/)
            );
          }
          else
          {
          	line = line.substring(line.search(/(PREREQ)/));
            prereqs = line.substring
            (
                line.search(/(PREREQ)/) + 7,
                line.search(/(Course Corequisite|Course Co-requisite|Corequisite|Co-requisite|Never Taken)/)
            );
          }
        }
      }
      else
      {
        var bool1 = line.search(/(Prerequisite)/) > -1;
        var bool2 = line.search(/(PREREQ)/) > -1;
        if (bool1)
        {
          if (line.search(/(Never Taken|","crosslisted")/) > line.search(/(Prerequisite)/) + 13)
          {
          	line = line.substring(line.search(/(Prerequisite)/));
            prereqs = line.substring
            (
                line.search(/(Prerequisite)/) + 13,
                line.search(/(Never Taken|","crosslisted")/)
            );
          }
          else
          {
          	line = line.substring(line.search(/(Prerequisite)/));
            prereqs = line.substring
            (
                line.search(/(Prerequisite)/) + 13,
                line.search(/(","crosslisted")/)
            );
          }
        }
        else if (bool2)
        {
          if (line.search(/(Never Taken|","crosslisted")/) > line.search(/(PREREQ)/) + 7)
          {
          	line = line.substring(line.search(/(PREREQ)/));
            prereqs = line.substring
            (
                line.search(/(PREREQ)/) + 7,
                line.search(/(Never Taken|","crosslisted")/)
            );
          }
          else
          {
          	line = line.substring(line.search(/(PREREQ)/));
            prereqs = line.substring
            (
                line.search(/(PREREQ)/) + 7,
                line.search(/(","crosslisted")/)
            );
          }
        }
      }


      var coreqs = "";
      if (prereqs.search(/(previously or concurrently)/) > -1)
      {
      	coreqs += prereqs.substring
		(
			prereqs.search(/(;)/) + 2,
			prereqs.search(/(previously or concurrently)/)
		);
		prereqs = prereqs.substring
		(
			prereqs.charAt(0),
			prereqs.search(/(;)/)
		);
      }

      if (line.search(/(Corequisite|Co-requisite)/) > -1)
      {
        var bool1 = line.search(/(Corequisite)/) > -1;
        var bool2 = line.search(/(Co-requisite)/) > -1;
        if (bool1)
        {
          line = line.substring(line.search(/(Corequisite)/));
          coreqs += line.substring
          (
              line.search(/(Corequisite)/) + 13,
              line.search(/(;|","crosslisted")/)
          );

        }
        else if (bool2)
        {
          line = line.substring(line.search(/(Co-requisite)/));
          coreqs += line.substring
          (
              line.search(/(Co-requisite)/) + 14,
              line.search(/(;|","crosslisted")/)
          );
        }
      }

      // connection.query("INSERT INTO `course`(subject,courseTitle,credits) VALUES("+subject+", "+courseTitle+", "+credits+")", function(error, results, fields) {
		// 		if(error) throw error;
      console.log(
        "Succesfully inserted: Title: "+ courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
          prereqs + " coreqs: " + coreqs
      );
    }
    else
    {
      console.log("Victor was right");
    }
  });
}

/* GET users listing. */
app.get("/", function(req, res, next) {
  res.json(
    JSON.stringify([
      {
        time
      },
      {
        id: 1,
        username: "samsepi0l"
      },
      {
        id: 2,
        username: "D0loresH4ze"
      }
    ])
  );
});

module.exports = app;
