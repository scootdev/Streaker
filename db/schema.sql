CREATE DATABASE planner_app;

USE planner_app;

SELECT * FROM goals;
SELECT * FROM users;

INSERT INTO goals (goalDes, startDate, endDate, color, UserId)
VALUES ("Certain event", "20/01/01", "20/03/01", "red", 1);