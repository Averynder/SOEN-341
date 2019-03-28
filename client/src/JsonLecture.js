import React, { Component } from 'react';

class JsonLecture extends Component {

	section;
	days;
	startTime;
	endTime;
	tutorial;
	room;

	constructor(section, days, startTime, endTime, room)
	{
		super();
		this.section = section;
		this.days = days;
		this.startTime = startTime;
		this.endTime = endTime;
		this.tutorial = [];
		this.room = room;
	}

	addTut(tutorial)
	{
		this.tutorial.push(tutorial);
	}

	clone () {
		var cc = new JsonLecture(null,null,null,null,null,null);
		cc.section = this.section;
		cc.days = this.days;
		cc.startTime = this.startTime;
		cc.endTime = this.endTime;
		cc.room = this.room;
		return cc;
	}

}

export default JsonLecture;
