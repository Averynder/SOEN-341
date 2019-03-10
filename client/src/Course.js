import React, { Component } from 'react';
import MyDoublyLinkedList from "./MyDoublyLinkedList";


class Course extends Component {

    courseTitle;
    subject;
    catalog;
    credits;
    prereqs;
    coreqs;


    constructor(courseTitle, subject, catalog, credits, prereqs, coreqs) {
        super();
        this.courseTitle = courseTitle;
        this.subject = subject;
        this.catalog = catalog;
        this.credits = credits;
        this.prereqs = prereqs;
        this.coreqs = coreqs;

    }
}

// var test = new MyDoublyLinkedList();

export default Course;
