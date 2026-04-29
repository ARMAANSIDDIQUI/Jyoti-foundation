const Video = require('../models/Video');
const { cloudinary } = require('../config/cloudinary');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ date: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addVideo = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.videoUrl = req.file.path;
    }
    const video = new Video(data);
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.videoUrl = req.file.path;
    }
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updatedVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    
    // Attempt to delete from cloudinary if needed
    if (video.videoUrl) {
      // url example: https://res.cloudinary.com/demo/video/upload/v1312461204/sample.mp4
      // the public_id is usually the folder/filename.
      // But it's okay if we just leave it or do a simple split. 
      // Cloudinary needs the exact publicId, we will extract it if it's the default format
      const parts = video.videoUrl.split('/');
      if (parts.length > 2) {
          const filename = parts.pop().split('.')[0];
          const folder = parts.pop();
          if (folder !== 'upload' && folder !== 'video') {
             try {
                await cloudinary.uploader.destroy(`${folder}/${filename}`, { resource_type: 'video' });
             } catch (e) {
                 console.error('Cloudinary deletion failed:', e);
             }
          }
      }
    }
    
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
