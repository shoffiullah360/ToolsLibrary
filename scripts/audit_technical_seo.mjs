import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('       FASTTOOLVERSE.COM COMPREHENSIVE SEO & CODEBASE AUDIT      ');
console.log('================================================================');

// Helper to recursively find files
function getFiles(dir, extensions) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.git' || file === '.astro') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, extensions));
    } else {
      if (!extensions || extensions.some(ext => file.endsWith(ext))) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

// ----------------------------------------------------------------------
// STEP 1: CANONICAL & TRAILING SLASH AUDIT
// ----------------------------------------------------------------------
console.log('\n>>> STEP 1: CANONICAL & TRAILING SLASH MISMATCH AUDIT');

const astroConfigContent = fs.readFileSync('astro.config.mjs', 'utf-8');
const trailingSlashMatch = astroConfigContent.match(/trailingSlash:\s*['"]([^'"]+)['"]/);
const siteMatch = astroConfigContent.match(/site:\s*['"]([^'"]+)['"]/);
const buildFormatMatch = astroConfigContent.match(/format:\s*['"]([^'"]+)['"]/);

console.log(`astro.config.mjs -> site: ${siteMatch ? siteMatch[1] : 'NOT SET'}`);
console.log(`astro.config.mjs -> trailingSlash: ${trailingSlashMatch ? trailingSlashMatch[1] : 'NOT SET'}`);
console.log(`astro.config.mjs -> build.format: ${buildFormatMatch ? buildFormatMatch[1] : 'default (directory)'}`);

const srcFiles = getFiles('src', ['.astro', '.ts', '.js', '.json']);
let hardcodedWwwCount = 0;
const wwwMatches = [];
for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  if (content.includes('www.fasttoolverse.com')) {
    hardcodedWwwCount++;
    wwwMatches.push(file.replace(/\\/g, '/'));
  }
}
console.log(`Hardcoded 'www.fasttoolverse.com' in src: ${hardcodedWwwCount}`);
if (hardcodedWwwCount > 0) {
  console.log('  Files:', wwwMatches);
}

// Inspect Layout.astro canonical handling
const layoutContent = fs.readFileSync('src/layouts/Layout.astro', 'utf-8');
const hasCanonicalTag = layoutContent.includes('<link rel="canonical"');
console.log(`Layout.astro includes <link rel="canonical">: ${hasCanonicalTag}`);

// Check canonicals in dist/
const distHtmlFiles = getFiles('dist', ['.html']);
console.log(`Total built HTML files in dist/: ${distHtmlFiles.length}`);

let nonSlashCanonicals = [];
let nonHttpsOrWwwCanonicals = [];
let missingCanonicals = [];
let canonicalMismatchWithUrl = [];
let redirectStubs = [];

