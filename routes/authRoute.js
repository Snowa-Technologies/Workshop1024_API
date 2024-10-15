const express = require('express');

//Load Modules
const authController = require('../controllers/authController.js');

// Initialization
const router = express.Router();

router.post('/login', authController.login);

module.exports = router;
