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

	constructor(course, prereqs, coreqs, name, credits, semester, lecture, tutorial, lab)
	{
		super();
		this.course = course;
		this.prereqs = prereqs;
		this.coreqs = coreqs;
		this.name = name;
		this.credits = credits;
		this.semester = semester;
		this.lecture = lecture;
		this.tutorial = tutorial;
		this.lab = lab;
	}

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
}

export default JsonClass;
