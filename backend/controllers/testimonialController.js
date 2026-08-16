const Testimonial = require('../models/Testimonial');
const { validateTestimonial } = require('../validators/contentValidator');
const { parsePaginationParams, buildPagination } = require('../utils/helpers');

const getAllTestimonials = async (req, res, next) => {
  try {
    const query = { };
    const { featured } = req.query;
    if (featured === 'true') query.featured = true;

    const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

const getTestimonialsPaginated = async (req, res, next) => {
  try {
    const { page, limit, sort, skip } = parsePaginationParams(req.query);
    const query = {};

    const [testimonials, total] = await Promise.all([
      Testimonial.find(query).sort(sort).skip(skip).limit(limit),
      Testimonial.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: testimonials,
      pagination: buildPagination(page, limit, total),
    });
  } catch (error) {
    next(error);
  }
};

const getTestimonialById = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const { valid, errors } = validateTestimonial(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    if (req.body.rating !== undefined) {
      req.body.rating = Math.max(1, Math.min(5, Number(req.body.rating)));
    }

    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted', data: testimonial });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTestimonials,
  getTestimonialsPaginated,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
