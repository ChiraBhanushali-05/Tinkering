// backend/routes/webinarRoutes.js
const express = require("express");
const Webinar = require("../models/Webinar");
const router = express.Router();

// POST route to create a new webinar
router.post("/", async (req, res) => {
  try {
    const { webinarName, presenter, date, description, link } = req.body;

    // Create a new webinar instance
    const newWebinar = new Webinar({
      webinarName,
      presenter,
      date,
      description,
      link,
    });

    // Save the webinar to the database
    await newWebinar.save();
    res.status(201).json({ message: "Webinar uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading webinar:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// GET all webinars
router.get("/", async (req, res) => {
    try {
      const webinars = await Webinar.find();
      res.status(200).json(webinars);
    } catch (error) {
      res.status(500).json({ message: "Error fetching webinars" });
    }
  });
  

module.exports = router;
