const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', videoController.getAllVideos);
router.post('/', auth, upload.single('video'), videoController.addVideo);
router.put('/:id', auth, upload.single('video'), videoController.updateVideo);
router.delete('/:id', auth, videoController.deleteVideo);

module.exports = router;
