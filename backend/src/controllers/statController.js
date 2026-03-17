const Stat = require('../models/Stat');

exports.getStats = async (req, res) => {
  try {
    const stats = await Stat.find().sort({ index: 1 });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addStat = async (req, res) => {
  const stat = new Stat(req.body);
  try {
    const newStat = await stat.save();
    res.status(201).json(newStat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateStat = async (req, res) => {
  try {
    const updatedStat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteStat = async (req, res) => {
  try {
    await Stat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stat deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
