const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleHindi: { type: String },
  description: { type: String },
  descriptionHindi: { type: String },
  videoUrl: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
