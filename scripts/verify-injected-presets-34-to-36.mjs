import fs from 'fs';
import path from 'path';

const presetsFile = path.resolve('./src/data/removeLineBreaksPresets.ts');
const content = fs.readFileSync(presetsFile, 'utf8');

const targets = [
  {
    slug: 'remove-line-breaks-latex',
    num: 34,
    minWords: 1050,
    keywords: [
      'remove line breaks latex',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks text formatting',
      'remove line breaks'
    ],
    faqs: [
      'Why does LaTeX ignore a single Enter key press in my source code?',
      'What causes the "Underfull \\hbox (badness 10000)" warning after inserting manual line breaks in LaTeX?',
      'How do I remove hard line breaks in copied text without breaking LaTeX equations that require `\\\\`?',
      'What is the difference between `\\newline`, `\\\\`, and `\\par` in LaTeX?',
      'How can I use regular expressions in Overleaf to clean up jagged paragraph lines?'
    ]
  },
  {
    slug: 'notepad-plus-plus-remove-line-breaks',
    num: 35,
    minWords: 1050,
    keywords: [
      'notepad++ remove line breaks',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks tool',
      'remove line breaks'
    ],
    faqs: [
      'What does the Ctrl + J shortcut do in Notepad++, and how does it handle word spacing?',
      'Why does Notepad++ have both "Extended" and "Regular Expression" modes in the Find and Replace dialog?',
      'How do I remove empty blank lines without removing line breaks between regular text rows in Notepad++',
      'How can I use a recorded Macro in Notepad++ to clean line breaks across multiple opened files at once?',
      'What is the difference between [CR][LF] and [LF] symbols shown in Notepad++ when "Show All Characters" is enabled?'
    ]
  },
  {
    slug: 'remove-line-breaks-vs-code',
    num: 36,
    minWords: 1050,
    keywords: [
      'remove line breaks in vs code',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks text formatting',
      'remove line breaks'
    ],
    faqs: [
      'What is the Command Palette shortcut to join broken lines together in VS Code?',
      'How do I enable regular expression search in VS Code Find and Replace?',
      'Why does VS Code show CRLF in the bottom status bar and how do I convert it to LF?',
      'How do I prevent Prettier or ESLint from automatically adding line breaks back after I remove them?',
      'How can I remove line breaks from a block of code without removing the indentation on subsequent lines?'
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
  console.log(`\nALL PRESETS 34, 35, 36 PASSED VERIFICATION!`);
}
