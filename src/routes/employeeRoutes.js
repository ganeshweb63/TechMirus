const express = require("express");
const {
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployeeById,
  getEmployeeByEmail,
  changePassword,
} = require("../controllers/employeeController");
const { employeeAuth } = require("../middlewares/employee");

const router = express.Router();

router.get("/employee", getEmployeeByEmail);
router.get("/employee/profile", employeeAuth, getEmployeeById);
router.get("/employees", getAllEmployees);
router.put("/employee", updateEmployee);
router.delete("/employee", deleteEmployee);
router.put("/changePassword", employeeAuth, changePassword);

module.exports = router;
