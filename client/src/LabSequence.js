import React, { Component } from 'react';


class LabSequence extends Component {


    subject;
    catalog;
    labSectionNumber;
    classLocation;
    days;
    startTime;
    endTime;
    semester;

    constructor(subject, catalog, labSectionNumber, classLocation, days, startTime, endTime, semester) {
        super();
        this.subject = subject;
        this.catalog = catalog;
        this.labSectionNumber = labSectionNumber;
        this.classLocation = classLocation;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
        this.semester = semester;
    }



    clone () {
        var cc = new LabSequence(null,null,null,null,null,null,null,null);
        cc.subject = this.subject;
        cc.catalog = this.catalog;
        cc.labSectionNumber = this.labSectionNumber;
        cc.classLocation = this.classLocation;
        cc.days = this.days;
        cc.startTime = this.startTime;
        cc.endTime = this.endTime;
        cc.semester = this.semester;
        return cc;
    }


}

export default LabSequence