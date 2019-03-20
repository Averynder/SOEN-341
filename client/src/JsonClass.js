import React, { Component } from 'react';

class JsonClass extends Component {

	course;
	prereqs;
	coreqs;
	name;
	credits;
	semester;
	lecture;
	tutorial;
	lab;

	constructor(course, semester, prereqs, coreqs, name, credits)
	{
		super();
		this.course = course;
		this.prereqs = prereqs;
		this.coreqs = coreqs;
		this.name = name;
		this.credits = credits;
		this.semester = semester;
		this.lecture = [];
		this.tutorial = [];
		this.lab = [];
	}

	addPrereqs(prereqs) {this.prereqs = prereqs;}
	addCoreqs(coreqs) {this.coreqs = coreqs;}
	addName(name) {this.name = name;}
	addCredits(credits) {this.credits = credits;}
	addLecture(lecture) {this.lecture.push(lecture);}
	addTutorial(tutorial) {this.tutorial.push(tutorial);}
	addLab(lab) {this.lab.push(lab);}

	clone () {
		var cc = new JsonClass(null,null,null,null,null,null);
		cc.course = this.course;
		cc.prereqs = this.prereqs;
		cc.coreqs = this.coreqs;
		cc.name = this.name;
		cc.credits = this.credits;
		cc.semester = this.semester;
		cc.lecture = this.lecture;
		cc.tutorial = this.tutorial;
		cc.lab = this.lab;
		return cc;
	}

	equals(jclass) {
		return this.course === jclass.course && this.semester === jclass.semester;
	}
}

export default JsonClass;
