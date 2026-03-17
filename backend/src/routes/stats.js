const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');

router.get('/', statController.getStats);
router.post('/', statController.addStat);
router.put('/:id', statController.updateStat);
router.delete('/:id', statController.deleteStat);

module.exports = router;
