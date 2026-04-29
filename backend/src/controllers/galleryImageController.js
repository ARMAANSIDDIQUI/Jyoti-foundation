const GalleryImage = require('../models/GalleryImage');
const { cloudinary } = require('../config/cloudinary');

exports.getAllImages = async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ date: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addImage = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.imageUrl = req.file.path;
    }
    const image = new GalleryImage(data);
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.imageUrl = req.file.path;
    }
    const updatedImage = await GalleryImage.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updatedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });
    
    if (image.imageUrl) {
      const parts = image.imageUrl.split('/');
      if (parts.length > 2) {
          const filename = parts.pop().split('.')[0];
          const folder = parts.pop();
          if (folder !== 'upload' && folder !== 'image') {
             try {
                await cloudinary.uploader.destroy(`${folder}/${filename}`);
             } catch (e) {
                 console.error('Cloudinary deletion failed:', e);
             }
          }
      }
    }
    
    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
