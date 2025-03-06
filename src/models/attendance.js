const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  attendanceRecords: [
    {
      date: { type: Date, required: true },
      checkInTime: { type: String },
      checkOutTime: { type: String },
      totalHoursWorked: { type: Number, default: 0 },
      status: {
        type: String,
        enum: {
          values: ["Present", "Absent", "Leave", "WFH"],
          message: "{VALUE} is not valid type",
        },
        required: true,
      },
      workMode: {
        type: String,
        enum: {
          values: ["Office", "Remote", "Hybrid"],
          message: "{VALUE} is not valid type",
        },
        default: "Office",
      },
      leaveDetails: {
        type: {
          type: String,
          enum: {
            values: ["Sick", "Casual", "Paid", "Unpaid"],
            message: "{VALUE} is not valid type",
          },
        },
        reason: String,
        approvedBy: String,
      },
    },
  ],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
