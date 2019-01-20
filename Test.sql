/*CREATE SCHEMA `animals` ;
CREATE TABLE pet (name VARCHAR(20), owner VARCHAR(20), species VARCHAR(20), sex CHAR(1), birth DATE, death DATE);
*/
INSERT INTO `pet`(name, owner, species, sex, birth, death) VALUES ("muffin", "avery", "Feline", "M", '2017-04-14', '2030-04-14');
SELECT * FROM animals.pet;