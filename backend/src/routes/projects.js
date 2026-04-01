const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { upload } = require('../config/cloudinary');

// Allowed fields for upload
const uploadFields = upload.fields([
  { name: 'images', maxCount: 3 },
  { name: 'video', maxCount: 1 }
]);

router.get('/', projectController.getProjects);
router.post('/', uploadFields, projectController.addProject);
router.put('/:id', uploadFields, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;

