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
app.use(morgan('dev'));

// // Testing the schema and model with sandbox routes

// // CREATE a new blog
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "New Blog 2",
//     snippet: "About my new blog",
//     body: "More about my new blog",
//   });

//   // Save the blog created to the database
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // READ all the documents with the method .find
// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // Find a single document with the .findById method
// app.get("/single-blog", (req, res) => {
//   Blog.findById("61f9638486b6eda2b53e1647")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

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

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create a New Blog'});
});

// 404 Page. Always at the bottom
app.use((req, res) => {
  res.status(404).render('404', {title: '404'});
});