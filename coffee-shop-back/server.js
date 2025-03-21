require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const helmet = require('helmet'); // Security headers
// const rateLimit = require('express-rate-limit'); // Prevent brute-force attacks
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');
const otpRoutes = require('./src/routes/otpRoutes');

const app = express();

// Security middleware
// app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests
// });
// app.use(limiter);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', otpRoutes);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