for (const file of distHtmlFiles) {
  const relFile = file.replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');
  const isRedirectStub = content.includes('http-equiv="refresh"') || content.includes("http-equiv='refresh'");
  if (isRedirectStub) {
    redirectStubs.push(relFile);
  }

  const canonMatch = content.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
                     content.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  
  if (!canonMatch) {
    if (!relFile.includes('yandex_')) {
      missingCanonicals.push(relFile);
    }
    continue;
  }

  const canonical = canonMatch[1];
  if (!canonical.endsWith('/')) {
    nonSlashCanonicals.push({ file: relFile, canonical });
  }
  if (!canonical.startsWith('https://fasttoolverse.com/')) {
    nonHttpsOrWwwCanonicals.push({ file: relFile, canonical });
  }

  // Calculate expected URL from file path
  let expectedPath;
  if (relFile === 'dist/index.html') {
    expectedPath = 'https://fasttoolverse.com/';
  } else if (relFile === 'dist/404.html') {
    expectedPath = 'https://fasttoolverse.com/404/';
  } else {
    const slug = relFile.replace(/^dist\//, '').replace(/\/index\.html$/, '');
    expectedPath = `https://fasttoolverse.com/${slug}/`;
  }

  if (!isRedirectStub && canonical !== expectedPath) {
    canonicalMismatchWithUrl.push({ file: relFile, canonical, expectedPath });
  }
}

console.log(`Redirect stub files generated in dist/: ${redirectStubs.length}`);
console.log(`Missing canonical tags (excluding static verify files): ${missingCanonicals.length}`);
console.log(`Canonicals without trailing slash: ${nonSlashCanonicals.length}`);
console.log(`Canonicals not starting with https://fasttoolverse.com/: ${nonHttpsOrWwwCanonicals.length}`);
console.log(`Canonicals mismatched with page path (non-redirect): ${canonicalMismatchWithUrl.length}`);

// ----------------------------------------------------------------------
// STEP 2: SITEMAP XML ANALYSIS
// ----------------------------------------------------------------------
console.log('\n>>> STEP 2: SITEMAP XML ANALYSIS');

const sitemapPath = 'dist/sitemap-0.xml';
let sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log(`Total URLs in sitemap-0.xml: ${sitemapUrls.length}`);
  
  const sitemapNonSlash = sitemapUrls.filter(u => !u.endsWith('/'));
  const sitemapWww = sitemapUrls.filter(u => u.includes('www.fasttoolverse.com'));
  const sitemapHttp = sitemapUrls.filter(u => u.startsWith('http://'));
  const sitemapLegacyTools = sitemapUrls.filter(u => u.includes('/tools/'));
  
  console.log(`Sitemap URLs without trailing slash: ${sitemapNonSlash.length}`);
  console.log(`Sitemap URLs with 'www': ${sitemapWww.length}`);
  console.log(`Sitemap URLs with 'http://': ${sitemapHttp.length}`);
  console.log(`Sitemap URLs containing legacy '/tools/': ${sitemapLegacyTools.length}`);

  // Check if sitemap contains any redirect stubs or 404
  const sitemapPointingToRedirects = [];
  for (const url of sitemapUrls) {
    const slug = url.replace('https://fasttoolverse.com/', '').replace(/\/$/, '');
    const targetFile = slug ? `dist/${slug}/index.html` : 'dist/index.html';
    if (redirectStubs.includes(targetFile)) {
      sitemapPointingToRedirects.push(url);
    }
  }
  console.log(`Sitemap URLs pointing to redirect stubs: ${sitemapPointingToRedirects.length}`);
  if (sitemapPointingToRedirects.length > 0) {
    console.log('  Violations:', sitemapPointingToRedirects);
  }
} else {
  console.log(`Sitemap file ${sitemapPath} not found!`);
}

// ----------------------------------------------------------------------
// STEP 3: 404 & BROKEN INTERNAL LINK SCAN
// ----------------------------------------------------------------------
console.log('\n>>> STEP 3: 404 & BROKEN INTERNAL LINK SCAN');

// Scan all source files for hardcoded href attributes
const allSourceFiles = getFiles('src', ['.astro', '.jsx', '.tsx', '.ts', '.js', '.json', '.md']);
const hrefRegex = /href=["']([^"']+)["']/g;
const internalHrefsFound = new Map(); // href -> [files]

for (const file of allSourceFiles) {
  const rel = file.replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const rawHref = match[1];
    // ignore external, mailto, tel, anchor-only, template expressions
    if (rawHref.startsWith('http://') || 
        (rawHref.startsWith('https://') && !rawHref.includes('fasttoolverse.com')) ||
        rawHref.startsWith('mailto:') || 
        rawHref.startsWith('tel:') || 
        rawHref.startsWith('#') ||
        rawHref.startsWith('{') ||
        rawHref.startsWith('javascript:')) {
      continue;
    }
    // ignore static assets
    if (rawHref.match(/\.(svg|png|jpg|jpeg|webp|ico|css|js|txt|xml|json|webmanifest)$/i)) {
      continue;
    }
    if (!internalHrefsFound.has(rawHref)) {
      internalHrefsFound.set(rawHref, []);
    }
    internalHrefsFound.get(rawHref).push(rel);
  }
}

