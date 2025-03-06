const Attendance = require("../models/attendance");
const StatusCode = require("../utils/statusCodes");

const addAttendance = async (req, res) => {
  try {
    const employee = req.employee;
    const { logInTime, status, workMode, leaveDetails } = req.body;
    const allowedStatus = ["Present", "Absent", "Leave", "WFH"];
    const allowedWorkMode = ["Office", "Remote", "Hybrid"];
    if (!status) {
      throw new Error("Required status property not sent!");
    }
    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid Status!");
    }
    if (!allowedWorkMode.includes(workMode)) {
      throw new Error("Invalid work mode!");
    }
    try {
      isValidTime(logInTime);
    } catch (error) {
      console.log("ERROR :: ", error);
      throw new Error("Invalid time format!");
    }
    if (leaveDetails) {
      const { leaveType, reason, approvedBy } = leaveDetails;
      if (!leaveType || !reason || !approvedBy) {
        throw new Error("Leave details are not sent!");
      }
    }

    const attendance = new Attendance({
      employee: employee._id,
      date: Date.now(),
      logInTime: logInTime,
      status: status,
      workMode: workMode,
      leaveDetails: leaveDetails,
    });

    await attendance.save();

    res.status(StatusCode.created).json({
      message: `${employee.firstName} is present.`,
    });
  } catch (error) {
    res.status(StatusCode.badRequest).send({ error: error.message });
  }
};

const getAttendanceByDate = async (req, res) => {
  const employee = req.employee;
  try {
    const { date } = req.query;
    if (!date) {
      throw new Error("Date is required!");
    }
    let correctDate = isValidDate(date);
    console.log("DATE ::", correctDate);
    const startOfDay = new Date(correctDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(correctDate.setHours(23, 59, 59, 999));
    const records = await Attendance.find({
      employee: employee._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate("employee", ["firstName", "lastName"]);
    //   .select(["employee", "date", "leaveDetails"]);

    res.json({
      data: records,
    });
  } catch (error) {
    console.log("ERROR :: ", error);
    res.status(StatusCode.badRequest).send({ error: error.message });
  }
};

function isValidTime(logInTime) {
  const times = logInTime.split(":");
  if (times.length !== 2) {
    throw new Error("Invalid time format!");
  }
  const hours = Number(times[0]);
  const minutes = Number(times[1]);
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error("Invalid time format!");
  }

  console.log("Hours:", hours, "Minutes:", minutes);
  return { hours, minutes };
}

const isValidDate = (date) => {
  // attendance?date=06-03-2025
  const splitDate = date.split("-");
  if (splitDate.length !== 3) {
    throw new Error("Incorrect date format!");
  }
  const day = parseInt(splitDate[0]);
  const month = parseInt(splitDate[1]);
  const year = parseInt(splitDate[2]);
  const isNotValidDate = isNaN(day) || isNaN(month) || isNaN(year);
  console.log("DATE: ", day, month, year);
  if (isNotValidDate) {
    throw new Error("Incorrect date format!");
  }
  const isValidDay = day > 0 && day <= 31;
  const isValidMonth = month > 0 && month <= 12;
  const isValidYear = year < new Date().getFullYear() + 1;
  if (!isValidDay || !isValidMonth || !isValidYear) {
    throw new Error("Incorrect date!");
  }
  return new Date(year, month - 1, day);
};

// function createDate(day, month, year) {
//   // Month is zero-based, so subtract 1 from the month
//   return new Date(year, month - 1, day);
// }

module.exports = { addAttendance, getAttendanceByDate };
