const Employee = require("../models/employee");

function getEmployee(req, res) {
  res.send("Iam employee");
}

const createEmployee = (req, res) => {
  res.send("Employee created");
};
const getAllEmployees = (req, res) => {
  res.send("all Employees ");
};
const updateEmployee = (req, res) => {
  res.send("Employee updated");
};
const deleteEmployee = (req, res) => {
  res.send("Employee deleted");
};

module.exports = {
  getEmployee,
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
