import React from "react";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import { Modal, Form, FormControl, Table } from "react-bootstrap";
import * as times from "./data/calendar.json";
import * as data from "./data/courses.json";
import * as data1 from "./data/courses2.json";
import { CirclePicker } from "react-color";
import reactCSS from "reactcss";
import LoadingScreen from "react-loading-screen";
import axios from "axios";
import AveryAlgorithms from "./AveryAlgorithms";
import AveryRegEx from "./AveryRegEx";
import hamburger from "./hamburger";

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
    this.changeSection = this.changeSection.bind(this);
    this.filterTutorialOptions = this.filterTutorialOptions.bind(this);

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
      coursesTakenSet: null,
      loggedIn: false,
      semester: semester,
      year: year,
      weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      credits: 0,
      //classes: JSON.parse(JSON.stringify(data.sequence)),

      colors: [
        ["#f44336", 0],
        ["#e91e63", 0],
        ["#4caf50", 0],
        ["#795548", 0],
        ["#03a9f4", 0],
        ["#3f51b5", 0],
        ["#607d8b", 0]
      ],

      addedClasses: [],

      courses: JSON.parse(JSON.stringify(data.default.sequence)),
      courses2: JSON.parse(JSON.stringify(data1.default.sequence)),
      selectedCourses: [],
      show2: "hidden",

      colorOfNewClass: [],

      showUpload: false,

      uploadedFile: null,

      defaultValueLecture: "",
      defaultValueLab: "",
      defaultValueTutorial: "",

      showSelection: "block",
      showSchedule: "none",
      showConflict: "hidden",
      showTryAll: "hidden",
      tryAllIndex: 0,
      validTryAll: [],

      finalizedClassArray: [],
      showConflictForFinalize: false,
    };
    //console.log("data.sequence: " + JSON.stringify(data.sequence));
    //console.log("courses: " + JSON.stringify(data.default.sequence));
  }

  componentDidMount() {
    fetch("/semQuery")
        .then(res => res.json())
        .then(users2 => this.setState({ users2 }, () => this.setCourses(users2)))
        .then(() => this.toggleLoading());
  }

  setCourses(stringy) {
    stringy = "" + stringy;
    var lecStartPosition = stringy.indexOf('"lectures":[');
    var tutStartPosition = stringy.indexOf('"tutorials":[');
    this.state.lectures = stringy.substring(
        lecStartPosition + 12,
        tutStartPosition
    );
    var labStartPosition = stringy.indexOf('"labs":[');
    this.state.tutorials = stringy.substring(
        tutStartPosition + 13,
        labStartPosition
    );
    var sequenceStartPos = stringy.indexOf('"result2":[');
    this.state.labs = stringy.substring(labStartPosition + 8, sequenceStartPos);
    var namePosition = stringy.indexOf('"names":[');
    this.state.Courses = stringy.substring(sequenceStartPos + 11, namePosition);
    var endingPosition = stringy.indexOf("]}]");
    this.state.coursesTaken = stringy.substring(
        namePosition + 9,
        endingPosition
    );
    if (this.state.coursesTaken != "") this.state.loggedIn = true;
    let aRegEx = new AveryRegEx(
        this.state.lectures,
        this.state.tutorials,
        this.state.labs,
        this.state.coursesTaken,
        this.state.loggedIn,
        this.state.Courses
    );
    let oldVars = aRegEx.regEx();
    this.state.coursesFall = oldVars[0];
    this.state.coursesWinter = oldVars[1];
    this.state.coursesSummer = oldVars[2];
    this.state.courses2 = this.state.coursesFall;
    this.state.dataCourses = oldVars[3];
    this.state.coursesTakenSet = oldVars[4];
    console.log("coursesTakenSet:");
    console.log(this.state.coursesTakenSet);
    let aa = new AveryAlgorithms();
    if (this.state.dataCourses[36] != undefined) {
      console.log("Array of Arrays:");
      console.log(
          aa.treeCaller([
            this.state.dataCourses[36],
            this.state.dataCourses[26],
            this.state.dataCourses[10]
          ])
      );
    }
  }

  timeToNum = time => {
    // time parameter represents start time or end time of a class

    // algo for rounding since table is jumps of 15 mins
    let time1, time2;
    let time1Minute, time2Minute;
    let timeHour = time.substring(0, time.indexOf(":"));
    let timeMinute = time.substring(time.indexOf(":") + 1);

    timeMinute = parseInt(timeMinute);
    time1Minute = timeMinute - 5;
    time2Minute = timeMinute + 5;

    if (time1Minute == -5) {
      time2 = timeHour + ":0" + time2Minute; // @@:05
      timeHour = parseInt(timeHour);
      timeHour--;
      time1 = timeHour + ":" + "55";
    } else if (time2Minute == 60) {
      time1 = timeHour + ":" + time1Minute; // @@:50
      timeHour = parseInt(timeHour);
      timeHour++;
      time2 = timeHour + ":" + "00";
    } else if (time1Minute == 0) {
      time1 = timeHour + ":00"; // @@:00 instead of @@:0
      time2 = timeHour + ":" + time2Minute; // @@:10
    } else {
      time1 = timeHour + ":" + time1Minute;
      time2 = timeHour + ":" + time2Minute;
    }

    for (let i = 0; i < 61; i++)
      if (
          time1 === times.time[i].startTime ||
          time === times.time[i].startTime ||
          time2 === times.time[i].startTime
      )
        return times.time[i].num;
    return null;
  };

  removeAll = () => {
    for (let j = 0; j < this.state.weekdays.length; j++) {
      let dayOfTheWeek = this.state.weekdays[j] + "-";
      for (let i = 0; i < 61; i++) {
        document.getElementById(dayOfTheWeek + i).style.backgroundColor = "";
        document.getElementById(dayOfTheWeek + i).innerHTML =
            "----------------";
        document.getElementById(dayOfTheWeek + i).style.color = "black";
      }
    }
  };

  display = courses => {
    if (courses == undefined) {
      return;
    }
    for (let r = 0; r < courses.length; r++) {
      let addedClass = courses[r];
      let lectureIndex = 0;
      let tutorialIndex = 0;
      let labIndex = 0;
      let colorChosen = "";

      for (let z = 0; z < this.state.selectedCourses.length; z++) {
        if (addedClass.course == this.state.selectedCourses[z][0].course) {
          colorChosen = this.state.selectedCourses[z][4];
        }
      }

      for (let j = 0; j < addedClass.lecture[lectureIndex].days.length; j++) {
        // add lecture

        let initial = this.timeToNum(
            addedClass.lecture[lectureIndex].startTime
        );
        let final =
            this.timeToNum(addedClass.lecture[lectureIndex].endTime) - 1;
        let middle = parseInt((initial + final) / 2);

        for (let i = 0; i < 61; i++) {
          if (initial <= i && final >= i) {
            let dayOfTheWeek = addedClass.lecture[lectureIndex].days[j] + "-";
            document.getElementById(
                dayOfTheWeek + i
            ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
            if (i === middle - 2) {
              document.getElementById(dayOfTheWeek + i).innerHTML =
                  addedClass.course;
            } else if (i === middle - 1) {
              document.getElementById(dayOfTheWeek + i).innerHTML = "Lecture";
            } else if (i === middle) {
              document.getElementById(dayOfTheWeek + i).innerHTML =
                  addedClass.lecture[lectureIndex].startTime;
            } else if (i === middle + 1) {
              document.getElementById(dayOfTheWeek + i).innerHTML = "to";
            } else if (i === middle + 2) {
              document.getElementById(dayOfTheWeek + i).innerHTML =
                  addedClass.lecture[lectureIndex].endTime;
            } else {
              document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
            }

            if (
                colorChosen == "#795548" ||
                colorChosen == "#ff5722" ||
                colorChosen == "#607d8b" ||
                colorChosen == "#009688" ||
                colorChosen == "#f44336" ||
                colorChosen == "#9c27b0" ||
                colorChosen == "#673ab7" ||
                colorChosen == "#3f51b5"
            ) {
              document.getElementById(dayOfTheWeek + i).style.color = "beige";
            } else {
              document.getElementById(dayOfTheWeek + i).style.color = "black";
            }
          }
        }
      }

      if (addedClass.lecture[lectureIndex].tutorial.length != 0) {
        for (
            let k = 0;
            k <
            addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days.length;
            k++
        ) {
          // add tutorial

          let initial = this.timeToNum(
              addedClass.lecture[lectureIndex].tutorial[tutorialIndex].startTime
          );
          let final =
              this.timeToNum(
                  addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime
              ) - 1;
          let middle = parseInt((initial + final) / 2);

          if (final - initial <= 3) {
            for (let i = 0; i < 61; i++) {
              if (initial <= i && final >= i) {
                let dayOfTheWeek =
                    addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days[
                        k
                        ] + "-";
                document.getElementById(
                    dayOfTheWeek + i
                ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.course;
                } else if (i === middle) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "Tutorial";
                } else if (i === middle + 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                          .startTime +
                      "-" +
                      addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                          .endTime;
                } else {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "<br />";
                }
                if (
                    colorChosen == "#795548" ||
                    colorChosen == "#ff5722" ||
                    colorChosen == "#607d8b" ||
                    colorChosen == "#009688" ||
                    colorChosen == "#f44336" ||
                    colorChosen == "#9c27b0" ||
                    colorChosen == "#673ab7" ||
                    colorChosen == "#3f51b5"
                ) {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "beige";
                } else {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "black";
                }
              }
            }
          } else {
            for (let i = 0; i < 61; i++) {
              if (initial <= i && final >= i) {
                let dayOfTheWeek =
                    addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days[
                        k
                        ] + "-";
                document.getElementById(
                    dayOfTheWeek + i
                ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.course;
                } else if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "Tutorial";
                } else if (i === middle) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lecture[lectureIndex].tutorial[
                          tutorialIndex
                          ].startTime;
                } else if (i === middle + 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                } else if (i === middle + 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lecture[lectureIndex].tutorial[
                          tutorialIndex
                          ].endTime;
                } else {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "<br />";
                }

                if (
                    colorChosen == "#795548" ||
                    colorChosen == "#ff5722" ||
                    colorChosen == "#607d8b" ||
                    colorChosen == "#009688" ||
                    colorChosen == "#f44336" ||
                    colorChosen == "#9c27b0" ||
                    colorChosen == "#673ab7" ||
                    colorChosen == "#3f51b5"
                ) {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "beige";
                } else {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "black";
                }
              }
            }
          }
        }
      }

      if (addedClass.lab.length != 0) {
        for (let l = 0; l < addedClass.lab[labIndex].days.length; l++) {
          // add lab

          let initial = this.timeToNum(addedClass.lab[labIndex].startTime);
          let final = this.timeToNum(addedClass.lab[labIndex].endTime) - 1;
          let middle = parseInt((initial + final) / 2);

          if (final - initial <= 3) {
            for (let i = 0; i < 61; i++) {
              if (initial <= i && final >= i) {
                let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
                document.getElementById(
                    dayOfTheWeek + i
                ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.course;
                } else if (i === middle) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                } else if (i === middle + 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lab[labIndex].startTime +
                      "-" +
                      addedClass.lab[labIndex].endTime;
                } else {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "<br />";
                }

                if (
                    colorChosen == "#795548" ||
                    colorChosen == "#ff5722" ||
                    colorChosen == "#607d8b" ||
                    colorChosen == "#009688" ||
                    colorChosen == "#f44336" ||
                    colorChosen == "#9c27b0" ||
                    colorChosen == "#673ab7" ||
                    colorChosen == "#3f51b5"
                ) {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "beige";
                } else {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "black";
                }
              }
            }
          } else {
            for (let i = 0; i < 61; i++) {
              if (initial <= i && final >= i) {
                let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
                document.getElementById(
                    dayOfTheWeek + i
                ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.course;
                } else if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                } else if (i === middle) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lab[labIndex].startTime;
                } else if (i === middle + 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                } else if (i === middle + 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lab[labIndex].endTime;
                } else {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "<br />";
                }

                if (
                    colorChosen == "#795548" ||
                    colorChosen == "#ff5722" ||
                    colorChosen == "#607d8b" ||
                    colorChosen == "#009688" ||
                    colorChosen == "#f44336" ||
                    colorChosen == "#9c27b0" ||
                    colorChosen == "#673ab7" ||
                    colorChosen == "#3f51b5"
                ) {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "beige";
                } else {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "black";
                }
              }
            }
          }
        }
      }
    }
  };

  tryAll = () => {
    let aa = new AveryAlgorithms();
    let courses = [];

    for (let i = 0; i < this.state.selectedCourses.length; i++) {
      courses[i] = this.state.selectedCourses[i][0];
    }

    let allOptions = aa.treeCaller(courses);

    console.log(allOptions);

    let validOptions = allOptions.filter(data => !aa.timeConflict(data));

    console.log(validOptions);
    console.log(validOptions[0]);

    this.removeAll();
    this.display(validOptions[0]);
    console.log("default has been clicked");
    console.log(validOptions);
    if (validOptions[0] !== undefined) {
      for (let i = 0; i < validOptions[0].length; i++) {
        console.log("default run " + (i + 1));
        let courseToChangeForFinalize;

        for (let s = 0; s < this.state.finalizedClassArray.length; s++) {
          if (
              this.state.finalizedClassArray[s].course_number ===
              validOptions[0][i].course
          ) {
            courseToChangeForFinalize = this.state.finalizedClassArray[s];
            break;
          }
        }

        courseToChangeForFinalize.lecture_section =
            validOptions[0][i].lecture[0].section;
        courseToChangeForFinalize.lecture_days =
            validOptions[0][i].lecture[0].days;
        courseToChangeForFinalize.lecture_start =
            validOptions[0][i].lecture[0].startTime;
        courseToChangeForFinalize.lecture_end =
            validOptions[0][i].lecture[0].endTime;
        courseToChangeForFinalize.lecture_room =
            validOptions[0][i].lecture[0].room;
        courseToChangeForFinalize.tutorial_section =
            validOptions[0][i].lecture[0].tutorial.length !== 0
                ? validOptions[0][i].lecture[0].tutorial[0].section
                : "";
        courseToChangeForFinalize.tutorial_room =
            validOptions[0][i].lecture[0].tutorial.length !== 0
                ? validOptions[0][i].lecture[0].tutorial[0].room
                : "";
        courseToChangeForFinalize.tutorial_days =
            validOptions[0][i].lecture[0].tutorial.length !== 0
                ? validOptions[0][i].lecture[0].tutorial[0].days
                : "";
        courseToChangeForFinalize.tutorial_start =
            validOptions[0][i].lecture[0].tutorial.length !== 0
                ? validOptions[0][i].lecture[0].tutorial[0].startTime
                : "";
        courseToChangeForFinalize.tutorial_end =
            validOptions[0][i].lecture[0].tutorial.length !== 0
                ? validOptions[0][i].lecture[0].tutorial[0].endTime
                : "";
        courseToChangeForFinalize.lab_section =
            validOptions[0][i].lab.length !== 0
                ? validOptions[0][i].lab[0].section
                : "";
        courseToChangeForFinalize.lab_room =
            validOptions[0][i].lab.length !== 0
                ? validOptions[0][i].lab[0].room
                : "";
        courseToChangeForFinalize.lab_days =
            validOptions[0][i].lab.length !== 0
                ? validOptions[0][i].lab[0].days
                : "";
        courseToChangeForFinalize.lab_start =
            validOptions[0][i].lab.length !== 0
                ? validOptions[0][i].lab[0].startTime
                : "";
        courseToChangeForFinalize.lab_end =
            validOptions[0][i].lab.length !== 0
                ? validOptions[0][i].lab[0].endTime
                : "";
      }
    }

    this.setState({
      showTryAll: "visible",
      validTryAll: validOptions,
      showConflict: "hidden",
      showConflictForFinalize: false,
      tryAllIndex: 0
    });
    this.handleDisplay();
  };

  // previous
  tryAll1 = () => {
    let number = this.state.tryAllIndex;
    let validOptions = this.state.validTryAll;

    if (number != 0) {
      number--;
    }

    this.removeAll();
    this.display(validOptions[number]);

    console.log("previous has been clicked");

    for (let i = 0; i < validOptions[number].length; i++) {
      console.log("previous run " + (i + 1));
      let courseToChangeForFinalize;

      for (let s = 0; s < this.state.finalizedClassArray.length; s++) {
        if (
            this.state.finalizedClassArray[s].course_number ===
            validOptions[number][i].course
        ) {
          courseToChangeForFinalize = this.state.finalizedClassArray[s];
          break;
        }
      }

      courseToChangeForFinalize.lecture_section =
          validOptions[number][i].lecture[0].section;
      courseToChangeForFinalize.lecture_days =
          validOptions[number][i].lecture[0].days;
      courseToChangeForFinalize.lecture_start =
          validOptions[number][i].lecture[0].startTime;
      courseToChangeForFinalize.lecture_end =
          validOptions[number][i].lecture[0].endTime;
      courseToChangeForFinalize.lecture_room =
          validOptions[number][i].lecture[0].room;
      courseToChangeForFinalize.tutorial_section =
          validOptions[number][i].lecture[0].tutorial.length !== 0
              ? validOptions[number][i].lecture[0].tutorial[0].section
              : "";
      courseToChangeForFinalize.tutorial_room =
          validOptions[number][i].lecture[0].tutorial.length !== 0
              ? validOptions[number][i].lecture[0].tutorial[0].room
              : "";
      courseToChangeForFinalize.tutorial_days =
          validOptions[number][i].lecture[0].tutorial.length !== 0
              ? validOptions[number][i].lecture[0].tutorial[0].days
              : "";
      courseToChangeForFinalize.tutorial_start =
          validOptions[number][i].lecture[0].tutorial.length !== 0
              ? validOptions[number][i].lecture[0].tutorial[0].startTime
              : "";
      courseToChangeForFinalize.tutorial_end =
          validOptions[number][i].lecture[0].tutorial.length !== 0
              ? validOptions[number][i].lecture[0].tutorial[0].endTime
              : "";
      courseToChangeForFinalize.lab_section =
          validOptions[number][i].lab.length !== 0
              ? validOptions[number][i].lab[0].section
              : "";
      courseToChangeForFinalize.lab_room =
          validOptions[number][i].lab.length !== 0
              ? validOptions[number][i].lab[0].room
              : "";
      courseToChangeForFinalize.lab_days =
          validOptions[number][i].lab.length !== 0
              ? validOptions[number][i].lab[0].days
              : "";
      courseToChangeForFinalize.lab_start =
          validOptions[number][i].lab.length !== 0
              ? validOptions[number][i].lab[0].startTime
              : "";
      courseToChangeForFinalize.lab_end =
          validOptions[number][i].lab.length !== 0
              ? validOptions[number][i].lab[0].endTime
              : "";
    }

    this.setState({
      tryAllIndex: number
    });
  };

  // next
  tryAll2 = () => {
    let number = this.state.tryAllIndex;
    let validOptions = this.state.validTryAll;

    if (number != validOptions.length - 1) {
      number++;
    }

    this.removeAll();
    this.display(validOptions[number]);

    console.log("next has been clicked");

    for (let i = 0; i < validOptions[number].length; i++) {
      console.log("next run " + (i + 1));
      let courseToChangeForFinalize;

      for (let s = 0; s < this.state.finalizedClassArray.length; s++) {
        if (
            this.state.finalizedClassArray[s].course_number ===
            validOptions[number][i].course
        ) {
          courseToChangeForFinalize = this.state.finalizedClassArray[s];
          break;
        }
      }

      courseToChangeForFinalize.lecture_section =
          validOptions[number][i].lecture[0].section;
      courseToChangeForFinalize.lecture_days =
          validOptions[number][i].lecture[0].days;
      courseToChangeForFinalize.lecture_start =
          validOptions[number][i].lecture[0].startTime;
      courseToChangeForFinalize.lecture_end =
          validOptions[number][i].lecture[0].endTime;
      courseToChangeForFinalize.lecture_room =
          validOptions[number][i].lecture[0].room;
      courseToChangeForFinalize.tutorial_section =
          validOptions[number][i].lecture[0].tutorial.length !== 0
              ? validOptions[number][i].lecture[0].tutorial[0].section
              : "";
      courseToChangeForFinalize.tutorial_room =
          validOptions[number][i].lecture[0].tutorial.length !== 0
              ? validOptions[number][i].lecture[0].tutorial[0].room
              : "";
      courseToChangeForFinalize.tutorial_days =
          validOptions[number][i].lecture[0].tutorial.length !== 0
              ? validOptions[number][i].lecture[0].tutorial[0].days
              : "";
      courseToChangeForFinalize.tutorial_start =
          validOptions[number][i].lecture[0].tutorial.length !== 0
              ? validOptions[number][i].lecture[0].tutorial[0].startTime
              : "";
      courseToChangeForFinalize.tutorial_end =
          validOptions[number][i].lecture[0].tutorial.length !== 0
              ? validOptions[number][i].lecture[0].tutorial[0].endTime
              : "";
      courseToChangeForFinalize.lab_section =
          validOptions[number][i].lab.length !== 0
              ? validOptions[number][i].lab[0].section
              : "";
      courseToChangeForFinalize.lab_room =
          validOptions[number][i].lab.length !== 0
              ? validOptions[number][i].lab[0].room
              : "";
      courseToChangeForFinalize.lab_days =
          validOptions[number][i].lab.length !== 0
              ? validOptions[number][i].lab[0].days
              : "";
      courseToChangeForFinalize.lab_start =
          validOptions[number][i].lab.length !== 0
              ? validOptions[number][i].lab[0].startTime
              : "";
      courseToChangeForFinalize.lab_end =
          validOptions[number][i].lab.length !== 0
              ? validOptions[number][i].lab[0].endTime
              : "";
    }

    this.setState({
      tryAllIndex: number
    });
  };

  handleSemesterChange = () => {
    this.removeAll();

    document.getElementById("add-class1").value = "";

    this.setState({
      year: document.getElementById("semester-year").value,
      semester: document.getElementById("semester").value,
      selectedCourses: [],
      credits: 0,
      showConflict: "hidden",
      showConflictForFinalize: false,
      show2: "hidden",
      finalizedClassArray: [],
      showTryAll: "hidden"
    });

    for (let i = 0; i < this.state.colors.length; i++) {
      this.state.colors[i][1] = 0;
    }

    this.state.year = document.getElementById("semester-year").value;
    this.state.semester = document.getElementById("semester").value;
    if (this.state.semester == "Fall") {
      this.state.courses2 = this.state.coursesFall;
    } else if (this.state.semester == "Winter") {
      this.state.courses2 = this.state.coursesWinter;
    } else if (this.state.semester == "Summer") {
      this.state.courses2 = this.state.coursesSummer;
    }
    //console.log(this.state.semester);
  };

  handleDisplay = () => {
    this.setState({
      showSelection: "none",
      showSchedule: "block"
    });
    console.log("current credits: " + this.state.credits);
  };

  handleDisplay1 = () => {
    this.setState({
      showSelection: "block",
      showSchedule: "none"
    });
  };

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
    });
  }

  closeUpload() {
    this.setState({
      showUpload: false
    });
  }

  handleSelectedFile = event => {
    this.setState({
      uploadedFile: event.target.files[0]
    });
  };

  handleUpload = () => {
    var file = this.state.uploadedFile;
    var reader = new FileReader();
    try {
      reader.readAsText(file);
    }
    catch (err) {
      return;
    }

    reader.onload = () => {
      //console.log(reader.result);
      var JSONified = JSON.parse(reader.result);

      let aa = new AveryAlgorithms();

      let array = [];

      for (let i = 0; i < this.state.colors.length; i++) {
        this.state.colors[i][1] = 0;
      }

      this.setState({
        credits: 0,
        finalizedClassArray: [],
        selectedCourses: []
      });

      this.removeAll(); // clear table incase there were already classes there

      for (let i = 0; i < JSONified.length; i++) {
        //let array = this.state.selectedCourses; //Keep track of user selected classes
        let input = JSONified[i][0].course;
        let classList = this.state.courses2; //Gets the whole list of courses of concordia
        let addedClass;
        let classExists = false;
        for (let i = 0; i < classList.length; i++) {
          if (classList[i].course === input) {
            // for (let j = 0; j < this.state.selectedCourses.length; j++) {
            //   if (this.state.selectedCourses[j][0].course === input) {
            //     document.getElementById("addStatus1").innerHTML =
            //       "This class is already added.";
            //     this.setState({ show2: "visible" });
            //     return;
            //   }
            // }
            addedClass = classList[i];
            classExists = true;
            this.setState({ show2: "hidden" });
            break;
          }
        }

        if (classExists === false) {
          let bool1 = false;
          for (let i = 0; i < this.state.coursesTakenSet.length; i++) {
            if (input == this.state.coursesTakenSet[i][0].course) {
              bool1 = true;
            }
          }
          if (bool1) {
            document.getElementById("addStatus1").innerHTML =
                "Class Has Already Been Taken";
          } else {
            document.getElementById("addStatus1").innerHTML =
                "Invalid Class/Class Not Found";
          }
          this.setState({ show2: "visible" });
          return;
        }

        if (JSONified[i][0].semester !== this.state.semester) {
          document.getElementById("addStatus1").innerHTML = "Wrong Semester";
          this.setState({show2: "visible"});
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

        let newClassForFinalize = {
          course_number: addedClass.course,
          course_name: addedClass.name,
          course_semester: addedClass.semester,
          course_year: "2019",
          course_color: colorChosen,
          lecture_section: addedClass.lecture[lectureIndex].section,
          lecture_room: addedClass.lecture[lectureIndex].room,
          lecture_days: addedClass.lecture[lectureIndex].days,
          lecture_start: addedClass.lecture[lectureIndex].startTime,
          lecture_end: addedClass.lecture[lectureIndex].endTime,
          tutorial_section:
              addedClass.lecture[0].tutorial.length !== 0
                  ? addedClass.lecture[lectureIndex].tutorial[tutorialIndex].section
                  : "",
          tutorial_room:
              addedClass.lecture[0].tutorial.length !== 0
                  ? addedClass.lecture[lectureIndex].tutorial[tutorialIndex].room
                  : "",
          tutorial_days:
              addedClass.lecture[0].tutorial.length !== 0
                  ? addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days
                  : "",
          tutorial_start:
              addedClass.lecture[0].tutorial.length !== 0
                  ? addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                      .startTime
                  : "",
          tutorial_end:
              addedClass.lecture[0].tutorial.length !== 0
                  ? addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime
                  : "",
          lab_section:
              addedClass.lab.length != 0 ? addedClass.lab[labIndex].section : "",
          lab_room:
              addedClass.lab.length != 0 ? addedClass.lab[labIndex].room : "",
          lab_days:
              addedClass.lab.length != 0 ? addedClass.lab[labIndex].days : "",
          lab_start:
              addedClass.lab.length != 0
                  ? addedClass.lab[labIndex].startTime
                  : "",
          lab_end:
              addedClass.lab.length != 0 ? addedClass.lab[labIndex].endTime : ""
        };
        for (let j = 0; j < addedClass.lecture[lectureIndex].days.length; j++) {
          // add lecture

          let initial = this.timeToNum(
              addedClass.lecture[lectureIndex].startTime
          );
          let final =
              this.timeToNum(addedClass.lecture[lectureIndex].endTime) - 1;
          let middle = parseInt((initial + final) / 2);

          for (let i = 0; i < 61; i++) {
            if (initial <= i && final >= i) {
              let dayOfTheWeek = addedClass.lecture[lectureIndex].days[j] + "-";
              document.getElementById(
                  dayOfTheWeek + i
              ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
              if (i === middle - 1) {
                document.getElementById(dayOfTheWeek + i).innerHTML =
                    addedClass.course;
              } else if (i === middle) {
                document.getElementById(dayOfTheWeek + i).innerHTML =
                    addedClass.lecture[lectureIndex].startTime;
              } else if (i === middle + 1) {
                document.getElementById(dayOfTheWeek + i).innerHTML = "to";
              } else if (i === middle + 2) {
                document.getElementById(dayOfTheWeek + i).innerHTML =
                    addedClass.lecture[lectureIndex].endTime;
              } else {
                document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
              }

              if (
                  colorChosen == "#795548" ||
                  colorChosen == "#ff5722" ||
                  colorChosen == "#607d8b" ||
                  colorChosen == "#009688" ||
                  colorChosen == "#f44336" ||
                  colorChosen == "#9c27b0" ||
                  colorChosen == "#673ab7" ||
                  colorChosen == "#3f51b5"
              ) {
                document.getElementById(dayOfTheWeek + i).style.color = "beige";
              } else {
                document.getElementById(dayOfTheWeek + i).style.color = "black";
              }
            }
          }
        }

        if (addedClass.lecture[lectureIndex].tutorial.length != 0) {
          for (
              let k = 0;
              k <
              addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days
                  .length;
              k++
          ) {
            // add tutorial

            let initial = this.timeToNum(
                addedClass.lecture[lectureIndex].tutorial[tutorialIndex].startTime
            );
            let final =
                this.timeToNum(
                    addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime
                ) - 1;
            let middle = parseInt((initial + final) / 2);

            if (final - initial <= 3) {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek =
                      addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                          .days[k] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.course;
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "Tutorial";
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                            .startTime +
                        "-" +
                        addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                            .endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }

                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            } else {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek =
                      addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                          .days[k] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.course;
                  } else if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "Tutorial";
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lecture[lectureIndex].tutorial[
                            tutorialIndex
                            ].startTime;
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                  } else if (i === middle + 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lecture[lectureIndex].tutorial[
                            tutorialIndex
                            ].endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }

                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            }
          }
        }

        if (addedClass.lab.length != 0) {
          for (let l = 0; l < addedClass.lab[labIndex].days.length; l++) {
            // add lab

            let initial = this.timeToNum(addedClass.lab[labIndex].startTime);
            let final = this.timeToNum(addedClass.lab[labIndex].endTime) - 1;
            let middle = parseInt((initial + final) / 2);

            if (final - initial <= 3) {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.course;
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lab[labIndex].startTime +
                        "-" +
                        addedClass.lab[labIndex].endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }

                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            } else {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.course;
                  } else if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lab[labIndex].startTime;
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                  } else if (i === middle + 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lab[labIndex].endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }

                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            }
          }
        }
        this.state.finalizedClassArray.push(newClassForFinalize);

        let defaultValue1 = addedClass.lecture[lectureIndex].section;
        let defaultValue2 = "";
        let defaultValue3 = "";

        if (addedClass.lab.length != 0) {
          defaultValue2 = addedClass.lab[labIndex].section + "";
        }

        if (addedClass.lecture[lectureIndex].tutorial.length != 0) {
          defaultValue3 = addedClass.lecture[lectureIndex].tutorial[tutorialIndex].section;
        }

        let credits = this.state.credits + addedClass.credit;
        this.setState({
          defaultValueLecture: defaultValue1,
          defaultValueTutorial: defaultValue3,
          defaultValueLab: defaultValue2,
          credits: credits
        });

        let array1 = [];
        array1[0] = addedClass;
        array1[1] = lectureIndex; //addedClass.lecture[0].section;
        array1[2] = tutorialIndex; //addedClass.lecture[0].tutorial[0].section;
        array1[3] = labIndex; //addedClass.lab[0].section;
        array1[4] = colorChosen;
        array.push(array1);
      }

      if (aa.timeConflict(array)) {
        this.removeAll();
        document.getElementById("timeConflict").innerHTML = "No Results";
        this.setState({ showConflict: "visible", showConflictForFinalize: true });
      } else {
        this.setState({ showConflict: "hidden", showConflictForFinalize: false });
      }

      this.setState({
        selectedCourses: array
      });
    };

    this.setState({
      showUpload: false
    });
  };

  downloadJson = () => {
    let courseArray = this.state.selectedCourses;
    let filename = "schedule.json";
    let contentType = "application/json;charset=utf-8;";
    console.log(courseArray);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob(
          [decodeURIComponent(encodeURI(JSON.stringify(courseArray)))],
          { type: contentType }
      );
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var file = document.createElement("a");
      file.download = filename;
      file.href =
          "data:" +
          contentType +
          "," +
          encodeURIComponent(JSON.stringify(courseArray));
      file.target = "_blank";
      document.body.appendChild(file);
      file.click();
      document.body.removeChild(file);
    }
  };

  sendCalendar = () => {
    let courseArray = this.state.selectedCourses;
    let semesterYear = "2019";
    // This variable needs to have the year added to it.
    var elements = document.getElementsByClassName("display-5");
    var indexEle = elements[0].innerHTML.search(/[0-9]/);
    semesterYear = elements[0].innerHTML.substring(indexEle, indexEle + 4);
    console.log(courseArray);
    courseArray.push(semesterYear);
    console.log(courseArray);
    axios
        .post("calendar", { courseArray })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data));
  };

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

    for (let s = 0; s < this.state.finalizedClassArray.length; s++) {
      if (courseNameInput === this.state.finalizedClassArray[s].course_number) {
        this.state.finalizedClassArray[s].course_color = color.hex;
        break;
      }
    }

    let lectureSection = chosenClass[1];
    let tutorialSection = chosenClass[2];
    let labSection = chosenClass[3];

    document.getElementById(chosenClass[0].course).style.backgroundColor =
        color.hex;

    if (
        color.hex == "#ffeb3b" ||
        color.hex == "#ffc107" ||
        color.hex == "#ff9800" ||
        color.hex == "#cddc39"
    ) {
      document.getElementById(chosenClass[0].course).style.color = "black";
    } else {
      document.getElementById(chosenClass[0].course).style.color = "white";
    }

    let color1 = chosenClass[4];

    let aa = new AveryAlgorithms();
    let array = aa.duplicateArray(this.state.selectedCourses);

    if (!aa.timeConflict(array)) {
      for (
          let j = 0;
          j < chosenClass[0].lecture[lectureSection].days.length;
          j++
      ) {
        //added
        for (let i = 0; i < 61; i++) {
          let dayOfTheWeek =
              chosenClass[0].lecture[lectureSection].days[j] + "-";
          if (
              this.timeToNum(chosenClass[0].lecture[lectureSection].startTime) <=
              i &&
              this.timeToNum(chosenClass[0].lecture[lectureSection].endTime) -
              1 >=
              i
          ) {
            document.getElementById(dayOfTheWeek + i).style.backgroundColor =
                color.hex; // (you can choose to select the return of a function)
            if (
                color.hex == "#795548" ||
                color.hex == "#ff5722" ||
                color.hex == "#607d8b" ||
                color.hex == "#009688" ||
                color.hex == "#f44336" ||
                color.hex == "#9c27b0" ||
                color.hex == "#673ab7" ||
                color.hex == "#3f51b5"
            ) {
              document.getElementById(dayOfTheWeek + i).style.color = "beige";
            } else {
              document.getElementById(dayOfTheWeek + i).style.color = "black";
            }
          }
        }
      }

      if (chosenClass[0].lecture[lectureSection].tutorial.length != 0) {
        for (
            let j = 0;
            j <
            chosenClass[0].lecture[lectureSection].tutorial[tutorialSection].days
                .length;
            j++
        ) {
          //added
          for (let i = 0; i < 61; i++) {
            let dayOfTheWeek =
                chosenClass[0].lecture[lectureSection].tutorial[tutorialSection]
                    .days[j] + "-";
            if (
                this.timeToNum(
                    chosenClass[0].lecture[lectureSection].tutorial[tutorialSection]
                        .startTime
                ) <= i &&
                this.timeToNum(
                    chosenClass[0].lecture[lectureSection].tutorial[tutorialSection]
                        .endTime
                ) -
                1 >=
                i
            ) {
              //color1 = document.getElementById(dayOfTheWeek + i).style.backgroundColor;
              document.getElementById(dayOfTheWeek + i).style.backgroundColor =
                  color.hex; // (you can choose to select the return of a function)
              if (
                  color.hex == "#795548" ||
                  color.hex == "#ff5722" ||
                  color.hex == "#607d8b" ||
                  color.hex == "#009688" ||
                  color.hex == "#f44336" ||
                  color.hex == "#9c27b0" ||
                  color.hex == "#673ab7" ||
                  color.hex == "#3f51b5"
              ) {
                document.getElementById(dayOfTheWeek + i).style.color = "beige";
              } else {
                document.getElementById(dayOfTheWeek + i).style.color = "black";
              }
            }
          }
        }
      }

      if (chosenClass[0].lab.length != 0) {
        for (let j = 0; j < chosenClass[0].lab[labSection].days.length; j++) {
          //added
          for (let i = 0; i < 61; i++) {
            let dayOfTheWeek = chosenClass[0].lab[labSection].days[j] + "-";
            if (
                this.timeToNum(chosenClass[0].lab[labSection].startTime) <= i &&
                this.timeToNum(chosenClass[0].lab[labSection].endTime) - 1 >= i
            ) {
              //color1 = document.getElementById(dayOfTheWeek + i).style.backgroundColor;
              document.getElementById(dayOfTheWeek + i).style.backgroundColor =
                  color.hex; // (you can choose to select the return of a function)
              if (
                  color.hex == "#795548" ||
                  color.hex == "#ff5722" ||
                  color.hex == "#607d8b" ||
                  color.hex == "#009688" ||
                  color.hex == "#f44336" ||
                  color.hex == "#9c27b0" ||
                  color.hex == "#673ab7" ||
                  color.hex == "#3f51b5"
              ) {
                document.getElementById(dayOfTheWeek + i).style.color = "beige";
              } else {
                document.getElementById(dayOfTheWeek + i).style.color = "black";
              }
            }
          }
        }
      }
    }

    for (let j = 0; j < this.state.colors.length; j++) {
      // see if the color is one of the default colors
      if (this.state.colors[j][0] == color1) {
        let colorNotInUse = true;
        for (let k = 0; k < array.length; k++) {
          // if it's a default color, make sure it's not
          if (array[k][4] == color1) {
            // also in use by another course
            colorNotInUse = false;
            break;
          }
        }
        if (colorNotInUse) {
          this.state.colors[j][1] = 0;
        }
        break;
      }
    }

    chosenClass[4] = color.hex;
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
      let bool1 = false;
      for (let i = 0; i < this.state.coursesTakenSet.length; i++) {
        if (input == this.state.coursesTakenSet[i][0].course) {
          bool1 = true;
        }
      }
      if (bool1) {
        document.getElementById("addStatus1").innerHTML =
            "Class Has Already Been Taken";
      } else {
        document.getElementById("addStatus1").innerHTML =
            "Invalid Class/Class Not Found";
      }
      this.setState({ show2: "visible" });
      return;
    }

    if (this.state.credits + addedClass.credit > 16.5) {
      document.getElementById("addStatus1").innerHTML = "Credit Limit Reached";
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

    let lectureIndex = 0,
        tutorialIndex = 0,
        labIndex = 0;

    let aa = new AveryAlgorithms();

    let array2 = [];
    let array3 = aa.duplicateArray(this.state.selectedCourses);
    array2[0] = addedClass;
    array2[1] = lectureIndex;
    array2[2] = tutorialIndex;
    array2[3] = labIndex;

    array3.push(array2);
    let newClassForFinalize = {
      course_number: addedClass.course,
      course_name: addedClass.name,
      course_semester: addedClass.semester,
      course_year: "2019",
      course_color: colorChosen,
      lecture_section: addedClass.lecture[lectureIndex].section,
      lecture_room: addedClass.lecture[lectureIndex].room,
      lecture_days: addedClass.lecture[lectureIndex].days,
      lecture_start: addedClass.lecture[lectureIndex].startTime,
      lecture_end: addedClass.lecture[lectureIndex].endTime,
      tutorial_section:
          addedClass.lecture[0].tutorial.length !== 0
              ? addedClass.lecture[lectureIndex].tutorial[tutorialIndex].section
              : "",
      tutorial_room:
          addedClass.lecture[0].tutorial.length !== 0
              ? addedClass.lecture[lectureIndex].tutorial[tutorialIndex].room
              : "",
      tutorial_days:
          addedClass.lecture[0].tutorial.length !== 0
              ? addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days
              : "",
      tutorial_start:
          addedClass.lecture[0].tutorial.length !== 0
              ? addedClass.lecture[lectureIndex].tutorial[tutorialIndex].startTime
              : "",
      tutorial_end:
          addedClass.lecture[0].tutorial.length !== 0
              ? addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime
              : "",
      lab_section:
          addedClass.lab.length != 0 ? addedClass.lab[labIndex].section : "",
      lab_room: addedClass.lab.length != 0 ? addedClass.lab[labIndex].room : "",
      lab_days: addedClass.lab.length != 0 ? addedClass.lab[labIndex].days : "",
      lab_start:
          addedClass.lab.length != 0 ? addedClass.lab[labIndex].startTime : "",
      lab_end:
          addedClass.lab.length != 0 ? addedClass.lab[labIndex].endTime : ""
    };

    if (!aa.timeConflict(array3)) {
      this.setState({ showConflict: "hidden", showConflictForFinalize: false });

      for (let j = 0; j < addedClass.lecture[lectureIndex].days.length; j++) {
        // add lecture

        let initial = this.timeToNum(
            addedClass.lecture[lectureIndex].startTime
        );
        let final =
            this.timeToNum(addedClass.lecture[lectureIndex].endTime) - 1;
        let middle = parseInt((initial + final) / 2);

        for (let i = 0; i < 61; i++) {
          if (initial <= i && final >= i) {
            let dayOfTheWeek = addedClass.lecture[lectureIndex].days[j] + "-";
            document.getElementById(
                dayOfTheWeek + i
            ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
            if (i === middle - 2) {
              document.getElementById(dayOfTheWeek + i).innerHTML =
                  addedClass.course;
            } else if (i === middle - 1) {
              document.getElementById(dayOfTheWeek + i).innerHTML = "Lecture";
            } else if (i === middle) {
              document.getElementById(dayOfTheWeek + i).innerHTML =
                  addedClass.lecture[lectureIndex].startTime;
            } else if (i === middle + 1) {
              document.getElementById(dayOfTheWeek + i).innerHTML = "to";
            } else if (i === middle + 2) {
              document.getElementById(dayOfTheWeek + i).innerHTML =
                  addedClass.lecture[lectureIndex].endTime;
            } else {
              document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
            }

            if (
                colorChosen == "#795548" ||
                colorChosen == "#ff5722" ||
                colorChosen == "#607d8b" ||
                colorChosen == "#009688" ||
                colorChosen == "#f44336" ||
                colorChosen == "#9c27b0" ||
                colorChosen == "#673ab7" ||
                colorChosen == "#3f51b5"
            ) {
              document.getElementById(dayOfTheWeek + i).style.color = "beige";
            } else {
              document.getElementById(dayOfTheWeek + i).style.color = "black";
            }
          }
        }
      }

      if (addedClass.lecture[lectureIndex].tutorial.length != 0) {
        for (
            let k = 0;
            k <
            addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days.length;
            k++
        ) {
          // add tutorial

          let initial = this.timeToNum(
              addedClass.lecture[lectureIndex].tutorial[tutorialIndex].startTime
          );
          let final =
              this.timeToNum(
                  addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime
              ) - 1;
          let middle = parseInt((initial + final) / 2);

          if (final - initial <= 3) {
            for (let i = 0; i < 61; i++) {
              if (initial <= i && final >= i) {
                let dayOfTheWeek =
                    addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days[
                        k
                        ] + "-";
                document.getElementById(
                    dayOfTheWeek + i
                ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.course;
                } else if (i === middle) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "Tutorial";
                } else if (i === middle + 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                          .startTime +
                      "-" +
                      addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                          .endTime;
                } else {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "<br />";
                }
                if (
                    colorChosen == "#795548" ||
                    colorChosen == "#ff5722" ||
                    colorChosen == "#607d8b" ||
                    colorChosen == "#009688" ||
                    colorChosen == "#f44336" ||
                    colorChosen == "#9c27b0" ||
                    colorChosen == "#673ab7" ||
                    colorChosen == "#3f51b5"
                ) {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "beige";
                } else {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "black";
                }
              }
            }
          } else {
            for (let i = 0; i < 61; i++) {
              if (initial <= i && final >= i) {
                let dayOfTheWeek =
                    addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days[
                        k
                        ] + "-";
                document.getElementById(
                    dayOfTheWeek + i
                ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.course;
                } else if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "Tutorial";
                } else if (i === middle) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lecture[lectureIndex].tutorial[
                          tutorialIndex
                          ].startTime;
                } else if (i === middle + 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                } else if (i === middle + 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lecture[lectureIndex].tutorial[
                          tutorialIndex
                          ].endTime;
                } else {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "<br />";
                }

                if (
                    colorChosen == "#795548" ||
                    colorChosen == "#ff5722" ||
                    colorChosen == "#607d8b" ||
                    colorChosen == "#009688" ||
                    colorChosen == "#f44336" ||
                    colorChosen == "#9c27b0" ||
                    colorChosen == "#673ab7" ||
                    colorChosen == "#3f51b5"
                ) {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "beige";
                } else {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "black";
                }
              }
            }
          }
        }
      }

      if (addedClass.lab.length != 0) {
        for (let l = 0; l < addedClass.lab[labIndex].days.length; l++) {
          // add lab

          let initial = this.timeToNum(addedClass.lab[labIndex].startTime);
          let final = this.timeToNum(addedClass.lab[labIndex].endTime) - 1;
          let middle = parseInt((initial + final) / 2);

          if (final - initial <= 3) {
            for (let i = 0; i < 61; i++) {
              if (initial <= i && final >= i) {
                let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
                document.getElementById(
                    dayOfTheWeek + i
                ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.course;
                } else if (i === middle) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                } else if (i === middle + 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lab[labIndex].startTime +
                      "-" +
                      addedClass.lab[labIndex].endTime;
                } else {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "<br />";
                }

                if (
                    colorChosen == "#795548" ||
                    colorChosen == "#ff5722" ||
                    colorChosen == "#607d8b" ||
                    colorChosen == "#009688" ||
                    colorChosen == "#f44336" ||
                    colorChosen == "#9c27b0" ||
                    colorChosen == "#673ab7" ||
                    colorChosen == "#3f51b5"
                ) {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "beige";
                } else {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "black";
                }
              }
            }
          } else {
            for (let i = 0; i < 61; i++) {
              if (initial <= i && final >= i) {
                let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
                document.getElementById(
                    dayOfTheWeek + i
                ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                if (i === middle - 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.course;
                } else if (i === middle - 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                } else if (i === middle) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lab[labIndex].startTime;
                } else if (i === middle + 1) {
                  document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                } else if (i === middle + 2) {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      addedClass.lab[labIndex].endTime;
                } else {
                  document.getElementById(dayOfTheWeek + i).innerHTML =
                      "<br />";
                }

                if (
                    colorChosen == "#795548" ||
                    colorChosen == "#ff5722" ||
                    colorChosen == "#607d8b" ||
                    colorChosen == "#009688" ||
                    colorChosen == "#f44336" ||
                    colorChosen == "#9c27b0" ||
                    colorChosen == "#673ab7" ||
                    colorChosen == "#3f51b5"
                ) {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "beige";
                } else {
                  document.getElementById(dayOfTheWeek + i).style.color =
                      "black";
                }
              }
            }
          }
        }
      }
    } else {
      document.getElementById("timeConflict").innerHTML = "No Results";
      this.setState({ showConflict: "visible", showConflictForFinalize: true });

      this.removeAll();
    }

    this.state.finalizedClassArray.push(newClassForFinalize);

    let oldColors = [];

    for (let o = 0; o < this.state.selectedCourses.length; o++) {
      // get list of all the colors in the selection menu before change
      oldColors[o] = document.getElementById(
          this.state.selectedCourses[o][0].course
      ).style.backgroundColor;
    }

    oldColors.push(colorChosen); // add the color of new course to the list also
    this.setState({ colorOfNewClass: oldColors }); // when rendering the selection menu it will render it with all the old colors + the newly added color

    let array1 = [];
    array1[0] = addedClass;
    array1[1] = lectureIndex;
    array1[2] = tutorialIndex;
    array1[3] = labIndex;
    array1[4] = colorChosen; // the array will also store the color corresponding to that course
    array.push(array1);

    let credits = this.state.credits + addedClass.credit;

    // the code for defaultValue1 should be changed after issue #119
    let defaultValue1 = addedClass.lecture[lectureIndex].section;

    let defaultValue3 = "";

    if (addedClass.lecture[lectureIndex].tutorial.length != 0) {
      defaultValue3 =
          addedClass.lecture[lectureIndex].tutorial[tutorialIndex].section;
    }

    let defaultValue2 = "";

    if (addedClass.lab.length != 0) {
      defaultValue2 = addedClass.lab[labIndex].section + "";
    }

    this.setState({
      selectedCourses: array,
      credits: credits,
      defaultValueLecture: defaultValue1,
      defaultValueTutorial: defaultValue3,
      defaultValueLab: defaultValue2
    });
    console.log(array1);
  };

  remove1 = () => {
    let coursecode = document.getElementById("add-class1").value;
    let courseToRemove, lectureIndex, tutorialIndex, labIndex, color;

    for (let i = 0; i < this.state.selectedCourses.length; i++) {
      if (this.state.selectedCourses[i][0].course === coursecode) {
        courseToRemove = this.state.selectedCourses[i][0];
        lectureIndex = this.state.selectedCourses[i][1];
        tutorialIndex = this.state.selectedCourses[i][2];
        labIndex = this.state.selectedCourses[i][3];
        color = this.state.selectedCourses[i][4];
        break;
      }
    }

    if (courseToRemove === undefined || courseToRemove === null) {
      document.getElementById("addStatus1").innerHTML =
          "Invalid Course / Course Not Found";
      this.setState({ show2: "visible" });
      return;
    }

    for (let j = 0; j < courseToRemove.lecture[lectureIndex].days.length; j++) {
      for (let i = 0; i < 61; i++) {
        let dayOfTheWeek = courseToRemove.lecture[lectureIndex].days[j] + "-";
        if (
            this.timeToNum(courseToRemove.lecture[lectureIndex].startTime) <= i &&
            this.timeToNum(courseToRemove.lecture[lectureIndex].endTime) - 1 >= i
        ) {
          document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
          document.getElementById(dayOfTheWeek + i).innerHTML =
              "----------------";
          document.getElementById(dayOfTheWeek + i).style.color = "black";
        }
      }
    }

    if (courseToRemove.lecture[lectureIndex].tutorial.length != 0) {
      for (
          let j = 0;
          j <
          courseToRemove.lecture[lectureIndex].tutorial[tutorialIndex].days
              .length;
          j++
      ) {
        let dayOfTheWeek =
            courseToRemove.lecture[lectureIndex].tutorial[tutorialIndex].days[j] +
            "-";
        for (let i = 0; i < 61; i++) {
          if (
              this.timeToNum(
                  courseToRemove.lecture[lectureIndex].tutorial[tutorialIndex]
                      .startTime
              ) <= i &&
              this.timeToNum(
                  courseToRemove.lecture[lectureIndex].tutorial[tutorialIndex]
                      .endTime
              ) -
              1 >=
              i
          ) {
            document.getElementById(dayOfTheWeek + i).style.backgroundColor =
                ""; // (you can choose to select the return of a function)
            document.getElementById(dayOfTheWeek + i).innerHTML =
                "----------------";
            document.getElementById(dayOfTheWeek + i).style.color = "black";
          }
        }
      }
    }

    if (courseToRemove.lab.length != 0) {
      for (let j = 0; j < courseToRemove.lab[labIndex].days.length; j++) {
        let dayOfTheWeek = courseToRemove.lab[labIndex].days[j] + "-";
        for (let i = 0; i < 61; i++) {
          if (
              this.timeToNum(courseToRemove.lab[labIndex].startTime) <= i &&
              this.timeToNum(courseToRemove.lab[labIndex].endTime) - 1 >= i
          ) {
            document.getElementById(dayOfTheWeek + i).style.backgroundColor =
                ""; // (you can choose to select the return of a function)
            document.getElementById(dayOfTheWeek + i).innerHTML =
                "----------------";
            document.getElementById(dayOfTheWeek + i).style.color = "black";
          }
        }
      }
    }

    let array = this.state.selectedCourses.filter(
        data => coursecode !== data[0].course
    );

    for (let j = 0; j < this.state.colors.length; j++) {
      // see if the color is one of the default colors
      if (this.state.colors[j][0] == color) {
        let colorNotInUse = true;
        for (let k = 0; k < array.length; k++) {
          // if it's a default color, make sure it's not
          if (array[k][4] == color) {
            // also being used by another course
            colorNotInUse = false;
            break;
          }
        }
        if (colorNotInUse) {
          this.state.colors[j][1] = 0;
        }
        break;
      }
    }

    let aa = new AveryAlgorithms();

    if (!aa.timeConflict(array)) {
      this.setState({ showConflict: "hidden", showConflictForFinalize: false });

      let addedClass, lectureIndex, tutorialIndex, labIndex, colorChosen;

      for (let i = 0; i < array.length; i++) {
        addedClass = array[i][0];
        lectureIndex = array[i][1];
        tutorialIndex = array[i][2];
        labIndex = array[i][3];
        colorChosen = array[i][4];

        for (let j = 0; j < addedClass.lecture[lectureIndex].days.length; j++) {
          // add lecture

          let initial = this.timeToNum(
              addedClass.lecture[lectureIndex].startTime
          );
          let final =
              this.timeToNum(addedClass.lecture[lectureIndex].endTime) - 1;
          let middle = parseInt((initial + final) / 2);

          for (let i = 0; i < 61; i++) {
            if (initial <= i && final >= i) {
              let dayOfTheWeek = addedClass.lecture[lectureIndex].days[j] + "-";
              document.getElementById(
                  dayOfTheWeek + i
              ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
              if (i === middle - 2) {
                document.getElementById(dayOfTheWeek + i).innerHTML =
                    addedClass.course;
              } else if (i === middle - 1) {
                document.getElementById(dayOfTheWeek + i).innerHTML = "Lecture";
              } else if (i === middle) {
                document.getElementById(dayOfTheWeek + i).innerHTML =
                    addedClass.lecture[lectureIndex].startTime;
              } else if (i === middle + 1) {
                document.getElementById(dayOfTheWeek + i).innerHTML = "to";
              } else if (i === middle + 2) {
                document.getElementById(dayOfTheWeek + i).innerHTML =
                    addedClass.lecture[lectureIndex].endTime;
              } else {
                document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
              }

              if (
                  colorChosen == "#795548" ||
                  colorChosen == "#ff5722" ||
                  colorChosen == "#607d8b" ||
                  colorChosen == "#009688" ||
                  colorChosen == "#f44336" ||
                  colorChosen == "#9c27b0" ||
                  colorChosen == "#673ab7" ||
                  colorChosen == "#3f51b5"
              ) {
                document.getElementById(dayOfTheWeek + i).style.color = "beige";
              } else {
                document.getElementById(dayOfTheWeek + i).style.color = "black";
              }
            }
          }
        }

        if (addedClass.lecture[lectureIndex].tutorial.length != 0) {
          for (
              let k = 0;
              k <
              addedClass.lecture[lectureIndex].tutorial[tutorialIndex].days
                  .length;
              k++
          ) {
            // add tutorial

            let initial = this.timeToNum(
                addedClass.lecture[lectureIndex].tutorial[tutorialIndex].startTime
            );
            let final =
                this.timeToNum(
                    addedClass.lecture[lectureIndex].tutorial[tutorialIndex].endTime
                ) - 1;
            let middle = parseInt((initial + final) / 2);

            if (final - initial <= 3) {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek =
                      addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                          .days[k] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.course;
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "Tutorial";
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                            .startTime +
                        "-" +
                        addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                            .endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }
                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            } else {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek =
                      addedClass.lecture[lectureIndex].tutorial[tutorialIndex]
                          .days[k] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.course;
                  } else if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "Tutorial";
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lecture[lectureIndex].tutorial[
                            tutorialIndex
                            ].startTime;
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                  } else if (i === middle + 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lecture[lectureIndex].tutorial[
                            tutorialIndex
                            ].endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }

                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            }
          }
        }

        if (addedClass.lab.length != 0) {
          for (let l = 0; l < addedClass.lab[labIndex].days.length; l++) {
            // add lab

            let initial = this.timeToNum(addedClass.lab[labIndex].startTime);
            let final = this.timeToNum(addedClass.lab[labIndex].endTime) - 1;
            let middle = parseInt((initial + final) / 2);

            if (final - initial <= 3) {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.course;
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lab[labIndex].startTime +
                        "-" +
                        addedClass.lab[labIndex].endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }

                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            } else {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek = addedClass.lab[labIndex].days[l] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.course;
                  } else if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lab[labIndex].startTime;
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                  } else if (i === middle + 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        addedClass.lab[labIndex].endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }

                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            }
          }
        }
      }
    }

    let newFinalizedClassArray = this.state.finalizedClassArray.filter(
        theClass => coursecode !== theClass.course_number
    );

    let credits = this.state.credits - courseToRemove.credit;

    this.setState({
      selectedCourses: array,
      show2: "hidden",
      credits: credits,
      finalizedClassArray: newFinalizedClassArray
    });
  };

  changeSection(courseName) {
    // let regEx = document.getElementById(courseName + "section").value;

    // let lectureSection = regEx.substring(0, regEx.indexOf("-"));
    let lectureSection = document.getElementById(courseName + "lecSection")
        .value;
    // let tutorialSection = regEx.substring(regEx.indexOf("-") + 1);
    let tutorialSection = document.getElementById(courseName + "tutSection")
        .value;

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
        colorChosen = this.state.selectedCourses[i][4];
      }
    }

    let courseToChangeForFinalize;
    for (let s = 0; s < this.state.finalizedClassArray.length; s++) {
      if (this.state.finalizedClassArray[s].course_number === courseName) {
        courseToChangeForFinalize = this.state.finalizedClassArray[s];
        break;
      }
    }

    for (let j = 0; j < courseToChange.lecture[lectureIndex].days.length; j++) {
      for (let i = 0; i < 61; i++) {
        let dayOfTheWeek = courseToChange.lecture[lectureIndex].days[j] + "-";
        if (
            this.timeToNum(courseToChange.lecture[lectureIndex].startTime) <= i &&
            this.timeToNum(courseToChange.lecture[lectureIndex].endTime) - 1 >= i
        ) {
          document.getElementById(dayOfTheWeek + i).style.backgroundColor = ""; // (you can choose to select the return of a function)
          document.getElementById(dayOfTheWeek + i).innerHTML =
              "----------------";
          document.getElementById(dayOfTheWeek + i).style.color = "black";
        }
      }
    }

    if (courseToChange.lecture[lectureIndex].tutorial.length != 0) {
      for (
          let j = 0;
          j <
          courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].days
              .length;
          j++
      ) {
        let dayOfTheWeek =
            courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].days[j] +
            "-";
        for (let i = 0; i < 61; i++) {
          if (
              this.timeToNum(
                  courseToChange.lecture[lectureIndex].tutorial[tutorialIndex]
                      .startTime
              ) <= i &&
              this.timeToNum(
                  courseToChange.lecture[lectureIndex].tutorial[tutorialIndex]
                      .endTime
              ) -
              1 >=
              i
          ) {
            document.getElementById(dayOfTheWeek + i).style.backgroundColor =
                ""; // (you can choose to select the return of a function)
            document.getElementById(dayOfTheWeek + i).innerHTML =
                "----------------";
            document.getElementById(dayOfTheWeek + i).style.color = "black";
          }
        }
      }
    }

    if (courseToChange.lab.length != 0) {
      for (let j = 0; j < courseToChange.lab[labIndex].days.length; j++) {
        let dayOfTheWeek = courseToChange.lab[labIndex].days[j] + "-";
        for (let i = 0; i < 61; i++) {
          if (
              this.timeToNum(courseToChange.lab[labIndex].startTime) <= i &&
              this.timeToNum(courseToChange.lab[labIndex].endTime) - 1 >= i
          ) {
            document.getElementById(dayOfTheWeek + i).style.backgroundColor =
                ""; // (you can choose to select the return of a function)
            document.getElementById(dayOfTheWeek + i).innerHTML =
                "----------------";
            document.getElementById(dayOfTheWeek + i).style.color = "black";
          }
        }
      }
    }

    // add part

    for (let i = 0; i < courseToChange.lecture.length; i++) {
      if (courseToChange.lecture[i].section === lectureSection) {
        lectureIndex = i; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      }
    }

    if (courseToChange.lecture[lectureIndex].tutorial.length != 0) {
      for (
          let i = 0;
          i < courseToChange.lecture[lectureIndex].tutorial.length;
          i++
      ) {
        if (
            courseToChange.lecture[lectureIndex].tutorial[i].section ===
            tutorialSection
        ) {
          tutorialIndex = i; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
      }
    }

    if (courseToChange.lab.length != 0) {
      for (let i = 0; i < courseToChange.lab.length; i++) {
        if (courseToChange.lab[i].section === labSection) {
          labIndex = i; //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
      }
    }

    courseToChangeForFinalize.course_color = colorChosen;
    courseToChangeForFinalize.lecture_section = lectureSection;
    courseToChangeForFinalize.lecture_days =
        courseToChange.lecture[lectureIndex].days;
    courseToChangeForFinalize.lecture_start =
        courseToChange.lecture[lectureIndex].startTime;
    courseToChangeForFinalize.lecture_end =
        courseToChange.lecture[lectureIndex].endTime;
    courseToChangeForFinalize.lecture_room =
        courseToChange.lecture[lectureIndex].room;
    courseToChangeForFinalize.tutorial_section = tutorialSection;
    courseToChangeForFinalize.tutorial_room =
        courseToChange.lecture[lectureIndex].tutorial.length !== 0
            ? courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].room
            : "";
    courseToChangeForFinalize.tutorial_days =
        courseToChange.lecture[lectureIndex].tutorial.length !== 0
            ? courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].days
            : "";
    courseToChangeForFinalize.tutorial_start =
        courseToChange.lecture[lectureIndex].tutorial.length !== 0
            ? courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].startTime
            : "";
    courseToChangeForFinalize.tutorial_end =
        courseToChange.lecture[lectureIndex].tutorial.length !== 0
            ? courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].endTime
            : "";
    courseToChangeForFinalize.lab_section = labSection;
    courseToChangeForFinalize.lab_room =
        courseToChange.lab.length !== 0 ? courseToChange.lab[labIndex].room : "";
    courseToChangeForFinalize.lab_days =
        courseToChange.lab.length !== 0 ? courseToChange.lab[labIndex].days : "";
    courseToChangeForFinalize.lab_start =
        courseToChange.lab.length !== 0
            ? courseToChange.lab[labIndex].startTime
            : "";
    courseToChangeForFinalize.lab_end =
        courseToChange.lab.length !== 0
            ? courseToChange.lab[labIndex].endTime
            : "";

    courseArray[1] = lectureIndex; // update the indexes of the new section
    courseArray[2] = tutorialIndex;
    courseArray[3] = labIndex;

    let aa = new AveryAlgorithms();

    if (!aa.timeConflict(this.state.selectedCourses)) {
      this.setState({ showConflict: "hidden", showConflictForFinalize: false });

      for (let n = 0; n < this.state.selectedCourses.length; n++) {
        courseToChange = this.state.selectedCourses[n][0];
        lectureIndex = this.state.selectedCourses[n][1];
        tutorialIndex = this.state.selectedCourses[n][2];
        labIndex = this.state.selectedCourses[n][3];
        colorChosen = this.state.selectedCourses[n][4];

        for (
            let j = 0;
            j < courseToChange.lecture[lectureIndex].days.length;
            j++
        ) {
          // add lecture

          let initial = this.timeToNum(
              courseToChange.lecture[lectureIndex].startTime
          );
          let final =
              this.timeToNum(courseToChange.lecture[lectureIndex].endTime) - 1;
          let middle = parseInt((initial + final) / 2);

          for (let i = 0; i < 61; i++) {
            if (initial <= i && final >= i) {
              let dayOfTheWeek =
                  courseToChange.lecture[lectureIndex].days[j] + "-";
              document.getElementById(
                  dayOfTheWeek + i
              ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
              if (i === middle - 2) {
                document.getElementById(dayOfTheWeek + i).innerHTML =
                    courseToChange.course;
              } else if (i === middle - 1) {
                document.getElementById(dayOfTheWeek + i).innerHTML = "Lecture";
              } else if (i === middle) {
                document.getElementById(dayOfTheWeek + i).innerHTML =
                    courseToChange.lecture[lectureIndex].startTime;
              } else if (i === middle + 1) {
                document.getElementById(dayOfTheWeek + i).innerHTML = "to";
              } else if (i === middle + 2) {
                document.getElementById(dayOfTheWeek + i).innerHTML =
                    courseToChange.lecture[lectureIndex].endTime;
              } else {
                document.getElementById(dayOfTheWeek + i).innerHTML = "<br />";
              }

              if (
                  colorChosen == "#795548" ||
                  colorChosen == "#ff5722" ||
                  colorChosen == "#607d8b" ||
                  colorChosen == "#009688" ||
                  colorChosen == "#f44336" ||
                  colorChosen == "#9c27b0" ||
                  colorChosen == "#673ab7" ||
                  colorChosen == "#3f51b5"
              ) {
                document.getElementById(dayOfTheWeek + i).style.color = "beige";
              } else {
                document.getElementById(dayOfTheWeek + i).style.color = "black";
              }
            }
          }
        }

        if (courseToChange.lecture[lectureIndex].tutorial.length != 0) {
          for (
              let k = 0;
              k <
              courseToChange.lecture[lectureIndex].tutorial[tutorialIndex].days
                  .length;
              k++
          ) {
            // add tutorial

            let initial = this.timeToNum(
                courseToChange.lecture[lectureIndex].tutorial[tutorialIndex]
                    .startTime
            );
            let final =
                this.timeToNum(
                    courseToChange.lecture[lectureIndex].tutorial[tutorialIndex]
                        .endTime
                ) - 1;
            let middle = parseInt((initial + final) / 2);
            if (final - initial <= 3) {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek =
                      courseToChange.lecture[lectureIndex].tutorial[tutorialIndex]
                          .days[k] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        courseToChange.course;
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "Tutorial";
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        courseToChange.lecture[lectureIndex].tutorial[
                            tutorialIndex
                            ].startTime +
                        "-" +
                        courseToChange.lecture[lectureIndex].tutorial[
                            tutorialIndex
                            ].endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }

                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            } else {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek =
                      courseToChange.lecture[lectureIndex].tutorial[tutorialIndex]
                          .days[k] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        courseToChange.course;
                  } else if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "Tutorial";
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        courseToChange.lecture[lectureIndex].tutorial[
                            tutorialIndex
                            ].startTime;
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                  } else if (i === middle + 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        courseToChange.lecture[lectureIndex].tutorial[
                            tutorialIndex
                            ].endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }

                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            }
          }
        }

        if (courseToChange.lab.length != 0) {
          for (let l = 0; l < courseToChange.lab[labIndex].days.length; l++) {
            // add lab

            let initial = this.timeToNum(
                courseToChange.lab[labIndex].startTime
            );
            let final =
                this.timeToNum(courseToChange.lab[labIndex].endTime) - 1;
            let middle = parseInt((initial + final) / 2);

            if (final - initial <= 3) {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek = courseToChange.lab[labIndex].days[l] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        courseToChange.course;
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        courseToChange.lab[labIndex].startTime +
                        "-" +
                        courseToChange.lab[labIndex].endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }

                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            } else {
              for (let i = 0; i < 61; i++) {
                if (initial <= i && final >= i) {
                  let dayOfTheWeek = courseToChange.lab[labIndex].days[l] + "-";
                  document.getElementById(
                      dayOfTheWeek + i
                  ).style.backgroundColor = colorChosen; // (you can choose to select the return of a function)
                  if (i === middle - 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        courseToChange.course;
                  } else if (i === middle - 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "Lab";
                  } else if (i === middle) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        courseToChange.lab[labIndex].startTime;
                  } else if (i === middle + 1) {
                    document.getElementById(dayOfTheWeek + i).innerHTML = "to";
                  } else if (i === middle + 2) {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        courseToChange.lab[labIndex].endTime;
                  } else {
                    document.getElementById(dayOfTheWeek + i).innerHTML =
                        "<br />";
                  }

                  if (
                      colorChosen == "#795548" ||
                      colorChosen == "#ff5722" ||
                      colorChosen == "#607d8b" ||
                      colorChosen == "#009688" ||
                      colorChosen == "#f44336" ||
                      colorChosen == "#9c27b0" ||
                      colorChosen == "#673ab7" ||
                      colorChosen == "#3f51b5"
                  ) {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "beige";
                  } else {
                    document.getElementById(dayOfTheWeek + i).style.color =
                        "black";
                  }
                }
              }
            }
          }
        }
      }
    } else {
      document.getElementById("timeConflict").innerHTML = "No Results";
      this.setState({ showConflict: "visible", showConflictForFinalize: true });
      this.removeAll();
    }
  }

  filterTutorialOptions(theName) {
    let tuto = document.getElementById(theName + "tutSection");
    let selected_lec = document.getElementById(theName + "lecSection");
    let chosen_lec;
    for (let i = 0; i < this.state.selectedCourses.length; i++) {
      for (
          let j = 0;
          j < this.state.selectedCourses[i][0].lecture.length;
          j++
      ) {
        if (
            this.state.selectedCourses[i][0].lecture[j].section ===
            selected_lec.value
        ) {
          chosen_lec = this.state.selectedCourses[i][0].lecture[j];
          break;
        }
      }
    }

    let x = chosen_lec.tutorial.map(
        tut => "<option>" + tut.section + "</option>"
    );
    tuto.innerHTML = x;
  }

  render() {

    let myAddedClasses = this.state.selectedCourses.map(theClass => (
        <option value={theClass[0].course}>{theClass[0].course}</option>
    ));

    let i = 0;
    let chosenClass;
    let x = this.state.selectedCourses.map(element => (
        <tr id={element[0].course} style={{ backgroundColor: element[4] }}>
          <td>
            <div>
              <input type="checkbox" checked /> &nbsp;
              <strong>{element[0].course}</strong>
              <br />
              <strong>{element[0].name}</strong> <br />
              {/* //////////////////////////////////////////////// */}
              <label>LEC:&nbsp;</label>
              <select
                  id={element[0].course + "lecSection"}
                  defaultValue={this.state.defaultValueLecture}
                  onChange={() => this.filterTutorialOptions(element[0].course)}
              >
                {element[0].lecture.map(theLec => (
                    <option>{theLec.section}</option>
                ))}
              </select>
              &nbsp;
              &nbsp;
              <label
                  for={element[0].course + "tutSection"}
                  style={{
                    visibility:
                        element[0].lecture[0].tutorial.length === 0
                            ? "hidden"
                            : "visible"
                  }}
              >
                TUT:&nbsp;
              </label>
              <select
                  defaultValue={this.state.defaultValueTutorial}
                  id={element[0].course + "tutSection"}
                  style={{
                    visibility:
                        element[0].lecture[0].tutorial.length === 0
                            ? "hidden"
                            : "visible"
                  }}
              >
                {element[0].lecture[0].tutorial.map(theTut => (
                    <option>{theTut.section}</option>
                ))}
              </select>
              {/* ////////////////////////////////////////////////  */}
              &nbsp;
              &nbsp;
              <label
                  for={element[0].course + "labSection"}
                  style={{
                    visibility:
                        element[0].lab.length === 0 ? "hidden" : "visible"
                  }}
              >
                LAB:&nbsp;
              </label>
              <select
                  defaultValue={this.state.defaultValueLab}
                  id={element[0].course + "labSection"}
                  style={{
                    visibility:
                        element[0].lab.length === 0 ? "hidden" : "visible"
                  }}
              >
                {element[0].lab.map(element1 => (
                    <option>{element1.section}</option>
                ))}
              </select>{" "}
              &nbsp;
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
              <Button
                  text="Change Section"
                  onClick={() => this.changeSection(element[0].course)}
              />
              <br />
              <span style={{ fontWeight: "bold" }}>Prerequisites: </span>
              <span id="prerequisites">
              {element[0].prereqs.map(pre => pre + " ")}
            </span>
              &nbsp; &nbsp; | &nbsp; &nbsp;
              <span style={{ fontWeight: "bold" }}>Co-requisites: </span>
              <span id="corequisites">
              {element[0].coreqs.map(cor => cor + " ")}
            </span>
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

    const data = this.state.finalizedClassArray;
    const data2 = this.state.showConflictForFinalize;

    return (
        <div className="container">
          <div className="jumbotron j-greetings">
            <div style={{ display: this.state.showSelection }}>
              <h2 className="display-4">Select Your Semester</h2>
              <hr color="#7e1530" />
              <div style={{ textAlign: "center" }}>
                <Form>
                  <Form.Group controlId="semester">
                    <Form.Label>Select Semester</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={this.handleSemesterChange}
                    >
                      <option selected="selected">Fall</option>
                      <option>Winter</option>
                      <option>Summer</option>
                    </Form.Control>
                  </Form.Group>
                </Form>

                <Form>
                  <Form.Group controlId="semester-year">
                    <Form.Label>Select Year</Form.Label>
                    <Form.Control
                        as="select"
                        selected={currentYear}
                        onChange={this.handleSemesterChange}
                    >
                      <option selected="selected">{currentYear}</option>
                      {years}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>

              <LoadingScreen
                  loading={this.state.isLoading}
                  bgColor="#f1f1f1"
                  spinnerColor="#b30000"
                  textColor="#676767"
                  logoSrc="https://user-images.githubusercontent.com/36492119/52869487-bdcd5180-3113-11e9-93d4-155882376646.png"
                  text="Receiving Courses"
              />
              {/*<h2 className="display-4">Course Selection Menu</h2>
          <hr color="#7e1530" />*/}
              <br />

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
                    <Button
                        text="Drop Down Menu"
                        onClick={this.addClass1}
                        style={{ float: "left" }}
                    />
                    <hamburger>
                    </hamburger>
                  </div>
                </div>

                <p
                    id="addStatus1"
                    style={{ color: "red", visibility: this.state.show2 }}
                />
              </div>
              <div className="mt-4">{table}</div>

              <Button text="Generate Schedule" onClick={this.handleDisplay} />

              <Button text="Color Selection" onClick={this.openRubiat} />

              <Button text="Try All" onClick={this.tryAll} />
              <Button text="Send to Calender" onClick={this.sendCalendar} />
              <Link to="/hamburger">
                <Button text="Hamburger" />
              </Link>
              <Link to="/build-seq-or-sem">
                <Button text="Main Selector" />
              </Link>

              <Link to="/">
                <Button text="Home Page" />
              </Link>
            </div>

            <div style={{ display: this.state.showSchedule }}>
              {/*<hr color="#7e1530" />*/}
              <h2 className="display-5">
                {this.state.semester} {this.state.year} Semester
              </h2>
              <p className="lead" />
              <h4
                  id="timeConflict"
                  style={{ color: "red", visibility: this.state.showConflict }}
              />

              <div
                  class="btn-group"
                  style={{ visibility: this.state.showTryAll }}
              >
                <Button text="Previous" onClick={this.tryAll1} />
                <p>
                  {this.state.validTryAll.length === 1
                      ? 0
                      : this.state.tryAllIndex + 1}
                  /
                  {this.state.validTryAll.length === 1
                      ? 0
                      : this.state.validTryAll.length}
                </p>
                <Button text="Next" onClick={this.tryAll2} />
              </div>

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
                                  return <div id={myID}>----------------</div>;
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
              <Link
                  to={{
                    pathname: "/finalize-export-sem",
                    selectedCourses: data,
                    theShowConflict: data2
                  }}
              >
                <Button text="Finalize" />
              </Link>

              <Button
                  text="Back To Select Courses"
                  onClick={this.handleDisplay1}
              />
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
                  <select id="colorChanger">{myAddedClasses}</select>
                </div>
                <Button text="Color Selection" onClick={this.colourRubiatO} />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.closeRubiat} text="Close" />
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.colorS} onHide={this.colourRubiatC}>
            <Modal.Header closeButton style={{ backgroundColor: "#82100d" }}>
              <Modal.Title>Color Selector</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: "center" }}>
              <p style={{ margin: "0px 0px 15px 0px" }}>
                Select a Color
              </p>
              <div style={{margin: "0px 0px 0px 115px"}}>
                <CirclePicker onChangeComplete={this.handleChangeComplete} />
              </div>
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
                <input
                    type="file"
                    name="filename"
                    className="btn btn-dark"
                    onChange={this.handleSelectedFile}
                />
                <button
                    className="btn btn-dark"
                    value="upload"
                    onClick={this.handleUpload}
                >
                  Upload
                </button>
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
