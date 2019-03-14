var express = require("express");
var mysql = require("mysql2");
var app = express();
var fs = require("fs");
const Course = require('./Course');
const MyDoublyLinkedList = require('./MyDoublyLinkedList');
var count;
// var mysql = require('mysql');
var courseList = new MyDoublyLinkedList();
var sequenceList = new MyDoublyLinkedList();

var oldValue;
oldValue = courseList.size;


var goAhead = false;

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


var sqlrr = "CREATE TABLE `course` (courseTitle VARCHAR(100), subject VARCHAR(100), classNumber VARCHAR(100), credits VARCHAR(100), prerequisites VARCHAR(100), corequisites VARCHAR(100))";
connection.query(sqlrr, function (err, result) {
  // if (err) throw err;
  console.log("Table created");
});






var dck2 = "DROP TABLE lecture";
connection.query(dck2, function (err, result) {
  // if (err) throw err;
  console.log("Table deleted");
});


var sqlrr2 = "CREATE TABLE `lecture` (subject VARCHAR(100), classNumber VARCHAR(100), lectureSectionNumber VARCHAR(100), instructorName VARCHAR(100), location VARCHAR(100), days VARCHAR(100), times VARCHAR(100))";
connection.query(sqlrr2, function (err, result) {
  // if (err) throw err;
  console.log("Table created");
});





var dck3 = "DROP TABLE laboratory";
connection.query(dck3, function (err, result) {
  // if (err) throw err;
  console.log("Table deleted");
});


var sqlrr3 = "CREATE TABLE `laboratory` (subject VARCHAR(100), classNumber VARCHAR(100), labSectionNumber VARCHAR(100), instructorName VARCHAR(100), location VARCHAR(100), days VARCHAR(100), times VARCHAR(100))";
connection.query(sqlrr3, function (err, result) {
  // if (err) throw err;
  console.log("Table created");
});





var dck4 = "DROP TABLE tutorial";
connection.query(dck4, function (err, result) {
  // if (err) throw err;
  console.log("Table deleted");
});


var sqlrr4 = "CREATE TABLE `tutorial` (subject VARCHAR(100), classNumber VARCHAR(100), tutorialSectionNumber VARCHAR(100), instructorName VARCHAR(100), location VARCHAR(100), days VARCHAR(100), times VARCHAR(100))";
connection.query(sqlrr4, function (err, result) {
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

// SOEN Entries
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

        connection.query(`INSERT INTO course (courseTitle,subject,classNumber,credits,prerequisites,corequisites) VALUES ('${courseTitle}','${subject}','${catalog}','${credits}','${prereqs}','${coreqs}');`, function (err, result, fields) {
          // if (err) throw err;
        });



        oldValue = courseList.size;
      }

    }
    else
    {
      console.log("Victor was right");
    }

    console.log("courseList size");
    console.log(courseList.size);

  });
}






// For COMP entries
if (true) {

  var rl = require("readline").createInterface({
    input: require("fs").createReadStream("routes/COMPcatalog.txt")
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
              line.search(/(subject)/) + 10,
              line.search(/(","catalog)/)
          );
      var catalog =
          line.substring(
              line.search(/(catalog)/) + 10,
              line.search(/(","career)/)
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
              line.search(/(Co-requisite)/) + 13,
              line.search(/(;|","crosslisted")/)
          );
        }
      }

      prereqs = prereqs.replace (/;/g, "");
      prereqs = prereqs.replace (/,/g, "");
      prereqs = prereqs.replace (/ or /g, "<==>");
      prereqs = prereqs.replace (/and /g, "");
      prereqs = prereqs.replace (/or /g, "<==>");
      prereqs = prereqs.replace (/  /g, " ");
      prereqs = prereqs.replace (/ Course prerequisite: /g, " ");



      // Course co-reqs are sandwiched in the middle so im using this to avoid that issue
      if (subject.toString().includes('COMP') && catalog.toString().includes('228')) {
        prereqs = 'COMP248';
        coreqs = 'MATH204 MATH203';
      }

      var courseToAdd = new Course(courseTitle.toString(),subject.toString(),catalog.toString(),credits.toString(),prereqs.toString(),coreqs.toString());

      courseList.addLast(courseToAdd);

      while ((courseList.size > oldValue)) {

        connection.query(`INSERT INTO course (courseTitle,subject,classNumber,credits,prerequisites,corequisites) VALUES ('${courseToAdd.courseTitle.toString()}','${courseToAdd.subject.toString()}','${courseToAdd.catalog.toString()}','${courseToAdd.credits.toString()}','${courseToAdd.prereqs.toString()}','${courseToAdd.coreqs.toString()}');`, function (err, result, fields) {
          if (err) throw err;
        });
        console.log(
            "Succesfully inserted: Title: "+courseToAdd.courseTitle+" subject: "+courseToAdd.subject+ " catalog: " + courseToAdd.catalog + " credits: " + courseToAdd.credits + " prereqs: " +
            courseToAdd.prereqs + " coreqs: " + courseToAdd.coreqs
        );
        oldValue++;
      }


    }
    else
    {
      console.log("GRAD course");
    }

    console.log("courseList size");
    console.log(courseList.size);


  });

}







