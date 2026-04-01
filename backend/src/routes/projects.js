const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { upload } = require('../config/cloudinary');

// Allowed fields for upload
const uploadFields = upload.fields([
  { name: 'images', maxCount: 3 },
  { name: 'video', maxCount: 1 }
]);

const auth = require('../middleware/auth');

router.get('/', projectController.getProjects);
router.post('/', auth, uploadFields, projectController.addProject);
router.put('/:id', auth, uploadFields, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);


module.exports = router;