console.log(`Scanned ${allSourceFiles.length} source files. Found ${internalHrefsFound.size} unique internal href values.`);

// Check which hrefs result in 404 (do not exist in dist/ and not redirected in _redirects or astro config)
const redirectsRaw = fs.readFileSync('public/_redirects', 'utf-8');
const exactRedirects = new Set();
for (const line of redirectsRaw.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    exactRedirects.add(parts[0]);
    if (parts[0].endsWith('/')) {
      exactRedirects.add(parts[0].slice(0, -1));
    } else {
      exactRedirects.add(parts[0] + '/');
    }
  }
}

const brokenHrefs = [];
const redirectHrefs = [];
for (const [href, sources] of internalHrefsFound.entries()) {
  let clean = href.replace(/^https?:\/\/(www\.)?fasttoolverse\.com/, '');
  clean = clean.split('#')[0].split('?')[0];
  if (!clean) clean = '/';

  // Check if it's a redirect
  if (exactRedirects.has(clean) || clean.startsWith('/tools/')) {
    redirectHrefs.push({ href, clean, sources: [...new Set(sources)] });
    continue;
  }

  // Check trailing slash
  if (clean !== '/' && !clean.endsWith('/')) {
    redirectHrefs.push({ href, clean, reason: 'Missing trailing slash', sources: [...new Set(sources)] });
    continue;
  }

  // Check if file exists in dist
  let targetFile;
  if (clean === '/') {
    targetFile = 'dist/index.html';
  } else {
    const slug = clean.replace(/^\/+/, '').replace(/\/+$/, '');
    targetFile = `dist/${slug}/index.html`;
    if (!fs.existsSync(targetFile)) {
      const altFile = `dist/${slug}.html`;
      if (fs.existsSync(altFile)) targetFile = altFile;
    }
  }

  if (!fs.existsSync(targetFile)) {
    brokenHrefs.push({ href, clean, sources: [...new Set(sources)] });
  }
}

console.log(`Internal links leading to 404: ${brokenHrefs.length}`);
if (brokenHrefs.length > 0) {
  console.log('404 Links:', JSON.stringify(brokenHrefs, null, 2));
}

console.log(`Internal links leading to redirects: ${redirectHrefs.length}`);
if (redirectHrefs.length > 0) {
  console.log('Sample redirect links (first 10):', JSON.stringify(redirectHrefs.slice(0, 10), null, 2));
}

// ----------------------------------------------------------------------
// STEP 4: NOINDEX META TAG SCAN
// ----------------------------------------------------------------------
console.log('\n>>> STEP 4: NOINDEX META TAG SCAN');

// Search entire repo for 'noindex'
const allRepoFiles = getFiles('src', ['.astro', '.ts', '.js']);
const filesWithNoindexCode = [];
for (const file of allRepoFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  if (content.includes('noindex')) {
    filesWithNoindexCode.push(file.replace(/\\/g, '/'));
  }
}
console.log(`Source files containing 'noindex': ${filesWithNoindexCode.length}`);
console.log('Files:', filesWithNoindexCode);

