// Dependencies required
const mongoose = require('mongoose');

// Setting the Schema
const Schema = mongoose.Schema;

// Creating the blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, {timestamps: true});

// Creating the model
const Blog = mongoose.model('Blog', blogSchema);

// Export the model
module.exports = Blog;