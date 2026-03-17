const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
