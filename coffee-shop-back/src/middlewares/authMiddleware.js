const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';

// 🔹 Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    req.user = user;
    next();
  });
};

// 🔹 Middleware to restrict access to admin (Koorosh)
const isAdmin = (req, res, next) => {
  if (req.user.username !== 'koorosh') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };
