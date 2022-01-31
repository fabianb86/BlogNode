// Dependencies required
const express = require('express');
const morgan = require('morgan');

// Set express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');


// Listen for requests
app.listen(3000);

// Middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'));

// Get requests
app.get('/', (req, res) =>{
  const blogs = [
    {title: 'Yoshi Find Eggs', snippet: 'Magna aliqua exercitation aliquip ex incididunt est'},
    {title: 'Mario find stars', snippet: 'Magna aliqua exercitation aliquip ex incididunt est'},
    {title: 'How to defeat browser', snippet: 'Magna aliqua exercitation aliquip ex incididunt est'},
  ];
  res.render('index', {title: 'Home', blogs: blogs});
});

app.get('/about', (req, res) =>{
  res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create a New Blog'});
});

// 404 Page. Always at the bottom
app.use((req, res) => {
  res.status(404).render('404', {title: '404'});
});