const express = require('express');
const { getPDFs, uploadPDF, deletePDF } = require('../Controllers/pdfController');
const upload = require('../Utils/upload');

const router = express.Router();

// GET all PDFs
router.get('/', getPDFs);

// UPLOAD a PDF
router.post('/upload', upload.single('pdf'), uploadPDF);

// DELETE a PDF
router.delete('/:id', deletePDF);

module.exports = router;