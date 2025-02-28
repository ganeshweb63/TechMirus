const e = require("express");
const Employee = require("../models/employee");
const { printLog, LogType, LogColor } = require("../utils/logger");
const StatusCode = require("../utils/statusCodes");
const { sendErrorResponse } = require("../utils/utilities");

const getEmployee = async (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      const employee = await Employee.findOne({ email: email });
      console.log(employee);

      if (employee) {
        await res.send(employee);
      } else {
        sendErrorResponse(res, "Employee not found!", {
          statusCode: StatusCode.notFound,
        });
      }
    } else {
      throw new Error("Required email parameter not sent!");
    }
  } catch (error) {
    sendErrorResponse(res, error.message, {
      statusCode: StatusCode.badRequest,
    });
  }
};
/**
 *
 * SignUp user handler
 */
const createEmployee = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const employeeId = "Emp00001";

  try {
    await Employee.create({
      firstName,
      lastName,
      email,
      password,
      employeeId: employeeId,
    });
    res.send("Employee created");
  } catch (error) {
    printLog(`ERROR : employee not created - ${error}`);
    res
      .status(StatusCode.badRequest)
      .send(`ERROR : employee not created - ${error}`);
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
