require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./src/config/db');
// const connectRedis = require('./src/config/redis');
const { createBucketIfNotExists } = require('./src/config/minio');

const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');
const otpRoutes = require('./src/routes/otpRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();

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

app.enable('trust proxy');
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
app.use('/api/payment', paymentRoutes);
app.use('/api/order', orderRoutes);

async function startServer() {
  try {
    await connectDB();
    // await connectRedis();
    await createBucketIfNotExists();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
