import { removeLineBreaksPresets } from '../src/data/removeLineBreaksPresets.ts';

const expectedConfigs = [
  {
    slug: 'how-to-remove-line-breaks-in-word',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'how to remove line breaks in word',
      'word remove line breaks',
      'remove line breaks in word',
      'remove line breaks from text',
      'remove line breaks online tool'
    ],
    expectedFaqs: [
      "What does the backward \"P\" symbol (¶) mean in Microsoft Word, and how do I turn it off?",
      "What is the difference between pressing Enter and pressing Shift + Enter in Word?",
      "Why did all my words get merged together without spaces after using Find and Replace?",
      "How do I remove line breaks in the Microsoft Word Web browser version where Ctrl + H has fewer features?",
      "Can I use the Find and Replace shortcut to replace line breaks with bulleted lists?"
    ]
  },
  {
    slug: 'remove-line-breaks-in-word',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks in word',
      'how to remove line breaks in word',
      'remove line breaks text formatting',
      'remove line breaks online',
      'remove line breaks'
    ],
    expectedFaqs: [
      "How do I remove line breaks from copied PDF text in Word without losing my actual paragraphs?",
      "Why does justified text look stretched out with huge gaps across words after a line break?",
      "How do I remove soft line breaks (`^l`) without affecting regular paragraph breaks (`^p`)?",
      "Can I set Word to automatically clean up line breaks whenever I paste external text?",
      "Does removing line breaks alter footnotes, endnotes, or comments inside a Word file?"
    ]
  },
  {
    slug: 'word-remove-line-breaks',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'word remove line breaks',
      'remove line breaks in word',
      'how to remove line breaks in word',
      'remove line breaks from text',
      'remove line breaks tool'
    ],
    expectedFaqs: [
      "How do I use Word Wildcards to remove line breaks that occur only in the middle of sentences?",
      "Why does Word say \"Special search characters are not supported in wildcard searches\" when I use ^p?",
      "How can I create a keyboard macro in Word to clean line breaks with a single keystroke?",
      "Will running a document-wide line break replacement affect tables and cell structures in Word?",
      "How can I remove line breaks from locked or restricted-editing Word forms?"
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
    // Normalize markdown backticks for comparison if needed
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
  console.log('\nAll Presets 10, 11, and 12 successfully verified and PASSED!');
}
