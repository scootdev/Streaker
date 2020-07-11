-- CREATE DATABASE planner_app;

USE planner_app;

CREATE TABLE main_goal
(
id INT AUTO_INCREMENT NOT NULL,
eventName VARCHAR(150),
start_Date INT NULL,
end_Date INT NULL,
PRIMARY KEY (id)
);

SELECT * FROM main_goal;