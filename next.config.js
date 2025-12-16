// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   swcMinify: true,
//   images: {
//     unoptimized: true,
//   },
  
// }

// module.exports = nextConfig












// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Disabling strict mode prevents double-rendering during development
//   reactStrictMode: false,
  
//   // Uses the Rust compiler for faster builds and better minification
//   swcMinify: true,

//   // CRITICAL FOR SEO:
//   // Forces all URLs to end with a slash. 
//   // Helps Google understand your site structure better (e.g., /schedule/index.html)
//   trailingSlash: true,

//   images: {
//     // Keeps images working without needing a specific Node image server.
//     // Essential to prevent "Image failing to load" errors on static pages.
//     unoptimized: true,
    
//     // Allows loading images from any domain (useful since your JSON has external image links)
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },

//   // Security Headers to improve SEO trust scores and preventing site attacks
//   async headers() {
//     return [
//       {
//         source: '/:path*',
//         headers: [
//           {
//             key: 'X-DNS-Prefetch-Control',
//             value: 'on'
//           },
//           {
//             key: 'Strict-Transport-Security',
//             value: 'max-age=63072000; includeSubDomains; preload'
//           },
//           {
//             key: 'X-XSS-Protection',
//             value: '1; mode=block'
//           },
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff'
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'origin-when-cross-origin'
//           }
//         ]
//       }
//     ]
//   }
// }

// module.exports = nextConfig






/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabling strict mode prevents double-rendering during development
  reactStrictMode: false,
  
  // Uses the Rust compiler for faster builds and better minification
  swcMinify: true,

  // CRITICAL FOR SEO: Forces URLs to end with a slash (e.g., /schedule/)
  trailingSlash: true,

  images: {
    // CRITICAL FOR PUBLIC FOLDER: 
    // Tells Next.js to serve images as-is without processing. 
    // This fixes 404 errors for local files on many hosting platforms.
    unoptimized: true,
    
    // Allow external images if your JSON ever uses them
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },

  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig