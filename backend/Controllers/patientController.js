const Patient = require('../Model/patientModel');
const mongoose = require('mongoose');



// Function to calculate BMI
const calculateBMI = (weight, height) => {
    return (weight / ((height / 100) ** 2)).toFixed(2);
};

// Function to generate health suggestions
const generateSuggestions = (bmi, sleepHours, exerciseHours, target) => {
    let suggestion = "";

    // BMI-based suggestions
    if (bmi < 18.5) {
        suggestion += "Your BMI is low. Consider increasing calorie intake with nutritious food. ";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        suggestion += "Your BMI is normal. Maintain a balanced diet and regular exercise. ";
    } else {
        suggestion += "Your BMI is high. Focus on a healthy diet and increased physical activity. ";
    }

    // Sleep-based suggestions
    if (sleepHours < 6) {
        suggestion += "You're not getting enough sleep. Aim for at least 7-9 hours of rest. ";
    } else {
        suggestion += "Your sleep schedule looks good. Keep maintaining a consistent sleep pattern. ";
    }

    // Exercise-based suggestions
    if (exerciseHours < 3) {
        suggestion += "Increase your exercise routine to at least 3-5 hours per week for better health. ";
    } else {
        suggestion += "Great job on your exercise routine! Keep up the good work. ";
    }

    // Target-based suggestions
    if (target.toLowerCase() === "weight loss") {
        suggestion += "Focus on a calorie deficit, high-protein diet, and regular cardio. ";
    } else if (target.toLowerCase() === "muscle gain") {
        suggestion += "Increase protein intake and incorporate strength training. ";
    } else {
        suggestion += "Maintain a balanced lifestyle with a proper mix of diet and exercise. ";
    }

    return suggestion;
};

// Create a new patient record
const createPatient = async (req, res) => {
    try {
        const { name, age, gender, height, weight, sleepHours, exerciseHours, target } = req.body;

        const bmi = calculateBMI(weight, height);
        const suggestions = generateSuggestions(bmi, sleepHours, exerciseHours, target);

        const newPatient = new Patient({
            name, age, gender, height, weight, sleepHours, exerciseHours, target, bmi, suggestions
        });

        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ message: "Error creating patient record", error });
    }
};

// Get all patients
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving patients", error });
    }
};

// Get a single patient by ID
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving patient", error });
    }
};

// Update patient details
const updatePatient = async (req, res) => {
    try {
        const { height, weight, sleepHours, exerciseHours, target } = req.body;
        let patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const updatedBMI = calculateBMI(weight, height);
        const updatedSuggestions = generateSuggestions(updatedBMI, sleepHours, exerciseHours, target);

        patient = await Patient.findByIdAndUpdate(
            req.params.id,
            { height, weight, sleepHours, exerciseHours, target, bmi: updatedBMI, suggestions: updatedSuggestions },
            { new: true }
        );

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Error updating patient", error });
    }
};

// Delete patient record
const deletePatient = async (req, res) => {
    const id = req.params.id;
    console.log("Deleting patient ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid patient ID format" });
    }

    try {
        const deleted = await Patient.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


module.exports = { createPatient, getPatients, getPatientById, updatePatient, deletePatient };
