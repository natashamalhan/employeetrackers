USE employee_db;

INSERT INTO departments (name)
VALUES 
("Engineering"), 
("Finance"), 
("HR");

INSERT INTO roles (title, salary, department_id)
VALUES ("HR Person",250000,3), 
("SR Engineer",250000,1),
("Engineer",90000,1);

INSERT INTO employees (first_name,last_name,role_id,manager_id) 
VALUES 
("Jane", "Doe", 2, NULL), 
("John", "Though", 3, 1);