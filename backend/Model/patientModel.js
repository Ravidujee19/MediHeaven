const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    sleepHours: { type: Number, required: true },
    exerciseHours: { type: Number, required: true },
    bmi: { type: Number },
    target: { type: String },
    suggestions: { type: String },
});

// ✅ Prevent model overwrite errors during hot reload
module.exports = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
