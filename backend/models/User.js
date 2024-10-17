const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  institute: { type: String }, // Add institute field
  department: { type: String }, // Add department field
  role: { type: String, default: 'student' }, // New role field with default as 'student'
});

module.exports = mongoose.model('User', userSchema);
