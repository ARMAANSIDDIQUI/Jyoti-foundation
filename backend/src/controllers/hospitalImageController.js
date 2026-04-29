const HospitalImage = require('../models/HospitalImage');
const { cloudinary } = require('../config/cloudinary');

exports.getAllHospitalImages = async (req, res) => {
  try {
    const images = await HospitalImage.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addHospitalImage = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

    const hospitalImage = new HospitalImage({ hospitalId, imageUrl: req.file.path });
    await hospitalImage.save();

    res.status(201).json(hospitalImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteHospitalImage = async (req, res) => {
  try {
    const image = await HospitalImage.findById(req.params.id);
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
    
    await HospitalImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
