const express = require('express');
const router = express.Router();
const hospitalImageController = require('../controllers/hospitalImageController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', hospitalImageController.getAllHospitalImages);
router.post('/:hospitalId', auth, upload.single('image'), hospitalImageController.addHospitalImage);
router.delete('/:id', auth, hospitalImageController.deleteHospitalImage);

module.exports = router;
