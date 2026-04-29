const express = require('express');
const router = express.Router();
const galleryImageController = require('../controllers/galleryImageController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', galleryImageController.getAllImages);
router.post('/', auth, upload.single('image'), galleryImageController.addImage);
router.put('/:id', auth, upload.single('image'), galleryImageController.updateImage);
router.delete('/:id', auth, galleryImageController.deleteImage);

module.exports = router;
