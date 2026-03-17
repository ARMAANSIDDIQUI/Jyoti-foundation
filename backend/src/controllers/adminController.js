const Admin = require('../models/Admin');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    if (admin) {
      res.status(200).json({ message: 'Login successful', adminId: admin._id });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
};
