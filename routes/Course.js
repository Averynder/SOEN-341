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



//     samesame(cc) {
//
// //         if (cc == null) {
// //             return false;
// // }
//         if ((this.courseTitle == cc.courseTitle) &&
//             (this.subject == cc.subject) &&
//             (this.catalog == cc.catalog) &&
//             (this.credits == cc.credits) &&
//             (this.prereqs == cc.prereqs) &&
//             (this.coreqs == cc.coreqs)
//         ) return true;
// }

}

// console.log("same?");

// var Course11 = new Course("lol","lol","lol","lol","lol","lol");
// var Course22 = new Course("lol","lol","lol","lol","lol","lol");
// var Course33 = new Course("lol","lol","lol","lol","lol","no");
//
//This method works for checking equality among objects (even user-defined)
//
// var eq = JSON.stringify(Course11) === JSON.stringify(Course22);
// console.log(eq);


module.exports = Course;
