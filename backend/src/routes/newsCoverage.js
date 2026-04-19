const express = require('express');
const router = express.Router();
const newsCoverageController = require('../controllers/newsCoverageController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', newsCoverageController.getAllNews);
router.post('/', auth, upload.single('image'), newsCoverageController.addNews);
router.put('/:id', auth, upload.single('image'), newsCoverageController.updateNews);
router.delete('/:id', auth, newsCoverageController.deleteNews);

module.exports = router;
