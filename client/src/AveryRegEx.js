import React, { Component } from 'react';
import JsonLecture from "./JsonLecture";
import JsonClass from "./JsonClass";
import JsonTut from "./JsonTut";
import * as data from "./data/courses";
import * as data1 from "./data/courses2";

class AveryRegEx extends Component
{

	constructor(lectures, tutorials, labs, coursesTaken, loggedIn, Courses)
	{
		super();
		this.regEx = this.regEx.bind(this);
		this.regEx2 = this.regEx2.bind(this);

		this.state = {
			lectures: lectures,
			labs: labs,
			tutorials: tutorials,
			dataCourses: null,
			Courses: Courses,
			coursesFall: null,
			coursesWinter: null,
			coursesSummer: null,
			coursesTakenSet: null,
			coursesTaken: coursesTaken,
			loggedIn: loggedIn,
			credits: 0,
			//classes: JSON.parse(JSON.stringify(data.sequence)),

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
		// Removing Courses Already taken from set
		this.state.coursesTakenSet = [];
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
						this.state.coursesTakenSet.push(this.state.dataCourses.splice(jjj, 1));
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

		// Changing Name for duplicate tutorials to 2 if diff times but same section
		j = 0; k = 0; a = 0; b = 0;
		for (i = 0; i < courses31.length; i++)
		{
			// lecture removing duplicates
			if (courses31[i].lecture != null) {
				for (j = 0; j < courses31[i].lecture.length; j++) {
					if (courses31[i].lecture[j] != null) {
						if (courses31[i].lecture[j].tutorial != null) {
							for (b = 0; b < courses31[i].lecture[j].tutorial.length; b++) {
								for (a = 0; a < courses31[i].lecture[j].tutorial.length; a++) {
									if (courses31[i].lecture[j].tutorial[b] != null) {
										if (courses31[i].lecture[j].tutorial[b].section == courses31[i].lecture[j].tutorial[a].section
											&& a != b) {
											// && courses31[i].lecture[j].tutorial[b].startTime != courses31[i].lecture[j].tutorial[a].startTime
											//                         && courses31[i].lecture[j].tutorial[b].endTime != courses31[i].lecture[j].tutorial[a].endTime
											if (courses31[i].lecture[j].tutorial[a].section.charAt(courses31[i].lecture[j].tutorial[a].section.length) != "2")
											{
												courses31[i].lecture[j].tutorial[a].section += "*";
											}
											a = -1;
										}
									}
								}
							}
						}
					}
				}
			}
		}

		// Removing duplicate tuts if Room was added but other room wasn't removed
		j = 0; k = 0; a = 0; b = 0;
		for (i = 0; i < courses31.length; i++)
		{
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
											&& a != b) {
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
		}

		let returnMe = [];
		returnMe.push(coursesFall);
		returnMe.push(coursesWinter);
		returnMe.push(coursesSummer);
		returnMe.push(this.state.dataCourses);
		returnMe.push(this.state.coursesTakenSet);
		return returnMe;
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
						if (prereqs.charAt(prereqs.length) == " ")
						{
							prereqs = prereqs.substring(0,prereqs.length-1);
						}
						while (prereqs.search(/[A-Z][A-Z][A-Z][A-Z]\s[0-9][0-9][0-9]/) > -1)
						{
							prereqs = prereqs.substring(0,prereqs.search(/[A-Z][A-Z][A-Z][A-Z]\s[0-9][0-9][0-9]/)+4) + prereqs.substring(prereqs.search(/[A-Z][A-Z][A-Z][A-Z]\s[0-9][0-9][0-9]/)+5);
						}
						this.state.dataCourses[i].prereqs = [];
						this.state.dataCourses[i].prereqs.push(prereqs);
						if (coreqs.charAt(coreqs.length) == " ")
						{
							coreqs = coreqs.substring(0,coreqs.length-1);
						}
						while (coreqs.search(/[A-Z][A-Z][A-Z][A-Z]\s[0-9][0-9][0-9]/) > -1)
						{
							coreqs = coreqs.substring(0,coreqs.search(/[A-Z][A-Z][A-Z][A-Z]\s[0-9][0-9][0-9]/)+4) + coreqs.substring(coreqs.search(/[A-Z][A-Z][A-Z][A-Z]\s[0-9][0-9][0-9]/)+5);
						}
						this.state.dataCourses[i].coreqs = [];
						this.state.dataCourses[i].coreqs.push(coreqs);
					}
				}
				//console.log(title + " " + subject + " " + creditNumber + " Pre: " + prereqs + " Co: " + coreqs);
			}
		}
	}
}

export default AveryRegEx;
