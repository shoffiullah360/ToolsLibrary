import fs from 'fs';
import path from 'path';

const presetsFile = path.resolve('./src/data/removeLineBreaksPresets.ts');
const content = fs.readFileSync(presetsFile, 'utf8');

const targets = [
  {
    slug: 'remove-line-breaks-yaml',
    num: 31,
    minWords: 1050,
    keywords: [
      'remove line breaks yaml',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks text formatting',
      'remove line breaks'
    ],
    faqs: [
      'What is the difference between `>` and `|` when dealing with line breaks in YAML?',
      'Why does my GitHub Actions workflow fail with a YAML parsing error when a script line breaks?',
      'How does the folded style indicator (`>-`) strip trailing newlines in YAML?',
      'How can I safely store a single-line API secret in a Kubernetes Secret YAML manifest?',
      'Will removing line breaks from a YAML file corrupt the structural indentation of my dictionary keys?'
    ]
  },
  {
    slug: 'remove-line-breaks-markdown',
    num: 32,
    minWords: 1050,
    keywords: [
      'remove line breaks markdown',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks tool',
      'remove line breaks'
    ],
    faqs: [
      'Why does my text in Markdown collapse into one continuous paragraph even though I pressed Enter?',
      'How do I remove line breaks in Markdown while keeping my bulleted list structure intact?',
      'What is the purpose of trailing spaces at the end of a Markdown line?',
      'How can I strip unwanted line breaks from my Obsidian notes without breaking internal wiki links?',
      'How do I remove hard line breaks from a README file so it wraps responsively on mobile screens?'
    ]
  },
  {
    slug: 'remove-line-breaks-html',
    num: 33,
    minWords: 1050,
    keywords: [
      'remove line breaks html',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks text formatting',
      'remove line breaks'
    ],
    faqs: [
      'Why does the browser ignore line breaks in my HTML source code unless I use `<br>`?',
      'What is the best regular expression to remove all `<br>` and `<br />` tags from an HTML file?',
      'How does CSS `white-space: pre-wrap` change the way browsers render source line breaks?',
      'Will minifying and removing line breaks from HTML affect SEO rankings?',
      'How do I remove line breaks inside an HTML table without collapsing the table rows and cells?'
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
  console.log(`\nALL PRESETS 31, 32, 33 PASSED VERIFICATION!`);
}
