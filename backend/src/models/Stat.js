const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  suffix: { type: String, default: '' },
  index: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Stat', statSchema);
