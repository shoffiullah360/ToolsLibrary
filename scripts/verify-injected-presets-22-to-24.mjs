import { removeLineBreaksPresets } from '../src/data/removeLineBreaksPresets.ts';

const expectedConfigs = [
  {
    slug: 'remove-line-breaks-php',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks php',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks text formatting',
      'remove line breaks'
    ],
    expectedFaqs: [
      "Why is `preg_replace('/\\R/', ' ', $string)` better than using `str_replace(\"\\n\", ' ', $string)` in PHP?",
      "How does removing line breaks protect against PHP email header injection (CRLF vulnerabilities)?",
      "Why does `PHP_EOL` fail to detect Windows line breaks when my PHP application runs on a Linux Ubuntu server?",
      "How do I remove line breaks from a multi-megabyte uploaded text file in PHP without exceeding memory limits?",
      "Can I use Laravel middleware to automatically strip line breaks from all incoming string request inputs?"
    ]
  },
  {
    slug: 'remove-line-breaks-java',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks java',
      'remove line breaks from text',
      'remove line breaks online',
      'remove line breaks tool',
      'remove line breaks'
    ],
    expectedFaqs: [
      "Why does using `replaceAll(\"\\\\R\", \" \")` work universally across Windows and Unix line endings in Java?",
      "How does String immutability in Java impact memory performance when stripping line breaks from large files?",
      "How can I use Java 11's `.lines()` method to remove single breaks while preserving double paragraph breaks?",
      "What is the fastest zero-allocation way to check if a Java string contains line breaks before modifying it?",
      "How do I configure Spring Boot to automatically sanitize multiline strings in JSON requests?"
    ]
  },
  {
    slug: 'remove-line-breaks-csharp',
    expectedFaqCount: 5,
    minWords: 1050,
    keywords: [
      'remove line breaks c#',
      'remove line breaks from text',
      'remove line breaks online tool',
      'remove line breaks text formatting',
      'remove line breaks'
    ],
    expectedFaqs: [
      "Why is `Environment.NewLine` not enough to remove all line breaks from strings in C#?",
      "How does using `Span<char>` improve performance when removing line breaks from large strings in .NET?",
      "Why should I use `RegexOptions.Compiled` or source-generated regular expressions when stripping line breaks in C#?",
      "How do I write a custom Entity Framework Core Value Converter to automatically clean line breaks on SaveChanges?",
      "How does C# handle multiline raw string literals ($\"\"\"...\"\"\") when sanitizing leading whitespace and returns?"
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
  console.log('\nAll Presets 22, 23, and 24 successfully verified and PASSED!');
}
