const express = require('express');
const path = require('path');

// API path
const apiRoutes = require('./controllers/api');

const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// initiate routing
app.use('/api', apiRoutes);

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });
