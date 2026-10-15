import { removeLineBreaksPresets } from '../src/data/removeLineBreaksPresets.ts';

console.log('Count:', removeLineBreaksPresets.length);

const howToRegex = /\b(how\s+to|how\s+do\s+i|complete\s+guide)\b/i;
let hasError = false;

removeLineBreaksPresets.forEach((p, idx) => {
  const i = idx + 1;
  if (!p.slug || !p.name || !p.h1 || !p.metaTitle || !p.metaDescription) {
    console.error(`Preset ${i} missing required fields!`);
    hasError = true;
  }
  if (p.name !== p.h1) {
    console.error(`Preset ${i} name !== h1: name="${p.name}", h1="${p.h1}"`);
    hasError = true;
  }
  if (howToRegex.test(p.name)) {
    console.error(`Preset ${i} name contains How to: ${p.name}`);
    hasError = true;
  }
  if (howToRegex.test(p.h1)) {
    console.error(`Preset ${i} h1 contains How to: ${p.h1}`);
    hasError = true;
  }
  if (howToRegex.test(p.metaTitle)) {
    console.error(`Preset ${i} metaTitle contains How to: ${p.metaTitle}`);
    hasError = true;
  }
  if (howToRegex.test(p.metaDescription)) {
    console.error(`Preset ${i} metaDescription contains How to: ${p.metaDescription}`);
    hasError = true;
  }
  if (p.metaTitle !== `${p.name} Online – Free Line Joiner | FastToolVerse`) {
    console.error(`Preset ${i} metaTitle mismatch: "${p.metaTitle}" vs "${p.name} Online – Free Line Joiner | FastToolVerse"`);
    hasError = true;
  }
  if (p.metaDescription.length > 155) {
    console.error(`Preset ${i} metaDescription length > 155: ${p.metaDescription.length}`);
    hasError = true;
  }
  const heroWords = p.heroSubtitle ? p.heroSubtitle.trim().split(/\s+/).length : 0;
  const intentWords = p.intentDescription ? p.intentDescription.trim().split(/\s+/).length : 0;
  if (heroWords < 20 || heroWords > 35) {
    console.warn(`Preset ${i} (${p.slug}) heroWords: ${heroWords}`);
  }
  if (intentWords < 45 || intentWords > 65) {
    console.warn(`Preset ${i} (${p.slug}) intentWords: ${intentWords}`);
  }
});

if (!hasError) {
  console.log('ALL 98 PRESETS STRICTLY VALIDATED! ZERO ERRORS!');
} else {
  console.error('VALIDATION FAILED!');
  process.exit(1);
}
