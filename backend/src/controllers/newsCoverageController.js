const NewsCoverage = require('../models/NewsCoverage');

exports.getAllNews = async (req, res) => {
  try {
    const news = await NewsCoverage.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addNews = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.imageUrl = req.file.path;
    }
    const news = new NewsCoverage(data);
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.imageUrl = req.file.path;
    }
    const updatedNews = await NewsCoverage.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updatedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await NewsCoverage.findByIdAndDelete(req.params.id);
    res.json({ message: 'News coverage deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
