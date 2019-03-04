CREATE DEFINER=`root`@`localhost` PROCEDURE `ValidateEngineer`()
if exists(SELECT* FROM `teacher` where `isEngineer` = 0) then
BEGIN
DELETE FROM `teacher` WHERE `isEngineer`= 0;
SELECT "All non-engineers removed!";
SELECT* FROM `teacher`;
END;
ELSE
BEGIN
SELECT "All engineers here!";
SELECT* FROM `teacher`;
END;
END IF

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTeachers`()
BEGIN
SELECT* FROM `teacher`;
END