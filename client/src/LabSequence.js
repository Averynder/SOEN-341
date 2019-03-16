import React, { Component } from 'react';


class LabSequence extends Component {


    subject;
    catalog;
    labSectionNumber;
    classLocation;
    days;
    startTime;
    endTime;

    constructor(subject, catalog, labSectionNumber, classLocation, days, startTime, endTime) {
        super();
        this.subject = subject;
        this.catalog = catalog;
        this.labSectionNumber = labSectionNumber;
        this.classLocation = classLocation;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
    }



    clone () {
        var cc = new LabSequence(null,null,null,null,null,null,null);
        cc.subject = this.subject;
        cc.catalog = this.catalog;
        cc.labSectionNumber = this.labSectionNumber;
        cc.classLocation = this.classLocation;
        cc.days = this.days;
        cc.startTime = this.startTime;
        cc.endTime = this.endTime;
        return cc;
    }


}

export default LabSequence