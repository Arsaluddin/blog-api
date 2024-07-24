const express = require('express');
const router = express.Router();
const { getAllBlogs, getBlogById, createBlog, deleteBlog, updateBlog, filterBlogs } = require('../controllers/blogController');
const auth = require('../middlewares/auth');

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', auth, createBlog);
router.delete('/:id', auth, deleteBlog);
router.put('/:id', auth, updateBlog);
router.get('/filter', filterBlogs);

module.exports = router;
