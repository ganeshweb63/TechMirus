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
        let filteredEmployee = {};
        const allowedKeys = [
          "firstName",
          "LastName",
          "email",
          "employeeId",
          "skills",
        ];
        allowedKeys.forEach((key) => {
          if (employee[key] !== undefined && employee[key] !== null) {
            filteredEmployee[key] = employee[key];
          }
        });
        await res.send(filteredEmployee);
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

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    let filteredEmployees = [];
    const allowedKeys = [
      "firstName",
      "LastName",
      "email",
      "employeeId",
      "skills",
    ];
    for (const employee of employees) {
      let currentEmployee = {};
      allowedKeys.forEach((key) => {
        if (employee[key] !== undefined && employee[key] !== null) {
          currentEmployee[key] = employee[key];
        }
      });
      filteredEmployees.push(currentEmployee);
    }
    res.send(filteredEmployees);
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
      { firstName, lastName, skills },
      { new: true }
    );
    if (employee) {
      let filteredEmployee = {};
      const allowedKeys = [
        "firstName",
        "LastName",
        "email",
        "employeeId",
        "skills",
      ];
      allowedKeys.forEach((key) => {
        if (employee[key] !== undefined && employee[key] !== null) {
          filteredEmployee[key] = employee[key];
        }
      });
      res
        .status(StatusCode.accepted)
        .send({
          message: "Employee update successfully",
          data: filteredEmployee,
        });
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
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
