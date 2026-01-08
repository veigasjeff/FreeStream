/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'freestreaming.vercel.app',
      'cdnjs.cloudflare.com',
      'short.icu',
      'yt3.googleusercontent.com',
      'in.bmscdn.com',
      'images.filmibeat.com',
      'm.media-amazon.com',
      'indianfilmhistory.com',
      'images.news18.com',
      'daddyhd.com',
      'cdn-ue1-prod.tsv2.amagi.tv',
      'd1cy85syyhvqz5.cloudfront.net'
    ],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig;