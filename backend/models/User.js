const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true }, // Unique identifier from Google
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  enrollmentNo: { type: Number }, // Enrollment number from email
  role: { type: String, default: 'student' }, // Default role is 'student', admin for admin users

  // Fields that are completed after login
  institution: { type: String }, 
  department: { type: String },
  phone: { type:Number },

  // Registered webinars (array of references to Webinar)
  registeredWebinars: [
    {
      webinarId: { type: mongoose.Schema.Types.ObjectId, ref: 'Webinar' },
      registrationDate: { type: Date, default: Date.now },
    }
  ],

  // Additional metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
