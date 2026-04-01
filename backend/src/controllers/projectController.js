const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

exports.addProject = async (req, res) => {
  try {
    const { name, nameHindi, location, locationHindi, description, descriptionHindi, details, detailsHindi, category, youtubeUrl } = req.body;
    
    // Extract uploaded files
    const images = req.files['images'] ? req.files['images'].map(f => f.path) : [];
    const videoUrl = req.files['video'] ? req.files['video'][0].path : undefined;

    const newProject = new Project({
      name, nameHindi, location, locationHindi, description, descriptionHindi, details, detailsHindi, category,
      images, videoUrl, youtubeUrl
    });
    
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error adding project' });
  }
};



exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
};
