import fs from 'fs';
import path from 'path';

function getWordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const sitemapXml = fs.readFileSync('dist/sitemap-0.xml', 'utf-8');
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

const resultsByGroup = {
  resizer: [],
  compress: [],
  converter: [],
  lineBreaks: [],
  duplicateLines: [],
  emptyLines: [],
  core: []
};

const metaDescriptions = new Map();
const h1Map = new Map();

for (const url of urls) {
  const slug = url.replace('https://fasttoolverse.com/', '').replace(/\/$/, '');
  const filePath = slug ? path.join('dist', slug, 'index.html') : path.join('dist', 'index.html');
  if (!fs.existsSync(filePath)) continue;

  const html = fs.readFileSync(filePath, 'utf-8');
  
  // Meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                    html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
  const desc = descMatch ? descMatch[1] : '';
  if (desc) {
    if (!metaDescriptions.has(desc)) metaDescriptions.set(desc, []);
    metaDescriptions.get(desc).push(url);
  }

  // H1
  const h1Match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
  if (h1) {
    if (!h1Map.has(h1)) h1Map.set(h1, []);
    h1Map.get(h1).push(url);
  }

  // Article content
  const articleMatch = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  let articleWords = 0;
  if (articleMatch) {
    const text = articleMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    articleWords = getWordCount(text);
  }

  // Full page content (without header, footer, nav, script, style)
  let bodyText = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ')
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
  const totalWords = getWordCount(bodyText);

  const item = { url, slug, totalWords, articleWords, hasArticle: !!articleMatch };

  if (slug === '' || ['about', 'contact', 'privacy-policy', 'terms'].includes(slug)) {
    resultsByGroup.core.push(item);
  } else if (slug.includes('compress') || slug.includes('kb') || slug.includes('mb') || slug.endsWith('-to-100kb') || slug.endsWith('-to-200kb')) {
    resultsByGroup.compress.push(item);
  } else if (slug.includes('to-') && (slug.includes('jpg') || slug.includes('png') || slug.includes('webp') || slug.includes('avif') || slug.includes('pdf') || slug.includes('svg') || slug.includes('ico') || slug.includes('gif') || slug.includes('bmp') || slug.includes('tiff'))) {
    resultsByGroup.converter.push(item);
  } else if (slug.includes('line-breaks')) {
    resultsByGroup.lineBreaks.push(item);
  } else if (slug.includes('duplicate-lines') || slug.includes('duplicate')) {
    resultsByGroup.duplicateLines.push(item);
  } else if (slug.includes('empty-lines')) {
    resultsByGroup.emptyLines.push(item);
  } else {
    resultsByGroup.resizer.push(item);
  }
}

console.log('--- WORD COUNT STATS BY GROUP IN SITEMAP ---');
for (const [group, items] of Object.entries(resultsByGroup)) {
  if (items.length === 0) continue;
  const avgTotal = Math.round(items.reduce((s, i) => s + i.totalWords, 0) / items.length);
  const avgArticle = Math.round(items.reduce((s, i) => s + i.articleWords, 0) / items.length);
  const minTotal = Math.min(...items.map(i => i.totalWords));
  const maxTotal = Math.max(...items.map(i => i.totalWords));
  const missingArticle = items.filter(i => !i.hasArticle).length;
  console.log(`Group: ${group.padEnd(15)} | Count: ${String(items.length).padEnd(4)} | Avg Total: ${String(avgTotal).padEnd(5)} | Min: ${String(minTotal).padEnd(5)} | Max: ${String(maxTotal).padEnd(5)} | Avg Article: ${String(avgArticle).padEnd(5)} | Missing <article>: ${missingArticle}`);
}

// Check duplicate meta descriptions
let dupDescCount = 0;
for (const [desc, uList] of metaDescriptions.entries()) {
  if (uList.length > 1) {
    dupDescCount++;
    console.log(`Duplicate Meta Description (${uList.length} pages): "${desc.slice(0, 70)}..."`);
    console.log('  Pages:', uList.slice(0, 3));
  }
}
console.log('Total Duplicate Meta Descriptions across sitemap:', dupDescCount);

// Check duplicate H1
let dupH1Count = 0;
for (const [h1, uList] of h1Map.entries()) {
  if (uList.length > 1) {
    dupH1Count++;
    console.log(`Duplicate H1 (${uList.length} pages): "${h1}"`);
    console.log('  Pages:', uList.slice(0, 3));
  }
}
console.log('Total Duplicate H1 tags across sitemap:', dupH1Count);
