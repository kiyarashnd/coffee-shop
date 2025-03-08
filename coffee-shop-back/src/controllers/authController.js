const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (username !== 'koorosh' || password !== 'admin') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({ token, user: { username, role: 'admin' } });
};
