const mongoose = require('mongoose');
const registrationSchema = new mongoose.Schema({
  webinarId: { type: mongoose.Schema.Types.ObjectId, ref: 'Webinar', required: true },
  userId:{type:Number},
  email: { type: String, required: true }, // Email for sending confirmation
  hasReceivedMail: { type: Boolean, default: false }, // Whether the user received a mail
  registrationDate: { type: Date, default: Date.now }, // Time of registration
  status: { 
    type: String, 
    enum: ['confirmed', 'pending', 'cancelled'], 
    default: 'pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
