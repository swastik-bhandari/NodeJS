const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/registerController');
const authController = require('../../controllers/authController');
const {verifyJWT} = require('../../controllers/verifyJWT');

router.post('/login' , authController.handleLogin);

router.get('/protected', verifyJWT, (req, res) => {      // Protected
  res.json({ message: "success", username: req.username });
});


module.exports = router;