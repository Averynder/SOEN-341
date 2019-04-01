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
		this.duplicateArray = this.duplicateArray.bind(this);
	}

	duplicateArray(oldArray)
	{
		let newArray = [];
		for (let i = 0; i < oldArray.length; i++)
		{
			newArray.push(oldArray[i]);
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

}

export default AveryAlgorithms;
