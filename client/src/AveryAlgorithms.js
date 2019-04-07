import React, { Component } from 'react';
import JsonLecture from "./JsonLecture";
import JsonClass from "./JsonClass";
import JsonTut from "./JsonTut";
import cloneDeep from 'lodash/cloneDeep';
import * as times from "./data/calendar.json";
import Stack from "./Stack";

class AveryAlgorithms extends Component {

	course;
	lab;

	constructor()
	{
		super();
		this.allPossibilities = this.allPossibilities.bind(this);
		this.treeMaker = this.treeMaker.bind(this);
		this.duplicateArray = this.duplicateArray.bind(this);
		this.scrollMaker = this.scrollMaker.bind(this);
		this.stacks2arrays = this.stacks2arrays.bind(this);
		this.timeConflict1 = this.timeConflict1.bind(this);
		this.timeConflict = this.timeConflict.bind(this);
		this.timeConflict2 = this.timeConflict2.bind(this);
		this.courseCrusher = this.courseCrusher.bind(this);
	}

	duplicateArray(oldArray)
	{
		let newArray = [];
		for (let i = 0; i < oldArray.length; i++)
		{
			newArray.push(cloneDeep(oldArray[i]));
		}
		return newArray;
	}

	allPossibilities(aCourse)
	{
		let possibilities = [];
		let lecturesTut = cloneDeep(aCourse.lecture);
		let labs = aCourse.lab;
		// Lectures + Tuts + Labs
		if (lecturesTut.length > 0 && labs.length > 0)
		{
			for (let i = 0; i < lecturesTut.length; i++)
			{
				for (let k = 0; k < labs.length; k++)
				{
					if (lecturesTut[i].tutorial != null)
					{
						if (lecturesTut[i].tutorial.length > 0)
						{
							for (let j = 0; j < lecturesTut[i].tutorial.length; j++)
							{
								let pos = new JsonClass(aCourse.course,aCourse.semester,aCourse.prerequisites,aCourse.corequisites,aCourse.name,aCourse.credit);
								pos.lab = [labs[k]];
								pos.lecture = [cloneDeep(lecturesTut[i])];
								pos.lecture[0].tutorial = cloneDeep(lecturesTut[i].tutorial);
								pos.lecture[0].tutorial = pos.lecture[0].tutorial.slice(j, pos.lecture[0].tutorial.length);
								pos.lecture[0].tutorial = pos.lecture[0].tutorial.slice(0, 1);
								possibilities.push(pos);
							}
						}
						// Lectures + Labs - Tuts
						else
						{
							let pos = new JsonClass(aCourse.course,aCourse.semester,aCourse.prerequisites,aCourse.corequisites,aCourse.name,aCourse.credit);
							pos.lab = [labs[k]];
							pos.lecture = [cloneDeep(lecturesTut[i])];
							possibilities.push(pos);
						}
					}
				}
			}
		}
		// Lectures + Tuts
		else if (lecturesTut.length > 0)
		{
			for (let i = 0; i < lecturesTut.length; i++)
			{
				if (lecturesTut[i].tutorial != null)
				{
					if (lecturesTut[i].tutorial.length > 0)
					{
						for (let j = 0; j < lecturesTut[i].tutorial.length; j++)
						{
							let pos = new JsonClass(aCourse.course,aCourse.semester,aCourse.prerequisites,aCourse.corequisites,aCourse.name,aCourse.credit);
							pos.lecture = [cloneDeep(lecturesTut[i])];
							pos.lecture[0].tutorial = cloneDeep(lecturesTut[i].tutorial);
							pos.lecture[0].tutorial = pos.lecture[0].tutorial.slice(j, pos.lecture[0].tutorial.length);
							pos.lecture[0].tutorial = pos.lecture[0].tutorial.slice(0, 1);
							possibilities.push(pos);
						}
					}
					// lectures - Tuts
					else
					{
						let pos = new JsonClass(aCourse.course,aCourse.semester,aCourse.prerequisites,aCourse.corequisites,aCourse.name,aCourse.credit);
						pos.lecture = [cloneDeep(lecturesTut[i])];
						possibilities.push(pos);
					}
				}
			}
		}
		return possibilities;
	}

	treeMaker(courses, parent)
	{
		if (courses.length == 0)
		{
			return;
		}
		let c1 = courses[0];
		let poss = this.allPossibilities(c1);
		for (let i = 0; i < poss.length; i++) //
		{
			let child = new AveryAlgorithms.Node(poss[i], parent, null);
			parent.branches.push(child);
		}
		courses = courses.slice(1,courses.length);
		for (let j = 0; j < parent.branches.length; j++) //
		{
			let new_courses = this.duplicateArray(courses);
			this.treeMaker(new_courses,parent.branches[j]);
		}
		return;
	}

