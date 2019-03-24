import React, { Component } from 'react';

class JsonClass extends Component {

	course;
	prerequisites;
	corequisites;
	name;
	credit;
	semester;
	lecture;
	lab;

	constructor(course, semester, prereqs, coreqs, name, credits)
	{
		super();
		this.course = course;
		if (prereqs === undefined)
			prereqs = [];
		this.prerequisites = prereqs;
		if (coreqs === undefined)
			coreqs = [];
		this.corequisites = coreqs;
		this.name = name;
		this.credit = credits;
		this.semester = semester;
		this.lecture = [];
		this.lab = [];
	}

	addPrereqs(prereqs) {this.prerequisites = prereqs;}
	addCoreqs(coreqs) {this.corequisites = coreqs;}
	addName(name) {this.name = name;}
	addCredits(credits) {this.credit = credits;}
	addLecture(lecture) {this.lecture.push(lecture);}
	addLab(lab) {this.lab.push(lab);}

	clone () {
		var cc = new JsonClass(null,null,null,null,null,null);
		cc.course = this.course;
		cc.prerequisites = this.prerequisites;
		cc.corequisites = this.corequisites;
		cc.name = this.name;
		cc.credit = this.credits;
		cc.semester = this.semester;
		cc.lecture = this.lecture;
		cc.lab = this.lab;
		return cc;
	}

	equals2(jclass) {
		var bool1 = this.course === jclass.course;
		var bool2 = bool1 && this.semester === jclass.semester;
		return bool2;
	}

	toString()
	{
		return "course: " + this.course + " prerequisites: ";
	}
}

export default JsonClass;
