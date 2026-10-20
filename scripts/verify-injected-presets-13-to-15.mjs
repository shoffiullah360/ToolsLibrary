import { removeLineBreaksPresets } from '../src/data/removeLineBreaksPresets.ts';

const expectedConfigs = [
  {
    slug: 'remove-line-breaks-google-docs',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks google docs',
      'google docs remove line breaks',
      'how to remove line breaks in google docs',
      'remove line breaks from text',
      'remove line breaks online'
    ],
    expectedFaqs: [
      "Why does my Google Doc create dozens of suggestion bubbles when I remove line breaks?",
      "Does removing line breaks in Google Docs clear bold, italics, or hyperlink formatting?",
      "How do I remove line breaks in a view-only Google Doc that I do not have permission to edit?",
      "Can I use Google Apps Script to automatically clean up line breaks across multiple Google Docs in Drive?",
      "How do I remove line breaks within bulleted and numbered lists without deleting the bullets?"
    ]
  },
  {
    slug: 'how-to-remove-line-breaks-in-google-docs',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'how to remove line breaks in google docs',
      'google docs remove line breaks',
      'remove line breaks google docs',
      'remove line breaks text formatting',
      'remove line breaks online tool'
    ],
    expectedFaqs: [
      "Can I remove line breaks in the Google Docs app on an iPhone or Android phone?",
      "Why does typing \"\\n\" in the Find box highlight the literal letters \"\\\" and \"n\" instead of line breaks?",
      "How do I remove line breaks inside Google Docs tables without merging the table cells?",
      "What is the difference between a soft line break (Shift + Enter) and a hard line break in Google Docs?",
      "How can I undo a Find and Replace action if I accidentally removed all paragraph breaks in my document?"
    ]
  },
  {
    slug: 'remove-line-breaks-apple-pages',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks in apple pages',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks tool',
      'remove line breaks'
    ],
    expectedFaqs: [
      "How do I make hidden line break characters visible in Apple Pages?",
      "What keyboard shortcut enters a line break into the Apple Pages Find & Replace search bar?",
      "How do I remove soft line breaks (Shift + Return) in Pages without deleting my main paragraph divisions?",
      "Does removing line breaks in Pages disrupt floating text boxes, shapes, or image wraps?",
      "Can I use Apple Shortcuts or Automator to clean line breaks across multiple Pages documents automatically?"
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
  console.log('\nAll Presets 13, 14, and 15 successfully verified and PASSED!');
}