	scrollMaker(parent, root, finalList)
	{
		if (parent.branches == null)
			return;
		for (let i = 0; i < parent.branches.length; i++)
		{
			this.scrollMaker(parent.branches[i], root, finalList);
		}
		if (parent.branches.length == 0)
		{
			let stacky = new Stack();
			if (parent != root)
				stacky.push(parent.course);
			while (parent != root)
			{
				parent = parent.parent;
				if (parent != root)
					stacky.push(parent.course);
			}
			finalList.push(stacky);
			return;
		}
	}

	stacks2arrays(listOfStacks)
	{
		for (let i = 0; i < listOfStacks.length; i++)
		{
			let stacky = listOfStacks[i];
			let newArray = [];
			for (let j = 0; j < stacky.size(); j++)
			{
				newArray.push(stacky.pop1());
			}
			listOfStacks.splice(i,1);
			listOfStacks.unshift(newArray);
		}
	}

	courseCrusher(courses)
	{
		courses = this.duplicateArray(courses);
		for (let i = 0; i < courses.length; i++)
		{
			// removing same time tutorials
			if (courses[i].lecture != null)
			{
				for (let j = 0; j < courses[i].lecture.length; j++)
				{
					if (courses[i].lecture[j].tutorial != null)
					{
						for (let a = 0; a < courses[i].lecture[j].tutorial.length; a++)
						{
							for (let b = 0; b < courses[i].lecture[j].tutorial.length; b++)
							{
								if (courses[i].lecture[j].tutorial[a].startTime == courses[i].lecture[j].tutorial[b].startTime &&
									courses[i].lecture[j].tutorial[a].endTime == courses[i].lecture[j].tutorial[b].endTime && a != b)
								{
									let a1 = courses[i].lecture[j].tutorial.slice(0,b);
									let a2 = courses[i].lecture[j].tutorial.slice(b+1);
									courses[i].lecture[j].tutorial = a1.concat(a2);
									b = -1;
								}
							}
						}
					}
				}
			}

			// removing same time labs
			if (courses[i].lab != null)
			{
				for (let j = 0; j < courses[i].lab.length; j++)
				{
					for (let k = 0; k < courses[i].lab.length; k++)
					{
						if (courses[i].lab[j].startTime == courses[i].lab[k].startTime
						&& courses[i].lab[j].endTime == courses[i].lab[k].endTime)
						{
							let a1 = courses[i].lab.slice(0,k);
							let a2 = courses[i].lab.slice(k+1);
							courses[i].lab = a1.concat(a2);
							k = -1;
						}
					}
				}
			}
		}
		return courses;
	}

	treeCaller(courses)
	{
		let root = new AveryAlgorithms.Node(null, null, null);
		courses = this.courseCrusher(courses);
		this.treeMaker(courses, root);
		let myArray = [];
		this.scrollMaker(root, root, myArray);
		this.stacks2arrays(myArray);
		return myArray;
	}

	timeConflict1(course1, course2) // returns true if there's conflict between 2 courses
	{
		let lectureIndex1 = course1[1];
		let tutorialIndex1 = course1[2];
		let labIndex1 = course1[3];

		let lectureIndex2 = course2[1];
		let tutorialIndex2 = course2[2];
		let labIndex2 = course2[3];

		let lecture1, tutorial1, lab1;

		if (lectureIndex1 != undefined) {
			lecture1 = course1[0].lecture[lectureIndex1];
		}
		else {
			lecture1 = course1.lecture[0];
		}

		if (tutorialIndex1 != null) {
			tutorial1 = course1[0].lecture[lectureIndex1].tutorial[tutorialIndex1];
		}
		else {
			tutorial1 = course1.lecture[0].tutorial[0];
		}

		if (labIndex1 != null) {
			lab1 = course1[0].lab[labIndex1];
		}
		else {
			lab1 = course1.lab[0];
		}

		let lecture2, tutorial2, lab2;

		if (lectureIndex1 != undefined) {
			lecture2 = course2[0].lecture[lectureIndex2];
		}
		else {
			lecture2 = course2.lecture[0];
		}

		if (tutorialIndex2 != null) {
			tutorial2 = course2[0].lecture[lectureIndex2].tutorial[tutorialIndex2];
		}
		else {
			tutorial2 = course2.lecture[0].tutorial[0];
		}

		if (labIndex2 != null) {
			lab2 = course2[0].lab[labIndex2];
		}
		else {
			lab2 = course2.lab[0];
		}

		let start1, start2, end1, end2;

		for (let i = 0; i < lecture1.days.length; i++) { // compare lec1 to lec2, tut2, lab2, & lab1
			start1 = this.timeToNum(lecture1.startTime);
			end1 = this.timeToNum(lecture1.endTime);

			for (let j = 0; j < lecture2.days.length; j++) {
				if (lecture1.days[i] == lecture2.days[j]) {
					start2 = this.timeToNum(lecture2.startTime);
					end2 = this.timeToNum(lecture2.endTime);

					if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
						//console.log("conflict between lecture1 and lecture2");
						return true;
					}
				}
			}

			if (tutorial2 != undefined) {
				for (let k = 0; k < tutorial2.days.length; k++) {
					if (lecture1.days[i] == tutorial2.days[k]) {
						start2 = this.timeToNum(tutorial2.startTime);
						end2 = this.timeToNum(tutorial2.endTime);

						if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
							//console.log("conflict between lecture1 and tutorial2");
							return true;
						}
					}
				}
			}

