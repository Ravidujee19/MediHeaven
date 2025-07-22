const Payroll = require('../Model/Payroll');


const addPayroll = async (req, res) => {
  try {
    const { doctorID, doctorName, basicSalary, otHours, otRate, month, year } = req.body;

    const newPayroll = new Payroll({
      doctorID,
      doctorName,
      basicSalary,
      otHours,
      otRate,
      month,
      year
    });

    await newPayroll.save();
    res.json("Doctor payroll added successfully");
  } 
  catch (error) {
    console.error("Error adding payroll:", error);
    res.status(500).json({ message: "Error adding payroll record" });
  }
};



// Get payroll by doctor name, month, and year 

const getPayrollByDoctorMonthYear = async (req, res) => {
  try {
    const { doctorName, month, year } = req.query;

    const payroll = await Payroll.findOne({ doctorName, month, year });

    if (!payroll) {
      return res.status(404).json({ message: "Payroll not found" });
    }

    const totalOT = payroll.otHours * payroll.otRate;
    const totalSalary = payroll.basicSalary + totalOT;

    // Calculate EPF (Employee 8%)
    const epfEmployee = 0.08 * payroll.basicSalary;

    // Calculate Net Salary after EPF deduction
    const netSalary = totalSalary - epfEmployee;

    res.json({
      ...payroll._doc,
      totalOT,
      totalSalary,
      epfEmployee,
      netSalary
    });
  } catch (error) {
    console.error("Error fetching payroll:", error);
    res.status(500).json({ message: "Error fetching payroll" });
  }
};


// Get all payroll records 

const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find();
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payrolls" });
  }
};


// Get all distinct doctor names (for the drop down)

const getDoctorNames = async (req, res) => {
  try {
    const doctors = await Payroll.distinct('doctorName');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor names" });
  }
};

module.exports = { addPayroll,getPayrollByDoctorMonthYear,getAllPayrolls,getDoctorNames};
