const mongoose = require('mongoose');

const webinarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  conductor: { type: String, required: true }, // Admin who created the webinar
  date: { type: Date, required: true },
  description: { type: String, required: true },
  maxParticipants: { type: Number, required: true }, // Maximum allowed participants
  category: { type: String, required: true },
  image: { type: String }, // Optional image for the webinar

  // Registered users and email status
  registeredUsers: [
    {
      userId: { type: Number }, // Changed to String to hold enrollmentNo
      emailSent: { type: Boolean, default: false } // Whether email was sent
    }
  ],

  registrationStatus: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  }, // Closed when maxParticipants is reached

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Webinar', webinarSchema);
