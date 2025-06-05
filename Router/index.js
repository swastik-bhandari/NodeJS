const express = require('express');
const cookieParser = require('cookie-parser'); // Add this import
const router1 = require('./api/register.js');
const path = require('path');
const fs = require('fs');
const {verifyJWT} = require('../controllers/verifyJWT.js');
const {handleRefreshToken} = require('../controllers/refreshTokenController');
const logoutRouter = require('../Router/logout.js');

const app = express(); // Remove 'new' keyword

const PORT = process.env.PORT || 5500;

// Middleware setup
app.use(express.json());
app.use(cookieParser()); // Add cookie parser middleware - CRITICAL for cookies to work

// Routes
app.use('/index', router1);
app.get('/refresh', handleRefreshToken);
app.use('/logout' , logoutRouter);

// Start server with proper logging
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional: Add error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});