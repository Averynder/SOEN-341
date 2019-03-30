import React from "react";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import { Modal, Form, FormControl, Table } from "react-bootstrap";
import * as times from "./data/calendar.json";
import * as data from "./data/courses.json";
import * as data1 from "./data/courses2.json";
import { CirclePicker } from "react-color";
import reactCSS from "reactcss";
import LoadingScreen from 'react-loading-screen';
import JsonLecture from "./JsonLecture";
import JsonClass from "./JsonClass";
import JsonTut from "./JsonTut";
import Course from "./Course";
import axios from 'axios';
import * as ReactDOM from "react-dom";

class CourseSelectionMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow1 = this.handleShow1.bind(this);
    this.handleClose1 = this.handleClose1.bind(this);
    this.openRubiat = this.openRubiat.bind(this);
    this.closeRubiat = this.closeRubiat.bind(this);
    this.colourRubiatC = this.colourRubiatC.bind(this);
    this.colourRubiatO = this.colourRubiatO.bind(this);
    this.openUpload = this.openUpload.bind(this);
    this.closeUpload = this.closeUpload.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.setCourses = this.setCourses.bind(this);
    this.regEx = this.regEx.bind(this);
    this.regEx2 = this.regEx2.bind(this);
    this.changeSection = this.changeSection.bind(this);

    var year;
    var semester;

    if (
      document.getElementById("semester-year") === null ||
      document.getElementById("semester") === null
    ) {
      year = new Date().getFullYear();
      semester = "Fall";
    } else {
      year = document.getElementById("semester-year").value;
      semester = document.getElementById("semester").value;
    }

    this.state = {
      show: false,
      show1: false,
      rubiat: false,
      colorS: false,
      isLoading: true,
      lectures: null,
      labs: null,
      tutorials: null,
      dataCourses: null,
      Courses: null,
      coursesFall: null,
      coursesWinter: null,
      coursesSummer: null,
      coursesTaken: null,
      loggedIn: false,
      semester: semester,
      year: year,
      weekdays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      credits: 0,
      //classes: JSON.parse(JSON.stringify(data.sequence)),

      colors: [["#f44336", 0], ["#e91e63", 0], ["#4caf50", 0], ["#795548", 0], ["#ff9800", 0], ["#3f51b5", 0], ["#607d8b", 0]],

      addedClasses: [],

      courses: JSON.parse(JSON.stringify(data.default.sequence)),
      courses2: JSON.parse(JSON.stringify(data1.default.sequence)),
      selectedCourses: [],
      show2: "hidden",

      colorOfNewClass: [],

      showUpload: false,

      uploadedFile: null,

      defaultValueLectureTutorial: "",
      defaultValueLab: "",

      showSelection: 'block',
      showSchedule: 'none'

    };
    //console.log("data.sequence: " + JSON.stringify(data.sequence));
    //console.log("courses: " + JSON.stringify(data.default.sequence));
  }

  componentDidMount() {
    fetch("/semQuery")
      .then(res => res.json())
      .then(users2 =>
        this.setState({ users2 }, () => this.setCourses(users2)))
      .then(() => this.regEx())
      .then(() => this.toggleLoading());
  }

  setCourses(stringy)
  {
    stringy = "" + stringy;
    var lecStartPosition = stringy.indexOf("\"lectures\":[");
    var tutStartPosition = stringy.indexOf("\"tutorials\":[");
    this.state.lectures = stringy.substring(lecStartPosition+12,tutStartPosition);
    var labStartPosition = stringy.indexOf("\"labs\":[");
    this.state.tutorials = stringy.substring(tutStartPosition+13,labStartPosition);
    var sequenceStartPos = stringy.indexOf("\"result2\":[");
    this.state.labs = stringy.substring(labStartPosition+8,sequenceStartPos);
    var namePosition = stringy.indexOf("\"names\":[");
    this.state.Courses = stringy.substring(sequenceStartPos+11,namePosition);
    var endingPosition = stringy.indexOf("]}]");
    this.state.coursesTaken = stringy.substring(namePosition+9,endingPosition);
    if (this.state.coursesTaken != "")
      this.state.loggedIn = true;
  }

  regEx()
  {
    var courses31 = [];
    var totaldatabaseEntriesLec = 0;
    var totaldatabaseEntriesTut = 0;
    var totaldatabaseEntriesLab = 0;

    // Gathering Info from Lectures
    while (this.state.lectures.length > 1)
    {
      var subjectStart = this.state.lectures.indexOf("\"subject\":\"");
      this.state.lectures = this.state.lectures.substring(subjectStart + 11);
      var endQuote1 = this.state.lectures.indexOf("\"");
      var subject = this.state.lectures.substring(0,endQuote1);

      var classnumbertStart = this.state.lectures.indexOf("\"classNumber\":\"");
      this.state.lectures = this.state.lectures.substring(classnumbertStart + 15);
      var endQuote2 = this.state.lectures.indexOf("\"");
      var classNumber = this.state.lectures.substring(0,endQuote2);
      subject = subject+classNumber;

      var lectureSectionNumber = this.state.lectures.indexOf("\"lectureSectionNumber\":\"\\\"");
      this.state.lectures = this.state.lectures.substring(lectureSectionNumber + 26);
      var endQuote3 = this.state.lectures.indexOf("\"");
      var sectionNumber = this.state.lectures.substring(0,endQuote3 - 1);

      var locationNumber = this.state.lectures.indexOf("\"location\":\"\\\"");
      this.state.lectures = this.state.lectures.substring(locationNumber + 14);
      var endQuote4 = this.state.lectures.indexOf("\"");
      var location = this.state.lectures.substring(0,endQuote4 - 1);

      var daysWasOne = false;
      var daysNumber = this.state.lectures.indexOf("\"days\":\"");
      this.state.lectures = this.state.lectures.substring(daysNumber + 8);
      var endQuote5 = this.state.lectures.indexOf("\"");
      var days = this.state.lectures.substring(0,endQuote5);
      if (days.match(/day/) != null)
      {
        if (days.match(/day/g).length > 1)
        {
          days = days.substring(0,days.indexOf(",")) + "," + days.substring(days.indexOf(",")+2, days.length-2);
          var index = days.indexOf(",");
          var day1 = days.substring(0,index);
          var day2 = days.substring(index+1);
          days = [day1, day2];
        }
        else
        {
          days = "\"" + days.substring(0,days.indexOf(",")) + "\"," + days.substring(days.indexOf(",")+1, days.length - 2) + "\"";
          days = days.substring(0,days.length-3);
          days = days.substring(1,days.length-1);
          days = [days];
          daysWasOne = true;
        }
      }

      var startNumber = this.state.lectures.indexOf("\"startTime\":\"");
      this.state.lectures = this.state.lectures.substring(startNumber + 13);
      var endQuote6 = this.state.lectures.indexOf("\"");
      var startTime = this.state.lectures.substring(0,endQuote6-3);
      if (startTime.charAt(0) == " ")
        startTime = startTime.substring(1);
      startTime = parseFloat(startTime).toFixed(2);

      var endNumber = this.state.lectures.indexOf("\"endTime\":\"");
      this.state.lectures = this.state.lectures.substring(endNumber + 11);
      var endQuote7 = this.state.lectures.indexOf("\"");
      var endTime = this.state.lectures.substring(0,endQuote7-3);
      endTime = parseFloat(endTime).toFixed(2);

      if (daysWasOne)
      {
        if (endTime - startTime < 2.00)
        {
          days.push("Thursday");
        }
      }
      startTime = "" + startTime.substring(0,startTime.indexOf(".")) + ":" +startTime.substring(startTime.indexOf(".")+1);
      endTime = "" + endTime.substring(0,endTime.indexOf(".")) + ":" + endTime.substring(endTime.indexOf(".")+1);

      var semNumber = this.state.lectures.indexOf("\"semester\":\"");
      this.state.lectures = this.state.lectures.substring(semNumber + 12);
      var endQuote8 = this.state.lectures.indexOf("\"");
      var semester = this.state.lectures.substring(0,endQuote8);

      // Adding all the different Courses to an arraylist "courses"
      var newCourse = new JsonClass(subject,semester);
      var inThere = false;
      var indexOfCourse = 0;
      var i;
      for (i = 0; i < courses31.length; i++)
      {
        var boolean1 = courses31[i].equals2(newCourse);
        if (boolean1 == true)
        {
          inThere = true;
          indexOfCourse = i;
        }
      }
      if (!inThere)
      {
        courses31.push(newCourse);
        indexOfCourse = courses31.length-1;
      }
      // Adding The Lecture to the Course
      var lecture = new JsonLecture(sectionNumber,days,startTime,endTime,location);
      courses31[indexOfCourse].addLecture(lecture);
      //console.log(subject + " " + sectionNumber + " " + location + " " + days + " " + startTime + " " + endTime);
      totaldatabaseEntriesLec++;
    }

    // Adding Tutorial Entries

    while(this.state.tutorials.length > 1)
    {
      var subjectStart = this.state.tutorials.indexOf("\"subject\":\"");
      this.state.tutorials = this.state.tutorials.substring(subjectStart + 11);
      var endQuote1 = this.state.tutorials.indexOf("\"");
      var subject = this.state.tutorials.substring(0,endQuote1);

      var classnumbertStart = this.state.tutorials.indexOf("\"classNumber\":\"");
      this.state.tutorials = this.state.tutorials.substring(classnumbertStart + 15);
      var endQuote2 = this.state.tutorials.indexOf("\"");
      var classNumber = this.state.tutorials.substring(0,endQuote2);
      subject = subject+classNumber;

      var tutorialSectionNumber = this.state.tutorials.indexOf("\"tutorialSectionNumber\":\"\\\"");
      this.state.tutorials = this.state.tutorials.substring(tutorialSectionNumber + 27);
      var endQuote3 = this.state.tutorials.indexOf("\"");
      var sectionNumber = this.state.tutorials.substring(0,endQuote3 - 1);
      if (sectionNumber.indexOf(" ") > -1)
      {
        sectionNumber = sectionNumber.substring(0,sectionNumber.indexOf(" ")) + sectionNumber.substring(sectionNumber.indexOf(" ")+1);
      }

      var locationNumber = this.state.tutorials.indexOf("\"location\":\"\\\"");
      this.state.tutorials = this.state.tutorials.substring(locationNumber + 14);
      var endQuote4 = this.state.tutorials.indexOf("\"");
      var location = this.state.tutorials.substring(0,endQuote4 - 1);

      var daysNumber = this.state.tutorials.indexOf("\"days\":\"");
      this.state.tutorials = this.state.tutorials.substring(daysNumber + 8);
      var endQuote5 = this.state.tutorials.indexOf("\"");
      var days = this.state.tutorials.substring(0,endQuote5);
      if (days.match(/day/) != null)
      {
        if (days.match(/day/g).length == 1)
        {
          days = "\"" + days.substring(0,days.indexOf(",")) + "\"," + days.substring(days.indexOf(",")+1, days.length - 2) + "\"";
          days = days.substring(0,days.length-3);
          days = days.substring(1,days.length-1);
          days = [days];
        }
      }

      var startNumber = this.state.tutorials.indexOf("\"startTime\":\"");
      this.state.tutorials = this.state.tutorials.substring(startNumber + 13);
      var endQuote6 = this.state.tutorials.indexOf("\"");
      var startTime = this.state.tutorials.substring(0,endQuote6-3);
      if (startTime.charAt(0) == " ")
        startTime = startTime.substring(1);
      startTime = parseFloat(startTime).toFixed(2);

      var endNumber = this.state.tutorials.indexOf("\"endTime\":\"");
      this.state.tutorials = this.state.tutorials.substring(endNumber + 11);
      var endQuote7 = this.state.tutorials.indexOf("\"");
      var endTime = this.state.tutorials.substring(0,endQuote7-3);
      endTime = parseFloat(endTime).toFixed(2);

      startTime = "" + startTime.substring(0,startTime.indexOf(".")) + ":" +startTime.substring(startTime.indexOf(".")+1);
      endTime = "" + endTime.substring(0,endTime.indexOf(".")) + ":" + endTime.substring(endTime.indexOf(".")+1);

      var semNumber = this.state.tutorials.indexOf("\"semester\":\"");
      this.state.tutorials = this.state.tutorials.substring(semNumber + 12);
      var endQuote8 = this.state.tutorials.indexOf("\"");
      var semester = this.state.tutorials.substring(0,endQuote8);

      if (days.length == 0)
        days = ["Thursday"];
      else if (days[0] == "" || days[0] == " " || days[0] == null)
        days = ["Thursday"];

      var newCourse = new JsonClass(subject,semester);
      var foundCourse = false;
      var indexOfCourse = 0;
      var i;
      for (i = 0; i < courses31.length; i++)
      {
        var boolean1 = courses31[i].equals2(newCourse);
        if (boolean1 == true)
        {
          foundCourse = true;
          indexOfCourse = i;
        }
      }
      if (!foundCourse)
      {
        courses31.push(newCourse);
        indexOfCourse = courses31.length - 1;
      }

      // Adding The Tutorial to the Lecture in the Course --> Find Right Lecture --> Add Tut
      var lectureExists = false;
      var tut = new JsonTut(sectionNumber,days,startTime,endTime,location);
      var correctCourse = courses31[indexOfCourse];
      var lectureSection = sectionNumber.substring(0,sectionNumber.length-2);
      for (i = 0; i < correctCourse.lecture.length; i++)
      {
        if (correctCourse.lecture[i].section == lectureSection)
        {
          lectureExists = true;
          correctCourse.lecture[i].addTut(tut);
        }
      }
      if (!lectureExists)
      {
        var noLec = new JsonLecture();
        noLec.addTut(tut);
        correctCourse.addLecture(noLec);
      }
      //console.log(subject + " " + sectionNumber + " " + location + " " + days + " " + startTime + " " + endTime);
      totaldatabaseEntriesTut++;
      //console.log(subject + " " + sectionNumber + " " + location + " " + days + " " + startTime + " " + endTime);
    }

    // Gathering Info from Labs
    while (this.state.labs.length > 1)
    {
      var subjectStart = this.state.labs.indexOf("\"subject\":\"");
      this.state.labs = this.state.labs.substring(subjectStart + 11);
      var endQuote1 = this.state.labs.indexOf("\"");
      var subject = this.state.labs.substring(0,endQuote1);

      var classnumbertStart = this.state.labs.indexOf("\"classNumber\":\"");
      this.state.labs = this.state.labs.substring(classnumbertStart + 15);
      var endQuote2 = this.state.labs.indexOf("\"");
      var classNumber = this.state.labs.substring(0,endQuote2);
      subject = subject+classNumber;

      var labSectionNumber = this.state.labs.indexOf("\"labSectionNumber\":\"\\\"");
      this.state.labs = this.state.labs.substring(labSectionNumber + 22);
      var endQuote3 = this.state.labs.indexOf("\"");
      var sectionNumber = this.state.labs.substring(0,endQuote3 - 1);

      var locationNumber = this.state.labs.indexOf("\"location\":\"\\\"");
      this.state.labs = this.state.labs.substring(locationNumber + 14);
      var endQuote4 = this.state.labs.indexOf("\"");
      var location = this.state.labs.substring(0,endQuote4 - 1);

      var daysWasOne = false;
      var daysNumber = this.state.labs.indexOf("\"days\":\"");
      this.state.labs = this.state.labs.substring(daysNumber + 8);
      var endQuote5 = this.state.labs.indexOf("\"");
      var days = this.state.labs.substring(0,endQuote5);
      if (days.match(/day/) != null)
      {
        if (days.match(/day/g).length > 1)
        {
          days = days.substring(0,days.indexOf(",")) + "," + days.substring(days.indexOf(",")+2, days.length-2);
          var index = days.indexOf(",");
          var day1 = days.substring(0,index);
          var day2 = days.substring(index+1);
          days = [day1, day2];
        }
        else
        {
          days = "\"" + days.substring(0,days.indexOf(",")) + "\"," + days.substring(days.indexOf(",")+1, days.length - 2) + "\"";
          days = days.substring(0,days.length-3);
          days = days.substring(1,days.length-1);
          days = [days];
          daysWasOne = true;
        }
      }

      var startNumber = this.state.labs.indexOf("\"startTime\":\"");
      this.state.labs = this.state.labs.substring(startNumber + 13);
      var endQuote6 = this.state.labs.indexOf("\"");
      var startTime = this.state.labs.substring(0,endQuote6-3);
      if (startTime.charAt(0) == " ")
        startTime = startTime.substring(1);
      startTime = parseFloat(startTime).toFixed(2);

      var endNumber = this.state.labs.indexOf("\"endTime\":\"");
      this.state.labs = this.state.labs.substring(endNumber + 11);
      var endQuote7 = this.state.labs.indexOf("\"");
      var endTime = this.state.labs.substring(0,endQuote7-3);
      endTime = parseFloat(endTime).toFixed(2);

      if (days.length == 0)
        days = ["Thursday"];
      else if (days[0] == "" || days[0] == " " || days[0] == null)
        days = ["Thursday"];
      startTime = "" + startTime.substring(0,startTime.indexOf(".")) + ":" +startTime.substring(startTime.indexOf(".")+1);
      endTime = "" + endTime.substring(0,endTime.indexOf(".")) + ":" + endTime.substring(endTime.indexOf(".")+1);

      var semNumber = this.state.labs.indexOf("\"semester\":\"");
      this.state.labs = this.state.labs.substring(semNumber + 12);
      var endQuote8 = this.state.labs.indexOf("\"");
      var semester = this.state.labs.substring(0,endQuote8);

      // Adding all the different Courses to an arraylist "courses"
      var newCourse = new JsonClass(subject,semester);
      var indexOfCourse = 0;
      var i;
      for (i = 0; i < courses31.length; i++)
      {
        var boolean1 = courses31[i].equals2(newCourse);
        if (boolean1 == true)
        {
          indexOfCourse = i;
        }
      }
      // Adding The Lecture to the Course
      var labby = new JsonLecture(sectionNumber,days,startTime,endTime,location);
      courses31[indexOfCourse].addLab(labby);
      //console.log(subject + " " + sectionNumber + " " + location + " " + days + " " + startTime + " " + endTime);
      totaldatabaseEntriesLab++;
    }

    // Displaying Results
    courses31.pop();
    console.log("Got #" + totaldatabaseEntriesLec + " Lecture entries from database");
    console.log("Got #" + totaldatabaseEntriesTut + " Tutorial entries from database");
    console.log("Got #" + totaldatabaseEntriesLab + " Lab entries from database");
    this.state.dataCourses = courses31;
    this.regEx2();
    console.log(this.state.dataCourses);
    console.log(data1.sequence);
    // Removing Courses Already taken from set
    if (this.state.loggedIn)
    {
      var jjj;
      while (this.state.coursesTaken.length > 1)
      {
        var startingQuote = this.state.coursesTaken.indexOf("\"");
        this.state.coursesTaken = this.state.coursesTaken.substring(startingQuote+1);
        var endingQuote = this.state.coursesTaken.indexOf("\"");
        var course = this.state.coursesTaken.substring(0,endingQuote);
        course = course.substring(0,course.indexOf(" ")) + course.substring(course.indexOf(" ")+1);
        this.state.coursesTaken = this.state.coursesTaken.substring(9);
        for (jjj = 0; jjj < this.state.dataCourses.length; jjj++)
        {
          if (this.state.dataCourses[jjj].course == course)
          {
            this.state.dataCourses.splice(jjj, 1);
          }
        }
      }
    }
    // Removing Undefined Lectures from set
    var jarjar, jarjab;
    for (jarjar = 0; jarjar < this.state.dataCourses.length; jarjar++)
    {
      for (jarjab = 0; jarjab < this.state.dataCourses[jarjar].lecture.length; jarjab++)
      {
        if (this.state.dataCourses[jarjar].lecture[jarjab] != null)
        {
          if (this.state.dataCourses[jarjar].lecture[jarjab].section == undefined)
          {
            this.state.dataCourses[jarjar].lecture.splice(jarjab, 1);
            jarjab = -1;
          }
        }
      }
    }
    // Placing Courses into Semesters
    var coursesFall = [];
    var coursesWinter = [];
    var coursesSummer = [];
    for (i = 0; i < courses31.length; i++)
    {
      if (courses31[i].semester == "Fall")
      {
        coursesFall.push(courses31[i]);
      }
      else if (courses31[i].semester == "Winter")
      {
        coursesWinter.push(courses31[i]);
      }
      else
      {
        coursesSummer.push(courses31[i]);
      }
    }
    var j, k, a, b;
    for (i = 0; i < courses31.length; i++)
    {
      // lecture removing duplicates
      if (courses31[i].lecture != null) {
        for (j = 0; j < courses31[i].lecture.length; j++) {
          for (k = 0; k < courses31[i].lecture.length; k++) {
            if (courses31[i].lecture[j] != null) {
              if (courses31[i].lecture[j].section == courses31[i].lecture[k].section
                  && courses31[i].lecture[j].startTime == courses31[i].lecture[k].startTime
                  && courses31[i].lecture[j].endTime == courses31[i].lecture[k].endTime
                  && courses31[i].lecture[j].room != courses31[i].lecture[k].room
                  && j != k) {
                courses31[i].lecture[j].room += " or " + courses31[i].lecture[k].room;
                courses31[i].lecture.splice(k, 1);
              }
            }
          }
          if (courses31[i].lecture[j] != null) {
            if (courses31[i].lecture[j].tutorial != null) {
              for (b = 0; b < courses31[i].lecture[j].tutorial.length; b++) {
                for (a = 0; a < courses31[i].lecture[j].tutorial.length; a++) {
                  if (courses31[i].lecture[j].tutorial[b] != null) {
                    if (courses31[i].lecture[j].tutorial[b].section == courses31[i].lecture[j].tutorial[a].section
                        && courses31[i].lecture[j].tutorial[b].startTime == courses31[i].lecture[j].tutorial[a].startTime
                        && courses31[i].lecture[j].tutorial[b].endTime == courses31[i].lecture[j].tutorial[a].endTime
                        && courses31[i].lecture[j].tutorial[b].room != courses31[i].lecture[j].tutorial[a].room
                        && a != b) {
                      courses31[i].lecture[j].tutorial[b].room += " or " + courses31[i].lecture[j].tutorial[a].room;
                      courses31[i].lecture[j].tutorial.splice(a, 1);
                      a = -1;
                    }
                  }
                }
              }
            }
          }
        }
      }
      // lab removing duplicates
      if (courses31[i].lab != null) {
        for (a = 0; a < courses31[i].lab.length; a++) {
          for (k = 0; k < courses31[i].lab.length; k++) {
            if (courses31[i].lab[a].section == courses31[i].lab[k].section
                && courses31[i].lab[a].startTime == courses31[i].lab[k].startTime
                && courses31[i].lab[a].endTime == courses31[i].lab[k].endTime
                && courses31[i].lab[a].room != courses31[i].lab[k].room
                && a != k) {
              courses31[i].lab[a].room += " or " + courses31[i].lab[k].room;
              courses31[i].lab.splice(k, 1);
            }
          }
        }
      }
    }

    /*
    // Previous Loop Skips certain duplicates because of numbering
    for (i = 0; i < courses31.length; i++) {
      // lecture removing duplicates
      if (courses31[i].lecture != null) {
        for (j = 0; j < courses31[i].lecture.length; j++) {
          if (courses31[i].lecture[j] != null) {
            if (courses31[i].lecture[j].tutorial != null) {
              for (b = 0; b < courses31[i].lecture[j].tutorial.length; b++) {
                for (a = 0; a < courses31[i].lecture[j].tutorial.length; a++) {
                  if (courses31[i].lecture[j].tutorial[b] != null) {
                    if (courses31[i].lecture[j].tutorial[b].section == courses31[i].lecture[j].tutorial[a].section
                        && courses31[i].lecture[j].tutorial[b].startTime == courses31[i].lecture[j].tutorial[a].startTime
                        && courses31[i].lecture[j].tutorial[b].endTime == courses31[i].lecture[j].tutorial[a].endTime
                        && courses31[i].lecture[j].tutorial[b].room != courses31[i].lecture[j].tutorial[a].room
                        && a != b) {
                      courses31[i].lecture[j].tutorial.splice(a, 1);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    */
    this.state.coursesFall = coursesFall;
    this.state.coursesWinter = coursesWinter;
    this.state.coursesSummer = coursesSummer;
    this.state.courses2 = this.state.coursesFall;
    //this.state.courses2 = courses31; //CHANGE TO GET PROPER COURSES
  }

  regEx2()
  {
    //console.log(this.state.dataCourses);
    //console.log(data1.sequence);
    while (this.state.Courses.length > 1)
    {
      var titleStart = this.state.Courses.indexOf("\"courseTitle\":\"");
      this.state.Courses = this.state.Courses.substring(titleStart + 15);
      var endQuote1 = this.state.Courses.indexOf("\"");
      var title = this.state.Courses.substring(0,endQuote1);

      var subjectStart = this.state.Courses.indexOf("\"subject\":\"");
      this.state.Courses = this.state.Courses.substring(subjectStart + 11);
      var endQuote2 = this.state.Courses.indexOf("\"");
      var subject = this.state.Courses.substring(0,endQuote2);

      var numberStart = this.state.Courses.indexOf("\"classNumber\":\"");
      this.state.Courses = this.state.Courses.substring(numberStart + 15);
      var endQuote3 = this.state.Courses.indexOf("\"");
      var courseNumber = this.state.Courses.substring(0,endQuote3);

      var creditsStart = this.state.Courses.indexOf("\"credits\":\"");
      this.state.Courses = this.state.Courses.substring(creditsStart + 11);
      var endQuote4 = this.state.Courses.indexOf("\"");
      var creditNumber = this.state.Courses.substring(0,endQuote4);

      var prereqStart = this.state.Courses.search("\"prerequisites\":\"");
      this.state.Courses = this.state.Courses.substring(prereqStart + 17);
      var endQuote5 = this.state.Courses.search("\"");
      var prereqs = this.state.Courses.substring(0,endQuote5);
      var potentialSPace = prereqs.charAt(0);
      if (potentialSPace == ' ')
        prereqs = prereqs.substring(1);
      while (prereqs.indexOf("<==>") > -1)
      {
        var weirdshi = prereqs.indexOf("<==>");
        prereqs = prereqs.substring(0,weirdshi) +  " or " + prereqs.substring(weirdshi+4);
      }
      while (prereqs.search(/\d COMP/) > -1)
      {
        var starter = prereqs.search(/\d COMP/);
        prereqs = prereqs.substring(0,starter+1) + " and COMP" + prereqs.substring(starter+6);
      }
      while (prereqs.search(/\d SOEN/) > -1)
      {
        var starter = prereqs.search(/\d SOEN/);
        prereqs = prereqs.substring(0,starter+1) + " and SOEN" + prereqs.substring(starter+6);
      }
      while (prereqs.search(/\d MATH/) > -1)
      {
        var starter = prereqs.search(/\d MATH/);
        prereqs = prereqs.substring(0,starter+1) + " and MATH" + prereqs.substring(starter+6);
      }
      while (prereqs.search(/\d ENGR/) > -1)
      {
        var starter = prereqs.search(/\d ENGR/);
        prereqs = prereqs.substring(0,starter+1) + " and ENGR" + prereqs.substring(starter+6);
      }
      while (prereqs.search(/\d ENCS/) > -1)
      {
        var starter = prereqs.search(/\d ENCS/);
        prereqs = prereqs.substring(0,starter+1) + " and ENCS" + prereqs.substring(starter+6);
      }

      var coreqStart = this.state.Courses.search("\"corequisites\":\"");
      this.state.Courses = this.state.Courses.substring(coreqStart + 16);
      var endQuote6 = this.state.Courses.search("\"");
      var coreqs = this.state.Courses.substring(0,endQuote6);
      var potentialSPace2 = coreqs.charAt(0);
      if (potentialSPace2 == ' ')
        coreqs = coreqs.substring(1);
      while (coreqs.indexOf("<==>") > -1)
      {
        var weirdshi = coreqs.indexOf("<==>");
        coreqs = coreqs.substring(0,weirdshi) +  " or " + coreqs.substring(weirdshi+4);
      }
      while (coreqs.search(/\d COMP/) > -1)
      {
        var starter = coreqs.search(/\d COMP/);
        coreqs = coreqs.substring(0,starter+1) + " and COMP" + coreqs.substring(starter+6);
      }
      while (coreqs.search(/\d SOEN/) > -1)
      {
        var starter = coreqs.search(/\d SOEN/);
        coreqs = coreqs.substring(0,starter+1) + " and SOEN" + coreqs.substring(starter+6);
      }
      while (coreqs.search(/\d MATH/) > -1)
      {
        var starter = coreqs.search(/\d MATH/);
        coreqs = coreqs.substring(0,starter+1) + " and MATH" + coreqs.substring(starter+6);
      }
      while (prereqs.search(/\d ENGR/) > -1)
      {
        var starter = coreqs.search(/\d ENGR/);
        coreqs = coreqs.substring(0,starter+1) + " and ENGR" + coreqs.substring(starter+6);
      }
      while (coreqs.search(/\d ENCS/) > -1)
      {
        var starter = coreqs.search(/\d ENCS/);
        coreqs = coreqs.substring(0,starter+1) + " and ENCS" + coreqs.substring(starter+6);
      }
      if (prereqs.indexOf(",") > -1)
        prereqs = "";
      if (title != "")
      {
        subject = subject + courseNumber;
        //var cc = new Course(title, subject, courseNumber, creditNumber, prereqs, coreqs);
        var i;
        for (i = 0; i < this.state.dataCourses.length; i++)
        {
          if (this.state.dataCourses[i].course == subject)
          {
            this.state.dataCourses[i].name = title;
            this.state.dataCourses[i].credit = parseFloat(creditNumber);
          }
        }
        //console.log(title + " " + subject + " " + creditNumber + " Pre: " + prereqs + " Co: " + coreqs);
      }
    }
  }

  timeToNum = time => {
    // time parameter represents start time or end time of a class

    // algo for rounding since table is jumps of 15 mins
    let time1, time2;
    let time1Minute, time2Minute;
    let timeHour = time.substring(0, time.indexOf(":"));
    let timeMinute = time.substring(time.indexOf(":")+1);

    timeMinute = parseInt(timeMinute);
    time1Minute = timeMinute - 5;
    time2Minute = timeMinute + 5;

    if (time1Minute == -5) {
      time2 = timeHour + ":0" + time2Minute; // @@:05
      timeHour = parseInt(timeHour);
      timeHour--;
      time1 = timeHour + ":" + "55";
    }
    else if (time2Minute == 60) {
      time1 = timeHour + ":" + time1Minute; // @@:50
      timeHour = parseInt(timeHour);
      timeHour++;
      time2 = timeHour + ":" + "00";
    }
    else if (time1Minute == 0) {
      time1 = timeHour + ":00"; // @@:00 instead of @@:0
      time2 = timeHour + ":" + time2Minute; // @@:10
    }
    else {
      time1 = timeHour + ":" + time1Minute;
      time2 = timeHour + ":" + time2Minute;
    }

    for (let i = 0; i < 61; i++)
      if ((time1 === times.time[i].startTime) ||
          (time === times.time[i].startTime) ||
          (time2 === times.time[i].startTime)) return times.time[i].num;
    return null;
  };

  handleSemesterChange = () => {

    for (let i = 0; i < this.state.selectedCourses.length; i++) {
      document.getElementById("add-class1").value = this.state.selectedCourses[i][0].course;
      this.remove1();
    }

    document.getElementById("add-class1").value = "";

    this.setState({
      year: document.getElementById("semester-year").value,
      semester: document.getElementById("semester").value,
      selectedCourses: [],
      credits: 0
    });
    this.state.year = document.getElementById("semester-year").value;
    this.state.semester = document.getElementById("semester").value;
    if (this.state.semester == "Fall")
    {
      this.state.courses2 = this.state.coursesFall;
    }
    else if (this.state.semester == "Winter")
    {
      this.state.courses2 = this.state.coursesWinter;
    }
    else if (this.state.semester == "Summer")
    {
      this.state.courses2 = this.state.coursesSummer;
    }
    //console.log(this.state.semester);
  }

  handleDisplay = () => {
    this.setState({
      showSelection: 'none',
      showSchedule: 'block'
    })
  }

  handleDisplay1 = () => {
    this.setState({
      showSelection: 'block',
      showSchedule: 'none'
    })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose1() {
    this.setState({ show1: false });
  }

  handleShow1() {
    this.setState({ show1: true });
  }

  openRubiat() {
    this.setState({
      rubiat: true
    });
  }

  closeRubiat() {
    this.setState({
      rubiat: false
    });
  }

  colourRubiatO() {
    this.setState({
      colorS: true
    });
  }

  colourRubiatC() {
    this.setState({
      colorS: false
    });
  }

  openUpload() {
    this.setState({
      showUpload: true
    })
  }

  closeUpload() {
    this.setState({
      showUpload: false
    })
  }

  handleSelectedFile = event => {
    this.setState({
      uploadedFile: event.target.files[0]
    })
  }

  handleUpload = () => {
    var file = this.state.uploadedFile;
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      //console.log(reader.result);
      var JSONified = JSON.parse(reader.result);

      for (let i = 0; i < JSONified.length; i++) {
        // document.getElementById("add-class1").value = JSONified[i].course;
        // this.addClass();

        let array = this.state.selectedCourses; //Keep track of user selected classes
        let input = JSONified[i][0].course;
        let classList = this.state.courses2; //Gets the whole list of courses of concordia
        let addedClass;
        let classExists = false;
        for (let i = 0; i < classList.length; i++) {
          if (classList[i].course === input) {
            for (let j = 0; j < this.state.selectedCourses.length; j++) {
              if (this.state.selectedCourses[j][0].course === input) {
                document.getElementById("addStatus1").innerHTML =
                  "This class is already added.";
                this.setState({ show2: "visible" });
                return;
              }
            }
            addedClass = classList[i];
            classExists = true;
            this.setState({ show2: "hidden" });
            break;
          }
        }

        if (classExists === false) {
          document.getElementById("addStatus1").innerHTML =
            "Invalid Class/Class Not Found";
          this.setState({ show2: "visible" });
          return;
        }

        let colorChosen;

        for (let j = 0; j < this.state.colors.length; j++) {
          if (this.state.colors[j][1] == 0) {
            colorChosen = this.state.colors[j][0];
            this.state.colors[j][1] = 1;
            break;
          }
        }

        if (colorChosen === null || colorChosen === undefined) {
          return;
        }

        let lectureIndex = JSONified[i][1];
        let tutorialIndex = JSONified[i][2];
        let labIndex = JSONified[i][3];

        for(let j=0; j<addedClass.lecture[lectureIndex].days.length; j++){ // add lecture

        let initial = this.timeToNum(addedClass.lecture[lectureIndex].startTime);
        let final = this.timeToNum(addedClass.lecture[lectureIndex].endTime) - 1;
        let middle = parseInt((initial + final)/2);

          for (let i = 0; i < 61; i++) {
            if (
              initial <= i &&
              final >= i
            ) {
              let dayOfTheWeek = addedClass.lecture[lectureIndex].days[j] + "-";
              document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
              if (i === middle - 1) {
                document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
              }else if(i === middle){
                document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lecture[lectureIndex].startTime;
              }
              else if(i === middle + 1){
                document.getElementById(dayOfTheWeek + i).innerHTML = "to";
              }
              else if(i === middle + 2){
                document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lecture[lectureIndex].endTime;
              }else{
                document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
              }

              if ((colorChosen == "brown") || (colorChosen == "green") || (colorChosen == "grey")) {
                document.getElementById(dayOfTheWeek + i).style.color = "beige";
              }
              else {
                document.getElementById(dayOfTheWeek + i).style.color = "black";
              }
            }
          }
        }

      if (addedClass.lecture[lectureIndex].tutorial.length != 0) {
        for (let k = 0; k < addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days.length; k++) { // add tutorial

          let initial = this.timeToNum(addedClass.lecture[lectureIndex].tutorial[tutorialIndex].startTime);
          let final = this.timeToNum(addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime) - 1;
          let middle = parseInt((initial + final)/2);

          if ((final - initial) <= 3) {
            for (let i = 0; i < 61; i++) {
              if (
                initial <= i &&
                final >= i
              ) {
                let dayOfTheWeek = addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days[k] + "-";
                document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
                }else if (i === middle) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "Tutorial";
                }else if(i === middle + 1){
                  document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lecture[lectureIndex].tutorial[tutorialIndex].startTime +
                  "-" + addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime;
                }else{
                  document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
                }

                if ((colorChosen == "brown") || (colorChosen == "green") || (colorChosen == "grey")) {
                  document.getElementById(dayOfTheWeek + i).style.color = "beige";
                }
                else {
                  document.getElementById(dayOfTheWeek + i).style.color = "black";
                }
              }
            }
          }
          else {
            for (let i = 0; i < 61; i++) {
              if (
                initial <= i &&
                final >= i
              ) {
                let dayOfTheWeek = addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days[k] + "-";
                document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
                }else if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "Tutorial";
                }else if(i === middle){
                  document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lecture[lectureIndex].tutorial[tutorialIndex].startTime;
                }else if(i === middle + 1){
                  document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                }else if(i === middle + 2){
                  document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime;
                }else{
                  document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
                }

                if ((colorChosen == "brown") || (colorChosen == "green") || (colorChosen == "grey")) {
                  document.getElementById(dayOfTheWeek + i).style.color = "beige";
                }
                else {
                  document.getElementById(dayOfTheWeek + i).style.color = "black";
                }
              }
            }
          }
        }
      }

        if (addedClass.lab.length != 0) {
          for (let l = 0; l < addedClass.lab[labIndex].days.length; l++) { // add lab

            let initial = this.timeToNum(addedClass.lab[labIndex].startTime);
            let final = this.timeToNum(addedClass.lab[labIndex].endTime) - 1;
            let middle = parseInt((initial + final)/2);

            if ((final - initial) <= 3) {
              for (let i = 0; i < 61; i++) {
                if (
                  initial <= i &&
                  final >= i
                ) {
                  let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
                  document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
                  }else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                  }else if(i === middle + 1){
                    document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lab[labIndex].startTime +
                    "-" + addedClass.lab[labIndex].endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
                  }

                  if ((colorChosen == "brown") || (colorChosen == "green") || (colorChosen == "grey")) {
                    document.getElementById(dayOfTheWeek + i).style.color = "beige";
                  }
                  else {
                    document.getElementById(dayOfTheWeek + i).style.color = "black";
                  }
                }
              }
            }
            else {
              for (let i = 0; i < 61; i++) {
              if (
                initial <= i &&
                final >= i
              ) {
                let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
                document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
                }else if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                }else if(i === middle){
                  document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lab[labIndex].startTime;
                }
                else if(i === middle + 1){
                  document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                }
                else if(i === middle + 2){
                  document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lab[labIndex].endTime;
                }else{
                  document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
                }

                if ((colorChosen == "brown") || (colorChosen == "green") || (colorChosen == "grey")) {
                  document.getElementById(dayOfTheWeek + i).style.color = "beige";
                }
                else {
                  document.getElementById(dayOfTheWeek + i).style.color = "black";
                }
              }
            }
          }
        }
      }

        let oldColors = [];

        for (let o = 0; o < this.state.selectedCourses.length; o++) { // get list of all the colors in the selection menu before change
          oldColors[o] = document.getElementById(this.state.selectedCourses[o][0].course).style.backgroundColor;
        }

        oldColors.push(colorChosen); // add the color of new course to the list also
        this.setState({colorOfNewClass: oldColors}) // when rendering the selection menu it will render it with all the old colors + the newly added color

        let defaultValue1 = addedClass.lecture[lectureIndex].section + "-" + addedClass.lecture[lectureIndex].tutorial[tutorialIndex].section;
        let defaultValue2 = "";

        if (addedClass.lab.length != 0) {
          defaultValue2 = addedClass.lab[labIndex].section + "";
        }

        let credits = this.state.credits + addedClass.credit;
        this.setState({
          defaultValueLectureTutorial: defaultValue1, defaultValueLab: defaultValue2, credits: credits
        })

        let array1 = [];
        array1[0] = addedClass;
        array1[1] = lectureIndex; //addedClass.lecture[0].section;
        array1[2] = tutorialIndex; //addedClass.lecture[0].tutorial[0].section;
        array1[3] = labIndex; //addedClass.lab[0].section;
        array.push(array1);
        this.setState({
          selectedCourses: array
        });

      }

    }

    this.setState({
      showUpload: false
    })

  }

  downloadJson = () => {
    let courseArray = this.state.selectedCourses;
    let filename = "schedule.json";
    let contentType = "application/json;charset=utf-8;";
	console.log(courseArray);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(courseArray)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var file = document.createElement('a');
      file.download = filename;
      file.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(courseArray));
      file.target = '_blank';
      document.body.appendChild(file);
      file.click();
      document.body.removeChild(file);
    }
  }
  
  sendCalendar = () => {
    let courseArray = this.state.selectedCourses;
    let semesterYear = '2019';
	// This variable needs to have the year added to it.
    var elements = document.getElementsByClassName('display-5');
    var indexEle = elements[0].innerHTML.search(/[0-9]/);
    semesterYear = elements[0].innerHTML.substring(indexEle,indexEle+4);
	console.log(courseArray);
	courseArray.push(semesterYear);
	console.log(courseArray);
	axios.post('calendar', {courseArray}).then(res=> console.log(res.data))
    .catch(err=>console.log(err.response.data));
  }

  /*addClass(days_array) {
    document.getElementById("id");
  }*/

  toggleLoading() {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }

  handleChangeComplete = color => {

    let courseNameInput = document.getElementById("colorChanger").value; //Get user input comp248
    let chosenClass; //class object

    if (courseNameInput == "") {
      return;
    }

    // instead of 'selectedCourses' it looped through 'classes' before
    for (let i = 0; i < this.state.selectedCourses.length; i++) {
      if (courseNameInput === this.state.selectedCourses[i][0].course) {
        chosenClass = this.state.selectedCourses[i];
        break;
      }
    }

    let lectureSection = chosenClass[1];
    let tutorialSection = chosenClass[2];
    let labSection = chosenClass[3];

    document.getElementById(chosenClass[0].course).style.backgroundColor = color.hex;

    if ((color.hex == "#ffeb3b") || (color.hex == "#ffc107") || (color.hex == "#ff9800") || (color.hex == "#cddc39")) {
      document.getElementById(chosenClass[0].course).style.color = "black";
    }
    else {
      document.getElementById(chosenClass[0].course).style.color = "white";
    }

    let color1;

    // for (let j = 0; j < this.state.colors.length; j++) { wtf is this
    //   if (this.state.colors[j][0] == color) {
    //     this.state.colors[j][1] = 0;
    //     break;
    //   }
    // }

  for(let j=0; j<chosenClass[0].lecture[lectureSection].days.length; j++) { //added
    for (let i = 0; i < 61; i++) {
      let dayOfTheWeek = chosenClass[0].lecture[lectureSection].days[j] + "-";
      if (
        this.timeToNum(chosenClass[0].lecture[lectureSection].startTime) <= i &&
        (this.timeToNum(chosenClass[0].lecture[lectureSection].endTime) - 1) >= i
      ) {
        color1 = document.getElementById(dayOfTheWeek + i).style.backgroundColor;
        document.getElementById(dayOfTheWeek + i).style.backgroundColor = color.hex; // (you can choose to select the return of a function)
        if ((color.hex == "#795548") || (color.hex == "#ff5722") || (color.hex == "#607d8b") || 
            (color.hex == "#009688") || (color.hex == "#f44336") || (color.hex == "#795548") ||
            (color.hex == "#9c27b0") || (color.hex == "#673ab7") || (color.hex == "#3f51b5")) {
          document.getElementById(dayOfTheWeek + i).style.color = "beige";
        }
        else {
          document.getElementById(dayOfTheWeek + i).style.color = "black";
        }
      }
    }
  }

  if (chosenClass[0].lecture[lectureSection].tutorial.length != 0) {
    for(let j=0; j<chosenClass[0].lecture[lectureSection].tutorial[tutorialSection].days.length; j++) {//added
      for (let i = 0; i < 61; i++) {
        let dayOfTheWeek = chosenClass[0].lecture[lectureSection].tutorial[tutorialSection].days[j] + "-";
        if (
          this.timeToNum(chosenClass[0].lecture[lectureSection].tutorial[tutorialSection].startTime) <= i &&
          (this.timeToNum(chosenClass[0].lecture[lectureSection].tutorial[tutorialSection].endTime) - 1) >= i
        ) {
          //color1 = document.getElementById(dayOfTheWeek + i).style.backgroundColor;
          document.getElementById(dayOfTheWeek + i).style.backgroundColor = color.hex; // (you can choose to select the return of a function)
          if ((color.hex == "#795548") || (color.hex == "#ff5722") || (color.hex == "#607d8b") || 
            (color.hex == "#009688") || (color.hex == "#f44336") || (color.hex == "#795548") ||
            (color.hex == "#9c27b0") || (color.hex == "#673ab7") || (color.hex == "#3f51b5")) {
          document.getElementById(dayOfTheWeek + i).style.color = "beige";
        }
        else {
          document.getElementById(dayOfTheWeek + i).style.color = "black";
        }
        }
      }
    }
  }

      if (chosenClass[0].lab.length != 0) {
        for(let j=0; j<chosenClass[0].lab[labSection].days.length; j++) { //added
          for (let i = 0; i < 61; i++) {
            let dayOfTheWeek = chosenClass[0].lab[labSection].days[j] + "-";
            if (
              this.timeToNum(chosenClass[0].lab[labSection].startTime) <= i &&
              (this.timeToNum(chosenClass[0].lab[labSection].endTime) - 1) >= i
            ) {
              //color1 = document.getElementById(dayOfTheWeek + i).style.backgroundColor;
              document.getElementById(dayOfTheWeek + i).style.backgroundColor = color.hex; // (you can choose to select the return of a function)
              if ((color.hex == "#795548") || (color.hex == "#ff5722") || (color.hex == "#607d8b") || 
            (color.hex == "#009688") || (color.hex == "#f44336") || (color.hex == "#795548") ||
            (color.hex == "#9c27b0") || (color.hex == "#673ab7") || (color.hex == "#3f51b5")) {
          document.getElementById(dayOfTheWeek + i).style.color = "beige";
        }
        else {
          document.getElementById(dayOfTheWeek + i).style.color = "black";
        }
            }
          }
        }
      }

    for (let j = 0; j < this.state.colors.length; j++) {
      if (this.state.colors[j][0] == color1) {
        this.state.colors[j][1] = 0;
        break;
      }
    }

  };

  addClass = () => {
    let array = this.state.selectedCourses; //Keep track of user selected classes
    let input = document.getElementById("add-class1").value; //Get user input (Course Code)
    let classList = this.state.courses; //Gets the whole list of courses of concordia
    let addedClass;
    let classExists = false;
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].course === input) {
        for (let j = 0; j < this.state.selectedCourses.length; j++) {
          if (this.state.selectedCourses[j].course === input) {
            document.getElementById("addStatus1").innerHTML =
              "This class is already added.";
            this.setState({ show2: "visible" });
            return;
          }
        }
        addedClass = classList[i];
        classExists = true;
        this.setState({ show2: "hidden" });
        break;
      }
    }

    if (classExists === false) {
      document.getElementById("addStatus1").innerHTML =
        "Invalid Class/Class Not Found";
      this.setState({ show2: "visible" });
      return;
    }



    let n = 1;
    let initial = this.timeToNum(addedClass.startTime);
    let final = this.timeToNum(addedClass.endTime);
    let middle = (initial + final)/2;
    let colorChosen;

    for (let j = 0; j < this.state.colors.length; j++) {
      if (this.state.colors[j][1] == 0) {
        colorChosen = this.state.colors[j][0];
        this.state.colors[j][1] = 1;
        break;
      }
    }

    if (colorChosen === null || colorChosen === undefined) {
      return;
    }

  for(let k=0; k<addedClass.ta.length; k++) {
    for(let j=0; j<addedClass.ta[k].days.length; j++){
      let dayOfTheWeek = addedClass.ta[k].days[j] + "-";
      let n = 1;
      let initial = this.timeToNum(addedClass.ta[k].startTime);
      let final = this.timeToNum(addedClass.ta[k].endTime);
      let middle = (initial + final)/2;
      for (let i = 0; i < 61; i++) {
        if (
          this.timeToNum(addedClass.ta[k].startTime) <= i &&
          this.timeToNum(addedClass.ta[k].endTime) >= i
        ) {
          document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
          if (i === middle - 2) {
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
            n++;
          }else if (i === middle - 1) {
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.ta[k].type;
            n++;
          }else if(i === middle){
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.ta[k].startTime;
            n++;
          }
          else if(i === middle + 1){
            document.getElementById(dayOfTheWeek + i).innerHTML = "to";
            n++;
          }
          else if(i === middle + 2){
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.ta[k].endTime;
            n++;
          }else{
            document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
          }
        }
      }
    }
  }

    for(let j=0; j<addedClass.days.length; j++){
      for (let i = 0; i < 61; i++) {
        if (
          initial <= i &&
          final >= i
        ) {
          let dayOfTheWeek = addedClass.days[j] + "-";
          document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
          if (i === middle - 1) {
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
            n++;
          }else if(i === middle){
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.startTime;
            n++;
          }
          else if(i === middle + 1){
            document.getElementById(dayOfTheWeek + i).innerHTML = "to";
            n++;
          }
          else if(i === middle + 2){
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.endTime;
            n++;
          }else{
            document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
          }
        }
      }
    }

    let oldColors = [];

    for (let o = 0; o < this.state.selectedCourses.length; o++) { // get list of all the colors in the selection menu before change
      oldColors[o] = document.getElementById(this.state.selectedCourses[o].course).style.backgroundColor;
    }

    oldColors.push(colorChosen); // add the color of new course to the list also
    this.setState({colorOfNewClass: oldColors}) // when rendering the selection menu it will render it with all the old colors + the newly added color

    array.push(addedClass);
    this.setState({
      selectedCourses: array
    });
  };

  addClass1 = () => {
    let array = this.state.selectedCourses; //Keep track of user selected classes
    let input = document.getElementById("add-class1").value; //Get user input (Course Code)
    let classList = this.state.courses2; //Gets the whole list of courses of concordia
    let addedClass;
    let classExists = false;
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].course === input) {
        for (let j = 0; j < this.state.selectedCourses.length; j++) {
          if (this.state.selectedCourses[j][0].course === input) {
            document.getElementById("addStatus1").innerHTML =
              "This class is already added.";
            this.setState({ show2: "visible" });
            return;
          }
        }
        addedClass = classList[i];
        classExists = true;
        this.setState({ show2: "hidden" });
        break;
      }
    }

    if (classExists === false) {
      document.getElementById("addStatus1").innerHTML =
        "Invalid Class/Class Not Found";
      this.setState({ show2: "visible" });
      return;
    }

    if ((this.state.credits + addedClass.credit) > 16.5) {
      document.getElementById("addStatus1").innerHTML =
        "Credit Limit Reached";
      this.setState({ show2: "visible" });
      return;
    }

    let colorChosen;

    for (let j = 0; j < this.state.colors.length; j++) {
      if (this.state.colors[j][1] == 0) {
        colorChosen = this.state.colors[j][0];
        this.state.colors[j][1] = 1;
        break;
      }
    }

    if (colorChosen === null || colorChosen === undefined) {
      return;
    }

      let lectureIndex = 0, tutorialIndex = 0, labIndex = 0;
      let validLecture, validTutorial, validLab;

      // time conflict incomplete
      /*for (let i = 0; i < addedClass.lecture.length; i++) {
        validLecture = true;
        validTutorial = true;
        validLab = true;

        for(let j=0; j<addedClass.lecture[i].days.length; j++) {
          let initial = this.timeToNum(addedClass.lecture[i].startTime);
          let final = this.timeToNum(addedClass.lecture[i].endTime) - 1;


          for (let k = 0; k < 61; k++) {
            if (
              initial <= k &&
              final >= k
            ) {
              let dayOfTheWeek = addedClass.lecture[i].days[j] + "-";
              if (document.getElementById(dayOfTheWeek + k).innerHTML != "----------------") {
                validLecture = false;
                break;
              }
            }
          }

        }

        if (validLecture) {
          lectureIndex = i;
        }
        else {
          continue; // try the next lecture section
        }

        if (validLecture) {
          for (let l = 0; l < addedClass.lecture[lectureIndex].tutorial.length; l++) {
            for (let m = 0; m < addedClass.lecture[lectureIndex].tutorial[l].days.length; m++) {
              let initial = this.timeToNum(addedClass.lecture[lectureIndex].tutorial[l].startTime);
              let final = this.timeToNum(addedClass.lecture[lectureIndex].tutorial[l].endTime) - 1;

              for (let k = 0; k < 61; k++) {
                if (
                  initial <= k &&
                  final >= k
                  ) {
                  let dayOfTheWeek = addedClass.lecture[lectureIndex].tutorial[l].days[m] + "-";
                  if (document.getElementById(dayOfTheWeek + k).innerHTML != "----------------") {
                    validTutorial = false;
                    break;
                  }
                }
              }
            }

            if (validTutorial) {
              tutorialIndex = l;
              break;
            }

          }
        }

        if (validLecture && validTutorial) {
          for (let n = 0; n < addedClass.lab.length; n++) {
            for (let m = 0; m < addedClass.lab[n].days.length; m++) {
              let initial = this.timeToNum(addedClass.lab[n].startTime);
              let final = this.timeToNum(addedClass.lab[n].endTime) - 1;

              for (let k = 0; k < 61; k++) {
                if (
                  initial <= k &&
                  final >= k
                  ) {
                  let dayOfTheWeek = addedClass.lab[n].days[m] + "-";
                  if (document.getElementById(dayOfTheWeek + k).innerHTML != "----------------") {
                    validLab = false;
                    break;
                  }
                }
              }
            }

            if (validLab) {
              labIndex = n;
              break;
            }

          }

        }


        if (validLecture && validTutorial && validLab) {
          break;
        }

      }

      if (!validLecture || !validTutorial || !validLab) {
        console.log("Conflict");
        return;
      }*/

