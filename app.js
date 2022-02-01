// Dependencies required
const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// Set express app
const app = express();

// Connect to MongoDB
const dbURI = "mongodb+srv://<username>:<password>@ClustersName.2zud3.mongodb.net/DatabaseName?retryWrites=true&w=majority"

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static('public'))
// To get the information of the blog created (form) and convert into an object to the post request
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get('/about', (req, res) =>{
  res.render('about', {title: 'About'});
});

// Blog routes
app.get("/blogs", (req, res) => {
  // the sort function will automatically updated (thanks to the timestamps) the newest to the oldest
  Blog.find()
    .sort({ createdAt: -1 })
    // Render the blogs in the homepage view
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Post request
app.post("/blogs", (req, res) => {
  // Create a new instance to the new blog
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create a New Blog'});
});

// Obtain the route parameter of each blog with :id
app.get("/blogs/:id", (req, res) => {
  // Extract the id with params
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete request. The response is a json object sended to the details script
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: "/blogs" });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 Page. Always at the bottom
app.use((req, res) => {
  res.status(404).render('404', {title: '404'});
});