// Analyze which actual routes in dist/ have noindex
const noindexRoutes = [];
const noindexInSitemap = [];
for (const file of distHtmlFiles) {
  const rel = file.replace(/\\/g, '/');
  if (rel.includes('yandex_')) continue;
  const content = fs.readFileSync(file, 'utf-8');
  const isRedirectStub = content.includes('http-equiv="refresh"') || content.includes("http-equiv='refresh'");
  
  const robotsMatch = content.match(/<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i) ||
                      content.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*name=["']robots["']/i);

  if (robotsMatch && robotsMatch[1].toLowerCase().includes('noindex')) {
    let url;
    if (rel === 'dist/index.html') url = 'https://fasttoolverse.com/';
    else if (rel === 'dist/404.html') url = 'https://fasttoolverse.com/404/';
    else {
      const slug = rel.replace(/^dist\//, '').replace(/\/index\.html$/, '');
      url = `https://fasttoolverse.com/${slug}/`;
    }

    noindexRoutes.push({ file: rel, url, isRedirectStub, robots: robotsMatch[1] });
    if (sitemapUrls.includes(url)) {
      noindexInSitemap.push(url);
    }
  }
}

const userFacingNoindex = noindexRoutes.filter(r => !r.isRedirectStub);
console.log(`Total HTML files in dist with noindex: ${noindexRoutes.length}`);
console.log(`  - Astro Redirect Stubs (expected noindex): ${noindexRoutes.filter(r => r.isRedirectStub).length}`);
console.log(`  - Real User-Facing Pages with noindex: ${userFacingNoindex.length}`);
console.log('User-Facing Pages with noindex:');
userFacingNoindex.forEach(r => console.log(`  * ${r.url} (File: ${r.file})`));
console.log(`Noindex pages mistakenly included in sitemap: ${noindexInSitemap.length}`);

// ----------------------------------------------------------------------
// STEP 5: THIN CONTENT & WORD COUNT AUDIT
// ----------------------------------------------------------------------
console.log('\n>>> STEP 5: THIN CONTENT & WORD COUNT AUDIT');

// Function to extract text from HTML and count words
function getWordCount(html) {
  // Remove script and style tags
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
  text = text.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ');
  // Remove header and footer to measure main content
  text = text.replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ');
  text = text.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ');
  // Remove all HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  // Clean entities & whitespace
  text = text.replace(/&[a-z0-9#]+;/gi, ' ');
  text = text.replace(/\s+/g, ' ').trim();
  const words = text ? text.split(/\s+/).filter(w => w.length > 0) : [];
  return { count: words.length, sampleText: words.slice(0, 30).join(' ') };
}

// Check all pages in dist (excluding redirect stubs and 404)
const contentAudit = [];
const thinContentPages = [];
const duplicateArticleSignatures = new Map();

for (const file of distHtmlFiles) {
  const rel = file.replace(/\\/g, '/');
  if (rel.includes('yandex_') || rel === 'dist/404.html') continue;
  const content = fs.readFileSync(file, 'utf-8');
  if (content.includes('http-equiv="refresh"')) continue;

  let url;
  if (rel === 'dist/index.html') url = 'https://fasttoolverse.com/';
  else {
    const slug = rel.replace(/^dist\//, '').replace(/\/index\.html$/, '');
    url = `https://fasttoolverse.com/${slug}/`;
  }

  const { count, sampleText } = getWordCount(content);
  
  // Extract article or editorial content if present
  const articleMatch = content.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  let articleWordCount = 0;
  if (articleMatch) {
    const cleanArticle = articleMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    articleWordCount = cleanArticle.split(/\s+/).filter(w => w.length > 0).length;
  }

  const item = { file: rel, url, totalWords: count, articleWordCount };
  contentAudit.push(item);

  if (count < 500) {
    thinContentPages.push(item);
  }
}

console.log(`Total live pages evaluated for content: ${contentAudit.length}`);
console.log(`Pages with LESS THAN 500 words of content: ${thinContentPages.length}`);
if (thinContentPages.length > 0) {
  console.log('Thin content pages (< 500 words):');
  thinContentPages.forEach(p => console.log(`  * ${p.url} -> Total Words: ${p.totalWords}, Article Words: ${p.articleWordCount}`));
}

// Distribution of word counts
const below500 = contentAudit.filter(p => p.totalWords < 500).length;
const between500and1000 = contentAudit.filter(p => p.totalWords >= 500 && p.totalWords < 1000).length;
const between1000and1500 = contentAudit.filter(p => p.totalWords >= 1000 && p.totalWords < 1500).length;
const above1500 = contentAudit.filter(p => p.totalWords >= 1500).length;

console.log('\nWord Count Distribution across all live pages:');
console.log(`- < 500 words: ${below500}`);
console.log(`- 500 - 999 words: ${between500and1000}`);
console.log(`- 1000 - 1499 words: ${between1000and1500}`);
console.log(`- 1500+ words: ${above1500}`);

console.log('\nAudit complete.');
