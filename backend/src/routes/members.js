const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { upload } = require('../config/cloudinary');
const auth = require('../middleware/auth');

router.get('/', memberController.getMembers);
router.post('/', auth, upload.single('image'), memberController.addMember);
router.put('/:id', auth, upload.single('image'), memberController.updateMember);
router.delete('/:id', auth, memberController.deleteMember);

module.exports = router;
