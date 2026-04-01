const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', statsController.getStats);
router.post('/', auth, upload.none(), statsController.addStat);
router.put('/:id', auth, upload.none(), statsController.updateStat);
router.delete('/:id', auth, statsController.deleteStat);


module.exports = router;
