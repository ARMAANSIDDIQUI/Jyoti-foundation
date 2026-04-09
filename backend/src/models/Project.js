const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameHindi: { type: String, required: true },
  location: { type: String, required: true },
  locationHindi: { type: String, required: true },
  description: { type: String, required: true },
  descriptionHindi: { type: String, required: true },
  details: { type: String, required: true },
  detailsHindi: { type: String, required: true },
  category: { type: String, required: true },
  categoryHindi: { type: String, required: true },
  images: [{ type: String }],
  videoUrl: { type: String }, // Cloudinary video URL
  youtubeUrl: { type: String } // YouTube embed link
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
