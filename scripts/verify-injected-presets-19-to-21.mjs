import { removeLineBreaksPresets } from '../src/data/removeLineBreaksPresets.ts';

const expectedConfigs = [
  {
    slug: 'python-remove-line-breaks-from-string',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'python remove line breaks from string',
      'remove line breaks from text',
      'remove line breaks',
      'remove line breaks online tool',
      'remove line breaks tool'
    ],
    expectedFaqs: [
      "Why does Python's .strip() fail to remove line breaks inside the middle of a sentence?",
      "What is the fastest method to strip line breaks from a multi-gigabyte text file in Python?",
      "How does `splitlines()` differ from `.split('\\n')` when handling legacy Mac `\\r` returns?",
      "How do I remove line breaks from string variables inside a Pandas DataFrame without causing SettingWithCopyWarning?",
      "What is the difference between string newline escaping (`\\\\n`) and raw newline characters (`\\n`) in Python?"
    ]
  },
  {
    slug: 'remove-line-breaks-javascript',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks javascript',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks text formatting',
      'remove line breaks'
    ],
    expectedFaqs: [
      "Why does my JavaScript regex `str.replace(/\\n/, ' ')` only remove the very first line break?",
      "How do I remove line breaks from a string without losing spaces between consecutive words?",
      "Can I remove line breaks from text directly on the clipboard using the modern Navigator Clipboard API?",
      "What is the difference between `\\r\\n` and `\\n` when matching strings in JavaScript across different browsers?",
      "How does JavaScript handle multi-line template literals when stripping internal indentation and returns?"
    ]
  },
  {
    slug: 'remove-line-breaks-typescript',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks typescript',
      'remove line breaks javascript',
      'remove line breaks from text',
      'remove line breaks tool',
      'remove line breaks'
    ],
    expectedFaqs: [
      "Can TypeScript detect or remove line breaks at compile time using types alone?",
      "How do I build a reusable TypeScript custom decorator to remove line breaks from API request bodies?",
      "What is the safest way to sanitize string properties inside an interface or type before database persistence?",
      "How do I use Zod schema validation to automatically strip line breaks from validated strings?",
      "Why does TypeScript throw a type error when attempting to split a generic string union containing newlines?"
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
  console.log('\nAll Presets 19, 20, and 21 successfully verified and PASSED!');
}
