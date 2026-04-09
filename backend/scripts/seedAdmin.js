const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'jyotifoundation44@gmail.com';
    const password = 'Admin@Jyoti2025'; // Default password

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists. Updating password...');
      existingAdmin.password = password;
      await existingAdmin.save();
    } else {
      const newAdmin = new Admin({ email, password });
      await newAdmin.save();
      console.log('New admin created successfully');
    }

    console.log('---------------------------');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('---------------------------');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
