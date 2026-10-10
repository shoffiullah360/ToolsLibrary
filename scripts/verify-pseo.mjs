import fs from 'node:fs';
import path from 'node:path';

const slugs = [
  'heic-to-jpg',
  'webp-to-png',
  'webp-to-jpg',
  'png-to-pdf',
  'pdf-to-jpg',
  'pdf-to-png',
  'png-to-jpg',
  'jpg-to-png',
  'svg-to-png',
  'svg-to-jpg',
  'heic-to-pdf',
  'heic-to-png',
  'png-to-webp',
  'jpg-to-webp',
  'ico-to-png',
  'png-to-ico',
  'jpg-to-ico',
  'bmp-to-jpg',
  'bmp-to-png',
  'gif-to-jpg',
  'gif-to-png',
  'gif-to-webp',
  'tiff-to-jpg',
  'tiff-to-png',
  'tiff-to-pdf',
  'avif-to-png',
  'avif-to-jpg',
  'jpg-to-pdf',
  'webp-to-pdf',
  'image-to-docx',
  'image-to-pdf',
  'tga-to-png',
  'tga-to-jpg',
  'camera-raw-to-jpg',
  'batch-image-converter',
  '3000x3000-image-converter'
];

console.log(`--- VERIFYING ALL ${slugs.length} PSEO ROUTES ---`);

let allSuccess = true;

for (const slug of slugs) {
  const filePath = path.join('./dist', slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.error('ERROR: Missing output file:', filePath);
    allSuccess = false;
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');

  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const rootMatch = html.match(/<div id="image-converter-root"([^>]+)>/);
  const hasBreadcrumbsSchema = html.includes('"@type":"BreadcrumbList"');
  const hasWebAppSchema = html.includes('"@type":"WebApplication"');
  const hasFaqSchema = html.includes('"@type":"FAQPage"');
  const hasPopularTools = html.includes('Popular Image Conversion Tools');

  if (!canonicalMatch || !titleMatch || !h1Match || !rootMatch || !hasBreadcrumbsSchema || !hasWebAppSchema || !hasFaqSchema || !hasPopularTools) {
    console.error(`ERROR: Verification failed for /${slug}/:`, {
      hasCanonical: !!canonicalMatch,
      hasTitle: !!titleMatch,
      hasH1: !!h1Match,
      hasRoot: !!rootMatch,
      hasBreadcrumbsSchema,
      hasWebAppSchema,
      hasFaqSchema,
      hasPopularTools
    });
    allSuccess = false;
  }
}

console.log('\n--- VERIFYING SITEMAP INCLUSION ---');
const sitemapPath = './dist/sitemap-0.xml';
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  for (const slug of slugs) {
    const targetUrl = `https://fasttoolverse.com/${slug}/`;
    const inSitemap = sitemapContent.includes(targetUrl);
    if (!inSitemap) {
      console.error(`ERROR: ${slug} missing in sitemap!`);
      allSuccess = false;
    }
  }
} else {
  console.error('Sitemap not found at', sitemapPath);
  allSuccess = false;
}

if (!allSuccess) {
  console.error('One or more checks failed!');
  process.exit(1);
}

console.log(`\nAll ${slugs.length} routes built cleanly with valid canonicals, titles, H1s, schemas, popular conversion linking grids, and sitemap entries!`);
