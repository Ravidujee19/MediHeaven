const express = require("express");
const router = express.Router();

//insert model
const doctor = require("../Model/Doctor");

//insert user controller
const DoctorController = require("../Controllers/DoctorControllers");

router.get("/",DoctorController.getAllUsers);
router.post("/",DoctorController.addDoctors);
router.get("/:id",DoctorController.DoctorGetById);
router.put("/:id",DoctorController.updateDoctorDetails);
router.delete("/:id",DoctorController.deleteDoctor);




//export
module.exports=router;