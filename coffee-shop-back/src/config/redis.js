const Redis = require("ioredis");
const config = require("./config");

const connectRedis = async () => {
  try {
    const redis = new Redis({
      host: config.REDIS_URL,
      port: config.REDIS_PORT,
      password: config.REDIS_PASSWORD,
    });

    redis.on("connect", () => {
      console.log("✅ Redis Connected");
    });

    redis.on("error", (error) => {
      console.error("❌ Redis Connection Error:", error);
      process.exit(1);
    });

    return redis;
  } catch (error) {
    console.error("❌ Redis Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectRedis;
