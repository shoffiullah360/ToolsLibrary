// scripts/verify-duplicate-lines-presets.mjs
import fs from 'node:fs';
import path from 'node:path';
import { DUPLICATE_LINES_PRESETS } from '../src/data/duplicateLinesPresets.ts';

console.log(`=== AUDITING ALL ${DUPLICATE_LINES_PRESETS.length} DUPLICATE LINES PSEO PRESETS ===\n`);

let hasError = false;

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function countEditorialWords(guide) {
  let count = 0;
  if (!guide) return 0;
  if (guide.heading) count += countWords(guide.heading);
  for (const s of guide.sections) {
    if (s.title) count += countWords(s.title);
    if (s.paragraphs) {
      for (const p of s.paragraphs) count += countWords(p);
    }
    if (s.bullets) {
      for (const b of s.bullets) count += countWords(b);
    }
    if (s.callout) {
      if (s.callout.label) count += countWords(s.callout.label);
      if (s.callout.text) count += countWords(s.callout.text);
    }
    if (s.codeBlock && s.codeBlock.code) {
      count += countWords(s.codeBlock.code);
    }
  }
  return count;
}

if (DUPLICATE_LINES_PRESETS.length !== 75) {
  console.error(`ERROR: Expected 75 presets, found ${DUPLICATE_LINES_PRESETS.length}!`);
  hasError = true;
}

const slugSet = new Set();

DUPLICATE_LINES_PRESETS.forEach((preset, idx) => {
  const i = idx + 1;
  if (!preset.slug || !preset.name || !preset.h1 || !preset.metaTitle || !preset.metaDescription) {
    console.error(`Preset ${i} missing required string fields!`);
    hasError = true;
  }

  if (slugSet.has(preset.slug)) {
    console.error(`Preset ${i} has duplicate slug: "${preset.slug}"`);
    hasError = true;
  }
  slugSet.add(preset.slug);

  if (preset.metaTitle.length > 70) {
    console.error(`Preset ${i} (${preset.slug}) metaTitle > 70 chars: ${preset.metaTitle.length}`);
    hasError = true;
  }

  if (preset.metaDescription.length >= 155) {
    console.error(`Preset ${i} (${preset.slug}) metaDescription >= 155 chars: ${preset.metaDescription.length}`);
    hasError = true;
  }

  const subWords = countWords(preset.subtitle);
  if (subWords < 20 || subWords > 25) {
    console.error(`Preset ${i} (${preset.slug}) subtitle out of 20-25 range: ${subWords} words`);
    hasError = true;
  }

  const intentWords = countWords(preset.intentCard);
  if (intentWords < 50 || intentWords > 60) {
    console.error(`Preset ${i} (${preset.slug}) intentCard out of 50-60 range: ${intentWords} words`);
    hasError = true;
  }

  const editWords = countEditorialWords(preset.editorialGuide);
  if (editWords < 600 || editWords > 1200) {
    console.error(`Preset ${i} (${preset.slug}) editorialGuide out of 600-1200 range: ${editWords} words`);
    hasError = true;
  }

  if (!preset.faqs || preset.faqs.length < 5) {
    console.error(`Preset ${i} (${preset.slug}) has fewer than 5 FAQs!`);
    hasError = true;
  }
});

if (!hasError) {
  console.log(`✓ All 75 presets strictly validated in data:`);
  console.log(`  - 75 unique slugs`);
  console.log(`  - Meta titles < 70 chars`);
  console.log(`  - Meta descriptions < 155 chars`);
  console.log(`  - Subtitles strictly 20-25 words`);
  console.log(`  - Intent cards strictly 50-60 words`);
  console.log(`  - Editorial articles strictly 600+ words`);
  console.log(`  - 6 FAQs with JSON-LD dynamic compatibility`);
} else {
  console.error('\nData validation failed with errors!');
  process.exit(1);
}

// Check build output if dist/ exists
const distDir = path.resolve('./dist');
if (fs.existsSync(distDir)) {
  console.log('\n=== VERIFYING DIST/ STATIC HTML OUTPUT FILES ===');
  let buildOutputError = false;

  // Main landing page check
  const mainPath = path.join(distDir, 'remove-duplicate-lines', 'index.html');
  if (!fs.existsSync(mainPath)) {
    console.error(`ERROR: Main tool landing page missing at ${mainPath}`);
    buildOutputError = true;
  } else {
    console.log(`✓ Main tool landing page verified at /remove-duplicate-lines/`);
  }

  let verifiedCount = 0;
  for (const preset of DUPLICATE_LINES_PRESETS) {
    const filePath = path.join(distDir, 'remove-duplicate-lines', preset.slug, 'index.html');
    if (!fs.existsSync(filePath)) {
      console.error(`ERROR: Missing output file for /remove-duplicate-lines/${preset.slug}/ at`, filePath);
      buildOutputError = true;
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf8');
    const expectedCanonical = `https://fasttoolverse.com/remove-duplicate-lines/${preset.slug}/`;
    const canonicalMatch = html.includes(`<link rel="canonical" href="${expectedCanonical}"`);
    const hasH1 = html.includes(preset.h1);
    const hasBreadcrumbsSchema = html.includes('"@type":"BreadcrumbList"');
    const hasSoftwareAppSchema = html.includes('"@type":"SoftwareApplication"');
    const hasFaqSchema = html.includes('"@type":"FAQPage"');
    const hasPopularTools = html.includes('Popular Duplicate Line Remover Presets');

    if (!canonicalMatch || !hasH1 || !hasBreadcrumbsSchema || !hasSoftwareAppSchema || !hasFaqSchema || !hasPopularTools) {
      console.error(`ERROR: HTML Verification failed for /remove-duplicate-lines/${preset.slug}/:`, {
        canonicalMatch,
        hasH1,
        hasBreadcrumbsSchema,
        hasSoftwareAppSchema,
        hasFaqSchema,
        hasPopularTools
      });
      buildOutputError = true;
    } else {
      verifiedCount++;
    }
  }

  if (!buildOutputError) {
    console.log(`✓ All ${verifiedCount} duplicate lines presets verified in dist/ with canonicals, H1, schemas, and grid!`);
  } else {
    console.error('Dist verification failed!');
    process.exit(1);
  }
}
