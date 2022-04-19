DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(45) NULL,
    salary DECIMAL NULL,
    department_id INT NULL, 
    FOREIGN KEY (department_id) REFERENCES department(id) 
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45) NULL,
    last_name VARCHAR (45) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department(name)
VALUE("HR"), ("Tech"), ("Admin"), ("Management");

INSERT INTO role(title, salary, department_id)
VALUE("Director", 100000, 4), ("Office Manager", 85000, 2), ("Web Dev", 83000, 2), ("Sale Rep", 75000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Mike", "Gary", 1, NULL), ("Lee", "Scott",  2, 1), ("GIM", "Rob", 3, 2), ("Sam", "Pete", 4, 2);
