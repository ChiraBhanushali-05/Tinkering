const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },                     // Workshop name
  conductor: { type: String, required: true },                 // Conductor name
  date: { type: Date, required: true },                        // Workshop date
  registrationDeadline: { type: Date, required: true },        // Registration deadline
  capacity: { type: Number, required: true },                  // Maximum capacity
  description: { type: String, required: true },               // Description
  registeredUsers: [
    {
      enrollmentNo: { type:Number },  // User ID (MongoDB ObjectId)
      registrationDateTime: { type: Date, default: Date.now }, // Registration date and time
    },
  ],
});

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
