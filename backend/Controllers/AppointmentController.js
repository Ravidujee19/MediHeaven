const Appointment = require("../Model/Appointment");
const Joi = require("joi");
const nodemailer = require("nodemailer");

// Validation schema using Joi
const appointmentSchema = Joi.object({
  patientName: Joi.string().min(3).required().messages({
    "string.base": `"Patient Name" should be a type of 'text'`,
    "string.empty": `"Patient Name" cannot be empty`,
    "string.min": `"Patient Name" should have a minimum length of 3 characters`,
    "any.required": `"Patient Name" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    "string.base": `"Email" should be a type of 'text'`,
    "string.empty": `"Email" cannot be empty`,
    "string.email": `"Email" must be a valid email address`,
    "any.required": `"Email" is a required field`,
  }),
  age: Joi.number().integer().min(0).required().messages({
    "number.base": `"Age" should be a type of 'number'`,
    "number.integer": `"Age" should be an integer`,
    "number.min": `"Age" should be greater than or equal to 0`,
    "any.required": `"Age" is a required field`,
  }),
  weight: Joi.number().positive().required().messages({
    "number.base": `"Weight" should be a type of 'number'`,
    "number.positive": `"Weight" should be a positive number`,
    "any.required": `"Weight" is a required field`,
  }),
  date: Joi.date().required().messages({
    "date.base": `"Date" should be a valid date`,
    "any.required": `"Date" is a required field`,
  }),
  time: Joi.string().required().messages({
    "string.base": `"Time" should be a type of 'text'`,
    "string.empty": `"Time" cannot be empty`,
    "any.required": `"Time" is a required field`,
  }),
  reason: Joi.string().required().messages({
    "string.base": `"Reason" should be a type of 'text'`,
    "string.empty": `"Reason" cannot be empty`,
    "any.required": `"Reason" is a required field`,
  }),
});

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }
    return res.status(200).json({ appointments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching appointments" });
  }
};

// Add a new appointment
const addAppointment = async (req, res) => {
  try {
    const { patientName, email, age, weight, date, time, reason } = req.body;

    // ✅ Debug log
    console.log("📌 Incoming Data:", req.body);

    // ✅ Validate input
    const { error } = appointmentSchema.validate({
      patientName,
      email,
      age,
      weight,
      date,
      time,
      reason,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // ✅ Save to DB
    const appointment = new Appointment({
      patientName,
      email,
      age,
      weight,
      date,
      time,
      reason,
      status: "Pending",
    });

    await appointment.save();

    // Record a transaction for the appointment
    // const transaction = new Transaction({
    //   type: "DoctorAppointment",
    //   amount: 4000, // 💰 Fixed amount for appointment
    //   date,
    // });

    // await transaction.save();


    // ✅ Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "mediheaven25@gmail.com", // 🔁 Use your Gmail add my mail
        pass: process.env.EMAIL_PASS || "yoia migf xffm dxck", // 🔁 Use App Password
      },
    });

    // ✅ Define email content
    const mailOptions = {
      from: process.env.EMAIL_USER || "mediheaven25@gmail.com",
      to: "savindatennakoon@gmail.com", // 🔁 Change to the actual receiver
      subject: "New Appointment Booked",
      html: `
          <h2>📅 New Appointment Details</h2>
          <p><strong>Name:</strong> ${patientName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Weight:</strong> ${weight}</p>
          <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p><em>Status: Pending</em></p>
        `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    return res
      .status(201)
      .json({ message: "Appointment created and email sent", appointment });
  } catch (err) {
    console.error("❌ Error adding appointment:", err);
    return res
      .status(500)
      .json({ message: "Unable to add appointment or send email" });
  }
};

// Get an appointment by ID
const getAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    return res.status(200).json({ appointment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching appointment" });
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { patientName, email, age, weight, date, time, reason } = req.body;

  // Validate input data
  const { error } = appointmentSchema.validate({
    patientName,
    email,
    age,
    weight,
    date,
    time,
    reason,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { patientName, email, age, weight, date, time, reason },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Unable to update appointment" });
    }
    return res.status(200).json({ appointment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating appointment" });
  }
};

// Accept an appointment
const acceptAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "Accepted", rejectionReason: "" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({ status: appointment.status });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error accepting appointment" });
  }
};

// Reject an appointment
const rejectAppointment = async (req, res) => {
  const { id } = req.params;
  const { rejectionReason } = req.body;

  if (!rejectionReason) {
    return res.status(400).json({ message: "Rejection reason is required" });
  }

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "Rejected", rejectionReason },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({ status: appointment.status });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error rejecting appointment" });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: "Unable to delete appointment" });
    }
    return res
      .status(200)
      .json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting appointment" });
  }
};

exports.getAllAppointments = getAllAppointments;
exports.addAppointment = addAppointment;
exports.getAppointmentById = getAppointmentById;
exports.updateAppointment = updateAppointment;
exports.acceptAppointment = acceptAppointment;
exports.rejectAppointment = rejectAppointment;
exports.deleteAppointment = deleteAppointment;
