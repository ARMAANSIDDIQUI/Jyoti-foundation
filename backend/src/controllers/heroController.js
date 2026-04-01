const HeroSlide = require('../models/HeroSlide');

exports.getSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addSlide = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.path;
    }
    const slide = new HeroSlide(data);
    const newSlide = await slide.save();
    res.status(201).json(newSlide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSlide = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.path;
    }
    const updatedSlide = await HeroSlide.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updatedSlide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteSlide = async (req, res) => {
  try {
    await HeroSlide.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
