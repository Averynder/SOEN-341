var express = require("express");
var mysql = require("mysql2");
var async = require('async');
var app = express();
var fs = require("fs");
const Course = require('./Course');
const MyDoublyLinkedList = require('./MyDoublyLinkedList');

const LectureSequence = require('./LectureSequence');
const LabSequence = require('./LabSequence');
const TutorialSequence = require('./TutorialSequence');

var count;
// var mysql = require('mysql');
var courseList = new MyDoublyLinkedList();
var lectureSequenceList = new MyDoublyLinkedList();
var labSequenceList = new MyDoublyLinkedList();
var tutSequenceList = new MyDoublyLinkedList();

var oldValue;
oldValue = courseList.size;

var lectureOldValue;
lectureOldValue = lectureSequenceList.size;

var labOldValue;
labOldValue = labSequenceList.size;

var tutOldValue;
tutOldValue = tutSequenceList.size;

var goAhead = false;

var connection = mysql.createConnection({
  connectionLimit: 20,
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "soen341"
});

//connection.connect();
// Issue is not the fact of doing this retrieval, it's the actual timing of the thread

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




















console.log("hello");



// var async = require('async');
// var output = [];
// connection.query('SELECT * FROM soen341 LIMIT 10',function(error,results,filelds){
//   // if(error) throw err;
//
//   async.eachSeries(results,function(data,callback){ // It will be executed one by one
//     //Here it will be wait query execute. It will work like synchronous
//     connection.query('SELECT * FROM course where id = 1',function(error,results1,filelds){
//       // if(error) throw err;
//
//       output.push(results1[0].id)
//       callback();
//     });
//
//   }, function(err, results) {
//     console.log(output); // Output will the value that you have inserted in array, once for loop completed ex . 1,2,3,4,5,6,7,8,9
//   });
//
//
// });





// var output;
// for ( var j = 0; j < 1 ; j++ ) {
//   tVal = j;//some manipulation of someArr[i]
//   (function(val){
//     connection.query( "select * from course where classNumber > 300",val, function(err, rows, fields) {
//       if ( err ) {
//         console.log( err );
//       } else {
//         // output.push( rows[0].someVal );//push query output to this variable
//         console.log("LOOOOL");
//         console.log(courseList.size);
//       }
//     });
//   })(tVal);
//
//
//
// }




// var helloworld = new MyDoublyLinkedList();
//
// var output = [];
// for ( let j = 0; j < 10 ; j++ ) {
//   val = j;//some manipulation of someArr[j]
//   connection.query( "select * from course where classNumber > 300 ",val, function(err, rows, fields) {
//     if ( err ) {
//       console.log( err );
//     } else {
//       output.push( rows[0].val);//push query output to this variable
//     }
//   });
// }
//
// console.log("size is "+output.length);




async.waterfall([task1,task2,task3,task4,task5,task6,task7,task8,task9,task10,task11,task12,task13,task14,task15,task16], function() {
  console.log('tasks done!');
});
//
// function task1(cb) {
//   console.log('task1:started');
//   setTimeout(function() {
//     console.log('task1:finished');
//     cb();
//   }, 100);
// }



// var asyncOps = [

function task1(done) {
  console.log('1. Lets delete old db');


  var dck = "DROP TABLE course";
  connection.query(dck, function (err, result) {
    // if (err) throw err;
    console.log("Table deleted");
    done();

  });



  // I made the above more verbose for clarity, but keep in mind you could also have done:
  // db.each("SELECT result FROM raw_results", done);
}

function task2(done) {
  console.log('1. Lets delete old db');

  var dck3 = "DROP TABLE laboratory";
  connection.query(dck3, function (err, result) {
    // if (err) throw err;
    console.log("Table deleted");
    done();

  });



}

function task3(done) {
  console.log('1. Lets delete old db');

  var dck2 = "DROP TABLE lecture";
  connection.query(dck2, function (err, result) {
    // if (err) throw err;
    console.log("Table deleted");
    done();
  });



}

function task4(done) {
  console.log('1. Lets delete old db');

  var dck4 = "DROP TABLE tutorial";
  connection.query(dck4, function (err, result) {
    // if (err) throw err;
    console.log("Table deleted");
    done();
  });



}

function task5(done) {
  console.log('2. Lets create new db');

  var sqlrr = "CREATE TABLE `course` (courseTitle VARCHAR(100), subject VARCHAR(100), classNumber VARCHAR(100), credits VARCHAR(100), prerequisites VARCHAR(100), corequisites VARCHAR(100))";
  connection.query(sqlrr, function (err, result) {
    // if (err) throw err;
    console.log("Table created");
    done();
  });




}

function task6(done) {
  console.log('2. Lets create new db');

  var sqlrr2 = "CREATE TABLE `lecture` (subject VARCHAR(100), classNumber VARCHAR(100), lectureSectionNumber VARCHAR(100), location VARCHAR(100), days VARCHAR(100), startTime VARCHAR(1000), endTime VARCHAR(1000), instructorName VARCHAR(100), semester VARCHAR(100))";
  connection.query(sqlrr2, function (err, result) {
    // if (err) throw err;
    console.log("Table created");
    done();
  });



}

function task7(done) {
  console.log('2. Lets create new db');

  var sqlrr3 = "CREATE TABLE `laboratory` (subject VARCHAR(100), classNumber VARCHAR(100), labSectionNumber VARCHAR(100), location VARCHAR(100), days VARCHAR(100), startTime VARCHAR(1000), endTime VARCHAR(1000), instructorName VARCHAR(1000), semester VARCHAR(100))";
  connection.query(sqlrr3, function (err, result) {
    // if (err) throw err;
    console.log("Table created");
    done();
  });



}

