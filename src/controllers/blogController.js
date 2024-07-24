const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name');
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createBlog = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newBlog = new Blog({ title, content, author });
    const blog = await newBlog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    await blog.remove();
    res.json({ msg: 'Blog removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.filterBlogs = async (req, res) => {
  const { title, author } = req.query;
  const query = {};
  if (title) query.title = new RegExp(title, 'i');
  if (author) query.author = author;

  try {
    const blogs = await Blog.find(query).populate('author', 'name');
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
