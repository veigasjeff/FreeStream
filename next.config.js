/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // List of allowed external image domains
    domains: [
      'freestreaming.vercel.app',
      'localhost',
      'i.ytimg.com', // YouTube thumbnails
      'img.youtube.com', // YouTube images
      'yt3.ggpht.com', // YouTube profile images
      'lh3.googleusercontent.com', // Google hosted images
    ],
    // Allow unoptimized images for external sources
    unoptimized: true,
    // ✅ FIXED: Only 'image/webp' and 'image/avif' are allowed here
    formats: ['image/webp', 'image/avif'],
    // Image optimization sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  output: 'standalone',
  compress: true,
  trailingSlash: true,
  swcMinify: true,
  // ✅ FIXED: Removed the invalid 'images' object from 'experimental'
}

module.exports = nextConfig