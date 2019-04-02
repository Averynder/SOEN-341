import React, { Component } from 'react';
import JsonLecture from "./JsonLecture";
import JsonClass from "./JsonClass";
import JsonTut from "./JsonTut";
import cloneDeep from 'lodash/cloneDeep';

class AveryAlgorithms extends Component {

	course;
	lab;

	constructor()
	{
		super();
		this.allPossibilities = this.allPossibilities.bind(this);
		this.treeMaker = this.treeMaker.bind(this);
		this.duplicateArray = this.duplicateArray.bind(this);
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
								let pos = new JsonClass();
								pos.lab = labs[k];
								pos.lecture = cloneDeep(lecturesTut[i]);
								pos.lecture.tutorial = cloneDeep(lecturesTut[i].tutorial);
								pos.lecture.tutorial = pos.lecture.tutorial.slice(j, pos.lecture.tutorial.length);
								pos.lecture.tutorial = pos.lecture.tutorial.slice(0, 1);
								possibilities.push(pos);
							}
						}
						// Lectures + Labs - Tuts
						else
						{
							let pos = new JsonClass();
							pos.lab = labs[k];
							pos.lecture = cloneDeep(lecturesTut[i]);
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
							let pos = new JsonClass();
							pos.lecture = cloneDeep(lecturesTut[i]);
							pos.lecture.tutorial = cloneDeep(lecturesTut[i].tutorial);
							pos.lecture.tutorial = pos.lecture.tutorial.slice(j, pos.lecture.tutorial.length);
							pos.lecture.tutorial = pos.lecture.tutorial.slice(0, 1);
							possibilities.push(pos);
						}
					}
					// lectures - Tuts
					else
					{
						let pos = new JsonClass();
						pos.lecture = cloneDeep(lecturesTut[i]);
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

	treeCaller(courses)
	{
		let root = new AveryAlgorithms.Node(null, null, null);
		this.treeMaker(courses, root);
		return root;
	}

	timeConflict(course1, course2)
	{
		let lectureIndex1 = course1[1];
		let tutorialIndex1 = course1[2];
		let labIndex1 = course1[3];

		let lectureIndex2 = course2[1];
		let tutorialIndex2 = course2[2];
		let labIndex2 = course2[3];

		let lecture1 = course1[0].lecture[lectureIndex1];
		let tutorial1, lab1;

		if (tutorialIndex1 != null) {
			tutorial1 = course1[0].lecture[lectureIndex1].tutorial[tutorialIndex1];
		}

		if (labIndex1 != null) {
			lab1 = course1[0].lab[labIndex1];
		}

		let lecture2 = course2[0].lecture[lectureIndex2];
		let tutorial2, lab2;

		if (tutorialIndex2 != null) {
			tutorial2 = course2[0].lecture[lectureIndex2].tutorial[tutorialIndex2];
		}

		if (labIndex2 != null) {
			lab2 = course2[0].lab[labIndex2];
		}

		let start1, start2, end1, end2;

		for (let i = 0; i < lecture1.days.length; i++) {
			start1 = lecture1.startTime;
			end1 = lecture1.endTime;
			
			for (let j = 0; j < lecture2.days.length; j++) {
				if (lecture1.days[i] == lecture2.days[j]) {
					start2 = lecture2.startTime;
					end2 = lecture2.endTime;
					// if (start2 > start1) {
					// 	if (!(start2 >= end1)) {
					// 		return "conflict between lecture1 and lecture2";
					// 	}
					// }
					// else {
					// 	if (!(start1 >= end2)) {
					// 		return "conflict betwen lecture1 and lecture2";
					// 	}
					// }

					if (((start2 > start1) && (!(start2 >= end1))) || ((!(start2 > start1)) && (!(start1 >= end2)))) {
						return "conflict between lecture1 and lecture2";
					}
				}
			}

			if (tutorial1 != undefined) {

			}
		}
	}
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
