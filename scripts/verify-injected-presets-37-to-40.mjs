import fs from 'fs';
import path from 'path';

const presetsFile = path.resolve('./src/data/removeLineBreaksPresets.ts');
const content = fs.readFileSync(presetsFile, 'utf8');

const targets = [
  {
    slug: 'remove-line-breaks-sublime-text',
    num: 37,
    minWords: 1050,
    keywords: [
      'remove line breaks in sublime text',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks text formatting',
      'remove line breaks'
    ],
    faqs: [
      'How does the Ctrl + J (Join Lines) shortcut work in Sublime Text compared to normal Backspace?',
      'Why does Sublime Text require enabling regular expression mode to search for "\\n"?',
      'How can I split a highlighted selection into multiple cursors to remove line breaks interactively?',
      'How do I switch a file from CRLF to LF line endings inside Sublime Text?',
      'Does Sublime Text have a package to automatically clean line breaks on pasting text?'
    ]
  },
  {
    slug: 'remove-line-breaks-vim',
    num: 38,
    minWords: 1050,
    keywords: [
      'remove line breaks in vim',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks tool',
      'remove line breaks'
    ],
    faqs: [
      'What is the difference between pressing "J" and "gJ" in Vim?',
      'Why does substituting with `\\n` in Vim create a null byte (`^@`) instead of a newline?',
      'How do I join 10 consecutive lines in Vim using a single keystroke?',
      'How can I remove line breaks in Vim only within a visually selected block of text?',
      'How does setting `fileformat=unix` solve Windows carriage return problems in Vim?'
    ]
  },
  {
    slug: 'regex-remove-line-breaks',
    num: 39,
    minWords: 1050,
    keywords: [
      'regex remove line breaks',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks text formatting',
      'remove line breaks'
    ],
    faqs: [
      'What is the single best regex pattern to match line breaks across both Windows and Linux?',
      'What does the `\\R` escape sequence represent in regular expression engines?',
      'How do I write a regex to remove single line breaks without destroying empty lines between paragraphs?',
      'Why does the regex dot `.` not match line break characters by default?',
      'How can I strip line breaks along with all surrounding tabs and spaces using a single regex pattern?'
    ]
  },
  {
    slug: 'remove-line-breaks-notion',
    num: 40,
    minWords: 1050,
    keywords: [
      'remove line breaks in notion',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks tool',
      'remove line breaks'
    ],
    faqs: [
      'Why does pasting text into Notion turn every sentence into a separate block?',
      'What is the difference between pressing Enter and Shift + Enter in Notion?',
      'How can I remove line breaks from multi-line records inside a Notion Database text property?',
      'How do I merge multiple separate Notion text blocks back into a single continuous paragraph?',
      'Can I use Notion Formulas 2.0 to automatically strip newlines from linked properties?'
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
  console.log(`\nALL PRESETS 37, 38, 39, 40 PASSED VERIFICATION!`);
}
