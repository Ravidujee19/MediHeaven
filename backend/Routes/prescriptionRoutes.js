const express = require("express");
const router = express.Router();
const multer = require("multer");
const prescriptionController = require("../Controllers/prescriptionController");

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

router.post("/upload", upload.single("file"), prescriptionController.uploadPrescription);
router.get("/", prescriptionController.getPrescriptions);
router.get("/download/:id", prescriptionController.downloadPrescription);
router.delete("/delete/:id", prescriptionController.deletePrescription);

module.exports = router;
