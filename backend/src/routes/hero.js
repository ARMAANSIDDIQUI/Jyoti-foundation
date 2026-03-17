const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');

router.get('/', heroController.getSlides);
router.post('/', heroController.addSlide);
router.put('/:id', heroController.updateSlide);
router.delete('/:id', heroController.deleteSlide);

module.exports = router;
