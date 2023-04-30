/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'http2.mlstatic.com', 'cdn.shopify.com']
  },
  env: {
    SERVICE_ID: process.env.SERVICE_ID,
    API_KEY: process.env.API_KEY,
    TEMPLATE_ID: process.env.TEMPLATE_ID
  }
}

module.exports = nextConfig
