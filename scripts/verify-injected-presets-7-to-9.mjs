import { removeLineBreaksPresets } from '../src/data/removeLineBreaksPresets.ts';

const expectedConfigs = [
  {
    slug: 'remove-line-breaks-airtable',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks in airtable',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks tool',
      'remove line breaks'
    ],
    expectedFaqs: [
      "Why does my Airtable webhook fail or return invalid JSON when records contain line breaks?",
      "What is the formula difference between Single Line Text and Long Text field types when stripping breaks?",
      "Can I use the native Airtable Find & Replace extension to replace newlines with commas across hundreds of records?",
      "How do I prevent line breaks in Airtable from corrupting synced data in Notion, Google Sheets, or Webflow?",
      "Does converting a Long Text field to a Single Line Text field automatically delete internal line breaks?"
    ]
  },
  {
    slug: 'remove-line-breaks-csv',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks csv',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks',
      'excel remove line breaks'
    ],
    expectedFaqs: [
      "Why does importing my CSV into MySQL or PostgreSQL fail with \"Row 45 has wrong number of columns\"?",
      "How do I remove line breaks from a CSV file that is too large to open in Excel or Google Sheets?",
      "Will removing line breaks from a CSV accidentally delete the genuine line breaks that separate rows?",
      "What is the best regular expression to match line breaks only within quoted CSV fields?",
      "How does Python's csv library handle unescaped carriage returns compared to pandas?"
    ]
  },
  {
    slug: 'remove-line-breaks-libreoffice-calc',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks libreoffice calc',
      'how to remove line breaks in excel',
      'excel remove line breaks',
      'remove line breaks text formatting',
      'remove line breaks online'
    ],
    expectedFaqs: [
      "Why do I need to check \"Regular expressions\" in LibreOffice Calc just to find a basic line break?",
      "Why does LibreOffice Calc use a semicolon \";\" instead of a comma \",\" inside the SUBSTITUTE formula?",
      "How do I remove line breaks from multiple Calc sheets in the same ods workbook at once?",
      "What is the keyboard shortcut to insert an in-cell line break in LibreOffice Calc on Linux?",
      "Can LibreOffice Calc automatically convert multiline cells into separate individual rows?"
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
    if (actualQ === expectedQ) {
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
  console.log('\nAll Presets 7, 8, and 9 successfully verified and PASSED!');
}
