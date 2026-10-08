import fs from 'node:fs';
import path from 'node:path';

const slugs = [
  'jpg-to-png',
  'png-to-jpg',
  'heic-to-jpg',
  'jpg-to-pdf',
  'pdf-to-png',
  'black-and-white-image-converter',
  '3000x3000-image-converter'
];

console.log('--- VERIFYING 7 PSEO ROUTES ---');

for (const slug of slugs) {
  const filePath = path.join('./dist', slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.error('ERROR: Missing output file:', filePath);
    process.exit(1);
  }
  const html = fs.readFileSync(filePath, 'utf8');

  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const rootMatch = html.match(/<div id="image-converter-root"([^>]+)>/);
  const hasBreadcrumbsSchema = html.includes('"@type":"BreadcrumbList"');
  const hasWebAppSchema = html.includes('"@type":"WebApplication"');
  const hasFaqSchema = html.includes('"@type":"FAQPage"');

  console.log(`\n=== /${slug}/ ===`);
  console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NONE');
  console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');
  console.log('H1:', h1Match ? h1Match[1].trim() : 'NONE');
  console.log('Converter Root Attrs:', rootMatch ? rootMatch[1].trim() : 'NONE');
  console.log('Schemas:', { hasBreadcrumbsSchema, hasWebAppSchema, hasFaqSchema });
}

console.log('\n--- VERIFYING SITEMAP INCLUSION ---');
const sitemapPath = './dist/sitemap-0.xml';
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  for (const slug of slugs) {
    const targetUrl = `https://fasttoolverse.com/${slug}/`;
    const inSitemap = sitemapContent.includes(targetUrl);
    console.log(`${slug}: ${inSitemap ? 'IN SITEMAP' : 'MISSING'}`);
  }
} else {
  console.error('Sitemap not found at', sitemapPath);
}
