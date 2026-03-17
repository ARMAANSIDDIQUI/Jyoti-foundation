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
    const slide = new HeroSlide(req.body);
    const newSlide = await slide.save();
    res.status(201).json(newSlide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSlide = async (req, res) => {
  try {
    const updatedSlide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
