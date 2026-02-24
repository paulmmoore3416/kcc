/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: {
      enabled: true,
    },
  },
  env: {
    BACKEND_GRPC_URL: process.env.BACKEND_GRPC_URL || 'http://localhost:50051',
  },
}

module.exports = nextConfig
