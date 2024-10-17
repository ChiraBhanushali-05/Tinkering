// backend/models/webinarModel.js
const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema({
  webinarName: { type: String, required: true },
  presenter: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

const Webinar = mongoose.model("Webinar", webinarSchema);

module.exports = Webinar;
