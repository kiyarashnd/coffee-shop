const express = require('express');
const {
  login,
  refreshToken,
  logout,
} = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.get('/refresh-token', refreshToken);
router.get('/logout', logout);

module.exports = router;
