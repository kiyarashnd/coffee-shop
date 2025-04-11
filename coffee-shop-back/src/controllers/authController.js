const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you store users
const Token = require('../models/Token'); // Model for refresh tokens
const dotenv = require('dotenv');

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

// Function to generate access & refresh tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { username: user.username },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' } // Short lifespan for security
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' } // Longer lifespan
  );

  return { accessToken, refreshToken };
};

// 🔹 Login Route
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username & password required' });
    }

    // Check if user is "koorosh" (Admin)
    if (username !== 'koorosh' || password !== 'admin') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT tokens
    const tokens = generateTokens({ username });

    // Save refresh token in DB
    await Token.create({ username, refreshToken: tokens.refreshToken });

    // Set refresh token in **HTTP-only cookie**
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true, // Set to true in production (HTTPS)
      //   sameSite: 'Strict',
      //   sameSite: 'Lax',
      sameSite: 'None',
      domain: '.koorowshcoffee.ir', // ← خیلی مهم
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken: tokens.accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 🔹 Refresh Token Route
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log('req.cookie is : ', req.cookies);
    if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

    // Validate refresh token
    const storedToken = await Token.findOne({ refreshToken });
    if (!storedToken) return res.status(403).json({ message: 'Forbidden' });

    // Verify token
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });

      // Generate new access token
      const newAccessToken = jwt.sign(
        { username: user.username },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      );

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 🔹 Logout Route
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(400).json({ message: 'No token found' });

    // Remove refresh token from DB
    await Token.deleteOne({ refreshToken });

    // Clear cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
