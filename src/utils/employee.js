const Employee = require('../models/employee')

async function createEmployeeId(){
const employees = await Employee.find({});
}