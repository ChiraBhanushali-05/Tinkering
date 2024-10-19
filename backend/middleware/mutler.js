const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const webinarId = req.params.id; // Get webinar ID from route parameters
    const uploadDir = `uploads/webinar/${webinarId}`;

    // Check if directory exists, create if not
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir); // Save the file in this directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});

// File upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB size limit
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
});

module.exports = upload;
