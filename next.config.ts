/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Required if using MongoDB Atlas
  serverRuntimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  }
};

module.exports = nextConfig;