const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { upload } = require('../config/cloudinary');

router.get('/', memberController.getMembers);
router.post('/', upload.single('image'), memberController.addMember);
router.put('/:id', upload.single('image'), memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

module.exports = router;

