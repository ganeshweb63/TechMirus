const express = require("express");
const { employeeAuth } = require("../middlewares/employee");
const Attendance = require("../models/attendance");
const StatusCode = require("../utils/statusCodes");
const {
  addAttendance,
  getAttendanceByDate,
} = require("../controllers/attendance_controller");

const attendanceRoutes = express.Router();

attendanceRoutes.post("/attendance", employeeAuth, addAttendance);
attendanceRoutes.get("/attendance", employeeAuth, getAttendanceByDate);

module.exports = attendanceRoutes;
