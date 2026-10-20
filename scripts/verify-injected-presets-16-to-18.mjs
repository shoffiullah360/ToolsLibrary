import { removeLineBreaksPresets } from '../src/data/removeLineBreaksPresets.ts';

const expectedConfigs = [
  {
    slug: 'remove-line-breaks-scrivener',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks in scrivener',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks tool',
      'remove line breaks'
    ],
    expectedFaqs: [
      "What does the \"Unwrap Lines\" tool do in Scrivener, and when should I use it?",
      "How do I remove unwanted line breaks across my entire novel binder at once?",
      "Will removing line breaks alter my scene character counts or word targets in Scrivener?",
      "How do I fix line breaks copied into Scrivener research folders from web archives?",
      "Why does my compiled Kindle eBook show strange gaps between sentences?"
    ]
  },
  {
    slug: 'remove-line-breaks-pdf',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks pdf',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks',
      'word remove line breaks'
    ],
    expectedFaqs: [
      "Why does copying text from a PDF insert an Enter key press at the end of every single line?",
      "How can I copy text from a two-column PDF without mixing up sentences across columns?",
      "Does removing line breaks from PDF copies delete hyphenated words that split across lines?",
      "How do I clean line breaks from PDF tables before pasting them into spreadsheets?",
      "What is the fastest way to extract and reformat raw text from a 100-page PDF report?"
    ]
  },
  {
    slug: 'remove-line-breaks-from-pdf-text',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks from pdf text',
      'remove line breaks pdf',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks text formatting'
    ],
    expectedFaqs: [
      "How do I reconnect hyphenated words that were split across two lines in a PDF?",
      "Why does OCR text from older scanned books contain random empty line returns?",
      "How can I paste PDF text into an email draft without triggering strange horizontal scrollbars?",
      "Can I remove line breaks from PDF text on an iPad or mobile phone?",
      "What settings in Adobe Acrobat help minimize hard line returns during text export?"
    ]
  }
];

function getFullText(article) {
  let full = article.heading + ' ';
  for (const s of article.sections) {
    full += s.title + ' ';
    full += s.paragraphs.join(' ') + ' ';
    if (s.bullets) full += s.bullets.join(' ') + ' ';
    if (s.callout) full += s.callout.label + ' ' + s.callout.text + ' ';
    if (s.codeBlock) full += s.codeBlock.language + ' ' + s.codeBlock.code + ' ';
  }
  return full;
}

let hasError = false;

for (const config of expectedConfigs) {
  const preset = removeLineBreaksPresets.find(p => p.slug === config.slug);
  if (!preset) {
    console.error(`ERROR: Preset not found for slug ${config.slug}`);
    hasError = true;
    continue;
  }

  const text = getFullText(preset.editorialGuide);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  console.log(`\n========================================`);
  console.log(`Preset: ${preset.slug}`);
  console.log(`Heading: "${preset.editorialGuide.heading}"`);
  console.log(`Word Count: ${wordCount} (Required >= ${config.minWords})`);

  if (wordCount < config.minWords) {
    console.error(`ERROR: Word count ${wordCount} is below requirement ${config.minWords}`);
    hasError = true;
  } else {
    console.log(`✓ Word count PASSED (${wordCount} words)`);
  }

  // Check keywords
  const lowerText = text.toLowerCase();
  for (const kw of config.keywords) {
    if (lowerText.includes(kw.toLowerCase())) {
      console.log(`✓ Keyword present: "${kw}"`);
    } else {
      console.error(`ERROR: Missing keyword: "${kw}"`);
      hasError = true;
    }
  }

  // Check FAQs
  console.log(`FAQ Count: ${preset.faqs.length}`);
  if (preset.faqs.length !== config.expectedFaqCount) {
    console.error(`ERROR: Expected ${config.expectedFaqCount} FAQs, found ${preset.faqs.length}`);
    hasError = true;
  } else {
    console.log(`✓ FAQ count PASSED (${preset.faqs.length} FAQs)`);
  }

  for (let i = 0; i < config.expectedFaqs.length; i++) {
    const expectedQ = config.expectedFaqs[i];
    const actualQ = preset.faqs[i]?.question;
    const normExpected = expectedQ.replace(/[`"]/g, '');
    const normActual = actualQ?.replace(/[`"]/g, '');
    if (actualQ === expectedQ || normActual === normExpected) {
      console.log(`✓ FAQ ${i + 1} Question matched: "${actualQ.slice(0, 50)}..."`);
    } else {
      console.error(`ERROR: FAQ ${i + 1} mismatch!\n  Expected: "${expectedQ}"\n  Found:    "${actualQ}"`);
      hasError = true;
    }
  }
}

if (hasError) {
  console.error('\nVerification FAILED with errors.');
  process.exit(1);
} else {
  console.log('\nAll Presets 16, 17, and 18 successfully verified and PASSED!');
}
