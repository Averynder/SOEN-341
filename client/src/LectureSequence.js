import React, { Component } from 'react';


class LectureSequence extends Component {


    subject;
    catalog;
    lectureSectionNumber;
    classLocation;
    days;
    startTime;
    endTime;
    semester;

    constructor(subject, catalog, lectureSectionNumber, classLocation, days, startTime, endTime, semester) {
        super();
        this.subject = subject;
        this.catalog = catalog;
        this.lectureSectionNumber = lectureSectionNumber;
        this.classLocation = classLocation;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
        this.semester = semester;

    }



    clone () {
        var cc = new LectureSequence(null,null,null,null,null,null,null,null);
        cc.subject = this.subject;
        cc.catalog = this.catalog;
        cc.lectureSectionNumber = this.lectureSectionNumber;
        cc.classLocation = this.classLocation;
        cc.days = this.days;
        cc.startTime = this.startTime;
        cc.endTime = this.endTime;
        cc.semester = this.semester;

        return cc;
    }


}

export default LectureSequence