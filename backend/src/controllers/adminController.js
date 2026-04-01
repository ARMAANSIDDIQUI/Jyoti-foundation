const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (admin && await admin.comparePassword(password)) {
      const token = jwt.sign(
        { adminId: admin._id, email: admin.email },
        process.env.JWT_SECRET || 'jyoti-secret-2025',
        { expiresIn: '7d' }
      );

      res.status(200).json({ 
        message: 'Login successful', 
        token,
        admin: { email: admin.email }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

