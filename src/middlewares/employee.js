const Employee = require("../models/employee");
const { printLog, LogColor } = require("../utils/logger");
const StatusCode = require("../utils/statusCodes");
const jwt = require("jsonwebtoken");

const printRequestRoute = (req, res, next) => {
  printLog(`[${new Date()}] New Request : ${req.originalUrl}`, {
    color: LogColor.cyan,
  });
  next();
};

const employeeAuth = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const { token } = req.cookies;
    if (!token) {
      throw new Error("User not logged In!");
    }
    const decodedToken = jwt.verify(token, "3G_Celllabs");
    if (decodedToken) {
      const employee = await Employee.findById(decodedToken._id);
      if (employee) {
        req.employee = employee;
        next();
      } else {
        throw new Error("User not found!");
      }
    } else {
      throw new Error("Token is invalid!");
    }
  } catch (error) {
    res.status(StatusCode.badRequest).send({ error: error.message });
  }
};

module.exports = { printRequestRoute, employeeAuth };
