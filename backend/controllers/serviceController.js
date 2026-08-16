const Service = require('../models/Service');
const { validateService } = require('../validators/contentValidator');
const { parsePaginationParams, buildPagination } = require('../utils/helpers');

const getAllServices = async (req, res, next) => {
  try {
    // const query = { isVisible: true };
    const query = { };
    const services = await Service.find(query).sort({ order: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

const getServicesPaginated = async (req, res, next) => {
  try {
    const { page, limit, sort, skip } = parsePaginationParams(req.query);
    const query = {};

    const [services, total] = await Promise.all([
      Service.find(query).sort(sort).skip(skip).limit(limit),
      Service.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: services,
      pagination: buildPagination(page, limit, total),
    });
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

const createService = async (req, res, next) => {
  try {
    const { valid, errors } = validateService(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted', data: service });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllServices,
  getServicesPaginated,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
