const Employee = require("../models/employee");
const jwt = require("jsonwebtoken");
const bcript = require("bcrypt");
const StatusCode = require("../utils/statusCodes");

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const employeeId = "Emp00000";
    if (firstName && email && password) {
      const salt = await bcript.genSalt(10);
      const hash = await bcript.hash(password, salt);
      const employee = new Employee({
        firstName,
        lastName,
        email,
        password: hash,
        employeeId: employeeId,
      });
      const createdUser = await employee.save();
      const token = jwt.sign({ _id: createdUser._id }, "3G_Celllabs", {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      });
      res.send({ message: "Employee  created successfully", data: employee });
    } else {
      throw new Error("Required filed are not sent!");
    }
  } catch (error) {
    res.status(StatusCode.badRequest).send({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find the user
    if (email && password) {
      const employee = await Employee.findOne({ email: email });
      if (employee) {
        const isCorrectPassword = await bcript.compare(
          password,
          employee.password
        );
        if (isCorrectPassword) {
          const token = jwt.sign({ _id: employee._id }, "3G_Celllabs", {
            expiresIn: "1d",
          });
          res.cookie("token", token, {
            expires: new Date(Date.now() + 1 * 3600000),
          });
          res.send("Login successfully");
        } else {
          throw new Error("Invalid Credentials!");
        }
      } else {
        throw new Error("Invalid Credentials!");
      }
    } else {
      throw new Error("Required filed are not sent!");
    }

    // compate password
  } catch (error) {
    res.status(StatusCode.badRequest).send({ error: error.message });
  }
};
const logout = async (req, res) => {};

module.exports = { signUp, login, logout };
