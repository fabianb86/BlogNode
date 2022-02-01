// We will create the following functions:
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

// Also, bring the require model
const Blog = require("../models/blog");

// For each function we bring all the requests from blogRoutes.js

// Controller for get all blogs
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Controller for get the details of an specific blog
const blog_details = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Blog not found" });
    });
};

// Controller for sending back the blog from the form
const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a New Blog" });
};

// Controller for create the new blog at database
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Controller for delete a blog
const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Exports the functions
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
