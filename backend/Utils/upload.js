const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads', // Save files in the 'uploads' folder
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: PDFs only!');
  }
}

module.exports = upload;