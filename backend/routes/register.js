const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const User = require('../models/User');
const Webinar = require('../models/Webinar');
const nodemailer = require('nodemailer');

// Define your Nodemailer transporter (you can use a service like Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any email service you use
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// POST: Register a user for a webinar
router.post('/register', async (req, res) => {
  const { webinarId, enrollmentNo, userName, email, phoneNumber } = req.body;

  try {
    const webinar = await Webinar.findById(webinarId);
    if (!webinar) {
      return res.status(404).json({ message: 'Webinar not found' });
    }

    if (webinar.registrationStatus === 'closed') {
      return res.status(400).json({ message: 'Registration is closed' });
    }

    const user = await User.findOne({ enrollmentNo });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already registered
    const existingRegistration = await Registration.findOne({ webinarId, userId: user.enrollmentNo });
    if (existingRegistration) {
      return res.status(400).json({ message: 'User already registered for this webinar' });
    }

    const newRegistration = new Registration({
      webinarId,
      userId: user.enrollmentNo,
      email,
      userName,
      hasReceivedMail: false,
      registrationDate: Date.now(),
      status: 'confirmed',
    });

    await newRegistration.save();

    await User.findByIdAndUpdate(user._id, {
      $push: {
        registeredWebinars: {
          webinarId,
          registrationDate: Date.now(),
        },
      },
      $set: { phoneNumber },
    });

    await Webinar.findByIdAndUpdate(webinarId, {
      $push: {
        registeredUsers: {
          userId: user.enrollmentNo,
          emailSent: false,
        },
      },
      $inc: { currentParticipants: 1 },
    });

    const updatedWebinar = await Webinar.findById(webinarId);
    if (updatedWebinar.currentParticipants >= updatedWebinar.maxParticipants) {
      await Webinar.findByIdAndUpdate(webinarId, {
        $set: { registrationStatus: 'closed' },
      });
    }

    // Send email
    /*
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Webinar Registration: ${webinar.webinarName}`,
      text: `Dear ${userName},\n\nThank you for registering for the webinar "${webinar.webinarName}".\n\nDate: ${new Date(
        webinar.date
      ).toLocaleDateString()}\n\nWe look forward to seeing you there!\n\nBest regards,\nWebinar Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    */

    res.status(201).json({ message: 'Registration successful', registration: newRegistration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
