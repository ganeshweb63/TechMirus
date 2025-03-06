const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  date: { type: Date, required: true, default: Date.now() },
  logInTime: { type: String }, //HH:MM
  logOutTime: { type: String },
  status: {
    type: String,
    enum: {
      values: ["Present", "Absent", "Leave", "WFH"],
      message: "{VALUE} is not valid type",
    },
  },
  workMode: {
    type: String,
    enum: {
      values: ["Office", "Remote", "Hybrid"],
      message: "{VALUE} is not valid type",
    },
  },
  leaveDetails: {
    leaveType: {
      type: String,
      enum: {
        values: ["Sick", "Casual", "Paid", "Unpaid"],
        message: "{VALUE} is not valid type",
      },
    },
    reason: String,
    approvedBy: String,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
