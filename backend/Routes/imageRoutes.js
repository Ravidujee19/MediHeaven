const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadImage, getAllImages } = require("../Controllers/imageController");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/upload", upload.single("image"), uploadImage);
router.get("/images", getAllImages);

module.exports = router;
