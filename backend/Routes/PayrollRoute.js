const router=require("express").Router();

const {addPayroll,getPayrollByDoctorMonthYear,getAllPayrolls,getDoctorNames} = require('../Controllers/PayrollController');

//route to create payroll

router.route("/addPayroll").post(addPayroll);

//route to get all payroll records

router.route("/").get(getAllPayrolls);

//route to get payroll by doctor name, month, and year

router.get('/getPayrollByMonthAndYear', getPayrollByDoctorMonthYear);

//route to get doctor names


router.get("/doctorNames", getDoctorNames);
 

module.exports= router;