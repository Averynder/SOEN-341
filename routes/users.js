var express = require("express");
var mysql = require("mysql2");
var app = express();
var fs = require("fs");
const Course = require('./Course');
const MyDoublyLinkedList = require('./MyDoublyLinkedList');
var count;
// var mysql = require('mysql');
var courseList = new MyDoublyLinkedList();
var insertDone = false;
var oldValue = 0;
var thisDick = new Course();
if (count == undefined)
  count = 1;
else
  count = 0;

var connection = mysql.createConnection({
  connectionLimit: 20,
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "soen341"
});

connection.connect();
// connection.query("SELECT*FROM `teacher`;", function(error, results, fields) {
//   if (error) throw error;
//   console.log("The solution is: ", results);
// });

// connection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'soen341' AND table_name = 'course';");



  //
  // var checkExist = connection.query("SELECT EXISTS( SELECT * FROM information_schema.tables WHERE table_schema = 'soen341' AND table_name = 'course');", function (error, results, fields) {
  //   if (checkExist != null) {
  //     // no table
  //     console.log("checkexists: " + checkExist);
  //     console.log("no table");
  //     return;
  //   } else
  //     {
  //     // there is a table
  //       console.log("checkexists: " + checkExist);
  //       var dck = "DROP TABLE course";
  //       connection.query(dck, function (err, result) {
  //         if (err) throw err;
  //         console.log("Table deleted");
  //       });        return
  //
  //   }
  //   console.log("The course is: ", results);
  // });




      var dck = "DROP TABLE course";
      connection.query(dck, function (err, result) {
        // if (err) throw err;
        console.log("Table deleted");
      });


var sqlrr = "CREATE TABLE `course` (courseTitle VARCHAR(30), subject VARCHAR(30), classNumber VARCHAR(30), credits VARCHAR(30), prerequisites VARCHAR(30), corequisites VARCHAR(30))";
connection.query(sqlrr, function (err, result) {
  // if (err) throw err;
  console.log("Table created");
});







// console.log('watchmynuts'+checkExist.toString());

// if (checkExist != null) {
//
//   connection.query("DROP TABLE `course`");
//
// }






// connection.query("CREATE TABLE `soen341`.`course` (courseTitle,subject,classNumber,credits,prerequisites,corequisites) VALUES ('${courseTitle}','${subject}','${catalog}','${credits}','${prereqs}','${coreqs}');`, function (err, result, fields) {
//   // if (err) throw err;
// });


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
  year: "numeric",
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
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  });
}, 1000);

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

      prereqs = prereqs.replace (/;/g, "");
      prereqs = prereqs.replace (/,/g, "");
      prereqs = prereqs.replace (/ or /g, "<==>");
      prereqs = prereqs.replace (/  /g, " ");


      var courseToAdd = new Course(courseTitle.toString(),subject.toString(),catalog.toString(),credits.toString(),prereqs.toString(),coreqs.toString());

      courseList.addLast(courseToAdd);

      if (!(oldValue == courseList.size)) {

        console.log(
            "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
            prereqs + " coreqs: " + coreqs
        );


            // connection.connect(function(err) {
            //   if (err) throw err;
            //   console.log("Connected!");
            //   var sql = "INSERT INTO `soen341`.`course`(courseTitle,subject,catalog,credits,prereqs,coreqs) VALUES("+courseTitle.toString()+","+subject.toString()+","+catalog.toString()+","+credits.toString()+","+prereqs.toString()+","+coreqs.toString()+")";
            //   connection.query(sql, function (err, result) {
                // if (err) throw err;
                // console.log("1 record inserted");
            //   });
            // });

        // connection.query('INSERT INTO `soen341`.`course` (courseTitle,subject,classNumber,credits,prerequisites,corequisites) VALUES ('+courseTitle+','+subject+','+catalog+','+credits+','+prereqs+','+coreqs+')');


        connection.query(`INSERT INTO course (courseTitle,subject,classNumber,credits,prerequisites,corequisites) VALUES ('${courseTitle}','${subject}','${catalog}','${credits}','${prereqs}','${coreqs}');`, function (err, result, fields) {
          // if (err) throw err;
        });



        oldValue = courseList.size;
      }



      // tryme.catalog = "nahh";
      // console.log("look at THISS");
      // console.log(tryme.catalog);

      // var prereqsArray = null;
      //     prereqsArray = prereqs.split(/(\s+)/);


      // connection.query("INSERT INTO `course`(subject,courseTitle,credits) VALUES("+subject+", "+courseTitle+", "+credits+")", function(error, results, fields) {
      // 		if(error) throw error;
      //
      // console.log(
      //   "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
      //     prereqs + " coreqs: " + coreqs
      // );



    }
    else
    {
      console.log("Victor was right");
    }

    console.log("courseList size");
    console.log(courseList.size);



    // while (true)
    // {
    //   if (!(oldValue == courseList.size))
    //   {
    //
    //     connection.connect(function(err) {
    //       if (err) throw err;
    //       console.log("Connected!");
    //       var sqlr = ("INSERT INTO `soen341`.`course`(courseTitle,subject,catalog,credits,prereqs,coreqs) VALUES("+courseTitle.toString()+","+subject.toString()+","+catalog.toString()+","+credits.toString()+","+prereqs.toString()+","+coreqs.toString()+")");
    //       connection.query(sqlr, function (err, result) {
    //         // if (err) throw err;
    //         console.log("1 record inserted");
    //       });
    //     });
    //
    //     // var sqlr = ("INSERT INTO `soen341`.`course`(courseTitle,subject,catalog,credits,prereqs,coreqs) VALUES("+courseTitle.toString()+","+subject.toString()+","+catalog.toString()+","+credits.toString()+","+prereqs.toString()+","+coreqs.toString()+")");
    //     connection.query("INSERT INTO `soen341`.`course`(courseTitle,subject,catalog,credits,prereqs,coreqs) VALUES("+courseTitle.toString()+","+subject.toString()+","+catalog.toString()+","+credits.toString()+","+prereqs.toString()+","+coreqs.toString()+")", function(error, results, fields) {
    //       // if (error) throw error;
    //       console.log("The solution is: ", results);
    //     });
    //
    //
    //     console.log(
    //         "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
    //         prereqs + " coreqs: " + coreqs);
    //     oldValue = courseList.size;
    //     console.log("old value "+oldValue);
    //     break; // quit loop
    //   }
    //   oldValue = courseList.size;
    //   break;
    //
    // }



    // connection.query("SELECT*FROM `soen341`.`course`;", function(error, results, fields) {
    //   if (error) throw error;
    //   console.log("The course is: ", results);
    // });


    //
    // connection.query(`INSERT INTO course (courseTitle,subject,classNumber,credits,prerequisites,corequisites) VALUES ('nuts','nuts','nuts','nuts','nuts','nuts');`, function (err, result, fields) {
    //   // if (err) throw err;
    // });



  });

  // insertDone = true;

}
//
// if (insertDone) {
//
//   console.log("courseList sizeee");
//   console.log(courseList.size);
//
// }


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