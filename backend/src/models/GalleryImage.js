const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleHindi: { type: String },
  description: { type: String },
  descriptionHindi: { type: String },
  imageUrl: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
