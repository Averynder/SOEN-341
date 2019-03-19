import React, { Component } from 'react';


class TutorialSequence extends Component {


    subject;
    catalog;
    tutorialSectionNumber;
    classLocation;
    days;
    startTime;
    endTime;
    semester;

    constructor(subject, catalog, tutorialSectionNumber, classLocation, days, startTime, endTime, semester) {
        super();
        this.subject = subject;
        this.catalog = catalog;
        this.tutorialSectionNumber = tutorialSectionNumber;
        this.classLocation = classLocation;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
        this.semester = semester;

    }



    clone () {
        var cc = new TutorialSequence(null,null,null,null,null,null,null,null);
        cc.subject = this.subject;
        cc.catalog = this.catalog;
        cc.tutorialSectionNumber = this.tutorialSectionNumber;
        cc.classLocation = this.classLocation;
        cc.days = this.days;
        cc.startTime = this.startTime;
        cc.endTime = this.endTime;
        cc.semester = this.semester;

        return cc;
    }


}

export default TutorialSequence