// right now it's hardcoded to always add the first lecture section of a new class "[0]"
// it doesn't verify if that section can actually fit in the table

    for(let j=0; j<addedClass.lecture[lectureIndex].days.length; j++){ // add lecture

    let initial = this.timeToNum(addedClass.lecture[lectureIndex].startTime);
    let final = this.timeToNum(addedClass.lecture[lectureIndex].endTime) - 1;
    let middle = parseInt((initial + final)/2);

      for (let i = 0; i < 61; i++) {
        if (
          initial <= i &&
          final >= i
        ) {
          let dayOfTheWeek = addedClass.lecture[lectureIndex].days[j] + "-";
          document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
          if (i === middle - 2) {
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
          }else if (i === middle - 1) {
            document.getElementById(dayOfTheWeek + i).innerHTML = "Lecture";
          }else if(i === middle){
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lecture[lectureIndex].startTime;
          }
          else if(i === middle + 1){
            document.getElementById(dayOfTheWeek + i).innerHTML = "to";
          }
          else if(i === middle + 2){
            document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lecture[lectureIndex].endTime;
          }else{
            document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
          }

          if ((colorChosen == "brown") || (colorChosen == "green") || (colorChosen == "grey")) {
            document.getElementById(dayOfTheWeek + i).style.color = "beige";
          }
          else {
            document.getElementById(dayOfTheWeek + i).style.color = "black";
          }
        }
      }
    }

  if (addedClass.lecture[0].tutorial.length != 0) {
    for (let k = 0; k < addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days.length; k++) { // add tutorial

      let initial = this.timeToNum(addedClass.lecture[lectureIndex].tutorial[tutorialIndex].startTime);
      let final = this.timeToNum(addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime) - 1;
      let middle = parseInt((initial + final)/2);

      if ((final - initial) <= 3) {
        for (let i = 0; i < 61; i++) {
          if (
            initial <= i &&
            final >= i
          ) {
            let dayOfTheWeek = addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days[k] + "-";
            document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
            if (i === middle - 1) {
              document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
            }else if (i === middle) {
              document.getElementById(dayOfTheWeek + i).innerHTML = "Tutorial";
            }else if(i === middle + 1){
              document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lecture[lectureIndex].tutorial[tutorialIndex].startTime +
              "-" + addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime;
            }else{
              document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
            }
            if ((colorChosen == "brown") || (colorChosen == "green") || (colorChosen == "grey")) {
              document.getElementById(dayOfTheWeek + i).style.color = "beige";
            }
            else {
              document.getElementById(dayOfTheWeek + i).style.color = "black";
            }
          }
        }
      }
      else {
        for (let i = 0; i < 61; i++) {
          if (
            initial <= i &&
            final >= i
          ) {
            let dayOfTheWeek = addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days[k] + "-";
            document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
            if (i === middle - 2) {
              document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
            }else if (i === middle - 1) {
              document.getElementById(dayOfTheWeek + i).innerHTML = "Tutorial";
            }else if(i === middle){
              document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lecture[lectureIndex].tutorial[tutorialIndex].startTime;
            }
            else if(i === middle + 1){
              document.getElementById(dayOfTheWeek + i).innerHTML = "to";
            }
            else if(i === middle + 2){
              document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime;
            }else{
              document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
            }

            if ((colorChosen == "brown") || (colorChosen == "green") || (colorChosen == "grey")) {
              document.getElementById(dayOfTheWeek + i).style.color = "beige";
            }
            else {
              document.getElementById(dayOfTheWeek + i).style.color = "black";
            }
          }
        }
      }
    }
  }

    if (addedClass.lab.length != 0) {
      for (let l = 0; l < addedClass.lab[labIndex].days.length; l++) { // add lab

        let initial = this.timeToNum(addedClass.lab[labIndex].startTime);
        let final = this.timeToNum(addedClass.lab[labIndex].endTime) - 1;
        let middle = parseInt((initial + final)/2);

      if ((final - initial) <= 3) {
        for (let i = 0; i < 61; i++) {
          if (
            initial <= i &&
            final >= i
          ) {
            let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
            document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
            if (i === middle - 1) {
              document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
            }else if (i === middle) {
              document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
            }else if(i === middle + 1){
              document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lab[labIndex].startTime +
              "-" + addedClass.lab[labIndex].endTime;
            } else {
              document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
            }

            if ((colorChosen == "brown") || (colorChosen == "green") || (colorChosen == "grey")) {
              document.getElementById(dayOfTheWeek + i).style.color = "beige";
            }
            else {
              document.getElementById(dayOfTheWeek + i).style.color = "black";
            }
          }
        }
      }
      else {
        for (let i = 0; i < 61; i++) {
          if (
            initial <= i &&
            final >= i
          ) {
            let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
            document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
            if (i === middle - 2) {
              document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.course;
            }else if (i === middle - 1) {
              document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
            }else if(i === middle){
              document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lab[labIndex].startTime;
            }else if(i === middle + 1){
              document.getElementById(dayOfTheWeek + i).innerHTML = "to";
            }else if(i === middle + 2){
              document.getElementById(dayOfTheWeek + i).innerHTML = addedClass.lab[labIndex].endTime;
            }else{
              document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
            }

            if ((colorChosen == "brown") || (colorChosen == "green") || (colorChosen == "grey")) {
              document.getElementById(dayOfTheWeek + i).style.color = "beige";
            }
            else {
              document.getElementById(dayOfTheWeek + i).style.color = "black";
            }
          }
        }
      }
    }
  }

    let oldColors = [];

    for (let o = 0; o < this.state.selectedCourses.length; o++) { // get list of all the colors in the selection menu before change
      oldColors[o] = document.getElementById(this.state.selectedCourses[o][0].course).style.backgroundColor;
    }

    oldColors.push(colorChosen); // add the color of new course to the list also
    this.setState({colorOfNewClass: oldColors}) // when rendering the selection menu it will render it with all the old colors + the newly added color

    let array1 = [];
    array1[0] = addedClass;
    array1[1] = lectureIndex; //addedClass.lecture[0].section;
    array1[2] = tutorialIndex; //addedClass.lecture[0].tutorial[0].section;
    array1[3] = labIndex; //addedClass.lab[0].section;
    array.push(array1);

    let credits = this.state.credits + addedClass.credit;

    // the code for defaultValue1 should be changed after issue #119
    let defaultValue1 = "";
    if (addedClass.lecture[lectureIndex].tutorial.length != 0) {
      defaultValue1 = addedClass.lecture[lectureIndex].section + "-" + addedClass.lecture[lectureIndex].tutorial[tutorialIndex].section;
    }
    else {
      defaultValue1 = addedClass.lecture[lectureIndex].section + "";
    }

    let defaultValue2 = "";

    if (addedClass.lab.length != 0) {
      defaultValue2 = addedClass.lab[labIndex].section + "";
    }

    this.setState({
      selectedCourses: array, credits: credits, defaultValueLectureTutorial: defaultValue1, defaultValueLab: defaultValue2
    });
    console.log(array1);
  };

  remove = () => {
    let coursecode = document.getElementById("add-class1").value;
    let courseToRemove;

    for (let i = 0; i < this.state.selectedCourses.length; i++) {
      if (this.state.selectedCourses[i].course === coursecode) {
        courseToRemove = this.state.selectedCourses[i];
        break;
      }
    }



    if (courseToRemove === undefined || courseToRemove === null) {
      document.getElementById("addStatus1").innerHTML = "Invalid Course / Course Not Found";
      this.setState({show2: "visible"})
      return;
    }

    let color;

  for(let j=0; j<courseToRemove.days.length; j++)
    for (let i = 0; i < 61; i++) {
      let dayOfTheWeek = courseToRemove.days[j] + "-";
      if (
        this.timeToNum(courseToRemove.startTime) <= i &&
        this.timeToNum(courseToRemove.endTime) >= i
      ) {
        color = document.getElementById(dayOfTheWeek + i).style.backgroundColor;
        document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
        document.getElementById(dayOfTheWeek + i).innerHTML = "----------------";
      }
    }

    for(let k=0; k<courseToRemove.ta.length; k++)
      for(let j=0; j<courseToRemove.ta[k].days.length; j++){
        let dayOfTheWeek = courseToRemove.ta[k].days[j] + "-";
        for (let i = 0; i < 61; i++) {
          if (
            this.timeToNum(courseToRemove.ta[k].startTime) <= i &&
            this.timeToNum(courseToRemove.ta[k].endTime) >= i
          ) {
            document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
            document.getElementById(dayOfTheWeek + i).innerHTML = "----------------";
          }
        }
      }

    for (let j = 0; j < this.state.colors.length; j++) {
      if (this.state.colors[j][0] == color) {
        this.state.colors[j][1] = 0;
        break;
      }
    }

    let oldColors = [];

    for (let o = 0; o < this.state.selectedCourses.length; o++) { // get list of all the colors before change
      oldColors[o] = document.getElementById(this.state.selectedCourses[o].course).style.backgroundColor;
    }

    let oldColorsFiltered = oldColors.filter(data => color !== data); // filter out the color of the course that we just removed

    let array = this.state.selectedCourses.filter(
      data => coursecode !== data.course
    );
    this.setState({
      selectedCourses: array, show2: "hidden"
    });

    for (let p = 0; p < this.state.selectedCourses.length; p++) {// re-assign the old colors to the new table
      document.getElementById(this.state.selectedCourses[p].course).style.backgroundColor = oldColorsFiltered[p];
    }

  };

  remove1 = () => {
    let coursecode = document.getElementById("add-class1").value;
    let courseToRemove, lectureSection, tutorialSection, labSection,
    lectureIndex, tutorialIndex, labIndex;

    for (let i = 0; i < this.state.selectedCourses.length; i++) {
      if (this.state.selectedCourses[i][0].course === coursecode) {
        courseToRemove = this.state.selectedCourses[i][0];
        lectureIndex = this.state.selectedCourses[i][1];
        tutorialIndex = this.state.selectedCourses[i][2];
        labIndex = this.state.selectedCourses[i][3];
        break;
      }
    }



    if (courseToRemove === undefined || courseToRemove === null) {
      document.getElementById("addStatus1").innerHTML = "Invalid Course / Course Not Found";
      this.setState({show2: "visible"})
      return;
    }

    let color;

    // for (let i = 0; i < courseToRemove.lecture.length; i++) {
    //   if (courseToRemove.lecture[i].section === lectureSection) {
    //     lectureIndex = i;
    //   }
    // }

    // for (let i = 0; i < courseToRemove.lecture[lectureIndex].tutorial.length; i++) {
    //   if (courseToRemove.lecture[lectureIndex].tutorial[i].section === tutorialSection) {
    //     tutorialIndex = i;
    //   }
    // }

    // for (let i = 0; i < courseToRemove.lab.length; i++) {
    //   if (courseToRemove.lab[i].section === labSection) {
    //     labIndex = i;
    //   }
    // }

    // lectureIndex = courseArray[1];
    // tutorialIndex = courseArray[2];
    // labIndex = courseArray[3];

  for(let j=0; j<courseToRemove.lecture[lectureIndex].days.length; j++) {
    for (let i = 0; i < 61; i++) {
      let dayOfTheWeek = courseToRemove.lecture[lectureIndex].days[j] + "-";
      if (
        this.timeToNum(courseToRemove.lecture[lectureIndex].startTime) <= i &&
        (this.timeToNum(courseToRemove.lecture[lectureIndex].endTime)-1) >= i
      ) {
        color = document.getElementById(dayOfTheWeek + i).style.backgroundColor;
        document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
        document.getElementById(dayOfTheWeek + i).innerHTML = "----------------";
      }
    }
  }


  if (courseToRemove.lecture[lectureIndex].tutorial.length != 0) {
      for(let j=0; j<courseToRemove.lecture[lectureIndex].tutorial[tutorialIndex].days.length; j++){
        let dayOfTheWeek = courseToRemove.lecture[lectureIndex].tutorial[tutorialIndex].days[j] + "-";
        for (let i = 0; i < 61; i++) {
          if (
            this.timeToNum(courseToRemove.lecture[lectureIndex].tutorial[tutorialIndex].startTime) <= i &&
            (this.timeToNum(courseToRemove.lecture[lectureIndex].tutorial[tutorialIndex].endTime)-1) >= i
          ) {
            document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
            document.getElementById(dayOfTheWeek + i).innerHTML = "----------------";
          }
        }
      }
    }

      if (courseToRemove.lab.length != 0) {
        for(let j=0; j<courseToRemove.lab[labIndex].days.length; j++){
          let dayOfTheWeek = courseToRemove.lab[labIndex].days[j] + "-";
          for (let i = 0; i < 61; i++) {
            if (
              this.timeToNum(courseToRemove.lab[labIndex].startTime) <= i &&
              (this.timeToNum(courseToRemove.lab[labIndex].endTime)-1) >= i
            ) {
              document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
              document.getElementById(dayOfTheWeek + i).innerHTML = "----------------";
            }
          }
        }
      }

    for (let j = 0; j < this.state.colors.length; j++) {
      if (this.state.colors[j][0] == color) {
        this.state.colors[j][1] = 0;
        break;
      }
    }

    let oldColors = [];

    for (let o = 0; o < this.state.selectedCourses.length; o++) { // get list of all the colors before change
      oldColors[o] = document.getElementById(this.state.selectedCourses[o][0].course).style.backgroundColor;
    }

    let oldColorsFiltered = oldColors.filter(data => color !== data); // filter out the color of the course that we just removed

    let array = this.state.selectedCourses.filter(
      data => coursecode !== data[0].course
    );

    let credits = this.state.credits - courseToRemove.credit;
    //this.state.credits = this.state.credits - courseToRemove.credit;
    this.setState({
      selectedCourses: array, show2: "hidden", credits: credits
    });

    // this.setState({
    //   colorOfNewClass: oldColorsFiltered
    // })
    for (let p = 0; p < this.state.selectedCourses.length; p++) {// re-assign the old colors to the new table
      document.getElementById(this.state.selectedCourses[p][0].course).style.backgroundColor = oldColorsFiltered[p];
    }

  };

  changeSection(courseName) {
    let regEx = document.getElementById(courseName + "section").value;

    let lectureSection = regEx.substring(0,regEx.indexOf("-"));
    let tutorialSection = regEx.substring(regEx.indexOf("-")+1);

    let labSection = document.getElementById(courseName + "labSection").value;

    let lectureIndex, tutorialIndex, labIndex;

    let courseToChange, colorChosen, courseArray;

    for (let i = 0; i < this.state.selectedCourses.length; i++) {
      if (this.state.selectedCourses[i][0].course === courseName) {
        courseArray = this.state.selectedCourses[i];
        courseToChange = this.state.selectedCourses[i][0];
        lectureIndex = this.state.selectedCourses[i][1];
        tutorialIndex = this.state.selectedCourses[i][2];
        labIndex = this.state.selectedCourses[i][3];
      }
    }

    for(let j=0; j<courseToChange.lecture[lectureIndex].days.length; j++) {
      for (let i = 0; i < 61; i++) {
        let dayOfTheWeek = courseToChange.lecture[lectureIndex].days[j] + "-";
        if (
          this.timeToNum(courseToChange.lecture[lectureIndex].startTime) <= i &&
          (this.timeToNum(courseToChange.lecture[lectureIndex].endTime) - 1) >= i
        ) {
          colorChosen = document.getElementById(dayOfTheWeek + i).style.backgroundColor;
          document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
          document.getElementById(dayOfTheWeek + i).innerHTML = "----------------";
        }
      }
    }

    if (courseToChange.lecture[lectureIndex].tutorial.length != 0) {
      for(let j=0; j<courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].days.length; j++){
        let dayOfTheWeek = courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].days[j] + "-";
        for (let i = 0; i < 61; i++) {
          if (
            this.timeToNum(courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].startTime) <= i &&
            (this.timeToNum(courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].endTime) - 1) >= i
          ) {
            document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
            document.getElementById(dayOfTheWeek + i).innerHTML = "----------------";
          }
        }
      }
    }

    if (courseToChange.lab.length != 0) {
      for(let j=0; j<courseToChange.lab[labIndex].days.length; j++){
        let dayOfTheWeek = courseToChange.lab[labIndex].days[j] + "-";
        for (let i = 0; i < 61; i++) {
          if (
            this.timeToNum(courseToChange.lab[labIndex].startTime) <= i &&
            (this.timeToNum(courseToChange.lab[labIndex].endTime) - 1) >= i
          ) {
            document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
            document.getElementById(dayOfTheWeek + i).innerHTML = "----------------";
          }
        }
      }
    }

    // add part

    for (let i = 0; i < courseToChange.lecture.length; i++) {
      if (courseToChange.lecture[i].section === lectureSection) {
        lectureIndex = i;
      }
    }

    if (courseToChange.lecture[lectureIndex].tutorial.length != 0) {
      for (let i = 0; i < courseToChange.lecture[lectureIndex].tutorial.length; i++) {
        if (courseToChange.lecture[lectureIndex].tutorial[i].section === tutorialSection) {
          tutorialIndex = i;
        }
      }
    }

    if (courseToChange.lab.length != 0) {
      for (let i = 0; i < courseToChange.lab.length; i++) {
        if (courseToChange.lab[i].section === labSection) {
          labIndex = i;
        }
      }
    }

    for(let j=0; j<courseToChange.lecture[lectureIndex].days.length; j++){ // add lecture

      let initial = this.timeToNum(courseToChange.lecture[lectureIndex].startTime);
      let final = this.timeToNum(courseToChange.lecture[lectureIndex].endTime) - 1;
      let middle = parseInt((initial + final)/2);

        for (let i = 0; i < 61; i++) {
          if (
            initial <= i &&
            final >= i
          ) {
            let dayOfTheWeek = courseToChange.lecture[lectureIndex].days[j] + "-";
            document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
            if (i === middle - 2) {
              document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.course;
            }else if (i === middle - 1) {
              document.getElementById(dayOfTheWeek + i).innerHTML = "Lecture";
            }else if(i === middle){
              document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.lecture[lectureIndex].startTime;
            }
            else if(i === middle + 1){
              document.getElementById(dayOfTheWeek + i).innerHTML = "to";
            }
            else if(i === middle + 2){
              document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.lecture[lectureIndex].endTime;
            }else{
              document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
            }
          }
        }
      }

      if (courseToChange.lecture[lectureIndex].tutorial.length != 0) {
        for (let k = 0; k < courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].days.length; k++) { // add tutorial

          let initial = this.timeToNum(courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].startTime);
          let final = this.timeToNum(courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].endTime) - 1;
          let middle = parseInt((initial + final)/2);
          if ((final - initial) <= 3) {
            for (let i = 0; i < 61; i++) {
              if (
                initial <= i &&
                final >= i
              ) {
                let dayOfTheWeek = courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].days[k] + "-";
                document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.course;
                }else if (i === middle) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "Tutorial";
                }else if(i === middle + 1){
                  document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].startTime +
                  "-" + courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].endTime;
                }else{
                  document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
                }
              }
            }
          }
          else {
            for (let i = 0; i < 61; i++) {
              if (
                initial <= i &&
                final >= i
              ) {
                let dayOfTheWeek = courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].days[k] + "-";
                document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.course;
                }else if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "Tutorial";
                }else if(i === middle){
                  document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].startTime;
                }
                else if(i === middle + 1){
                  document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                }
                else if(i === middle + 2){
                  document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].endTime;
                }else{
                  document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
                }
              }
            }
          }
        }
      }

      if (courseToChange.lab.length != 0) {
        for (let l = 0; l < courseToChange.lab[labIndex].days.length; l++) { // add lab

          let initial = this.timeToNum(courseToChange.lab[labIndex].startTime);
          let final = this.timeToNum(courseToChange.lab[labIndex].endTime) - 1;
          let middle = parseInt((initial + final)/2);

          if ((final - initial) <= 3) {
            for (let i = 0; i < 61; i++) {
              if (
                initial <= i &&
                final >= i
              ) {
                let dayOfTheWeek = courseToChange.lab[labIndex].days[l] + "-";
                document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.course;
                }else if (i === middle) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                }else if(i === middle + 1){
                  document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.lab[labIndex].startTime +
                  "-" + courseToChange.lab[labIndex].endTime;
                } else {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
                }
              }
            }
          }
          else {
            for (let i = 0; i < 61; i++) {
              if (
                initial <= i &&
                final >= i
              ) {
                let dayOfTheWeek = courseToChange.lab[labIndex].days[l] + "-";
                document.getElementById(dayOfTheWeek + i).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.course;
                }else if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                }else if(i === middle){
                  document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.lab[labIndex].startTime;
                }
                else if(i === middle + 1){
                  document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                }
                else if(i === middle + 2){
                  document.getElementById(dayOfTheWeek + i).innerHTML = courseToChange.lab[labIndex].endTime;
                }else{
                  document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
                }
              }
            }
          }
        }
      }

    courseArray[1] = lectureIndex; //addedClass.lecture[0].section;
    courseArray[2] = tutorialIndex; //addedClass.lecture[0].tutorial[0].section;
    courseArray[3] = labIndex; //addedClass.lab[0].section;


    // for (let i = 0; i < courseToRemove.lecture.length; i++) {
    //   if (courseToRemove.lecture[i].section === lectureSection) {
    //     lectureIndex = i;
    //   }
    // }

    // for (let i = 0; i < courseToRemove.lecture[lectureIndex].tutorial.length; i++) {
    //   if (courseToRemove.lecture[lectureIndex].tutorial[i].section === tutorialSection) {
    //     tutorialIndex = i;
    //   }
    // }

    // for (let i = 0; i < courseToRemove.lab.length; i++) {
    //   if (courseToRemove.lab[i].section === labSection) {
    //     labIndex = i;
    //   }
    // }


  }

  render() {
    const styles = reactCSS({
      default: {
        popover: {
          position: "fixed",
          top: "23%",
          left: "38%",
          zIndex: "2"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });

    let myAddedClasses = this.state.selectedCourses.map(theClass => (
      <option value={theClass[0].course}>{theClass[0].course}</option>
    ));



    let i = 0;

    let x = this.state.selectedCourses.map(element => (
      <tr id={element[0].course} style={{backgroundColor : this.state.colorOfNewClass[i++]}}>

        <td>
          <div>
            <input type="checkbox" checked /> &nbsp;
            <strong>{element[0].course}</strong>
            <br />
            <strong>{element[0].name}</strong>{" "}
            <br />
            <select defaultValue={this.state.defaultValueLectureTutorial} id ={element[0].course + "section"} name="course-section" /*onChange={this.changeSection(element.course)}*/>
              {element[0].lecture.map(element1 => (
                element1.tutorial.map(element2 => (
                <option>{element1.section + "-" + element2.section}</option>))
                ))}
            </select> &nbsp;

            <select defaultValue={this.state.defaultValueLab} id={element[0].course + "labSection"}>
              {element[0].lab.map(element1 => (
                <option>{element1.section}</option>
              ))}
            </select> &nbsp;
            {/*<select>
              {element[0].lecture.map(element1 => (
                <option>{element1.section}</option>
              ))}
            </select> &nbsp;
            <select>
            {element[0].lecture[0].tutorial.map(element1 => (
                <option>{element1.section}</option>
              ))}
            </select>*/}
            <Button text="Change Section" onClick={() => this.changeSection(element[0].course)} />
            <br />
            <p id="requirements">
              <strong>Requirement: </strong> related info goes here
            </p>
          </div>
        </td>
      </tr>
    ));

    let table = (
      <Table
        id="selected-course-table"
        className="rounded"
        striped
        bordered
        hover
        variant="dark"
      >
        {x}
      </Table>
    );

    let allOptions = this.state.courses.map(choice => (
      <option value={choice.course} />
    ));

    const currentYear = new Date().getFullYear();
    var yeetus = [];
    for (let i = 1; i < 8; i++) {
      /*Basically choose a year from current year up to 8 years later. Don't touch this*/
      yeetus[i] = currentYear + i;
    }
    const years = yeetus.map(jimmy => <option>{jimmy}</option>);

    return (

      <div className="container">

        <div className="jumbotron j-greetings">
        <div style={{display: this.state.showSelection}}>
          <h2 className="display-4">Select Your Semester</h2>
          <hr color="#7e1530" />
          <div style={{ textAlign: "center" }}>
            <Form>
                <Form.Group controlId="semester">
                  <Form.Label>Select Semester</Form.Label>
                  <Form.Control as="select" onChange={this.handleSemesterChange}>
                    <option selected="selected">Fall</option>
                    <option>Winter</option>
                    <option>Summer</option>
                  </Form.Control>
                </Form.Group>
              </Form>

              <Form>
                <Form.Group controlId="semester-year">
                  <Form.Label>Select Year</Form.Label>
                  <Form.Control as="select" selected={currentYear} onChange={this.handleSemesterChange}>
                    <option selected="selected">{currentYear}</option>
                    {years}
                  </Form.Control>
                </Form.Group>
              </Form>
          </div>

          <LoadingScreen
              loading={this.state.isLoading}
              bgColor='#f1f1f1'
              spinnerColor='#b30000'
              textColor='#676767'
              logoSrc='https://user-images.githubusercontent.com/36492119/52869487-bdcd5180-3113-11e9-93d4-155882376646.png'
              text='Receiving Courses'
          >

          </LoadingScreen>
          {/*<h2 className="display-4">Course Selection Menu</h2>
          <hr color="#7e1530" />*/}
          <br/>

          <div className="container">
                <div className="row bg-secondary text-white rounded">
                  <div className="col">
                    <label for="add-class1">
                      <h6 id="test">Select Course</h6>
                    </label>
                    <input
                      type="text"
                      list="add-class2"
                      id="add-class1"
                      className="btn btn-dark"
                      placeholder="Course Number"
                    />
                    <datalist id="add-class2">{allOptions}</datalist>
                  </div>
                  <div className="col">
                    <Button
                      text="Select"
                      onClick={this.addClass1}
                      style={{ float: "left" }}
                    />
                    <Button
                      text="Remove"
                      onClick={this.remove1}
                      style={{ float: "left" }}
                    />
                    <Button
                      text="Add by Upload"
                      onClick={this.openUpload}
                      style={{ float: "left" }}
                    />
                  </div>
                </div>

                <p
                id="addStatus1"
                style={{ color: "red", visibility: this.state.show2 }}
                />

              </div>
              <div className="mt-4">{table}</div>

                <Button text="Generate Schedule" onClick={this.handleDisplay}/>

                <Button text="Color Selection" onClick={this.openRubiat} />

                <Link to="/build-seq-or-sem">
                  <Button text="Main Selector" />
                </Link>

                <Link to="/">
                  <Button text="Home Page" />
                </Link>
          </div>

          <div style={{display:this.state.showSchedule}}>

              {/*<hr color="#7e1530" />*/}
          <h2 className="display-5">
            {this.state.semester} {this.state.year} Semester
          </h2>
          <p className="lead" />





          <div>
            {" "}
            {/* Schedule */}
            <Table>
              <tbody>
                <tr>
                  <td>
                    <Table>
                      <tbody>
                        <th>Time</th>

                        <tr>
                          <td>
                            {times.time.map(element => (
                              <div>{element.startTime}</div>
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </td>

                  {this.state.weekdays.map(days => (
                    <td>
                      <table>
                        <tbody>
                          <th>{days}</th>
                          <tr>
                            <td>
                              {times.time.map(element => {
                                let myID = days + "-" + element.num;
                                return (
                                  <div id={myID}>
                                    ----------------
                                  </div>
                                );
                              })}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>

          {/* <Button text="Add A Class" onClick={this.handleShow} />
          <Button text="Remove A Class" onClick={this.handleShow1} /> */}
          <Button text="Color Selection" onClick={this.openRubiat} />
          <Button text="Download Schedule" onClick={this.downloadJson} />
  <Button text="Send to Google Calendar" onClick={this.sendCalendar} />
          <Link to="/finalize-export-sem">
            <Button text="Finalize" />
          </Link>


          <Button text="Back To Select Courses" onClick={this.handleDisplay1}/>

          </div>
        </div>

        {/* <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add A Course</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <p>Select A Course You'd Like To Add </p> <br />
            <Form inline style={{ textAlign: "center" }}>
              <input id="add-class" type="text" />
              <Button type="submit" text="Add Course" onClick={this.onAdd} />
            </Form>
            <p id="addStatus" style={{ color: "red" }} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleClose}
              text="Close"
            />
            <Button variant="primary" text="Save Changes" />
          </Modal.Footer>
        </Modal> */}

        {/* <Modal show={this.state.show1} onHide={this.handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Remove A Course</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <p>Select A Course You'd Like To Remove </p> <br />
            <Form inline style={{ textAlign: "center" }}>
              <FormControl
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                style={{ width: "100%", textAlign: "center" }}
              />
              <Button type="submit" text="Remove Course" />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleClose1}
              text="Close"
            />
            <Button variant="primary" text="Save Changes" />
          </Modal.Footer>
      </Modal> */}

        <Modal show={this.state.rubiat} onHide={this.closeRubiat}>
          <Modal.Header closeButton>
            <Modal.Title>Course Colour Selection</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <p>Select A Course and Color </p> <br />
            <Form inline style={{ textAlign: "center" }}>
              <div className="container" style={{ width: "40%" }}>
                <select id="colorChanger">
                  {myAddedClasses}
                </select>
              </div>
              <Button text="Color Selection" onClick={this.colourRubiatO} />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.closeRubiat} text="Close" />
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.colorS} onHide={this.colourRubiatC}>
          <Modal.Header closeButton style={{ backgroundColor: "#82100d" }} >
            <Modal.Title>Color Selector</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }} >
            <p style={{ margin: "0px 0px 25% 0px" }}>
              Select a Color for Course (replace with course name)
            </p>
            <Form inline style={{ textAlign: "center" }}>
              <div className="container" style={{ width: "40%" }}>
                <div style={styles.popover}>
                  <CirclePicker
                    style={{ margin: "0px 0px 0px 0px" }}
                    onChangeComplete={this.handleChangeComplete}

                  />
                </div>
              </div>
            </Form>
          </Modal.Body>

          <Modal.Footer style={{ backgroundColor: "#82100d" }}>
            <Button
              variant="primary"
              onClick={this.colourRubiatC}
              text="Close"
            />
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showUpload} onHide={this.closeUpload}>
          <Modal.Header closeButton>
            <Modal.Title>Add Via Upload</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <div>
            <input type="file" name="filename" className="btn btn-dark" onChange={this.handleSelectedFile}/>
            <button className="btn btn-dark" value="upload" onClick={this.handleUpload}>Upload</button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.closeUpload} text="Close" />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default CourseSelectionMenu;
