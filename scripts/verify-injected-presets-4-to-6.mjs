import fs from 'fs';
import { removeLineBreaksPresets } from '../src/data/removeLineBreaksPresets.ts';

const p4 = removeLineBreaksPresets.find(p => p.slug === 'remove-line-breaks-in-excel-formula');
const p5 = removeLineBreaksPresets.find(p => p.slug === 'remove-line-breaks-excel-mac');
const p6 = removeLineBreaksPresets.find(p => p.slug === 'remove-line-breaks-google-sheets');

console.log('P4 heading:', p4.editorialGuide.heading, '| Sections:', p4.editorialGuide.sections.length, '| FAQs:', p4.faqs.length);
console.log('P5 heading:', p5.editorialGuide.heading, '| Sections:', p5.editorialGuide.sections.length, '| FAQs:', p5.faqs.length);
console.log('P6 heading:', p6.editorialGuide.heading, '| Sections:', p6.editorialGuide.sections.length, '| FAQs:', p6.faqs.length);

const checkKeywords = (preset, kws) => {
  const text = JSON.stringify(preset.editorialGuide).toLowerCase();
  let allFound = true;
  kws.forEach(kw => {
    const found = text.includes(kw.toLowerCase());
    console.log(`  [${found ? 'PASS' : 'FAIL'}] ${preset.slug} -> "${kw}"`);
    if (!found) allFound = false;
  });
  return allFound;
};

console.log('\nChecking P4 keywords in article:');
const p4Pass = checkKeywords(p4, [
  'remove line breaks in excel formula',
  'excel remove line breaks',
  'remove line breaks in excel',
  'remove line breaks from text',
  'excel remove line breaks in cell'
]);

console.log('\nChecking P5 keywords in article:');
const p5Pass = checkKeywords(p5, [
  'remove line breaks in excel mac',
  'how to remove line breaks in excel',
  'remove line breaks in excel',
  'remove line breaks online',
  'remove line breaks tool'
]);

console.log('\nChecking P6 keywords in article:');
const p6Pass = checkKeywords(p6, [
  'remove line breaks google sheets',
  'how to remove line breaks in google docs',
  'google docs remove line breaks',
  'remove line breaks from text',
  'remove line breaks online tool'
]);

console.log('\nChecking FAQs count:');
console.log('P4 FAQs:', p4.faqs.length === 5 ? 'EXACTLY 5 FAQs PASS' : 'FAIL');
console.log('P5 FAQs:', p5.faqs.length === 5 ? 'EXACTLY 5 FAQs PASS' : 'FAIL');
console.log('P6 FAQs:', p6.faqs.length === 5 ? 'EXACTLY 5 FAQs PASS' : 'FAIL');

if (!p4Pass || !p5Pass || !p6Pass || p4.faqs.length !== 5 || p5.faqs.length !== 5 || p6.faqs.length !== 5) {
  console.error('\nVALIDATION FAILED ON KEYWORDS OR FAQ COUNT!');
  process.exit(1);
}

console.log('\nVerifying dist HTML outputs for presets 4, 5, 6:');
const slugs = ['remove-line-breaks-in-excel-formula', 'remove-line-breaks-excel-mac', 'remove-line-breaks-google-sheets'];
for (const slug of slugs) {
  const htmlPath = `dist/${slug}/index.html`;
  if (!fs.existsSync(htmlPath)) {
    console.error(`Dist file missing: ${htmlPath}`);
    process.exit(1);
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const hasFaqSchema = html.includes('"@type":"FAQPage"');
  const hasGuideTitle = html.includes('The Formula Masterclass') || html.includes('Excel for Mac') || html.includes('Cleaning Google Sheets');
  console.log(`  [PASS] ${slug} -> HTML size: ${html.length} bytes | FAQ schema: ${hasFaqSchema} | Article heading: ${hasGuideTitle}`);
  if (!hasFaqSchema || !hasGuideTitle) {
    console.error(`Validation failed for dist HTML: ${slug}`);
    process.exit(1);
  }
}

console.log('\nALL CHECKS (SOURCE DATA, KEYWORDS, FAQS, DIST HTML, SCHEMA) PASSED 100% FOR PRESETS 4-6!');
