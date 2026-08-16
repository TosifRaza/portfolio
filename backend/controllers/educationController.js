const Education = require('../models/Education');
const { validateEducation } = require('../validators/contentValidator');
const { parsePaginationParams, buildPagination } = require('../utils/helpers');

const getAllEducation = async (req, res, next) => {
  try {
    
    // const query = { isVisible: true };
    const query = {};
    const education = await Education.find(query).sort({ order: 1, startDate: -1 });
    res.json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
};

const getEducationPaginated = async (req, res, next) => {
  try {
    const { page, limit, sort, skip } = parsePaginationParams(req.query);
    const query = {};

    const [education, total] = await Promise.all([
      Education.find(query).sort(sort).skip(skip).limit(limit),
      Education.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: education,
      pagination: buildPagination(page, limit, total),
    });
  } catch (error) {
    next(error);
  }
};

const getEducationById = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
};

const createEducation = async (req, res, next) => {
  try {
    const { valid, errors } = validateEducation(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const education = await Education.create(req.body);
    res.status(201).json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
};

const updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }

    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.json({ success: true, message: 'Education deleted', data: education });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEducation,
  getEducationPaginated,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
