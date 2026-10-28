import fs from 'fs';
import { removeLineBreaksPresets } from '../src/data/removeLineBreaksPresets.ts';
import { DUPLICATE_LINES_PRESETS } from '../src/data/duplicateLinesPresets.ts';
import { REMOVE_EMPTY_LINES_PRESETS } from '../src/data/removeEmptyLinesPresets.ts';
import { COMPRESS_PRESETS } from '../src/data/compressPresets.ts';
import { CONVERTER_PRESETS } from '../src/data/converterPresets.ts';
import rawResizerData from '../src/data/resizer-pages.json' with { type: 'json' };

console.log('--- VERIFYING EDITORIAL CONTENT IN PRESET DATA ---');

// 1. Line Breaks Presets (40)
let lbWithGuide = 0;
for (const p of removeLineBreaksPresets) {
  if (p.editorialGuide && (p.editorialGuide.sections?.length > 0 || p.editorialGuide.card1Title)) {
    lbWithGuide++;
  } else {
    console.log('Line Breaks Preset missing editorial:', p.slug);
  }
}
console.log(`Line Breaks: ${lbWithGuide} / ${removeLineBreaksPresets.length} have editorial guides`);

// 2. Duplicate Lines Presets (40)
let dlWithGuide = 0;
for (const p of DUPLICATE_LINES_PRESETS) {
  if (p.editorialArticle && (p.editorialArticle.sections?.length > 0 || p.editorialArticle.markdownContent)) {
    dlWithGuide++;
  } else if (p.editorialGuide && (p.editorialGuide.sections?.length > 0)) {
    dlWithGuide++;
  } else {
    // Check fields in DUPLICATE_LINES_PRESETS
    dlWithGuide++; // let's inspect structure below
  }
}
console.log(`Duplicate Lines presets total: ${DUPLICATE_LINES_PRESETS.length}`);

// 3. Remove Empty Lines Presets (35)
let elWithGuide = 0;
for (const p of REMOVE_EMPTY_LINES_PRESETS) {
  if (p.contentSections && p.contentSections.length > 0) {
    elWithGuide++;
  } else {
    console.log('Empty Lines Preset missing contentSections:', p.slug);
  }
}
console.log(`Remove Empty Lines: ${elWithGuide} / ${REMOVE_EMPTY_LINES_PRESETS.length} have contentSections`);

// 4. Compress Presets (60)
import { getCompressorEditorial } from '../src/data/compressorEditorials.ts';
let compWithEditorial = 0;
for (const p of COMPRESS_PRESETS) {
  const ed = getCompressorEditorial(p.slug);
  if (ed) compWithEditorial++;
  else console.log('Compress preset missing editorial:', p.slug);
}
console.log(`Compress Presets: ${compWithEditorial} / ${COMPRESS_PRESETS.length} have editorials`);

// 5. Converter Presets (86)
import { getConverterEditorial } from '../src/data/converterEditorials.ts';
let convWithEditorial = 0;
for (const p of CONVERTER_PRESETS) {
  const ed = getConverterEditorial(p.slug);
  if (ed) convWithEditorial++;
  else console.log('Converter preset missing editorial:', p.slug);
}
console.log(`Converter Presets: ${convWithEditorial} / ${CONVERTER_PRESETS.length} have editorials`);

// 6. Resizer Pages (67)
import { getResizerEditorial } from '../src/data/resizerEditorials.ts';
let resizerWithEditorial = 0;
for (const p of rawResizerData) {
  const ed = getResizerEditorial(p.slug);
  if (ed) resizerWithEditorial++;
  else {
    // Check if introCopy / faqs exist
    if (p.introCopy || p.introParagraph) resizerWithEditorial++;
  }
}
console.log(`Resizer Pages: ${resizerWithEditorial} / ${rawResizerData.length} have editorials/content`);
