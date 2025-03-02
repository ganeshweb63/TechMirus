const Employee = require("../models/employee");
const {
  employeeRoleExists,
  EmployeeRoleTypes,
} = require("../utils/employeeRoleType");
const { printLog, LogType, LogColor } = require("../utils/logger");
const StatusCode = require("../utils/statusCodes");
const { sendErrorResponse } = require("../utils/utilities");
const bcript = require("bcrypt");

const getEmployeeByEmail = async (req, res) => {
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
          "role",
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

const getEmployeeById = async (req, res) => {
  try {
    const employee = req.employee;
    if (employee) {
      let filteredEmployee = {};
      const allowedKeys = [
        "firstName",
        "LastName",
        "email",
        "employeeId",
        "skills",
        "role",
      ];
      allowedKeys.forEach((key) => {
        if (employee[key] !== undefined && employee[key] !== null) {
          filteredEmployee[key] = employee[key];
        }
      });
      await res.send(filteredEmployee);
    } else {
      res.status(StatusCode.notFound).send("Employee not found!");
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
      "role",
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
    const { firstName, lastName, skills, role } = req.body;
    if (firstName && lastName && skills && role) {
      const isCorrectEmployeeRole = employeeRoleExists(role, EmployeeRoleTypes);
    
      if (isCorrectEmployeeRole) {
        const employee = await Employee.findOneAndUpdate(
          { _id: req.employee._id },
          { firstName, lastName, skills, role },
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
            "role",
          ];
          allowedKeys.forEach((key) => {
            if (employee[key] !== undefined && employee[key] !== null) {
              filteredEmployee[key] = employee[key];
            }
          });
          res.status(StatusCode.accepted).send({
            message: "Employee update successfully",
            data: filteredEmployee,
          });
        } else {
          sendErrorResponse(res, "Employee not found!", {
            statusCode: StatusCode.notFound,
          });
        }
      } else {
        throw new Error("Incorrect employee Role!");
      }
    } else {
      throw new Error("Required parameters not sent!");
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

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (oldPassword && newPassword) {
      if (oldPassword !== newPassword) {
        const isCorrectPassword = await bcript.compare(
          oldPassword,
          req.employee.password
        );
        if (isCorrectPassword) {
          const salt = await bcript.genSalt(10);
          const hashPassword = await bcript.hash(newPassword, salt);

          const employee = await Employee.findOneAndUpdate(
            { _id: req.employee._id },
            { password: hashPassword },
            { returnDocument: "after" }
          );

          res.status(StatusCode.accepted).send({
            message: "Password updated successfully",
            data: employee,
          });
        } else {
          throw new Error("Incorrect password!");
        }
      } else {
        throw new Error("New password looks like a old password!");
      }
    } else {
      throw new Error("Required parameters not sent!");
    }
  } catch (error) {
    sendErrorResponse(res, error.message, {
      statusCode: StatusCode.badRequest,
    });
  }
};

module.exports = {
  getEmployeeById,
  getEmployeeByEmail,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  changePassword,
};
