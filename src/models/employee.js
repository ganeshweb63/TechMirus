const mongoose = require("mongoose");
const {
  EmployeeRoleTypes,
  getAllEmployeeRoleValues,
} = require("../utils/employeeRoleType");

const employeeSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    lastName: {
      type: String,
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      maxLength: 30,
      unique: true,
    },
    aadharNumber: {
      type: String,
      maxLength: 12,
    },
    mobile: String,
    password: {
      required: true,
      type: String,
      minLength: 8,
    },
    gender: String,
    dateOfBirth: Date,
    dateOfJoin: Date,
    dateOfLeave: Date,
    employeeId: {
      type: String,
      // unique: true,
      // required: true,
    },
    skills: {
      type: [String],
    },
    role: {
      type: Number,
      enum: {
        values: getAllEmployeeRoleValues(EmployeeRoleTypes),
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
