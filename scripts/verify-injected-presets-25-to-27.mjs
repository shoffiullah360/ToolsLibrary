import fs from 'fs';
import path from 'path';

const presetsFile = path.resolve('./src/data/removeLineBreaksPresets.ts');
const content = fs.readFileSync(presetsFile, 'utf8');

const targets = [
  {
    slug: 'remove-line-breaks-sql',
    num: 25,
    minWords: 1050,
    keywords: [
      'remove line breaks sql',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks',
      'excel remove line breaks'
    ],
    faqs: [
      'Why does my SQL query need two nested REPLACE functions just to remove one line break?',
      'Will removing line breaks from a database column invalidate existing foreign keys or unique constraints?',
      'How can I safely run an UPDATE statement to remove line breaks without locking the production table?',
      'How do I remove line breaks during a `SELECT` query without permanently altering the underlying raw data?',
      'Why do text columns with line breaks fail when exported via command-line database dumps (mysqldump / pg_dump)?'
    ]
  },
  {
    slug: 'remove-line-breaks-mysql',
    num: 26,
    minWords: 1050,
    keywords: [
      'remove line breaks in mysql',
      'remove line breaks sql',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks'
    ],
    faqs: [
      "What is the difference between replacing '\\n' and CHAR(10) in MySQL?",
      "Does removing line breaks in MySQL rebuild the table's indexes automatically?",
      'How do I use `REGEXP_REPLACE` in MySQL 8 to collapse multiple consecutive line breaks into a single space?',
      'How can I identify which rows in my MySQL table actually contain line breaks before running an update?',
      'Will stripping line breaks from `VARCHAR` columns reduce disk storage usage in InnoDB?'
    ]
  },
  {
    slug: 'remove-line-breaks-postgresql',
    num: 27,
    minWords: 1050,
    keywords: [
      'remove line breaks in postgresql',
      'remove line breaks sql',
      'remove line breaks from text',
      'remove line breaks tool',
      'remove line breaks'
    ],
    faqs: [
      "Why must I use the `E` prefix like `E'\\n'` when specifying line breaks in PostgreSQL?",
      'Is `translate()` faster than `regexp_replace()` in PostgreSQL when cleaning millions of rows?',
      'How can I remove line breaks from text fields inside a PostgreSQL JSONB column?',
      'Why does running a massive UPDATE to remove line breaks cause my PostgreSQL database size to double?',
      'How do I find all rows containing carriage returns in PostgreSQL using a WHERE clause?'
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
    const simpleFaq = faq.replace(/[`'\\]/g, '').toLowerCase();
    const simpleBlock = block.replace(/[`'\\]/g, '').toLowerCase();
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
  console.log(`\nALL PRESETS 25, 26, 27 PASSED VERIFICATION!`);
}
