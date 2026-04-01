const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', categoryController.getCategories);
router.post('/', auth, upload.none(), categoryController.addCategory);
router.put('/:id', auth, upload.none(), categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory);

module.exports = router;

