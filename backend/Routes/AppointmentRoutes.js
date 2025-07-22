const express = require("express");
const router = express.Router();

// Insert Appointment controller
const AppointmentController = require("../Controllers/AppointmentController");

// Define routes
router.get("/", AppointmentController.getAllAppointments); // Get all appointments
router.post("/", AppointmentController.addAppointment); // Add a new appointment
router.get("/:id", AppointmentController.getAppointmentById); // Get appointment by ID
router.put("/:id", AppointmentController.updateAppointment); // Update appointment
router.delete("/:id", AppointmentController.deleteAppointment); // Delete appointment

// New Routes for Accepting and Rejecting Appointments
router.patch("/:id/accept", AppointmentController.acceptAppointment); // Accept appointment
router.patch("/:id/reject", AppointmentController.rejectAppointment); // Reject appointment

// Export the router
module.exports = router;


