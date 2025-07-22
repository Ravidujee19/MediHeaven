const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  uploadImage, getImages, getImageById, downloadImage, deleteImage
} = require('../Controllers/imageController');

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: 'prescription/', // Save files in 'prescription' folder
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getImages);
router.get('/:id', getImageById); // View single image
router.get('/download/:id', downloadImage);
router.delete('/:id', deleteImage);

module.exports = router;
