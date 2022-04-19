const inquirer = require("inquirer");
const db = require("./db/employee");
const mysql = require("mysql2");
const { Console } = require("console");
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
    console.table(result);
    start();
  });
}

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

function addRole() {
  connection.query("SELECT * FROM role", (err, result) => {
    if (err) throw err;
    console.table(result);
    start();
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What role would you like to add?",
      },
    ])
    .then(function (re) {
      connection.query(
        "INSERT INTO role VALUE(name) VALUE(?)",
        res.role,
        (err, result) => {
          if (err) throw err;
          console.table(result);
          start();
        }
      );
    });
}
