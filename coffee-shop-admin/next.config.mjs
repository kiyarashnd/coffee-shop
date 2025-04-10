// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000', // Ensure this matches your backend port
        pathname: '/coffee-shop/**', // Allow all images in this path
      },
    ],
  },
};

export default nextConfig;
