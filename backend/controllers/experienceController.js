const Experience = require('../models/Experience');
const { validateExperience } = require('../validators/contentValidator');
const { parsePaginationParams, buildPagination } = require('../utils/helpers');

const getAllExperience = async (req, res, next) => {
  try {
    // const query = { isVisible: true };
    const query = {};
    const experiences = await Experience.find(query).sort({ current: -1, order: 1, startDate: -1 })
    res.json({ success: true, data: experiences });
  } catch (error) {
    next(error);
  }
};

const getExperiencePaginated = async (req, res, next) => {
  try {
    const { page, limit, sort, skip } = parsePaginationParams(req.query);
    const query = {};

    const [experiences, total] = await Promise.all([
      Experience.find(query).sort(sort).skip(skip).limit(limit),
      Experience.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: experiences,
      pagination: buildPagination(page, limit, total),
    });
  } catch (error) {
    next(error);
  }
};

const getExperienceById = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

const createExperience = async (req, res, next) => {
  try {
    const { valid, errors } = validateExperience(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, message: 'Experience deleted', data: experience });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllExperience,
  getExperiencePaginated,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
