// Dependencies required
const express = require('express');


// Set express app
const app = express();


// Listen for requests
app.listen(3000);

// Initial get requests
app.get('/', (req, res) =>{
  res.sendFile('./views/index.html', {root: __dirname});
});

app.get('/about', (req, res) =>{
  res.sendFile('./views/about.html', {root: __dirname});
});

// Redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// Always at the bottom
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', {root: __dirname});
});