import fs from 'fs';
import path from 'path';

// 1. Parse sitemap
const sitemapPath = 'dist/sitemap-0.xml';
const xml = fs.readFileSync(sitemapPath, 'utf-8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

console.log('--- SITEMAP AUDIT ---');
console.log(`Total URLs found in ${sitemapPath}: ${urls.length}`);

// 2. Parse 166 pruned slugs from scripts/live-redirect-audit.md
const auditMd = fs.readFileSync('scripts/live-redirect-audit.md', 'utf-8');

// Match lines in table: | <num> | https://fasttoolverse.com/<slug>/ | https://fasttoolverse.com/...
const tableRegex = /\|\s*\d+\s*\|\s*(https:\/\/fasttoolverse\.com\/([a-z0-9-]+)\/)\s*\|\s*https:\/\/fasttoolverse\.com\/([a-z0-9-]+)\//g;
const prunedList = [];
let match;
while ((match = tableRegex.exec(auditMd)) !== null) {
  prunedList.push({
    num: prunedList.length + 1,
    url: match[1],
    slug: match[2],
    target: match[3]
  });
}

console.log(`Total pruned slugs extracted from table in scripts/live-redirect-audit.md: ${prunedList.length}`);
const prunedSlugsSet = new Set(prunedList.map(p => p.slug));

// Sanity check
const accidentalInSitemap = urls.filter(u => {
  const slug = u.replace('https://fasttoolverse.com/', '').replace(/\/$/, '');
  return prunedSlugsSet.has(slug);
});

console.log(`Accidental pruned slugs inside sitemap: ${accidentalInSitemap.length}`);
if (accidentalInSitemap.length > 0) {
  console.log('VIOLATIONS:', accidentalInSitemap);
} else {
  console.log('CONFIRMED: Exactly 0 pruned/redirected slugs are present in the sitemap!');
}

// 3. Categorize URLs
// Categories needed:
// - Core / Landing Pages (Home, About, etc.)
// - Image Tools URLs
// - Remove Line Breaks URLs (Main tool + active presets count)
// - Remove Duplicate Lines URLs (Main tool + active presets count)
// - Remove Empty Lines URLs (if any)
// - Other Active Tools

// Let's load preset files to get exact active preset slugs
import { removeLineBreaksPresets } from '../src/data/removeLineBreaksPresets.ts';
import { DUPLICATE_LINES_PRESETS } from '../src/data/duplicateLinesPresets.ts';
import { REMOVE_EMPTY_LINES_PRESETS } from '../src/data/removeEmptyLinesPresets.ts';

const lineBreaksSlugs = new Set(removeLineBreaksPresets.map(p => p.slug));
const duplicateLinesSlugs = new Set(DUPLICATE_LINES_PRESETS.map(p => p.slug));
const emptyLinesSlugs = new Set(REMOVE_EMPTY_LINES_PRESETS.map(p => p.slug));

console.log(`\nSource presets count:`);
console.log(`- removeLineBreaksPresets: ${removeLineBreaksPresets.length}`);
console.log(`- DUPLICATE_LINES_PRESETS: ${DUPLICATE_LINES_PRESETS.length}`);
console.log(`- REMOVE_EMPTY_LINES_PRESETS: ${REMOVE_EMPTY_LINES_PRESETS.length}`);

const coreLandingSlugs = new Set([
  '', // Home (https://fasttoolverse.com/)
  'about',
  'contact',
  'privacy-policy',
  'terms'
]);

const lineBreaksUrls = [];
const duplicateLinesUrls = [];
const emptyLinesUrls = [];
const coreUrls = [];
const imageToolsUrls = [];
const otherActiveToolsUrls = [];

urls.forEach(url => {
  const slug = url.replace('https://fasttoolverse.com/', '').replace(/\/$/, '');
  
  if (coreLandingSlugs.has(slug)) {
    coreUrls.push(url);
  } else if (slug === 'remove-line-breaks' || lineBreaksSlugs.has(slug)) {
    lineBreaksUrls.push(url);
  } else if (slug === 'remove-duplicate-lines' || duplicateLinesSlugs.has(slug)) {
    duplicateLinesUrls.push(url);
  } else if (slug === 'remove-empty-lines' || emptyLinesSlugs.has(slug)) {
    emptyLinesUrls.push(url);
  } else {
    // Check if it's an image tool or other tool
    // Image tools include compressors, resizers, converters, flippers, etc.
    const isImage = 
      slug.includes('image') || 
      slug.includes('photo') || 
      slug.includes('picture') ||
      slug.includes('compress') || 
      slug.includes('resize') || 
      slug.includes('converter') ||
      slug.includes('to-jpg') ||
      slug.includes('to-png') ||
      slug.includes('to-webp') ||
      slug.includes('to-avif') ||
      slug.includes('to-pdf') ||
      slug.includes('to-ico') ||
      slug.includes('to-svg') ||
      slug.includes('to-gif') ||
      slug.includes('to-docx') ||
      slug.includes('passport') ||
      slug.includes('signature') ||
      slug.includes('watermark') ||
      slug.includes('exif') ||
      slug.includes('color-picker') ||
      slug.includes('aspect-ratio') ||
      slug.match(/\d+kb/) ||
      slug.match(/\d+x\d+/);

    if (isImage) {
      imageToolsUrls.push(url);
    } else {
      otherActiveToolsUrls.push(url);
    }
  }
});

console.log('\n--- CATEGORIZED BREAKDOWN ---');
console.log(`Core / Landing Pages: ${coreUrls.length}`);
coreUrls.forEach(u => console.log('  ', u));

console.log(`Image Tools URLs: ${imageToolsUrls.length}`);
console.log(`Remove Line Breaks URLs: ${lineBreaksUrls.length} (Main: 1, Presets: ${lineBreaksUrls.length - 1})`);
console.log(`Remove Duplicate Lines URLs: ${duplicateLinesUrls.length} (Main: 1, Presets: ${duplicateLinesUrls.length - 1})`);
console.log(`Remove Empty Lines URLs: ${emptyLinesUrls.length} (Main: 1, Presets: ${emptyLinesUrls.length - 1})`);
console.log(`Other Active Tools URLs: ${otherActiveToolsUrls.length}`);
otherActiveToolsUrls.forEach(u => console.log('  ', u));

const totalCategorized = coreUrls.length + imageToolsUrls.length + lineBreaksUrls.length + duplicateLinesUrls.length + emptyLinesUrls.length + otherActiveToolsUrls.length;
console.log(`\nTotal Categorized: ${totalCategorized} / ${urls.length}`);

console.log('\n--- SAMPLES ---');
console.log('Top 10:');
urls.slice(0, 10).forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
console.log('Bottom 10:');
urls.slice(-10).forEach((u, i) => console.log(`  ${urls.length - 10 + i + 1}. ${u}`));
