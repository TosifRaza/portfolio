// const express = require('express');
// const router = express.Router();
// const {
//   getPublishedPosts,
//   getPostBySlug,
//   getAllPosts,
//   getPostById,
//   createPost,
//   updatePost,
//   deletePost,
//   bulkUpdateStatus,
//   bulkDelete,
//   getCategories,
//   getTags,
// } = require('../controllers/blogController');
// const auth = require('../middleware/auth');

// // Public routes
// router.get('/', getPublishedPosts);
// router.get('/categories', getCategories);
// router.get('/tags', getTags);
// router.get('/:slug', getPostBySlug);

// // Admin routes
// router.get('/admin/all', auth, getAllPosts);
// router.get('/admin/:id', auth, getPostById);
// router.post('/', auth, createPost);
// router.put('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.put('/admin/bulk/status', auth, bulkUpdateStatus);
// router.post('/admin/bulk/delete', auth, bulkDelete);

// module.exports = router;
const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const {
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
} = require('../controllers/blogController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', getPublishedPosts);
router.get('/categories', getCategories);
router.get('/tags', getTags);
router.get('/:slug', getPostBySlug);

// Admin routes
router.get('/admin/all', auth, getAllPosts);
router.get('/admin/:id', auth, getPostById);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.patch('/:id/publish', auth, async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    post.status = post.status === 'published' ? 'draft' : 'published';
    await post.save();
    res.json({ success: true, data: post, message: `Post ${post.status}` });
  } catch (error) { next(error); }
});
router.delete('/:id', auth, deletePost);
router.put('/admin/bulk/status', auth, bulkUpdateStatus);
router.post('/admin/bulk/delete', auth, bulkDelete);

module.exports = router;
