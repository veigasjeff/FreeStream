// const fs = require('fs');
// const path = require('path');

// // Read YOUR schedule data
// const schedulePath = path.join(process.cwd(), 'data', 'schedules.json');
// const scheduleData = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));

// const baseUrl = 'https://freestreaming.vercel.app';

// // ALL static pages including those in your build output
// const staticPages = [
//   { url: '/', priority: '1.0', changefreq: 'daily' },
//   { url: '/schedule', priority: '0.9', changefreq: 'daily' },
//   { url: '/contact', priority: '0.7', changefreq: 'monthly' },
//   { url: '/faq', priority: '0.7', changefreq: 'monthly' },
//   { url: '/legal', priority: '0.7', changefreq: 'monthly' },
//   { url: '/privacy', priority: '0.7', changefreq: 'monthly' },
//   { url: '/request', priority: '0.7', changefreq: 'monthly' },
//   { url: '/terms', priority: '0.7', changefreq: 'monthly' },
// ];

// // Generate schedule pages from YOUR schedule.json
// const showPages = scheduleData.shows.map(show => ({
//   url: `/schedules/${show.id}`,
//   priority: '0.8',
//   changefreq: 'daily',
//   lastmod: show.date || new Date().toISOString().split('T')[0],
// }));

// const allPages = [...staticPages, ...showPages];

// // Add today's date for static pages that don't have lastmod
// const today = new Date().toISOString().split('T')[0];
// allPages.forEach(page => {
//   if (!page.lastmod) {
//     page.lastmod = today;
//   }
// });

// // Simple sitemap
// const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   ${allPages.map(page => `
//     <url>
//       <loc>${baseUrl}${page.url}</loc>
//       <lastmod>${page.lastmod}</lastmod>
//       <changefreq>${page.changefreq}</changefreq>
//       <priority>${page.priority}</priority>
//     </url>
//   `).join('')}
// </urlset>`;

// // Write to public folder
// const publicDir = path.join(process.cwd(), 'public');
// if (!fs.existsSync(publicDir)) {
//   fs.mkdirSync(publicDir, { recursive: true });
// }

// fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

// console.log('✅ Sitemap generated with', allPages.length, 'URLs');





const fs = require('fs');
const path = require('path');

// 1. Define Paths to Data
const schedulePath = path.join(process.cwd(), 'data', 'schedules.json');
const postsPath = path.join(process.cwd(), 'data', 'posts.json');

// 2. Read Data Files
const scheduleData = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
// We load posts.json to index your new SEO articles
const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

// 3. Define Base URL
const BASE_URL = 'https://freestreaming.vercel.app';

const generateSitemap = () => {
  const currentDate = new Date().toISOString();
  
  // 4. Define All Static Pages
  // Included your footer pages (legal, faq) + the new Blog page
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/schedule', priority: '0.9', changefreq: 'daily' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' }, // NEW SEO PAGE
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/faq', priority: '0.7', changefreq: 'monthly' },
    { url: '/legal', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.7', changefreq: 'monthly' },
    { url: '/request', priority: '0.7', changefreq: 'monthly' },
    { url: '/terms', priority: '0.7', changefreq: 'monthly' },
  ];

  console.log('🔄 Generating Sitemap...');

  // 5. Start XML Construction
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // --- SECTION A: STATIC PAGES ---
  staticRoutes.forEach(page => {
    sitemap += `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // --- SECTION B: MOVIE DETAILS PAGES ---
  scheduleData.shows.forEach((show) => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/schedules/${show.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

    // --- SECTION C: PLAYER PAGES ---
    // Essential for users searching "watch [movie] live"
    sitemap += `
  <url>
    <loc>${BASE_URL}/player/${show.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // --- SECTION D: BLOG POSTS (CRITICAL FOR TRAFFIC) ---
  postsData.posts.forEach((post) => {
    // Ensure date is formatted correctly for XML
    const postDate = post.date ? `${post.date}T12:00:00Z` : currentDate;
    
    sitemap += `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // 6. Close XML
  sitemap += `
</urlset>`;

  // 7. Write to Public Folder
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  
  console.log(`✅ Sitemap generated successfully with:`);
  console.log(`   - ${staticRoutes.length} Static Pages`);
  console.log(`   - ${scheduleData.shows.length * 2} Movie/Player Pages`);
  console.log(`   - ${postsData.posts.length} Blog Posts`);
  console.log(`📁 Saved to: public/sitemap.xml`);
};

generateSitemap();