const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  MONGO_IP: isDev ? 'localhost' : process.env.MONGO_IP || 'mongo',
  MONGO_USER: process.env.MONGO_USER || 'sanjeev',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'mypassword',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_DB: process.env.MONGO_DB || 'coffee-shop-king',
  // REDIS_URL: isDev ? "localhost" : process.env.REDIS_URL || "redis",
  // REDIS_PORT: process.env.REDIS_PORT || 6379,
  // REDIS_PASSWORD: process.env.REDIS_PASSWORD || "yourpassword",
  MINIO_ENDPOINT: isDev
    ? 'http://localhost:9000'
    : process.env.MINIO_ENDPOINT || 'http://minio:9000',
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY || 'minioadmin',
  MINIO_BUCKET: process.env.MINIO_BUCKET || 'coffee-shop',
};
