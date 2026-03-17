const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getProjects);
router.post('/', projectController.addProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
