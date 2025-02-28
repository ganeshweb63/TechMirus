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
      printLog(employee);
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
  const employeeId = "Emp00004";

  try {
    if (firstName && email && password) {
      await Employee.create({
        firstName,
        lastName,
        email,
        password,
        employeeId: employeeId,
      });
      res.send({ response: "Employee  created successfully" });
    } else {
      throw new Error("Required filed are not sent!");
    }
  } catch (error) {
    sendErrorResponse(res, error.message, {
      statusCode: StatusCode.badRequest,
    });
  }
};
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.send(employees);
  } catch (error) {
    sendErrorResponse(res, error.message, {
      statusCode: StatusCode.badRequest,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, skills, email } = req.body;
    const employee = await Employee.findOneAndUpdate(
      { email: email },
      { firstName, lastName, skills }
    );
    if (employee) {
      res
        .status(StatusCode.accepted)
        .send({ response: "Employee update successfully" });
    } else {
      sendErrorResponse(res, "Employee not found!", {
        statusCode: StatusCode.notFound,
      });
    }
  } catch (error) {
    sendErrorResponse(res, error.message, {
      statusCode: StatusCode.badRequest,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      const employee = await Employee.findOneAndDelete({ email: email });
      printLog(employee);
      if (employee) {
        res.status(204).send({ response: "Employee is Deleted" });
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

module.exports = {
  getEmployee,
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