function task8(done) {
  console.log('2. Lets create new db');


  var sqlrr4 = "CREATE TABLE `tutorial` (subject VARCHAR(100), classNumber VARCHAR(100), tutorialSectionNumber VARCHAR(100), location VARCHAR(100), days VARCHAR(100), startTime VARCHAR(1000), endTime VARCHAR(100), instructorName VARCHAR(1000), semester VARCHAR(100))";
  connection.query(sqlrr4, function (err, result) {
    // if (err) throw err;
    console.log("Table created");
    done();
  });



}


function task9(done) {
  console.log('3. Lets find SOEN entries for courses');



// SOEN Entries
  if (fs.existsSync('routes/SOENcatalog.txt')) {
    console.log('Found file');
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

          /*
          console.log(
              "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
              prereqs + " coreqs: " + coreqs
          );*/

          connection.query(`INSERT INTO course (courseTitle,subject,classNumber,credits,prerequisites,corequisites) VALUES ('${courseTitle}','${subject}','${catalog}','${credits}','${prereqs}','${coreqs}');`, function (err, result, fields) {
            if (err) throw err;
          });
          oldValue = courseList.size;
        }

      }
      else
      {
        //console.log("Victor was right");
      }

      //console.log("courseList size");
      //console.log(courseList.size);





    })

    rl.on('close', function(line) {
      done();
    });
  }

  // done();

}

function task10(done) {
  console.log('3. Lets find COMP entries for courses');


// For COMP entries
  if (fs.existsSync('routes/COMPcatalog.txt')) {
    console.log('Found file');

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
          /*
          console.log(
              "Succesfully inserted: Title: "+courseToAdd.courseTitle+" subject: "+courseToAdd.subject+ " catalog: " + courseToAdd.catalog + " credits: " + courseToAdd.credits + " prereqs: " +
              courseToAdd.prereqs + " coreqs: " + courseToAdd.coreqs
          );*/
          oldValue++;
        }


      }
      else
      {
        //console.log("GRAD course");
      }

      //console.log("courseList size");
      //console.log(courseList.size);





    });


    rl.on('close', function(line) {
      done();
    });

  }




}

function task11(done) {
  console.log('3. Lets find ENGR/ENCS/etc. entries for courses');


// For COMP entries
  if (fs.existsSync('routes/ELECTIVEScatalog.txt')) {
    console.log('Found file');

    var rl = require("readline").createInterface({
      input: require("fs").createReadStream("routes/ELECTIVEScatalog.txt")
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
          /*
          console.log(
              "Succesfully inserted: Title: "+courseToAdd.courseTitle+" subject: "+courseToAdd.subject+ " catalog: " + courseToAdd.catalog + " credits: " + courseToAdd.credits + " prereqs: " +
              courseToAdd.prereqs + " coreqs: " + courseToAdd.coreqs
          );*/
          oldValue++;
        }


      }
      else
      {
        //console.log("GRAD course");
      }

      //console.log("courseList size");
      //console.log(courseList.size);





    });


    rl.on('close', function(line) {
      done();
    });

  }




}