			if (lab2 != undefined) {
				for (let l = 0; l < lab2.days.length; l++) {
					if (lecture1.days[i] == lab2.days[l]) {
						start2 = this.timeToNum(lab2.startTime);
						end2 = this.timeToNum(lab2.endTime);

						if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
							//console.log("conflict between lecture1 and lab2");
							return true;
						}
					}
				}
			}

			if (lab1 != undefined) {
				for (let m = 0; m < lab1.days.length; m++) {
					if (lecture1.days[i] == lab1.days[m]) {
						start2 = this.timeToNum(lab1.startTime);
						end2 = this.timeToNum(lab1.endTime);

						if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
							//console.log("conflict between lecture1 and lab1");
							return true;
						}
					}
				}
			}
		}

		if (tutorial1 != undefined) { // compare tut1 to lec2, tut2, lab2, & lab1
			for (let j = 0; j < tutorial1.days.length; j++) {
				start1 = this.timeToNum(tutorial1.startTime);
				end1 = this.timeToNum(tutorial1.endTime);

				for (let i = 0; i < lecture2.days.length; i++) {
					if (tutorial1.days[j] == lecture2.days[i]) {
						start2 = this.timeToNum(lecture2.startTime);
						end2 = this.timeToNum(lecture2.endTime);

						if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
							//console.log("conflict between tutorial1 and lecture2");
							return true;
						}
					}
				}

				if (tutorial2 != undefined) {
					for (let k = 0; k < tutorial2.days.length; k++) {
						if (tutorial1.days[j] == tutorial2.days[k]) {
							start2 = this.timeToNum(tutorial2.startTime);
							end2 = this.timeToNum(tutorial2.endTime);

							if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
								//console.log("conflict between tutorial1 and tutorial2");
								return true;
							}
						}
					}
				}

				if (lab2 != undefined) {
					for (let l = 0; l < lab2.days.length; l++) {
						if (tutorial1.days[j] == lab2.days[l]) {
							start2 = this.timeToNum(lab2.startTime);
							end2 = this.timeToNum(lab2.endTime);

							if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
								//console.log("conflict between tutorial1 and lab2");
								return true;
							}
						}
					}
				}

				if (lab1 != undefined) {
					for (let m = 0; m < lab1.days.length; m++) {
						if (tutorial1.days[j] == lab1.days[m]) {
							start2 = this.timeToNum(lab1.startTime);
							end2 = this.timeToNum(lab1.endTime);

							if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
								//console.log("conflict between tutorial1 and lab1");
								return true;
							}
						}
					}
				}
			}
		}

		if (lab1 != undefined) { // compare lab1 to lec2, tut2, & lab2
			for (let k = 0; k < lab1.days.length; k++) {
				start1 = this.timeToNum(lab1.startTime);
				end1 = this.timeToNum(lab1.endTime);

				for (let i = 0; i < lecture2.days.length; i++) {
					if (lab1.days[k] == lecture2.days[i]) {
						start2 = this.timeToNum(lecture2.startTime);
						end2 = this.timeToNum(lecture2.endTime);

						if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
							//console.log("conflict between lab1 and lecture2");
							return true;
						}
					}
				}

				if (tutorial2 != undefined) {
					for (let j = 0; j < tutorial2.days.length; j++) {
						if (lab1.days[k] == tutorial2.days[j]) {
							start2 = this.timeToNum(tutorial2.startTime);
							end2 = this.timeToNum(tutorial2.endTime);

							if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
								//console.log("conflict between lab1 and tutorial2");
								return true;
							}
						}
					}
				}

				if (lab2 != undefined) {
					for (let l = 0; l < lab2.days.length; l++) {
						if (lab1.days[k] == lab2.days[l]) {
							start2 = this.timeToNum(lab2.startTime);
							end2 = this.timeToNum(lab2.endTime);

							if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
								//console.log("conflict between lab1 and lab2");
								return true;
							}
						}
					}
				}
			}
		}

		if (lab2 != undefined) { // compare lab22 to lec2 & tut2
			for (let l = 0; l < lab2.days.length; l++) {
				start1 = this.timeToNum(lab2.startTime);
				end1 = this.timeToNum(lab2.endTime);

				for (let i = 0; i < lecture2.days.length; i++) {
					if (lab2.days[l] == lecture2.days[i]) {
						start2 = this.timeToNum(lecture2.startTime);
						end2 = this.timeToNum(lecture2.endTime);

						if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
							console.log("conflict between lab2 and lecture2");
							return true;
						}
					}
				}

				if (tutorial2 != undefined) {
					for (let j = 0; j < tutorial2.days.length; j++) {
						if (lab2.days[l] == tutorial2.days[j]) {
							start2 = this.timeToNum(tutorial2.startTime);
							end2 = this.timeToNum(tutorial2.endTime);

							if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
								console.log("conflict between lab2 and tutorial2");
								return true;
							}
						}
					}
				}
			}
		}

		//console.log("no conflicts");
		return false;
	}

	timeConflict2(course1)
	{
		let lectureIndex1 = course1[1];
		let tutorialIndex1 = course1[2];
		let labIndex1 = course1[3];

		let lecture1, tutorial1, lab1;

		if (lectureIndex1 != undefined) {
			lecture1 = course1[0].lecture[lectureIndex1];
		}
		else {
			lecture1 = course1.lecture[0];
		}

		if (tutorialIndex1 != null) {
			tutorial1 = course1[0].lecture[lectureIndex1].tutorial[tutorialIndex1];
		}
		else {
			tutorial1 = course1.lecture[0].tutorial[0];
		}

		if (labIndex1 != null) {
			lab1 = course1[0].lab[labIndex1];
		}
		else {
			lab1 = course1.lab[0];
		}

		let start1, start2, end1, end2;

		for (let i = 0; i < lecture1.days.length; i++) { // compare lec1 to lab1
			start1 = this.timeToNum(lecture1.startTime);
			end1 = this.timeToNum(lecture1.endTime);

			if (lab1 != undefined) {
				for (let m = 0; m < lab1.days.length; m++) {
					if (lecture1.days[i] == lab1.days[m]) {
						start2 = this.timeToNum(lab1.startTime);
						end2 = this.timeToNum(lab1.endTime);

						if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
							//console.log("conflict between lecture1 and lab1");
							return true;
						}
					}
				}
			}
		}

		if (tutorial1 != undefined) { // compare tut1 to lab1
			for (let j = 0; j < tutorial1.days.length; j++) {
				start1 = this.timeToNum(tutorial1.startTime);
				end1 = this.timeToNum(tutorial1.endTime);

				if (lab1 != undefined) {
					for (let m = 0; m < lab1.days.length; m++) {
						if (tutorial1.days[j] == lab1.days[m]) {
							start2 = this.timeToNum(lab1.startTime);
							end2 = this.timeToNum(lab1.endTime);

							if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
								//console.log("conflict between tutorial1 and lab1");
								return true;
							}
						}
					}
				}
			}
		}

		return false;
	}


	timeConflict(courses) // takes array of courses and sees if there's conflicts between them
	{
		if (courses.length == 1) {
			if (this.timeConflict2(courses[0])) {
				return true;
			}
		} else {
			for (let i = 0; i < courses.length; i++) {
				for (let j = i + 1; j < courses.length; j++) {
					if (this.timeConflict1(courses[i], courses[j])) {
						// try {
						// 	console.log("conflict between " + courses[i][0].course + " and " + courses[j][0].course);
						// }
						// catch (err) {
						// 	console.log("conflict between " + courses[i].course + " and " + courses[i].course);
						// }
						return true;
					}
				}
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
}

AveryAlgorithms["class"] = "AveryAlgorithms";
(function (AveryAlgorithms) {
	var Node = (function () {
		function Node(course, parent, branches) {
			this.parent = parent;
			this.course = course;
			if (branches != undefined)
				this.branches = branches;
			else
				this.branches = [];
		}
		return Node;
	}());
	AveryAlgorithms.Node = Node;
	Node["class"] = "AveryAlgorithms.Node";
})(AveryAlgorithms || (AveryAlgorithms = {}));

export default AveryAlgorithms;
