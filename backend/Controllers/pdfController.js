const PDF = require('../Model/PDFModel');
const fs = require('fs').promises;
const path = require('path');

// Get all PDFs
const getPDFs = async (req, res) => {
  try {
    const pdfs = await PDF.find();
    res.status(200).json(pdfs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload a PDF
const uploadPDF = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const { title } = req.body;
  
      const newPDF = new PDF({
        title,
        name: req.file.originalname,
        filePath: req.file.filename, // Store only the filename, not the full path
      });
  
      await newPDF.save();
      res.status(201).json({ message: 'PDF uploaded successfully', pdf: newPDF });
    } catch (err) {
      console.error('Error uploading PDF:', err);
      res.status(500).json({ message: err.message });
    }
  };

// Delete a PDF
const deletePDF = async (req, res) => {
  try {
    console.log("🔹 Requested PDF ID:", req.params.id);

    // Find the PDF record in MongoDB
    const pdf = await PDF.findById(req.params.id);
    if (!pdf) {
      console.error("PDF not found in database");
      return res.status(404).json({ message: "PDF not found" });
    }

    console.log("Found PDF in DB:", pdf);

    // Construct the correct file path
    const filePath = path.join(__dirname, "../uploads", pdf.filePath);
    console.log(" File Path to Delete:", filePath);

    // Check if the file exists before attempting deletion
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      console.log("File deleted successfully");
    } catch (fileErr) {
      console.warn(" File not found or already deleted:", filePath);
    }

    // Delete the PDF record from the database
    await PDF.findByIdAndDelete(req.params.id);
    console.log(" PDF record deleted from DB");

    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (err) {
    console.error(" Error deleting PDF:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { getPDFs, uploadPDF, deletePDF };