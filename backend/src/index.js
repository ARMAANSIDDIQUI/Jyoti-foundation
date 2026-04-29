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
const newsCoverageRoutes = require('./routes/newsCoverage');
const videoRoutes = require('./routes/video');
const galleryImageRoutes = require('./routes/galleryImage');
const hospitalImageRoutes = require('./routes/hospitalImage');

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Vercel Prefix Stripping Middleware (for single deployment)
app.use((req, res, next) => {
  if (req.url.startsWith('/_/backend')) {
    req.url = req.url.replace('/_/backend', '');
  }
  next();
});


// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/news-coverage', newsCoverageRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/gallery-images', galleryImageRoutes);
app.use('/api/hospital-images', hospitalImageRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jyoti-foundation')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error', 
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
