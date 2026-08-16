const Resume = require('../models/Resume');

const getResume = async (req, res, next) => {
  try {
    const resume = await Resume.getResume();
    if (!resume.isPublic && !req.admin) {
      return res.status(404).json({ success: false, message: 'Resume not available' });
    }
    res.json({ success: true, data: resume });
  } catch (error) {
    next(error);
  }
};

const updateResume = async (req, res, next) => {
  try {
    let resume = await Resume.getResume();

    const allowedFields = ['fileUrl', 'publicId', 'fileName', 'fileSize', 'mimeType', 'summary', 'highlights', 'isPublic'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        resume[field] = req.body[field];
      }
    });

    await resume.save();
    res.json({ success: true, data: resume });
  } catch (error) {
    next(error);
  }
};

module.exports = { getResume, updateResume };
