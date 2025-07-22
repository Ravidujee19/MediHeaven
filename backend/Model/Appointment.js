const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patientName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    weight: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    reason: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"], // Allow only these values
        default: "Pending", // Default status is Pending
    },

    rejectionReason: {
        type: String, // Store reason if the appointment is rejected
        default: "", // Default empty string
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);

