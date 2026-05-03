const express = require('express');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../..')));

// Routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
