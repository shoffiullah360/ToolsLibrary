import fs from 'node:fs';
import path from 'node:path';
import { REMOVE_EMPTY_LINES_PRESETS } from '../src/data/removeEmptyLinesPresets.ts';

console.log(`=== AUDITING ALL ${REMOVE_EMPTY_LINES_PRESETS.length} REMOVE EMPTY LINES ROOT-LEVEL PSEO ROUTES ===`);

let allSuccess = true;

// 1. Verify main tool landing page is intact
const mainToolPath = path.join('./dist', 'remove-empty-lines', 'index.html');
if (!fs.existsSync(mainToolPath)) {
  console.error('ERROR: Main tool landing page missing at', mainToolPath);
  allSuccess = false;
} else {
  const mainHtml = fs.readFileSync(mainToolPath, 'utf8');
  if (!mainHtml.includes('<link rel="canonical" href="https://fasttoolverse.com/remove-empty-lines/"')) {
    console.error('ERROR: Main tool landing page canonical URL mismatch!');
    allSuccess = false;
  } else {
    console.log('✓ Main tool landing page verified at /remove-empty-lines/');
  }
}

// 2. Verify all 35 root-level pages
for (const preset of REMOVE_EMPTY_LINES_PRESETS) {
  const filePath = path.join('./dist', preset.slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: Missing output file for /${preset.slug}/ at`, filePath);
    allSuccess = false;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  const expectedCanonical = `https://fasttoolverse.com/${preset.slug}/`;
  const canonicalMatch = html.includes(`<link rel="canonical" href="${expectedCanonical}"`);
  const hasH1 = html.includes(preset.h1);
  const hasBreadcrumbsSchema = html.includes('"@type":"BreadcrumbList"');
  const hasSoftwareAppSchema = html.includes('"@type":"SoftwareApplication"');
  const hasFaqSchema = html.includes('"@type":"FAQPage"');
  const hasPopularTools = html.includes('Popular Empty Line Presets');

  if (!canonicalMatch || !hasH1 || !hasBreadcrumbsSchema || !hasSoftwareAppSchema || !hasFaqSchema || !hasPopularTools) {
    console.error(`ERROR: Verification failed for /${preset.slug}/:`, {
      canonicalMatch,
      hasH1,
      hasBreadcrumbsSchema,
      hasSoftwareAppSchema,
      hasFaqSchema,
      hasPopularTools
    });
    allSuccess = false;
  }
}

console.log(`✓ All ${REMOVE_EMPTY_LINES_PRESETS.length} presets verified in dist/ with canonicals, H1, schemas, and grid!`);

// 3. Verify sitemap
console.log('\n=== VERIFYING SITEMAP INCLUSION ===');
const sitemapPath = './dist/sitemap-0.xml';
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  for (const preset of REMOVE_EMPTY_LINES_PRESETS) {
    const targetUrl = `https://fasttoolverse.com/${preset.slug}/`;
    if (!sitemapContent.includes(targetUrl)) {
      console.error(`ERROR: ${targetUrl} missing in sitemap!`);
      allSuccess = false;
    }
  }
  console.log(`✓ All ${REMOVE_EMPTY_LINES_PRESETS.length} preset URLs found in sitemap with trailing slashes!`);
} else {
  console.error('Sitemap not found at', sitemapPath);
  allSuccess = false;
}

// 4. Verify _redirects
console.log('\n=== VERIFYING _REDIRECTS ===');
const redirectsPath = './dist/_redirects';
if (fs.existsSync(redirectsPath)) {
  const redirectsContent = fs.readFileSync(redirectsPath, 'utf8');
  if (redirectsContent.includes('/tools/remove-empty-lines/:slug/ /:slug/ 301')) {
    console.log('✓ Cloudflare _redirects contains 301 rules for /tools/remove-empty-lines/');
  } else {
    console.error('ERROR: _redirects missing rule');
    allSuccess = false;
  }
} else {
  console.error('ERROR: _redirects not copied to dist/');
  allSuccess = false;
}

if (!allSuccess) {
  console.error('\nVerification failed with errors!');
  process.exit(1);
}

console.log('\n=== ALL AUDIT CHECKS PASSED WITH 100% SUCCESS! ===');
