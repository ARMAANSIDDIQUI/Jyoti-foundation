const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  post: { type: String, required: true },
  index: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);
