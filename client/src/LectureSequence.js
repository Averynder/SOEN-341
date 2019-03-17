import React, { Component } from 'react';


class LectureSequence extends Component {


    subject;
    catalog;
    lectureSectionNumber;
    classLocation;
    days;
    startTime;
    endTime;

    constructor(subject, catalog, lectureSectionNumber, classLocation, days, startTime, endTime) {
        super();
        this.subject = subject;
        this.catalog = catalog;
        this.lectureSectionNumber = lectureSectionNumber;
        this.classLocation = classLocation;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
    }



    clone () {
        var cc = new LectureSequence(null,null,null,null,null,null,null);
        cc.subject = this.subject;
        cc.catalog = this.catalog;
        cc.lectureSectionNumber = this.lectureSectionNumber;
        cc.classLocation = this.classLocation;
        cc.days = this.days;
        cc.startTime = this.startTime;
        cc.endTime = this.endTime;
        return cc;
    }


}

export default LectureSequence