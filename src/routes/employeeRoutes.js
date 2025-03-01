const express = require("express");
const {
  getEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.get("/employee", getEmployee);
router.get("/employees", getAllEmployees);
router.put("/employee", updateEmployee);
router.delete("/employee", deleteEmployee);

module.exports = router;