// schedule

if (true) {
    var rl = require("readline").createInterface({
        input: require("fs").createReadStream("routes/SOENschedule.txt")
    });

    rl.on("line", function(line) {

      var a = 10;
      var b = 14;
      var c = 27;
      var d = 30;

        if (line.search(/("componentDescription":"Lecture")/) >= 0)
        { 	var days="";
            if(line.search(/("modays":"Y")/)){
                days += "Monday, "};
            if(line.search(/("tuesdays":"Y")/)){
                days += "Tuesday, "};
            if(line.search(/("wednesdays":"Y")/)){
                days += "Wednesday, "};
            if(line.search(/("thursdays":"Y")/)){
                days += "Thursday, "};
            if(line.search(/("fridays":"Y")/)){
                days += "Friday, "};
            if(line.search(/("saturdays":"Y")/)){
                days += "Saturday, "};
            if(line.search(/("sundays":"Y")/)){
                days += "Sunday"};
            var lectureSectionNumber = line.substring(line.search(/("section":)/)+10,line.search(/(,"componentCode")/));
            var instructorName = null;
            var classLocation = line.substring(line.search(/("roomCode":)/)+11,line.search(/(,"buildingCode)/));
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

          console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+labSectionNumber);

        }
        else if (line.search(/("componentDescription":"Tutorial")/) >= 0)
        { 	var days="";
            if(line.search(/("modays":"Y")/)){
                days += "Monday, "};
            if(line.search(/("tuesdays":"Y")/)){
                days += "Tuesday, "};
            if(line.search(/("wednesdays":"Y")/)){
                days += "Wednesday, "};
            if(line.search(/("thursdays":"Y")/)){
                days += "Thursday, "};
            if(line.search(/("fridays":"Y")/)){
                days += "Friday, "};
            if(line.search(/("saturdays":"Y")/)){
                days += "Saturday, "};
            if(line.search(/("sundays":"Y")/)){
                days += "Sunday"};
            var tutorialSectionNumber = line.substring(line.search(/("section":)/)+10,line.search(/(,"componentCode")/));
            var instructorName = null;
            var classLocation =line.substring(line.search(/("roomCode":)/)+11,line.search(/(,"buildingCode)/));
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

          console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+labSectionNumber);

        }
        else if (line.search(/("componentDescription":"Laboratory")/) >= 0)
        { 	var days ="";
            if(line.search(/("modays":"Y")/)){
                days += "Monday, "};
            if(line.search(/("tuesdays":"Y")/)){
                days += "Tuesday, "};
            if(line.search(/("wednesdays":"Y")/)){
                days += "Wednesday, "};
            if(line.search(/("thursdays":"Y")/)){
                days += "Thursday, "};
            if(line.search(/("fridays":"Y")/)){
                days += "Friday, "};
            if(line.search(/("saturdays":"Y")/)){
                days += "Saturday, "};
            if(line.search(/("sundays":"Y")/)){
                days += "Sunday"};
            var labSectionNumber = line.substring(line.search(/("section":)/)+10,line.search(/(,"componentCode")/));
            var instructorName = null;
            var classLocation =line.substring(line.search(/("roomCode":)/)+11,line.search(/(,"buildingCode)/));
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

            console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+labSectionNumber);

        }
        else
        {
            console.log("Empty Line");
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