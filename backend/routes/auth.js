// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/v1/auth/register (Registers a new user)
router.post('/register', authController.register);

// POST /api/v1/auth/login (Authenticates a user)
router.post('/login', authController.login);

module.exports = router;