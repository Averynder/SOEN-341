
-- -----------------------------------------------------
-- Schema soen341
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `soen341`;
USE `soen341` ;


 -- ---------------------------------------------------
 -- Table `soen341`.`account user`
 -- ---------------------------------------------------
 CREATE TABLE  `soen341`.`account user` (
   `netname` varchar(50) PRIMARY KEY,
   `password` varchar(50) DEFAULT NULL);

-- -----------------------------------------------------
-- Table `soen341`.`teacher`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`teacher` (
  `facultyID` int(8) PRIMARY KEY,
  `teacherName` varchar(50) NOT NULL,
  `courseHistory` varchar(200) NOT NULL,
  `courseList` varchar(200) NOT NULL,
  `isEngineer` tinyint(1) NOT NULL
  );

-- -----------------------------------------------------
-- Table `soen341`.`student`
-- -----------------------------------------------------
CREATE TABLE `soen341`.`student` (
  `studentID` int(8) PRIMARY KEY,
  `studentName` varchar(50) NOT NULL,
  `programOfStudy` text NOT NULL,
  `academicRecord` text NOT NULL);

-- -----------------------------------------------------
-- Table `soen341`.`isAccountOwner`
-- -----------------------------------------------------
-- CREATE TABLE  `soen341`.`isAccountOwner`(
--   `netname` varchar(50) NOT NULL,
--   `studentID` int(8) DEFAULT NULL,
--   `facultyID` int(8) DEFAULT NULL,
--    foreign key (StudentID) references student(StudentID),
--    foreign key (FacultyID) references teacher(FacultyID),
--    foreign key (netname) references user(netname),
--    unique(netname, studentID, facultyID));

/*
-- -----------------------------------------------------
-- Table `soen341`.`schedule builder`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`schedule_builder` (
  `builtScheduleID` int(15) DEFAULT NULL PRIMARY KEY);

-- Need to add more things here ^


-- -----------------------------------------------------
-- Table `soen341`.`optimized schedule`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`optimized_sequence` (
  `optimizedScheduleID` int(15) DEFAULT NULL PRIMARY KEY);

-- Need to add more things here ^

-- -----------------------------------------------------
-- Table `soen341`.`initiates`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`initiates`(
  `builtScheduleID` int(15) DEFAULT NULL,
  `studentID` int(8) DEFAULT NULL,
  `facultyID` int(8) DEFAULT NULL,
   foreign key (StudentID) references student(StudentID),
   foreign key (FacultyID) references teacher(FacultyID),
   foreign key (builtScheduleID) references schedule_builder(builtScheduleID),
   unique(builtScheduleID, studentID, facultyID));


-- -----------------------------------------------------
-- Table `soen341`.`optimizes`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`optimizes`(
  `builtScheduleID` int(15) DEFAULT NULL,
  `optimizedScheduleID` int(15) DEFAULT NULL,
   foreign key (builtScheduleID) references schedule_builder(builtScheduleID),
   foreign key (optimizedScheduleID) references optimized_sequence(optimizedScheduleID),
   unique(builtScheduleID, optimizedScheduleID));
*/