function task12(done) {
  console.log('4. Lets find SOEN entries for schedule');


// SOEN schedule

  if (fs.existsSync('routes/SOENschedule.txt')) {
    console.log('Found file');

    var rl = require("readline").createInterface({
      input: require("fs").createReadStream("routes/SOENschedule.txt")
    });

    rl.on("line", function(line) {

      var a = 10;
      var b = 14;
      var c = 27;
      var d = 30;

      if (line.includes("Graduate")) {
        //console.log("Ignore graduate course")
      }

      else if (line.search(/("componentDescription":"Lecture")/) >= 0) {
        var days = "";
        if (line.search(/("modays":"Y")/) >= 0) {
          days += "Monday, "
        }
        ;
        if (line.search(/("tuesdays":"Y")/) >= 0) {
          days += "Tuesday, "
        }
        ;
        if (line.search(/("wednesdays":"Y")/) >= 0) {
          days += "Wednesday, "
        }
        ;
        if (line.search(/("thursdays":"Y")/) >= 0) {
          days += "Thursday, "
        }
        ;
        if (line.search(/("fridays":"Y")/) >= 0) {
          days += "Friday, "
        }
        ;
        if (line.search(/("saturdays":"Y")/) >= 0) {
          days += "Saturday, "
        }
        ;
        if (line.search(/("sundays":"Y")/) >= 0) {
          days += "Sunday"
        }
        ;

        var semester = "";
        if (line.includes('classStartDate":"07\\/01\\/2015') || line.includes('classStartDate":"09\\/01\\/2017')
            || line.includes('classStartDate":"06\\/01\\/2020') || line.includes('classStartDate":"06\\/01\\/2016')
            || line.includes('classStartDate":"09\\/01\\/2017') || line.includes('classStartDate":"07\\/01\\/2019')
        || line.includes('classStartDate":"08\\/01\\/2018'))
        {
          semester = 'Winter'
        }
        if (line.includes('classStartDate":"08\\/09\\/2015') || line.includes('classStartDate":"02\\/09\\/2014')
            || line.includes('classStartDate":"03\\/09\\/2019') || line.includes('classStartDate":"06\\/09\\/2016')
            || line.includes('classStartDate":"05\\/09\\/2017') || line.includes('classStartDate":"04\\/09\\/2018'))
        {
          semester = 'Fall'
        }
        if (line.includes('classStartDate":"07\\/05\\/2014') || line.includes('classStartDate":"02\\/05\\/2016')
            || line.includes('classStartDate":"03\\/05\\/2017') || line.includes('classStartDate":"06\\/05\\/2019')
            || line.includes('classStartDate":"04\\/05\\/2015'))
        {
          semester = 'Summer'
        }
        var lectureSectionNumber = line.substring(line.search(/("section":)/) + 10, line.search(/(,"componentCode")/));
        var instructorName = null;
        var classLocation = line.substring(line.search(/("roomCode":)/) + 11, line.search(/(,"buildingCode)/));
        var subject =
            line.substring(
                line.search(/(subject)/) + a,
                line.search(/(subject)/) + b
            );
        var catalog =
            line.substring(
                line.search(/(subject)/) + c,
                line.search(/(","section)/)
            );
        var startTime =
            line.substring(
                line.search(/(classStartTime":")/) + 17,
                line.search(/(","classEndTime)/)
            );
        var endTime =
            line.substring(
                line.search(/(classEndTime":")/) + 15,
                line.search(/(","modays)/)
            );
        // console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+lectureSectionNumber+ "from " +startTime+ " to " +endTime);


        // var seqToAdd = "Lecture added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+lectureSectionNumber+ "from " +startTime+ " to " +endTime;


        var lecSequence = new LectureSequence(subject.toString(),catalog.toString(),lectureSectionNumber.toString(),classLocation.toString(),days.toString(),startTime.toString(),endTime.toString(),semester.toString());

        lectureSequenceList.addLast(lecSequence);

        if (!(lectureOldValue == lectureSequenceList.size)) {

          /*
          console.log(
              "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
              prereqs + " coreqs: " + coreqs
          );*/

          // // adding to database
          connection.query(`INSERT INTO lecture (subject,classNumber,lectureSectionNumber,location,days,startTime,endTime,semester) VALUES ('${subject}','${catalog}','${lectureSectionNumber}','${classLocation}','${days}','${startTime}','${endTime}','${semester}');`, function (err, result, fields) {
            if (err) throw err;
          });

          lectureOldValue = lectureSequenceList.size;
        }


      }
      else if (line.search(/("componentDescription":"Tutorial")/) >= 0)
      { 	var days="";
        if(line.search(/("modays":"Y")/)>= 0){
          days += "Monday, "};
        if(line.search(/("tuesdays":"Y")/)>= 0){
          days += "Tuesday, "};
        if(line.search(/("wednesdays":"Y")/)>= 0){
          days += "Wednesday, "};
        if(line.search(/("thursdays":"Y")/)>= 0){
          days += "Thursday, "};
        if(line.search(/("fridays":"Y")/)>= 0){
          days += "Friday, "};
        if(line.search(/("saturdays":"Y")/)>= 0){
          days += "Saturday, "};
        if(line.search(/("sundays":"Y")/)>= 0){
          days += "Sunday"};
        var semester = "";
        if (line.includes('classStartDate":"07\\/01\\/2015') || line.includes('classStartDate":"09\\/01\\/2017')
            || line.includes('classStartDate":"06\\/01\\/2020') || line.includes('classStartDate":"06\\/01\\/2016')
            || line.includes('classStartDate":"09\\/01\\/2017') || line.includes('classStartDate":"07\\/01\\/2019')
            || line.includes('classStartDate":"08\\/01\\/2018'))
        {
          semester = 'Winter'
        }
        if (line.includes('classStartDate":"08\\/09\\/2015') || line.includes('classStartDate":"02\\/09\\/2014')
            || line.includes('classStartDate":"03\\/09\\/2019') || line.includes('classStartDate":"06\\/09\\/2016')
            || line.includes('classStartDate":"05\\/09\\/2017') || line.includes('classStartDate":"04\\/09\\/2018'))
        {
          semester = 'Fall'
        }
        if (line.includes('classStartDate":"07\\/05\\/2014') || line.includes('classStartDate":"02\\/05\\/2016')
            || line.includes('classStartDate":"03\\/05\\/2017') || line.includes('classStartDate":"06\\/05\\/2019')
            || line.includes('classStartDate":"04\\/05\\/2015'))
        {
          semester = 'Summer'
        }
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
                line.search(/(","section)/)
            );

        var startTime =
            line.substring(
                line.search(/(classStartTime":")/) + 17,
                line.search(/(","classEndTime)/)
            );
        var endTime =
            line.substring(
                line.search(/(classEndTime":")/) + 15,
                line.search(/(","modays)/)
            );

        //console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+tutorialSectionNumber+ "from " +startTime+ " to " +endTime);

        // // adding to database
        // var seqToAdd = "Tutorial added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+lectureSectionNumber+ "from " +startTime+ " to " +endTime;

        var tutSequence = new TutorialSequence(subject.toString(),catalog.toString(),tutorialSectionNumber.toString(),classLocation.toString(),days.toString(),startTime.toString(),endTime.toString(),semester.toString());

        tutSequenceList.addLast(tutSequence);

        if (!(tutOldValue == tutSequenceList.size)) {

          /*
          console.log(
              "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
              prereqs + " coreqs: " + coreqs
          );*/

          // // adding to database
          connection.query(`INSERT INTO tutorial (subject,classNumber,tutorialSectionNumber,location,days,startTime,endTime,semester) VALUES ('${subject}','${catalog}','${tutorialSectionNumber}','${classLocation}','${days}','${startTime}','${endTime}','${semester}');`, function (err, result, fields) {
            if (err) throw err;
          });
          tutOldValue = tutSequenceList.size;
        }
      }

      else if (line.search(/("componentDescription":"Laboratory")/) >= 0)
      { 	var days ="";
        if(line.search(/("modays":"Y")/)>= 0){
          days += "Monday, "};
        if(line.search(/("tuesdays":"Y")/)>= 0){
          days += "Tuesday, "};
        if(line.search(/("wednesdays":"Y")/)>= 0){
          days += "Wednesday, "};
        if(line.search(/("thursdays":"Y")/)>= 0){
          days += "Thursday, "};
        if(line.search(/("fridays":"Y")/)>= 0){
          days += "Friday, "};
        if(line.search(/("saturdays":"Y")/)>= 0){
          days += "Saturday, "};
        if(line.search(/("sundays":"Y")/)>= 0){
          days += "Sunday"};
        var semester = "";
        if (line.includes('classStartDate":"07\\/01\\/2015') || line.includes('classStartDate":"09\\/01\\/2017')
            || line.includes('classStartDate":"06\\/01\\/2020') || line.includes('classStartDate":"06\\/01\\/2016')
            || line.includes('classStartDate":"09\\/01\\/2017') || line.includes('classStartDate":"07\\/01\\/2019')
            || line.includes('classStartDate":"08\\/01\\/2018'))
        {
          semester = 'Winter'
        }
        if (line.includes('classStartDate":"08\\/09\\/2015') || line.includes('classStartDate":"02\\/09\\/2014')
            || line.includes('classStartDate":"03\\/09\\/2019') || line.includes('classStartDate":"06\\/09\\/2016')
            || line.includes('classStartDate":"05\\/09\\/2017') || line.includes('classStartDate":"04\\/09\\/2018'))
        {
          semester = 'Fall'
        }
        if (line.includes('classStartDate":"07\\/05\\/2014') || line.includes('classStartDate":"02\\/05\\/2016')
            || line.includes('classStartDate":"03\\/05\\/2017') || line.includes('classStartDate":"06\\/05\\/2019')
            || line.includes('classStartDate":"04\\/05\\/2015'))
        {
          semester = 'Summer'
        }
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
                line.search(/(","section)/)
            );

        var startTime =
            line.substring(
                line.search(/(classStartTime":")/) + 17,
                line.search(/(","classEndTime)/)
            );
        var endTime =
            line.substring(
                line.search(/(classEndTime":")/) + 15,
                line.search(/(","modays)/)
            );

        //console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+labSectionNumber+ "from " +startTime+ " to " +endTime);

        // // adding to database
        var labSequence = new LabSequence(subject.toString(),catalog.toString(),labSectionNumber.toString(),classLocation.toString(),days.toString(),startTime.toString(),endTime.toString(),semester.toString());

        labSequenceList.addLast(labSequence);

        if (!(labOldValue == labSequenceList.size)) {

          /*
          console.log(
              "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
              prereqs + " coreqs: " + coreqs
          );*/

          // // adding to database
          connection.query(`INSERT INTO laboratory (subject,classNumber,labSectionNumber,location,days,startTime,endTime,semester) VALUES ('${subject}','${catalog}','${labSectionNumber}','${classLocation}','${days}','${startTime}','${endTime}','${semester}');`, function (err, result, fields) {
            if (err) throw err;
          });
          labOldValue = labSequenceList.size;
        }
      }
      else
      {
        console.log("Empty Line");
      }


    });

    rl.on('close', function(line) {
      done();
    });

  }


}

function task13(done) {
  console.log('4. Lets find COMP entries for schedule');



// COMP Schedule

  if (fs.existsSync('routes/COMPschedule.txt')) {
    console.log('Found file');

    var rl = require("readline").createInterface({
      input: require("fs").createReadStream("routes/COMPschedule.txt")
    });

    rl.on("line", function(line) {

      var a = 10;
      var b = 14;
      var c = 27;
      var d = 30;

      if (line.includes("Graduate")) {
        //console.log("Ignore graduate course")
      }

      else if (line.search(/("componentDescription":"Lecture")/) >= 0) {
        var days = "";
        if (line.search(/("modays":"Y")/) >= 0) {
          days += "Monday, "
        }
        ;
        if (line.search(/("tuesdays":"Y")/) >= 0) {
          days += "Tuesday, "
        }
        ;
        if (line.search(/("wednesdays":"Y")/) >= 0) {
          days += "Wednesday, "
        }
        ;
        if (line.search(/("thursdays":"Y")/) >= 0) {
          days += "Thursday, "
        }
        ;
        if (line.search(/("fridays":"Y")/) >= 0) {
          days += "Friday, "
        }
        ;
        if (line.search(/("saturdays":"Y")/) >= 0) {
          days += "Saturday, "
        }
        ;
        if (line.search(/("sundays":"Y")/) >= 0) {
          days += "Sunday"
        }
        ;
        var semester = "";
        if (line.includes('classStartDate":"07\\/01\\/2015') || line.includes('classStartDate":"09\\/01\\/2017')
            || line.includes('classStartDate":"06\\/01\\/2020') || line.includes('classStartDate":"06\\/01\\/2016')
            || line.includes('classStartDate":"09\\/01\\/2017') || line.includes('classStartDate":"07\\/01\\/2019')
            || line.includes('classStartDate":"08\\/01\\/2018'))
        {
          semester = 'Winter'
        }
        if (line.includes('classStartDate":"08\\/09\\/2015') || line.includes('classStartDate":"02\\/09\\/2014')
            || line.includes('classStartDate":"03\\/09\\/2019') || line.includes('classStartDate":"06\\/09\\/2016')
            || line.includes('classStartDate":"05\\/09\\/2017') || line.includes('classStartDate":"04\\/09\\/2018'))
        {
          semester = 'Fall'
        }
        if (line.includes('classStartDate":"07\\/05\\/2014') || line.includes('classStartDate":"02\\/05\\/2016')
            || line.includes('classStartDate":"03\\/05\\/2017') || line.includes('classStartDate":"06\\/05\\/2019')
            || line.includes('classStartDate":"04\\/05\\/2015'))
        {
          semester = 'Summer'
        }
        var lectureSectionNumber = line.substring(line.search(/("section":)/) + 10, line.search(/(,"componentCode")/));
        var instructorName = null;
        var classLocation = line.substring(line.search(/("roomCode":)/) + 11, line.search(/(,"buildingCode)/));
        var subject =
            line.substring(
                line.search(/(subject)/) + a,
                line.search(/(subject)/) + b
            );
        var catalog =
            line.substring(
                line.search(/(subject)/) + c,
                line.search(/(","section)/)
            );
        var startTime =
            line.substring(
                line.search(/(classStartTime":")/) + 17,
                line.search(/(","classEndTime)/)
            );
        var endTime =
            line.substring(
                line.search(/(classEndTime":")/) + 15,
                line.search(/(","modays)/)
            );
        // console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+lectureSectionNumber+ "from " +startTime+ " to " +endTime);

        var lecSequence = new LectureSequence(subject.toString(),catalog.toString(),lectureSectionNumber.toString(),classLocation.toString(),days.toString(),startTime.toString(),endTime.toString(),semester.toString());

        lectureSequenceList.addLast(lecSequence);

        if (!(lectureOldValue == lectureSequenceList.size)) {

          /*
          console.log(
              "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
              prereqs + " coreqs: " + coreqs
          );*/

          // // adding to database
          connection.query(`INSERT INTO lecture (subject,classNumber,lectureSectionNumber,location,days,startTime,endTime,semester) VALUES ('${subject}','${catalog}','${lectureSectionNumber}','${classLocation}','${days}','${startTime}','${endTime}','${semester}');`, function (err, result, fields) {
            if (err) throw err;
          });
          lectureOldValue = lectureSequenceList.size;
        }

      }
      else if (line.search(/("componentDescription":"Tutorial")/) >= 0)
      { 	var days="";
        if(line.search(/("modays":"Y")/)>= 0){
          days += "Monday, "};
        if(line.search(/("tuesdays":"Y")/)>= 0){
          days += "Tuesday, "};
        if(line.search(/("wednesdays":"Y")/)>= 0){
          days += "Wednesday, "};
        if(line.search(/("thursdays":"Y")/)>= 0){
          days += "Thursday, "};
        if(line.search(/("fridays":"Y")/)>= 0){
          days += "Friday, "};
        if(line.search(/("saturdays":"Y")/)>= 0){
          days += "Saturday, "};
        if(line.search(/("sundays":"Y")/)>= 0){
          days += "Sunday"};
        var semester = "";
        if (line.includes('classStartDate":"07\\/01\\/2015') || line.includes('classStartDate":"09\\/01\\/2017')
            || line.includes('classStartDate":"06\\/01\\/2020') || line.includes('classStartDate":"06\\/01\\/2016')
            || line.includes('classStartDate":"09\\/01\\/2017') || line.includes('classStartDate":"07\\/01\\/2019')
            || line.includes('classStartDate":"08\\/01\\/2018'))
        {
          semester = 'Winter'
        }
        if (line.includes('classStartDate":"08\\/09\\/2015') || line.includes('classStartDate":"02\\/09\\/2014')
            || line.includes('classStartDate":"03\\/09\\/2019') || line.includes('classStartDate":"06\\/09\\/2016')
            || line.includes('classStartDate":"05\\/09\\/2017') || line.includes('classStartDate":"04\\/09\\/2018'))
        {
          semester = 'Fall'
        }
        if (line.includes('classStartDate":"07\\/05\\/2014') || line.includes('classStartDate":"02\\/05\\/2016')
            || line.includes('classStartDate":"03\\/05\\/2017') || line.includes('classStartDate":"06\\/05\\/2019')
            || line.includes('classStartDate":"04\\/05\\/2015'))
        {
          semester = 'Summer'
        }
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
                line.search(/(","section)/)
            );

        var startTime =
            line.substring(
                line.search(/(classStartTime":")/) + 17,
                line.search(/(","classEndTime)/)
            );
        var endTime =
            line.substring(
                line.search(/(classEndTime":")/) + 15,
                line.search(/(","modays)/)
            );

        //console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+tutorialSectionNumber+ "from " +startTime+ " to " +endTime);

        // // adding to database
        var tutSequence = new TutorialSequence(subject.toString(),catalog.toString(),tutorialSectionNumber.toString(),classLocation.toString(),days.toString(),startTime.toString(),endTime.toString(),semester.toString());

        tutSequenceList.addLast(tutSequence);

        if (!(tutOldValue == tutSequenceList.size)) {

          /*
          console.log(
              "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
              prereqs + " coreqs: " + coreqs
          );*/

          // // adding to database
          connection.query(`INSERT INTO tutorial (subject,classNumber,tutorialSectionNumber,location,days,startTime,endTime,semester) VALUES ('${subject}','${catalog}','${tutorialSectionNumber}','${classLocation}','${days}','${startTime}','${endTime}','${semester}');`, function (err, result, fields) {
            if (err) throw err;
          });
          tutOldValue = tutSequenceList.size;
        }
      }

      else if (line.search(/("componentDescription":"Laboratory")/) >= 0)
      { 	var days ="";
        if(line.search(/("modays":"Y")/)>= 0){
          days += "Monday, "};
        if(line.search(/("tuesdays":"Y")/)>= 0){
          days += "Tuesday, "};
        if(line.search(/("wednesdays":"Y")/)>= 0){
          days += "Wednesday, "};
        if(line.search(/("thursdays":"Y")/)>= 0){
          days += "Thursday, "};
        if(line.search(/("fridays":"Y")/)>= 0){
          days += "Friday, "};
        if(line.search(/("saturdays":"Y")/)>= 0){
          days += "Saturday, "};
        if(line.search(/("sundays":"Y")/)>= 0){
          days += "Sunday"};
        var semester = "";
        if (line.includes('classStartDate":"07\\/01\\/2015') || line.includes('classStartDate":"09\\/01\\/2017')
            || line.includes('classStartDate":"06\\/01\\/2020') || line.includes('classStartDate":"06\\/01\\/2016')
            || line.includes('classStartDate":"09\\/01\\/2017') || line.includes('classStartDate":"07\\/01\\/2019')
            || line.includes('classStartDate":"08\\/01\\/2018'))
        {
          semester = 'Winter'
        }
        if (line.includes('classStartDate":"08\\/09\\/2015') || line.includes('classStartDate":"02\\/09\\/2014')
            || line.includes('classStartDate":"03\\/09\\/2019') || line.includes('classStartDate":"06\\/09\\/2016')
            || line.includes('classStartDate":"05\\/09\\/2017') || line.includes('classStartDate":"04\\/09\\/2018'))
        {
          semester = 'Fall'
        }
        if (line.includes('classStartDate":"07\\/05\\/2014') || line.includes('classStartDate":"02\\/05\\/2016')
            || line.includes('classStartDate":"03\\/05\\/2017') || line.includes('classStartDate":"06\\/05\\/2019')
            || line.includes('classStartDate":"04\\/05\\/2015'))
        {
          semester = 'Summer'
        }
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
                line.search(/(","section)/)
            );

        var startTime =
            line.substring(
                line.search(/(classStartTime":")/) + 17,
                line.search(/(","classEndTime)/)
            );
        var endTime =
            line.substring(
                line.search(/(classEndTime":")/) + 15,
                line.search(/(","modays)/)
            );

        //console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+labSectionNumber+ "from " +startTime+ " to " +endTime);


        var labSequence = new LabSequence(subject.toString(),catalog.toString(),labSectionNumber.toString(),classLocation.toString(),days.toString(),startTime.toString(),endTime.toString(),semester.toString());

        labSequenceList.addLast(labSequence);

        // // adding to database
        if (!(labOldValue == labSequenceList.size)) {

          /*
          console.log(
              "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
              prereqs + " coreqs: " + coreqs
          );*/

          // // adding to database
          connection.query(`INSERT INTO laboratory (subject,classNumber,labSectionNumber,location,days,startTime,endTime,semester) VALUES ('${subject}','${catalog}','${labSectionNumber}','${classLocation}','${days}','${startTime}','${endTime}','${semester}');`, function (err, result, fields) {
            if (err) throw err;
          });
          labOldValue = labSequenceList.size;
        }
      }
      else
      {
        console.log("Empty Line");
      }



    });


    rl.on('close', function(line) {
      done();
    });

    // connection.end();

    // connection.destroy();



  }

}

function task14(done) {
  console.log('4. Lets find ENGR/ENCS/etc. entries for schedule');


// SOEN schedule

  if (fs.existsSync('routes/ELECTIVESschedule.txt')) {
    console.log('Found file');

    var rl = require("readline").createInterface({
      input: require("fs").createReadStream('routes/ELECTIVESschedule.txt')
    });

    rl.on("line", function(line) {

      var a = 10;
      var b = 14;
      var c = 27;
      var d = 30;

      if (line.includes("Graduate")) {
        //console.log("Ignore graduate course")
      }

      else if (line.search(/("componentDescription":"Lecture")/) >= 0) {
        var days = "";
        if (line.search(/("modays":"Y")/) >= 0) {
          days += "Monday, "
        }
        ;
        if (line.search(/("tuesdays":"Y")/) >= 0) {
          days += "Tuesday, "
        }
        ;
        if (line.search(/("wednesdays":"Y")/) >= 0) {
          days += "Wednesday, "
        }
        ;
        if (line.search(/("thursdays":"Y")/) >= 0) {
          days += "Thursday, "
        }
        ;
        if (line.search(/("fridays":"Y")/) >= 0) {
          days += "Friday, "
        }
        ;
        if (line.search(/("saturdays":"Y")/) >= 0) {
          days += "Saturday, "
        }
        ;
        if (line.search(/("sundays":"Y")/) >= 0) {
          days += "Sunday"
        }
        ;

        var semester = "";
        if (line.includes('classStartDate":"07\\/01\\/2015') || line.includes('classStartDate":"09\\/01\\/2017')
            || line.includes('classStartDate":"06\\/01\\/2020') || line.includes('classStartDate":"06\\/01\\/2016')
            || line.includes('classStartDate":"09\\/01\\/2017') || line.includes('classStartDate":"07\\/01\\/2019')
        || line.includes('classStartDate":"08\\/01\\/2018'))
        {
          semester = 'Winter'
        }
        if (line.includes('classStartDate":"08\\/09\\/2015') || line.includes('classStartDate":"02\\/09\\/2014')
            || line.includes('classStartDate":"03\\/09\\/2019') || line.includes('classStartDate":"06\\/09\\/2016')
            || line.includes('classStartDate":"05\\/09\\/2017') || line.includes('classStartDate":"04\\/09\\/2018'))
        {
          semester = 'Fall'
        }
        if (line.includes('classStartDate":"07\\/05\\/2014') || line.includes('classStartDate":"02\\/05\\/2016')
            || line.includes('classStartDate":"03\\/05\\/2017') || line.includes('classStartDate":"06\\/05\\/2019')
            || line.includes('classStartDate":"04\\/05\\/2015'))
        {
          semester = 'Summer'
        }
        var lectureSectionNumber = line.substring(line.search(/("section":)/) + 10, line.search(/(,"componentCode")/));
        var instructorName = null;
        var classLocation = line.substring(line.search(/("roomCode":)/) + 11, line.search(/(,"buildingCode)/));
        var subject =
            line.substring(
                line.search(/(subject)/) + a,
                line.search(/(subject)/) + b
            );
        var catalog =
            line.substring(
                line.search(/(subject)/) + c,
                line.search(/(","section)/)
            );
        var startTime =
            line.substring(
                line.search(/(classStartTime":")/) + 17,
                line.search(/(","classEndTime)/)
            );
        var endTime =
            line.substring(
                line.search(/(classEndTime":")/) + 15,
                line.search(/(","modays)/)
            );
        // console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+lectureSectionNumber+ "from " +startTime+ " to " +endTime);


        // var seqToAdd = "Lecture added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+lectureSectionNumber+ "from " +startTime+ " to " +endTime;


        var lecSequence = new LectureSequence(subject.toString(),catalog.toString(),lectureSectionNumber.toString(),classLocation.toString(),days.toString(),startTime.toString(),endTime.toString(),semester.toString());

        lectureSequenceList.addLast(lecSequence);

        if (!(lectureOldValue == lectureSequenceList.size)) {

          /*
          console.log(
              "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
              prereqs + " coreqs: " + coreqs
          );*/

          // // adding to database
          connection.query(`INSERT INTO lecture (subject,classNumber,lectureSectionNumber,location,days,startTime,endTime,semester) VALUES ('${subject}','${catalog}','${lectureSectionNumber}','${classLocation}','${days}','${startTime}','${endTime}','${semester}');`, function (err, result, fields) {
            if (err) throw err;
          });

          lectureOldValue = lectureSequenceList.size;
        }


      }
      else if (line.search(/("componentDescription":"Tutorial")/) >= 0)
      { 	var days="";
        if(line.search(/("modays":"Y")/)>= 0){
          days += "Monday, "};
        if(line.search(/("tuesdays":"Y")/)>= 0){
          days += "Tuesday, "};
        if(line.search(/("wednesdays":"Y")/)>= 0){
          days += "Wednesday, "};
        if(line.search(/("thursdays":"Y")/)>= 0){
          days += "Thursday, "};
        if(line.search(/("fridays":"Y")/)>= 0){
          days += "Friday, "};
        if(line.search(/("saturdays":"Y")/)>= 0){
          days += "Saturday, "};
        if(line.search(/("sundays":"Y")/)>= 0){
          days += "Sunday"};
        var semester = "";
        if (line.includes('classStartDate":"07\\/01\\/2015') || line.includes('classStartDate":"09\\/01\\/2017')
            || line.includes('classStartDate":"06\\/01\\/2020') || line.includes('classStartDate":"06\\/01\\/2016')
            || line.includes('classStartDate":"09\\/01\\/2017') || line.includes('classStartDate":"07\\/01\\/2019')
            || line.includes('classStartDate":"08\\/01\\/2018'))
        {
          semester = 'Winter'
        }
        if (line.includes('classStartDate":"08\\/09\\/2015') || line.includes('classStartDate":"02\\/09\\/2014')
            || line.includes('classStartDate":"03\\/09\\/2019') || line.includes('classStartDate":"06\\/09\\/2016')
            || line.includes('classStartDate":"05\\/09\\/2017') || line.includes('classStartDate":"04\\/09\\/2018'))
        {
          semester = 'Fall'
        }
        if (line.includes('classStartDate":"07\\/05\\/2014') || line.includes('classStartDate":"02\\/05\\/2016')
            || line.includes('classStartDate":"03\\/05\\/2017') || line.includes('classStartDate":"06\\/05\\/2019')
            || line.includes('classStartDate":"04\\/05\\/2015'))
        {
          semester = 'Summer'
        }
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
                line.search(/(","section)/)
            );

        var startTime =
            line.substring(
                line.search(/(classStartTime":")/) + 17,
                line.search(/(","classEndTime)/)
            );
        var endTime =
            line.substring(
                line.search(/(classEndTime":")/) + 15,
                line.search(/(","modays)/)
            );

        //console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+tutorialSectionNumber+ "from " +startTime+ " to " +endTime);

        // // adding to database
        // var seqToAdd = "Tutorial added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+lectureSectionNumber+ "from " +startTime+ " to " +endTime;

        var tutSequence = new TutorialSequence(subject.toString(),catalog.toString(),tutorialSectionNumber.toString(),classLocation.toString(),days.toString(),startTime.toString(),endTime.toString(),semester.toString());

        tutSequenceList.addLast(tutSequence);

        if (!(tutOldValue == tutSequenceList.size)) {

          /*
          console.log(
              "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
              prereqs + " coreqs: " + coreqs
          );*/

          // // adding to database
          connection.query(`INSERT INTO tutorial (subject,classNumber,tutorialSectionNumber,location,days,startTime,endTime,semester) VALUES ('${subject}','${catalog}','${tutorialSectionNumber}','${classLocation}','${days}','${startTime}','${endTime}','${semester}');`, function (err, result, fields) {
            if (err) throw err;
          });
          tutOldValue = tutSequenceList.size;
        }
      }

      else if (line.search(/("componentDescription":"Laboratory")/) >= 0)
      { 	var days ="";
        if(line.search(/("modays":"Y")/)>= 0){
          days += "Monday, "};
        if(line.search(/("tuesdays":"Y")/)>= 0){
          days += "Tuesday, "};
        if(line.search(/("wednesdays":"Y")/)>= 0){
          days += "Wednesday, "};
        if(line.search(/("thursdays":"Y")/)>= 0){
          days += "Thursday, "};
        if(line.search(/("fridays":"Y")/)>= 0){
          days += "Friday, "};
        if(line.search(/("saturdays":"Y")/)>= 0){
          days += "Saturday, "};
        if(line.search(/("sundays":"Y")/)>= 0){
          days += "Sunday"};
        var semester = "";
        if (line.includes('classStartDate":"07\\/01\\/2015') || line.includes('classStartDate":"09\\/01\\/2017')
            || line.includes('classStartDate":"06\\/01\\/2020') || line.includes('classStartDate":"06\\/01\\/2016')
            || line.includes('classStartDate":"09\\/01\\/2017') || line.includes('classStartDate":"07\\/01\\/2019')
            || line.includes('classStartDate":"08\\/01\\/2018'))
        {
          semester = 'Winter'
        }
        if (line.includes('classStartDate":"08\\/09\\/2015') || line.includes('classStartDate":"02\\/09\\/2014')
            || line.includes('classStartDate":"03\\/09\\/2019') || line.includes('classStartDate":"06\\/09\\/2016')
            || line.includes('classStartDate":"05\\/09\\/2017') || line.includes('classStartDate":"04\\/09\\/2018'))
        {
          semester = 'Fall'
        }
        if (line.includes('classStartDate":"07\\/05\\/2014') || line.includes('classStartDate":"02\\/05\\/2016')
            || line.includes('classStartDate":"03\\/05\\/2017') || line.includes('classStartDate":"06\\/05\\/2019')
            || line.includes('classStartDate":"04\\/05\\/2015'))
        {
          semester = 'Summer'
        }
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
                line.search(/(","section)/)
            );

        var startTime =
            line.substring(
                line.search(/(classStartTime":")/) + 17,
                line.search(/(","classEndTime)/)
            );
        var endTime =
            line.substring(
                line.search(/(classEndTime":")/) + 15,
                line.search(/(","modays)/)
            );

        //console.log("Laboratory added! Class: " +subject+ " " +catalog+ "  Room: "+classLocation+" Days: "+days+" Section number: "+labSectionNumber+ "from " +startTime+ " to " +endTime);

        // // adding to database
        var labSequence = new LabSequence(subject.toString(),catalog.toString(),labSectionNumber.toString(),classLocation.toString(),days.toString(),startTime.toString(),endTime.toString(),semester.toString());

        labSequenceList.addLast(labSequence);

        if (!(labOldValue == labSequenceList.size)) {

          /*
          console.log(
              "Succesfully inserted: Title: "+courseTitle+" subject: "+subject+ " catalog:  " + catalog + " credits: " + credits + " prereqs: " +
              prereqs + " coreqs: " + coreqs
          );*/

          // // adding to database
          connection.query(`INSERT INTO laboratory (subject,classNumber,labSectionNumber,location,days,startTime,endTime,semester) VALUES ('${subject}','${catalog}','${labSectionNumber}','${classLocation}','${days}','${startTime}','${endTime}','${semester}');`, function (err, result, fields) {
            if (err) throw err;
          });
          labOldValue = labSequenceList.size;
        }
      }
      else
      {
        console.log("Empty Line");
      }


    });

    rl.on('close', function(line) {
      done();
    });

  }


}


function task15(done) {
  console.log('FINAL TASK. Lets print the size of the lists-');

  // These are the 4 linked lists with the relevant information
  console.log("Courses: "+courseList.size);
  console.log("lectureSequenceList: "+lectureSequenceList.size);
  console.log("labSequenceList: "+labSequenceList.size);
  console.log("tutSequenceList: "+tutSequenceList.size);

  // console.log(courseList.getLast().courseTitle);

  // console.log(labSequenceList.removeLast());
  // console.log(labSequenceList.getFirst().subject);
  //
  // var lol = lectureSequenceList.cloneMe();
  // for (var i = 0; i < lectureSequenceList.size; i++){
  //   var oops = lol.getLast();
  //   lol.removeLast();
  //   if (oops.catalog > 300){
  //     console.log(oops.subject + oops.catalog);
  //   }
  // }

  done();

}

function task16(done) {

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Any future work should be done here in order to maintain the async waterfall





// SOME EXAMPLES of Linked-list manipulation below


  // Print out all lab sections of 200-level courses

  // var current = lectureSequenceList.head;
  // while( current !== null ) {
  //
  //   if (current.element.catalog < 300) {
  //     console.log("CLASS: "+current.element.subject +" "+ current.element.catalog + " SECTION: "+ current.element.lectureSectionNumber)
  //   }
  //   current = current.next;
  // }



  // Print out lectures given on a friday

  // var current = lectureSequenceList.head;
  // while( current !== null ) {
  //
  //   // The condition is checked here
  //   if (current.element.days.toString().includes("Friday")) {
  //     console.log("CLASS: "+current.element.subject +" "+ current.element.catalog + " SECTION: "+ current.element.lectureSectionNumber + " On days: "+ current.element.days)
  //   }
  //   current = current.next;
  // }



  // Combining both conditions of above (if a class is 200-level and lecture is offered on a Friday

  // var current = lectureSequenceList.head;
  // while( current !== null ) {
  //
  //   // The condition is checked here
  //   if (current.element.days.includes("Friday") && current.element.catalog < 300) {
  //     console.log("CLASS: "+current.element.subject +" "+ current.element.catalog + " SECTION: "+ current.element.lectureSectionNumber + " On days: "+ current.element.days + " starttime: " + current.element.startTime + " location: " +current.element.classLocation)
  //   }
  //   current = current.next;
  // }




  // Removing out all 200-level courses from the Course LinkedList

  // var current = courseList.head;
  //
  // while( current !== null ) {
  //   if (current.element.catalog < 300)
  //   {
  //     console.log("Removed: CLASS: "+current.element.subject +" "+ current.element.catalog + " Title: "+ current.element.courseTitle);
  //     courseList.remove(current.element);
  //   }
  //   current = current.next;
  // }
  //
  //
  // console.log("Here's the updated courseList size: " + courseList.size);










  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  done();
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
// module.exports = connection;

