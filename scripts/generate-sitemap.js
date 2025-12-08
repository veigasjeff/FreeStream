const fs = require('fs');
const path = require('path');

// Read YOUR schedule data
const schedulePath = path.join(process.cwd(), 'data', 'schedules.json');
const scheduleData = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));

const baseUrl = 'https://freestreamcinema.vercel.app';

// ALL static pages including those in your build output
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/schedule', priority: '0.9', changefreq: 'daily' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  { url: '/faq', priority: '0.7', changefreq: 'monthly' },
  { url: '/legal', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.7', changefreq: 'monthly' },
  { url: '/request', priority: '0.7', changefreq: 'monthly' },
  { url: '/terms', priority: '0.7', changefreq: 'monthly' },
];

// Generate schedule pages from YOUR schedule.json
const showPages = scheduleData.shows.map(show => ({
  url: `/schedules/${show.id}`,
  priority: '0.8',
  changefreq: 'daily',
  lastmod: show.date || new Date().toISOString().split('T')[0],
}));

const allPages = [...staticPages, ...showPages];

// Add today's date for static pages that don't have lastmod
const today = new Date().toISOString().split('T')[0];
allPages.forEach(page => {
  if (!page.lastmod) {
    page.lastmod = today;
  }
});

// Simple sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

// Write to public folder
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

console.log('✅ Sitemap generated with', allPages.length, 'URLs');