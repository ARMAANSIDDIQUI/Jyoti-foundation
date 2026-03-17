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
    const { name, post, index } = req.body;
    const newMember = new Member({ name, post, index });
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
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating member' });
  }
};
