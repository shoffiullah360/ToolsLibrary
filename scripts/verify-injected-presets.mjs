import fs from 'fs';
import { removeLineBreaksPresets } from '../src/data/removeLineBreaksPresets.ts';

const p1 = removeLineBreaksPresets.find(p => p.slug === 'remove-line-breaks-in-excel');
const p2 = removeLineBreaksPresets.find(p => p.slug === 'how-to-remove-line-breaks-in-excel');
const p3 = removeLineBreaksPresets.find(p => p.slug === 'excel-remove-line-breaks-in-cell');

console.log('P1 heading:', p1.editorialGuide.heading, '| Sections:', p1.editorialGuide.sections.length, '| FAQs:', p1.faqs.length);
console.log('P2 heading:', p2.editorialGuide.heading, '| Sections:', p2.editorialGuide.sections.length, '| FAQs:', p2.faqs.length);
console.log('P3 heading:', p3.editorialGuide.heading, '| Sections:', p3.editorialGuide.sections.length, '| FAQs:', p3.faqs.length);

const checkKeywords = (preset, kws) => {
  const text = JSON.stringify(preset.editorialGuide).toLowerCase();
  kws.forEach(kw => {
    const found = text.includes(kw.toLowerCase());
    console.log(`  [${found ? 'PASS' : 'FAIL'}] ${preset.slug} -> "${kw}"`);
    if (!found) process.exit(1);
  });
};

console.log('\nChecking P1 keywords in article:');
checkKeywords(p1, [
  'remove line breaks in excel',
  'excel remove line breaks',
  'remove line breaks from text',
  'remove line breaks online tool',
  'remove line breaks tool'
]);

console.log('\nChecking P2 keywords in article:');
checkKeywords(p2, [
  'how to remove line breaks in excel',
  'excel remove line breaks',
  'remove line breaks in excel',
  'remove line breaks online',
  'remove line breaks text formatting'
]);

console.log('\nChecking P3 keywords in article:');
checkKeywords(p3, [
  'excel remove line breaks in cell',
  'remove line breaks in excel formula',
  'remove line breaks from text',
  'excel remove line breaks',
  'remove line breaks'
]);

console.log('\nChecking FAQs count:');
console.log('P1 FAQs:', p1.faqs.length === 5 ? 'EXACTLY 5 FAQs PASS' : 'FAIL');
console.log('P2 FAQs:', p2.faqs.length === 5 ? 'EXACTLY 5 FAQs PASS' : 'FAIL');
console.log('P3 FAQs:', p3.faqs.length === 5 ? 'EXACTLY 5 FAQs PASS' : 'FAIL');

if (p1.faqs.length !== 5 || p2.faqs.length !== 5 || p3.faqs.length !== 5) {
  process.exit(1);
}

console.log('\nVerifying dist HTML outputs:');
const slugs = ['remove-line-breaks-in-excel', 'how-to-remove-line-breaks-in-excel', 'excel-remove-line-breaks-in-cell'];
for (const slug of slugs) {
  const htmlPath = `dist/${slug}/index.html`;
  if (!fs.existsSync(htmlPath)) {
    console.error(`Dist file missing: ${htmlPath}`);
    process.exit(1);
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const hasFaqSchema = html.includes('"@type":"FAQPage"');
  const hasGuideTitle = html.includes('Definitive Technical Guide') || html.includes('Definitive Guide to Cleaning Spreadsheets') || html.includes('Step-by-Step Tutorial') || html.includes('Precision In-Cell Formatting');
  console.log(`  [PASS] ${slug} -> HTML size: ${html.length} bytes | FAQ schema: ${hasFaqSchema} | Article heading: ${hasGuideTitle}`);
  if (!hasFaqSchema || !hasGuideTitle) {
    console.error(`Validation failed for dist HTML: ${slug}`);
    process.exit(1);
  }
}

console.log('\nALL CHECKS (SOURCE DATA, KEYWORDS, FAQS, DIST HTML, SCHEMA) PASSED 100%!');
