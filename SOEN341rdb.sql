
-- -----------------------------------------------------
-- Schema soen341
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `soen341`;
USE `soen341` ;

-- -----------------------------------------------------
-- Table `soen341`.`account user`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`account user` (
  `Netname` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL);

-- -----------------------------------------------------
-- Table `soen341`.`teacher`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`teacher` (
  `Name` varchar(50) NOT NULL PRIMARY KEY,
  `Faculty ID` int(8) NOT NULL,
  `Course List` varchar(200) NOT NULL,
  `Course History` varchar(200) NOT NULL);

-- -----------------------------------------------------
-- Table `soen341`.`student`
-- -----------------------------------------------------
CREATE TABLE `soen341`.`student` (
  `Name` varchar(50) NOT NULL PRIMARY KEY,
  `Student ID` int(8) NOT NULL,
  `Program of Study` text NOT NULL,
  `Academic Record` text NOT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`user preferences`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`user preferences` (
  `Days` date NOT NULL,
  `Times` time NOT NULL,
  `Number of Courses` int(11) NOT NULL,
  `Constraints` varchar(50) NOT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`student record`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`student record` (
  `Completed Courses` varchar(200) DEFAULT NULL,
  `Academic Requirements` varchar(200)DEFAULT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`course selection`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`course selection` (
  `Term` varchar(10) NOT NULL PRIMARY KEY,
  `Course List` varchar(200)  DEFAULT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`course`
-- -----------------------------------------------------
CREATE TABLE `soen341`.`course` (
  `Course Title` varchar(200) DEFAULT NULL,
  `Class Number` int(11) NOT NULL PRIMARY KEY,
  `Description` text NULL DEFAULT NULL,
  `Prerequisites` text NULL DEFAULT NULL,
  `Co-requisites` text NULL DEFAULT NULL,
  `Credits` int(11) DEFAULT NULL,
  `Term` varchar(10) DEFAULT NULL,
  `Sessions` int(11) DEFAULT NULL,
  `Capacity` int(11) DEFAULT NULL,
  `Waitlist` int(11) DEFAULT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`lecture`
-- -----------------------------------------------------
CREATE TABLE `soen341`.`lecture` (
  `Name` varchar(50) DEFAULT NULL,
  `Class Number` int(11) DEFAULT NULL,
  `Section Number` varchar(7)  DEFAULT NULL,
  `Days` date NULL DEFAULT NULL,
  `Times` time NULL DEFAULT NULL,
  `Location` varchar(10) DEFAULT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`studentlaboratory`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`laboratory` (
  `Name` varchar(50) DEFAULT NULL,
  `Class Number` int(11) DEFAULT NULL,
  `Section Number` varchar(7)  DEFAULT NULL,
  `Days` date NULL DEFAULT NULL,
  `Times` time NULL DEFAULT NULL,
  `Location` text NULL DEFAULT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`schedule builder`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`schedule builder` (
  `-uncertain` text NOT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`optimized sequence`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`optimized sequence` (
  `Uncertain` varchar(200) DEFAULT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`tutorial`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`tutorial` (
  `Name` varchar(50) DEFAULT NULL,
  `Class Number` int(11) DEFAULT NULL,
  `Section Number` int(11) NULL DEFAULT NULL,
  `Days` date NULL DEFAULT NULL,
  `Times` time NULL DEFAULT NULL,
  `Location` text NULL DEFAULT NULL);


-- -----------------------------------------------------
-- Table `soen341`.`user`
-- -----------------------------------------------------
CREATE TABLE  `soen341`.`user` (
  `Uncertain` text NULL DEFAULT NULL);

-- -----------------------------------------------------
-- Relationships
-- -----------------------------------------------------
 ALTER TABLE `lecture`
 add foreign key(`Name`) references `teacher`(`Name`);
  ALTER TABLE `laboratory`
 add foreign key(`Name`) references `student`(`Name`);
 ALTER TABLE `tutorial`
 add foreign key(`Name`) references `student`(`Name`);
 ALTER TABLE `course`
 add foreign key(`Term`) references `course selection`(`Term`);
  ALTER TABLE `lecture`
 add foreign key(`Class Number`) references `course`(`Class Number`);
  ALTER TABLE `laboratory`
 add foreign key(`Class Number`) references `course`(`Class Number`);
 ALTER TABLE `tutorial`
 add foreign key(`Class Number`) references `course`(`Class Number`);

INSERT INTO `account user` (Netname, Password) VALUES('user', 'pass');