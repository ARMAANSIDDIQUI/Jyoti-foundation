const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', heroController.getSlides);
router.post('/', auth, upload.single('image'), heroController.addSlide);
router.put('/:id', auth, upload.single('image'), heroController.updateSlide);
router.delete('/:id', auth, heroController.deleteSlide);

module.exports = router;

