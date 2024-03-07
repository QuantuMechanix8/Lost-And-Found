const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.render('landing_page');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
