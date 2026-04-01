const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameHindi: { type: String, required: true },
  post: { type: String, required: true },
  postHindi: { type: String, required: true },
  occupation: { type: String },
  occupationHindi: { type: String },
  image: { type: String }, // Cloudinary image URL
  index: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);
