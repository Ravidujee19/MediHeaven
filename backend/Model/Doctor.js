const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    Speciality: {
        type: String,
        required: true,
    },

    Description: {
        type: String,
        required: true,
    },

    Amount: {
        type: String,
        required: true,
    },

    Phone: {
        type: Number,
        required: true,
    },

    role: {
        type: String,
        default: "health_provider",
    }
});

module.exports = mongoose.model("Doctor", doctorSchema);