const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const User = require('../models/User');
const Webinar = require('../models/Webinar');

// POST: Register a user for a webinar
router.post('/register', async (req, res) => {
  const { webinarId, enrollmentNo, userName, email, phoneNumber } = req.body; // Update to include enrollmentNo

  try {
    // Find the webinar
    const webinar = await Webinar.findById(webinarId);
    if (!webinar) {
      return res.status(404).json({ message: 'Webinar not found' });
    }

    // Check if registration is still open
    if (webinar.registrationStatus === 'closed') {
      return res.status(400).json({ message: 'Registration is closed' });
    }

    // Find the user by enrollment number to get the user ID
    const user = await User.findOne({ enrollmentNo });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new registration document
    const newRegistration = new Registration({
      webinarId,
      userId: user.enrollmentNo, // Store the enrollment number
      email,
      userName,
      hasReceivedMail: false, // Initially set to false
      registrationDate: Date.now(),
      status: 'confirmed' // Default status
    });

    // Save the registration
    await newRegistration.save();

    // Update the User collection (push registered webinar and add phoneNumber)
    await User.findByIdAndUpdate(user._id, { // Use MongoDB ID to update
      $push: {
        registeredWebinars: {
          webinarId,
          registrationDate: Date.now()
        }
      },
      $set: { phoneNumber } // Add or update the phoneNumber in the User document
    });

    // Update the Webinar collection
    await Webinar.findByIdAndUpdate(webinarId, {
      $push: {
        registeredUsers: {
         
          userId: user.enrollmentNo, // Store the enrollment number
          emailSent: false // Initially set to false
        }
      },
      $inc: { currentParticipants: 1 } // Increment participants count
    });

    // Check if the max participants have been reached
    const updatedWebinar = await Webinar.findById(webinarId);
    if (updatedWebinar.currentParticipants >= updatedWebinar.maxParticipants) {
      // Update webinar status to closed
      await Webinar.findByIdAndUpdate(webinarId, {
        $set: { registrationStatus: 'closed' }
      });
    }

    // Return success response
    res.status(201).json({ message: 'Registration successful', registration: newRegistration });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
