const Prescription = require("../Model/Prescription");
const fs = require("fs");

exports.uploadPrescription = async (req, res) => {
  try {
    const newPrescription = new Prescription({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      fileData: req.file.buffer, // Store binary data
    });

    await newPrescription.save();
    res.status(201).json({ message: "File uploaded successfully", file: newPrescription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({}, "filename uploadDate");
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: "File not found" });
    }

    res.set({
      "Content-Type": prescription.contentType,
    });

    res.send(prescription.fileData); // Send file data for preview
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePrescription = async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
