const mongoose = require('mongoose');

const HospitalImageSchema = new mongoose.Schema({
  hospitalId: { type: Number, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('HospitalImage', HospitalImageSchema, 'hospital_images_gallery');
