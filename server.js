const inquirer = require("inquirer");
const db = require("./db/employee.js");
const mysql = require("mysql2");
const { Console } = require("console");
const { get } = require("express/lib/response");
const { connect } = require("http2");
const console = require("console");
//const Connection = require("mysql2/typings/mysql/lib/Connection");
require("dotenv").config();

//Connection Inf
const connection = mysql.createConnection({
  host: "localhost",
  //PORT
  //port: 3306,

  //User
  user: "root",

  //Password
  password: process.env.DB_PASS,
  database: "employees_db",
});

//COnnect to mysql server and database
connection.connect(function (err) {
  if (err) throw err;
  console.log("SQL connectd");

  //Start =>
  start();
});

function start() {
  
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message:
          "We have information on employees, departments, and employees roles. what would you like to do?",
        choices: [
          "view all department",
          "view all roles",
          "view all employees",
          "Add departmen",
          "Add employee",
          "Add role",
          "Update employee role",
          "Exit",
        ],
      },
    ])
    .then(function (res) {
      console.log(res);
      if (res.start === "view all department") {
        viewdepartment();
      } else if (res.start === "view all roles") {
        viewRole();
      } else if (res.start === "view all employees") {
        viewEmployee();
      } else if (res.start === "Add departmen") {
        addDepartment();
      } else if (res.start === "Add employee") {
        addEmployee();
      } else if (res.start === "Add role") {
        addRole();
      } else if (res.start === "Update employee role") {
        updateEmployee();
      } else {
        console.log("Good bye!!");
        connection.end();
      }
    });
}
function viewdepartment() {
  connection.query("SELECT * FROM department", (err, result) => {
    if (err) throw err;
    console.table(result);
    start();
  });
}

function viewRole() {
  connection.query("SELECT * FROM role", (err, result) => {
    if (err) throw err;
    console.log(result);
    console.table(result);
    start();
  });
}

function getRoles() {
  connection.query("SELECT * FROM role", (err, result) => {
    const titleArray = result.map((role) => ({
      name:role.title, value:role.id
    }))
    //return an array of titles ["Manager", "Something", ...]
    return titleArray
  })
}

function getEmployees() {
  connection.query("SELECT * FROM employee", (err, result) => {
    const employeeArray = result.map((employee) => ({
      name:`${employee.first_name} ${employee.last_name}`, value:employee.id
    }))
    //return an array of titles ["Manager", "Something", ...]
    return employeeArray
  })
}

//start() const roleChoices = getRoles(); roleChoices is an array of role strings

function viewEmployee() {
  connection.query("SELECT * FROM employee", (err, result) => {
    if (err) throw err;
    console.table(result);
    start();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "What dept would you like to add?",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO department(name) VALUES(?)",
        res.dept,
        (err, result) => {
          if (err) throw err;
          console.table(result);
          start();
        }
      );
    });
}

/*function addRole() {
  connection.query("SELECT * FROM role", (err, result) => {
    if (err) throw err;
    console.table(result);
    start();
  });
}*/

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What role would you like to add?",
      },
      {
        type: "roleSalary",
        name: "roleSalary",
        message: "Salary?",
      },
      {
        type: "input",
        name: "roleDept",
        message: "Dept?",
      },
    ])
    .then(function (res) {
      connection.query(
        " INSERT INTO role (title,salary,department_id) VALUE(?,?,?)",
        [res.roleName, res.roleSAlary, res.roleDept],
        (err, result) => {
          if (err) throw err;
          console.table(result);
          start();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter empolyee  first name you would like to add",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter employee last name you would like to add",
      },
      {
        type: "input",
        name: "role",
      }
    ])
    .then(function (res) {
      console.log(res);
      connection.query(
        "INSERT INTO employee(first_name, last_name, role_id) VALUES(?,?,?)",
        [res.firstName, res.lastName, res.role], 
        (err, result) => {
          if (err) throw err;
          console.table(result);
          start();
        }
      );
    });
}

function updateEmployee() {
  //var roleArr = getRoles();
  //var employeeArray = getEmployees();
  //console.log(roleArr, employeeArray);
  connection.query("SELECT * FROM role", (err, result) => {
    const titleArray = result.map((role) => ({
      name:role.title, value:role.id
    }))
    connection.query("SELECT * FROM employee", (err, result) => {
      const employeeArray = result.map((employee) => ({
        name:`${employee.first_name} ${employee.last_name}`, value:employee.id
      }))

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee would you like to update?",
            choices: employeeArray
          },
          {
            type: "list",
            name: "role",
            message: "Which of the role would you like to update with the employee?",
            choices: titleArray
          }
        ])
        .then(function (res) {
          connection.query(
            "UPDATE employee SET role_id =? WHERE id=? ",
            [res.role, res.employee],
            (err, result) => {
              if (err) throw err;
              console.table(result);
              start();
            }
          );
        });
    })

  })
}

function deleteEmployess() {
  
  
}
