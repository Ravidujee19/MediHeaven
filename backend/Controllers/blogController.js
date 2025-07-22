const Blog = require("../Model/Blog");

// Create blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const image = req.file ? req.file.filename : "";

    const blog = new Blog({ title, description, content, image });
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

// Get single blog
exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = { title, description, content };
    if (image) updateData.image = image;

    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
};
