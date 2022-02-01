// Dependencies required
const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes');

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
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get('/about', (req, res) =>{
  res.render('about', {title: 'About'});
});

// Use middleware to Blog Routes. Put the path /blogs as the first parameter and delete all of the blogRoute.js file
app.use('/blogs', blogRoutes);

// 404 Page. Always at the bottom
app.use((req, res) => {
  res.status(404).render('404', {title: '404'});
});