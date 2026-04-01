const Member = require('../models/Member');

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ index: 1 });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members' });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { name, nameHindi, post, postHindi, occupation, occupationHindi, index } = req.body;
    const image = req.file ? req.file.path : undefined;

    const newMember = new Member({
      name, nameHindi, post, postHindi, occupation, occupationHindi, index, image
    });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: 'Error adding member' });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member' });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.path;
    }
    const updated = await Member.findByIdAndUpdate(req.params.id, data, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating member' });
  }
};
