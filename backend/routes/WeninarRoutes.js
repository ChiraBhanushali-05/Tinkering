const express = require('express');
const multer = require('multer');
const path = require('path');
const Webinar = require('../models/Webinar');
const fs = require('fs');
const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      // Create a new webinar document to get the MongoDB-generated _id
      const webinar = new Webinar(req.body);
      const savedWebinar = await webinar.save();

      // Use MongoDB _id as the folder name
      const dir = `uploads/webinar/${savedWebinar._id}`;

      // Create the directory if it does not exist
      fs.mkdirSync(dir, { recursive: true });
      req.webinarId = savedWebinar._id; // Store the _id for later use
      cb(null, dir);
    } catch (error) {
      cb(error, null); // Handle any errors that occur
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  }
});

// Multer file upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

// Create a new webinar with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      // Update the saved webinar document with the file path
      await Webinar.findByIdAndUpdate(req.webinarId, {
        image: `uploads/webinar/${req.webinarId}/${req.file.filename}`
      });
    }

    res.status(201).json({ message: 'Webinar created successfully!', webinarId: req.webinarId });
  } catch (error) {
    res.status(400).json({ error: 'Error creating webinar', details: error.message });
  }
});

// Get all webinars
router.get('/', async (req, res) => {
  try {
    const webinars = await Webinar.find();
    res.status(200).json(webinars);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching webinars', details: error.message });
  }
});

// Update a webinar
router.put('/:id', async (req, res) => {
  try {
    const updatedWebinar = await Webinar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWebinar) {
      return res.status(404).json({ error: 'Webinar not found' });
    }
    res.status(200).json(updatedWebinar);
  } catch (error) {
    res.status(400).json({ error: 'Error updating webinar', details: error.message });
  }
});

// Delete a webinar
router.delete('/:id', async (req, res) => {
  try {
    const deletedWebinar = await Webinar.findByIdAndDelete(req.params.id);
    if (!deletedWebinar) {
      return res.status(404).json({ error: 'Webinar not found' });
    }
    res.status(200).json({ message: 'Webinar deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting webinar', details: error.message });
  }
});

module.exports = router;
