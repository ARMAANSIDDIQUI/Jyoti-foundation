const mongoose = require('mongoose');

const NewsCoverageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleHindi: { type: String, required: true },
  description: { type: String },
  descriptionHindi: { type: String },
  imageUrl: { type: String, required: true },
  date: { type: Date },
  source: { type: String }, // e.g., 'Dainik Jagran', 'Amar Ujala'
}, { timestamps: true });

module.exports = mongoose.model('NewsCoverage', NewsCoverageSchema);
