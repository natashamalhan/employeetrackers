const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    password: "",
    user: "root",
    database: "employee_db"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to the database.");
    start();
}
);

function start() {
    inquirer.prompt({
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Exit"]
    }).then(function (answer) {
        switch (answer.start) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Exit":
                db.end();
                break;
        }
    })
}

function viewAllEmployees() {
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewAllDepartments() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewAllRoles() {
    db.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the employee's role ID?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the employee's manager ID?"
        }
    ]).then(function (answer) {
        db.query("INSERT INTO employee SET ?", answer, function (err, res) {
            if (err) throw err;
            console.log("Employee added.");
            start();
        })
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the department's name?"
        }
    ]).then(function (answer) {
        db.query("INSERT INTO department SET ?", answer, function (err, res) {
            if (err) throw err;
            console.log("Department added.");
            start();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the role's title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the role's salary?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the role's department ID?"
        }
    ]).then(function (answer) {
        db.query("INSERT INTO role SET ?", answer, function (err, res) {
            if (err) throw err;
            console.log("Role added.");
            start();
        })
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "employee_id",
            message: "What is the employee's ID?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the employee's new role ID?"
        }
    ]).then(function (answer) {
        db.query("UPDATE employee SET role_id = ? WHERE id = ?", [answer.role_id, answer.employee_id], function (err, res) {
            if (err) throw err;
            console.log("Employee role updated.");
            start();
        })
    })
}

