var express = require('express');
var router = express.Router();
var app = express();


class TutorialSequence {
    //
    // courseTitle;
    // subject;
    // catalog;
    // credits;
    // prereqs;
    // coreqs;

    constructor(subject, catalog, tutorialSectionNumber, classLocation, days, startTime, endTime) {
        this.subject = subject;
        this.catalog = catalog;
        this.tutorialSectionNumber = tutorialSectionNumber;
        this.classLocation = classLocation;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
    }



    clone () {
        var cc = new Course(null,null,null,null,null,null,null);
        cc.subject = this.subject;
        cc.catalog = this.catalog;
        cc.tutorialSectionNumber = this.tutorialSectionNumber;
        cc.classLocation = this.classLocation;
        cc.days = this.days;
        cc.startTime = this.startTime;
        cc.endTime = this.endTime;
        return cc;
    }
}

// console.log("same?");

// var Course11 = new Course("lol","lol","lol","lol","lol","lol");
// var Course22 = new Course("lol","lol","lol","lol","lol","lol");
// var Course33 = Course11.clone();

// console.log("Avery>Mackenzie" + Course33.courseTitle);


// This method works for checking equality among objects (even user-defined)

// var eq = JSON.stringify(Course11) === JSON.stringify(Course22);
// console.log(eq);
//
// Course33 = JSON.stringify(Course22);




module.exports = TutorialSequence;
