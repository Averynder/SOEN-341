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

    clone () {
        var cc = new Course(null,null,null,null,null,null);
        cc.courseTitle = this.courseTitle;
        cc.subject = this.subject;
        cc.catalog = this.catalog;
        cc.credits = this.credits;
        cc.prereqs = this.prereqs;
        cc.coreqs = this.coreqs;
        return cc;
    }

}

// var test = new MyDoublyLinkedList();

export default Course;
