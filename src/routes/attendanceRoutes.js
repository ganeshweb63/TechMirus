const express = require("express");
const { employeeAuth } = require("../middlewares/employee");
const Attendance = require("../models/attendance");
const StatusCode = require("../utils/statusCodes");
const {
  addAttendance,
  getAttendanceByDate,
  updateAttendance,
} = require("../controllers/attendance_controller");

const attendanceRoutes = express.Router();

attendanceRoutes.post("/attendance", employeeAuth, addAttendance);
attendanceRoutes.get("/attendance", employeeAuth, getAttendanceByDate);
attendanceRoutes.put("/attendance", employeeAuth, updateAttendance);

module.exports = attendanceRoutes;
