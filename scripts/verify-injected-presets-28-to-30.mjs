import fs from 'fs';
import path from 'path';

const presetsFile = path.resolve('./src/data/removeLineBreaksPresets.ts');
const content = fs.readFileSync(presetsFile, 'utf8');

const targets = [
  {
    slug: 'remove-line-breaks-sqlite',
    num: 28,
    minWords: 1050,
    keywords: [
      'remove line breaks in sqlite',
      'remove line breaks sql',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks'
    ],
    faqs: [
      'Does SQLite support regular expressions natively to remove line breaks?',
      'Why does my SQLite database return a "database is locked" error during a mass line break cleanup?',
      'How can I remove line breaks from an SQLite database file directly on an Android or iOS device?',
      'What happens to full-text search indexes (FTS5) in SQLite when removing line breaks?',
      'How do I test the cleanup on a single row using SELECT before running UPDATE in the SQLite command line?'
    ]
  },
  {
    slug: 'remove-line-breaks-json',
    num: 29,
    minWords: 1050,
    keywords: [
      'remove line breaks json',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks tool',
      'remove line breaks text formatting'
    ],
    faqs: [
      'Why does my JSON parser throw a "Bad control character" error on strings with line breaks?',
      'How do I preserve a valid line break inside a JSON string without crashing the parser?',
      'Can I use jq on the command line to strip line breaks from all string fields in a JSON file?',
      'Why does JSON.stringify() sometimes generate escaped newlines that my frontend doesn\'t render properly?',
      'How can I safely clean raw text containing newlines before inserting it into a JSON template string?'
    ]
  },
  {
    slug: 'remove-line-breaks-xml',
    num: 30,
    minWords: 1050,
    keywords: [
      'remove line breaks xml',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks',
      'remove line breaks text formatting'
    ],
    faqs: [
      'What does the `normalize-space()` function in XPath / XSLT do to line breaks?',
      'Does the XML standard automatically convert Windows CRLF line breaks into Unix LF?',
      'How do I remove line breaks from text wrapped inside an XML CDATA section?',
      'Why does extra whitespace or line breaks between XML tags cause schema validation failures?',
      'How can I format and minify an XML file to remove all line breaks on the command line?'
    ]
  }
];

let allPassed = true;

for (const t of targets) {
  console.log(`\n========================================`);
  console.log(`CHECKING PRESET ${t.num}: ${t.slug}`);
  console.log(`========================================`);

  const slugIndex = content.indexOf(`"slug": "${t.slug}"`);
  if (slugIndex === -1) {
    console.error(`ERROR: Slug ${t.slug} not found!`);
    allPassed = false;
    continue;
  }

  // Find next preset or end
  const nextPreset = content.indexOf(`"slug": "`, slugIndex + 20);
  const block = nextPreset !== -1 ? content.slice(slugIndex, nextPreset) : content.slice(slugIndex);

  // Extract guide and faqs roughly for word count
  const words = block.match(/\b[A-Za-z0-9_'-]+\b/g) || [];
  console.log(`Total words in preset block: ${words.length}`);
  if (words.length < t.minWords) {
    console.error(`FAILED: Word count ${words.length} is below min ${t.minWords}`);
    allPassed = false;
  } else {
    console.log(`PASSED: Word count ${words.length} >= ${t.minWords}`);
  }

  const lowerBlock = block.toLowerCase();

  // Check keywords
  console.log(`--- Checking Keywords ---`);
  for (const kw of t.keywords) {
    if (lowerBlock.includes(kw.toLowerCase())) {
      console.log(`  [OK] Keyword found: "${kw}"`);
    } else {
      console.error(`  [FAIL] Keyword NOT found: "${kw}"`);
      allPassed = false;
    }
  }

  // Check FAQs
  console.log(`--- Checking FAQs ---`);
  for (const faq of t.faqs) {
    // Normalise quotes / backticks for check
    const simpleFaq = faq.replace(/[`'\\"]/g, '').toLowerCase();
    const simpleBlock = block.replace(/[`'\\"]/g, '').toLowerCase();
    if (simpleBlock.includes(simpleFaq)) {
      console.log(`  [OK] FAQ found: "${faq.slice(0, 50)}..."`);
    } else {
      console.error(`  [FAIL] FAQ NOT found: "${faq}"`);
      allPassed = false;
    }
  }
}

if (!allPassed) {
  console.error(`\nFAILED: Some checks did not pass.`);
  process.exit(1);
} else {
  console.log(`\nALL PRESETS 28, 29, 30 PASSED VERIFICATION!`);
}
