const BlogPost = require('../models/BlogPost');
const { validateBlogPost } = require('../validators/contentValidator');
const { parsePaginationParams, buildPagination, escapeRegex, slugify, calcReadTime } = require('../utils/helpers');

// Public: get published posts with pagination, filtering
const getPublishedPosts = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const { search, category, tag, featured } = req.query;
    const query = { status: 'published' };

    if (search) {
      query.$or = [
        { title: { $regex: escapeRegex(search), $options: 'i' } },
        { excerpt: { $regex: escapeRegex(search), $options: 'i' } },
        { content: { $regex: escapeRegex(search), $options: 'i' } },
      ];
    }
    if (category) query.category = category;
    if (tag) query.tags = tag.toLowerCase();
    if (featured === 'true') query.isFeatured = true;

    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .sort({ publishedAt: -1 })
        .select('-content')
        .skip(skip)
        .limit(limit),
      BlogPost.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: buildPagination(page, limit, total),
    });
  } catch (error) {
    next(error);
  }
};

// Public: get single post by slug
const getPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug,
      status: 'published',
    });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    // Increment views
    post.views = (post.views || 0) + 1;
    await post.save({ validateBeforeSave: false });
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// Admin: get all posts (any status)
const getAllPosts = async (req, res, next) => {
  try {
    const { page, limit, sort, skip } = parsePaginationParams(req.query);
    const { search, status, category, tag } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: escapeRegex(search), $options: 'i' } },
        { slug: { $regex: escapeRegex(search), $options: 'i' } },
      ];
    }
    if (status) query.status = status;
    if (category) query.category = category;
    if (tag) query.tags = tag.toLowerCase();

    const [posts, total] = await Promise.all([
      BlogPost.find(query).sort(sort).skip(skip).limit(limit),
      BlogPost.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: buildPagination(page, limit, total),
    });
  } catch (error) {
    next(error);
  }
};

// Admin: get single post by id
const getPostById = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// Admin: create post
const createPost = async (req, res, next) => {
  try {
    const { valid, errors } = validateBlogPost(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    let { slug, status, publishedAt, scheduledFor, content } = req.body;

    // Auto-generate slug
    if (!slug) {
      slug = slugify(req.body.title);
    }
    if (!slug) {
      slug = `post-${Date.now()}`;
    }

    // Ensure unique slug
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // Calculate read time
    const readTime = calcReadTime(content);

    // Handle publish/schedule
    if (status === 'published' && !publishedAt) {
      publishedAt = new Date();
    }
    if (status === 'scheduled' && scheduledFor) {
      publishedAt = scheduledFor;
    }

    const postData = {
      ...req.body,
      slug,
      readTime,
      status: status || 'draft',
      publishedAt,
      author: req.admin?._id || null,
    };

    const post = await BlogPost.create(postData);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// Admin: update post
const updatePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const updateData = { ...req.body };

    // Re-generate slug if title changed
    if (req.body.title && req.body.title !== post.title) {
      updateData.slug = slugify(req.body.title) || `post-${Date.now()}`;
    }

    // Recalculate read time if content changed
    if (req.body.content) {
      updateData.readTime = calcReadTime(req.body.content);
    }

    // Handle status transitions
    if (req.body.status === 'published' && !req.body.publishedAt && !post.publishedAt) {
      updateData.publishedAt = new Date();
    }
    if (req.body.status === 'scheduled' && req.body.scheduledFor) {
      updateData.publishedAt = req.body.scheduledFor;
    }

    const updated = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// Admin: delete post
const deletePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json({ success: true, message: 'Post deleted', data: post });
  } catch (error) {
    next(error);
  }
};

// Admin: bulk status update
const bulkUpdateStatus = async (req, res, next) => {
  try {
    const { ids, status } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'ids array is required' });
    }
    if (!['draft', 'published', 'scheduled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const updateData = { status };
    if (status === 'published') updateData.publishedAt = new Date();

    const result = await BlogPost.updateMany(
      { _id: { $in: ids } },
      { $set: updateData }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} posts updated to ${status}`,
      data: { modifiedCount: result.modifiedCount },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: delete multiple posts
const bulkDelete = async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'ids array is required' });
    }

    const result = await BlogPost.deleteMany({ _id: { $in: ids } });

    res.json({
      success: true,
      message: `${result.deletedCount} posts deleted`,
      data: { deletedCount: result.deletedCount },
    });
  } catch (error) {
    next(error);
  }
};

// Public: get categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await BlogPost.distinct('category', { status: 'published' });
    res.json({ success: true, data: categories.sort() });
  } catch (error) {
    next(error);
  }
};

// Public: get tags
const getTags = async (req, res, next) => {
  try {
    const tags = await BlogPost.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ]);
    res.json({ success: true, data: tags });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublishedPosts,
  getPostBySlug,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  bulkUpdateStatus,
  bulkDelete,
  getCategories,
  getTags,
};
