import { REMOVE_EMPTY_LINES_PRESETS } from '../src/data/removeEmptyLinesPresets.ts';

console.log('Total presets:', REMOVE_EMPTY_LINES_PRESETS.length);

const howToRegex = /\b(how\s+to|how\s+do\s+i|complete\s+guide)\b/i;
let hasError = false;

REMOVE_EMPTY_LINES_PRESETS.forEach((p, idx) => {
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
    console.error(`Preset ${i} name contains forbidden phrase: "${p.name}"`);
    hasError = true;
  }
  if (howToRegex.test(p.h1)) {
    console.error(`Preset ${i} h1 contains forbidden phrase: "${p.h1}"`);
    hasError = true;
  }
  if (howToRegex.test(p.metaTitle)) {
    console.error(`Preset ${i} metaTitle contains forbidden phrase: "${p.metaTitle}"`);
    hasError = true;
  }
  if (howToRegex.test(p.metaDescription)) {
    console.error(`Preset ${i} metaDescription contains forbidden phrase: "${p.metaDescription}"`);
    hasError = true;
  }
  const expectedMetaTitle = `${p.name} Online – Free Blank Line Remover | FastToolVerse`;
  if (p.metaTitle !== expectedMetaTitle) {
    console.error(`Preset ${i} metaTitle mismatch: "${p.metaTitle}" vs "${expectedMetaTitle}"`);
    hasError = true;
  }
  if (p.metaDescription.length > 155) {
    console.error(`Preset ${i} metaDescription length > 155: ${p.metaDescription.length}`);
    hasError = true;
  }
});

if (!hasError) {
  console.log('ALL 35 REMOVE EMPTY LINES PRESETS STRICTLY VALIDATED! ZERO ERRORS!');
} else {
  console.error('VALIDATION FAILED!');
  process.exit(1);
}
