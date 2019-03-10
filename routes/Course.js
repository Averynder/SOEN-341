var express = require('express');
var router = express.Router();
var app = express();

class Course {
    //
    // courseTitle;
    // subject;
    // catalog;
    // credits;
    // prereqs;
    // coreqs;


    constructor(courseTitle, subject, catalog, credits, prereqs, coreqs) {
        this.courseTitle = courseTitle;
        this.subject = subject;
        this.catalog = catalog;
        this.credits = credits;
        this.prereqs = prereqs;
        this.coreqs = coreqs;

    }

}

module.exports = router;
