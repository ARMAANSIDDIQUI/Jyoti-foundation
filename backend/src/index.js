const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const memberRoutes = require('./routes/members');
const projectRoutes = require('./routes/projects');
const adminRoutes = require('./routes/admin');
const statRoutes = require('./routes/stats');
const categoryRoutes = require('./routes/categories');
const heroRoutes = require('./routes/hero');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/hero', heroRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jyoti-foundation')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
