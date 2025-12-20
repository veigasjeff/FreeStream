const fs = require('fs');
const path = require('path');

// 1. Define Paths to Data
const schedulePath = path.join(process.cwd(), 'data', 'schedules.json');
const postsPath = path.join(process.cwd(), 'data', 'posts.json');

// 2. Read Data Files
const scheduleData = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

// 3. Define Base URL
const BASE_URL = 'https://freestreaming.vercel.app';

const generateSitemap = () => {
  const currentDate = new Date().toISOString();
  
  // 4. Define All Static Pages
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/schedule', priority: '0.9', changefreq: 'daily' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

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

  // --- SECTION B: MOVIE DETAILS PAGES ONLY ---
  // REMOVED PLAYER PAGES SECTION
  scheduleData.shows.forEach((show) => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/schedules/${show.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // --- SECTION C: BLOG POSTS ---
  postsData.posts.forEach((post) => {
    const postDate = post.date ? `${post.date}T12:00:00Z` : currentDate;
    
    sitemap += `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
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
  console.log(`   - ${scheduleData.shows.length} Movie Pages`);
  console.log(`   - ${postsData.posts.length} Blog Posts`);
  console.log(`📁 Saved to: public/sitemap.xml`);
};

generateSitemap();