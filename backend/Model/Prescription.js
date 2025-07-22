const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  fileData: Buffer,
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