-- -----------------------------------------------------
-- Table `soen341`.`lecture`
-- -----------------------------------------------------
CREATE TABLE `soen341`.`lecture` (
  `lectureSectionNumber` varchar(7) PRIMARY KEY,
  `instructorName` varchar(50) DEFAULT NULL,
  `days` date NULL DEFAULT NULL,
  `times` time NULL DEFAULT NULL,
  `location` varchar(10) DEFAULT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`laboratory`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`laboratory` (
  `labSectionNumber` varchar(7) PRIMARY KEY,
  `instructorName` varchar(50) DEFAULT NULL,
  `days` date NULL DEFAULT NULL,
  `times` time NULL DEFAULT NULL,
  `location` varchar(10) DEFAULT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`tutorial`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`tutorial` (
  `tutorialSectionNumber` varchar(7) PRIMARY KEY,
  `instructorName` varchar(50) DEFAULT NULL,
  `days` date NULL DEFAULT NULL,
  `times` time NULL DEFAULT NULL,
  `location` varchar(10) DEFAULT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`course`
-- -----------------------------------------------------
CREATE TABLE `soen341`.`course` (
  `classNumber` varchar(100) PRIMARY KEY,
  `subject` varchar(100) DEFAULT NULL,
  `courseTitle` varchar(100) DEFAULT NULL,
  `description` varchar(100) NULL DEFAULT NULL,
  `waitlist` varchar(100) DEFAULT NULL,
  `capacity` varchar(100) DEFAULT NULL,
  `sessions` varchar(100) DEFAULT NULL,
  `term` varchar(100) DEFAULT NULL,
  `credits` varchar(100) DEFAULT NULL,
  `prerequisites` varchar(100) DEFAULT NULL,
  `corequisites` varchar(100) DEFAULT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`contains`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`contains`(
  `classNumber` int(11) NOT NULL,
  `lectureSectionNumber` varchar(7) NOT NULL,
  `labSectionNumber` varchar(7) NOT NULL,
  `tutorialSectionNumber` varchar(7) NOT NULL,
   foreign key (classNumber) references course(classNumber),
   foreign key (lectureSectionNumber) references lecture(lectureSectionNumber),
   foreign key (labSectionNumber) references laboratory(labSectionNumber),
   foreign key (tutorialSectionNumber) references tutorial(tutorialSectionNumber),
   unique(classNumber, lectureSectionNumber, labSectionNumber, tutorialSectionNumber));


-- -----------------------------------------------------
-- Table `soen341`.`memberOf`    (same same)
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`member of`(
  `classNumber` int(11) NOT NULL,
  `lectureSectionNumber` varchar(7) NOT NULL,
  `labSectionNumber` varchar(7) NOT NULL,
  `tutorialSectionNumber` varchar(7) NOT NULL,
   foreign key (classNumber) references course(classNumber),
   foreign key (lectureSectionNumber) references lecture(lectureSectionNumber),
   foreign key (labSectionNumber) references laboratory(labSectionNumber),
   foreign key (tutorialSectionNumber) references tutorial(tutorialSectionNumber),
   unique(classNumber, lectureSectionNumber, labSectionNumber, tutorialSectionNumber));


-- -----------------------------------------------------
-- Table `soen341`.`course selection`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`course selection`(
  `term` varchar(10) DEFAULT NULL,
  `courseList` varchar(200) DEFAULT NULL);



-- -----------------------------------------------------
-- Table `soen341`.`selected with`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`selected with`(
  `classNumber` int(11) NOT NULL,
  `term` varchar(10) DEFAULT NULL,
  `courseList` varchar(200)  DEFAULT NULL,
   foreign key (classNumber) references course(classNumber),
   unique(classNumber));


-- -----------------------------------------------------
-- Table `soen341`.`user preferences`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`user preferences` (
  `days` date NULL DEFAULT NULL,
  `times` time NULL DEFAULT NULL,
  `numberOfCourses` int(11) NOT NULL,
  `constraints` varchar(50) NOT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`student record`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`student record` (
  `completedCourses` varchar(200) DEFAULT NULL,
  `academicRequirements` varchar(200)DEFAULT NULL);

-- -----------------------------------------------------
-- Additional Table for an old format
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`users` (
`username` varchar(50) PRIMARY KEY,
`password` varchar(50) DEFAULT NULL);
INSERT INTO `soen341`.`users` (`username`, `password`) VALUES ('Avery', 'Singh');
DROP TABLE soen341.`teacher`

















-- ALTER TABLE `lecture`
-- add foreign key(`Name`) references `teacher`(`Name`);
--  ALTER TABLE `laboratory`
-- add foreign key(`Name`) references `student`(`Name`);
-- ALTER TABLE `tutorial`
-- add foreign key(`Name`) references `student`(`Name`);
-- ALTER TABLE `course`
-- add foreign key(`Term`) references `course selection`(`Term`);
--  ALTER TABLE `lecture`
-- add foreign key(`Class Number`) references `course`(`Class Number`);
--  ALTER TABLE `laboratory`
-- add foreign key(`Class Number`) references `course`(`Class Number`);
-- ALTER TABLE `tutorial`
-- add foreign key(`Class Number`) references `course`(`Class Number`);