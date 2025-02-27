const Employee = require("../models/employee");
const { printLog } = require("../utils/logger");
const StatusCode = require('../utils/statusCodes')

function getEmployee(req, res) {
  res.send("Iam employee");
}
/**
 * 
 * SignUp user handler
 */
const createEmployee = async (req, res) => {
  
  const {firstName,lastName ,email,password,} = req.body;
  const employeeId = "Emp00001";


  try {
    await Employee.create({
      firstName,
      lastName,
      email,
      password,
      employeeId:employeeId
      })
    res.send("Employee created");
  } catch (error) {
    printLog(`ERROR : employee not created - ${error}`)
    res.status(StatusCode.badRequest).send(`ERROR : employee not created - ${error}`)
  }
};
const getAllEmployees = async (req, res) => {
  const employees = await Employee.find({});
  res.send(employees);
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
