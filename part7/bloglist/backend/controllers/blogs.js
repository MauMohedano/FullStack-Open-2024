const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware")
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs", error);
    response
      .status(500)
      .json({ error: "An error occurred while fetching blogs" });
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blogs = await Blog.findById(request.params.id);
    response.json(blogs);
  } catch (error) {
    console.error("Error fetching blog:", error);
    response.status(404).end();
  }
});

blogsRouter.post(  "/",  middleware.tokenExtractor,  async (request, response, next) => {
    const body = request.body;

    const { userId } = request
    const user = await User.findById(userId);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });

    try {
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  const comment = req.body.comment;

  // si comments es un array en tu modelo:
  blog.comments = blog.comments.concat(comment);
  const updatedBlog = await blog.save();

  res.status(201).json(updatedBlog);
});

blogsRouter.delete("/:id",middleware.tokenExtractor, async (request, response, next) => {
  const { userId } = request
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
