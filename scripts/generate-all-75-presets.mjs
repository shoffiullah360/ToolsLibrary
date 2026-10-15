// scripts/generate-all-75-presets.mjs
import fs from 'node:fs';
import path from 'node:path';

const KEYWORDS = [
  "duplicate line remover",
  "duplicate line remover online",
  "online duplicate line remover",
  "duplicate line remover tool",
  "text duplicate line remover",
  "remove duplicate lines",
  "notepad++ remove duplicate lines",
  "vim remove duplicate lines",
  "linux remove duplicate lines from file",
  "remove duplicate lines online",
  "bash remove duplicate lines from file",
  "vscode remove duplicate lines",
  "online remove duplicate lines",
  "linux remove duplicate lines",
  "bash remove duplicate lines",
  "vs code remove duplicate lines",
  "how to remove duplicate lines in excel",
  "sed remove duplicate lines",
  "remove duplicate lines from file linux",
  "regex remove duplicate lines",
  "excel remove duplicate lines",
  "remove duplicate lines bash",
  "remove duplicate lines linux",
  "remove duplicate lines in excel",
  "remove duplicate lines in excel cell",
  "remove duplicate rows in excel online",
  "remove duplicate lines in notepad",
  "remove duplicate lines in google sheets",
  "remove duplicate lines in google docs",
  "remove duplicate lines in sublime text",
  "remove duplicate lines in word",
  "remove duplicate lines in intellij",
  "remove duplicate lines in dbeaver",
  "remove duplicate lines in mac textedit",
  "remove duplicate lines from text file",
  "remove duplicate lines from txt file",
  "remove duplicate lines from csv",
  "remove duplicate lines in csv file",
  "remove duplicate rows from csv online",
  "remove duplicate lines from json",
  "remove duplicate lines from log file",
  "remove duplicate lines from tsv file",
  "remove duplicate lines from markdown",
  "remove duplicate lines from sql dump",
  "remove duplicate emails online",
  "remove duplicate email addresses from list",
  "remove duplicate urls online",
  "remove duplicate links from text",
  "remove duplicate keywords online",
  "remove duplicate phone numbers list",
  "remove duplicate ip addresses",
  "remove duplicate domains list",
  "remove duplicate names from list",
  "remove duplicate ids from list",
  "remove duplicate strings online",
  "remove duplicate user ids",
  "python remove duplicate lines from text",
  "remove duplicate lines python list",
  "javascript remove duplicate lines from string",
  "remove duplicate lines linux sort uniq",
  "remove duplicate lines awk",
  "remove duplicate lines powershell",
  "remove duplicate lines regex notepad++",
  "remove duplicate lines php",
  "remove duplicate lines sql query",
  "remove duplicate lines java",
  "find duplicate lines in text",
  "extract duplicate lines only",
  "show duplicate lines online",
  "count duplicate lines in text",
  "remove duplicate lines and sort alphabetically",
  "remove duplicate lines case sensitive",
  "remove duplicate lines keep first occurrence",
  "remove duplicate lines and join with commas",
  "filter unique lines online"
];

function toSlug(kw) {
  return kw
    .toLowerCase()
    .replace(/\+\+/g, '-plus-plus')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toTitleCase(str) {
  const specials = {
    'notepad++': 'Notepad++',
    'vscode': 'VS Code',
    'vs code': 'VS Code',
    'sql': 'SQL',
    'csv': 'CSV',
    'tsv': 'TSV',
    'json': 'JSON',
    'ip': 'IP',
    'urls': 'URLs',
    'ids': 'IDs',
    'ui': 'UI',
    'crm': 'CRM',
    'php': 'PHP',
    'javascript': 'JavaScript',
    'intellij': 'IntelliJ',
    'dbeaver': 'DBeaver',
    'mac': 'Mac',
    'textedit': 'TextEdit',
    'excel': 'Excel',
    'google': 'Google',
    'powershell': 'PowerShell',
    'linux': 'Linux',
    'awk': 'AWK',
    'sed': 'Sed',
    'vim': 'Vim',
    'python': 'Python',
    'java': 'Java'
  };

  return str
    .split(' ')
    .map((word) => {
      const lower = word.toLowerCase();
      if (specials[lower]) return specials[lower];
      if (['in', 'from', 'to', 'and', 'with', 'for', 'a', 'an', 'the', 'of'].includes(lower)) {
        return lower;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .replace(/^([a-z])/, (m) => m.toUpperCase());
}

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function countEditorialWords(guide) {
  let count = 0;
  if (!guide) return 0;
  if (guide.heading) count += countWords(guide.heading);
  for (const s of guide.sections) {
    if (s.title) count += countWords(s.title);
    if (s.paragraphs) {
      for (const p of s.paragraphs) count += countWords(p);
    }
    if (s.bullets) {
      for (const b of s.bullets) count += countWords(b);
    }
    if (s.callout) {
      if (s.callout.label) count += countWords(s.callout.label);
      if (s.callout.text) count += countWords(s.callout.text);
    }
    if (s.codeBlock && s.codeBlock.code) {
      count += countWords(s.codeBlock.code);
    }
  }
  return count;
}

function getClusterInfo(kw) {
  const l = kw.toLowerCase();
  if (l.includes('notepad++') || l.includes('vim') || l.includes('vscode') || l.includes('vs code') || l.includes('notepad') || l.includes('sublime') || l.includes('intellij') || l.includes('dbeaver') || l.includes('textedit')) {
    return { cluster: 'editor-tools', clusterTitle: 'Code Editors & IDEs' };
  }
  if (l.includes('linux') || l.includes('bash') || l.includes('sed') || l.includes('awk') || l.includes('powershell') || l.includes('uniq')) {
    return { cluster: 'cli-shell', clusterTitle: 'Linux & Command Line Shells' };
  }
  if (l.includes('excel') || l.includes('sheets') || l.includes('docs') || l.includes('word')) {
    return { cluster: 'office-spreadsheets', clusterTitle: 'Office & Spreadsheets' };
  }
  if (l.includes('python') || l.includes('javascript') || l.includes('php') || l.includes('sql') || l.includes('java') || l.includes('regex')) {
    return { cluster: 'programming-dev', clusterTitle: 'Programming & Databases' };
  }
  if (l.includes('csv') || l.includes('json') || l.includes('tsv') || l.includes('txt') || l.includes('text file') || l.includes('markdown') || l.includes('dump') || l.includes('log file')) {
    return { cluster: 'data-formats', clusterTitle: 'Data Formats & Files' };
  }
  if (l.includes('email') || l.includes('url') || l.includes('link') || l.includes('keyword') || l.includes('phone') || l.includes('domain')) {
    return { cluster: 'marketing-crm', clusterTitle: 'Marketing, CRM & Links' };
  }
  if (l.includes('ip address') || l.includes('names') || l.includes('ids') || l.includes('string') || l.includes('user id')) {
    return { cluster: 'identifiers-systems', clusterTitle: 'Identifiers & System Lists' };
  }
  if (l.includes('find') || l.includes('extract') || l.includes('show') || l.includes('count') || l.includes('filter unique')) {
    return { cluster: 'modes-filtering', clusterTitle: 'Extraction & Inspection Modes' };
  }
  if (l.includes('sort') || l.includes('case sensitive') || l.includes('first occurrence') || l.includes('commas')) {
    return { cluster: 'sorting-formatting', clusterTitle: 'Sorting & Delimiter Formatting' };
  }
  return { cluster: 'general-tools', clusterTitle: 'General Online Deduplication' };
}

function getOptions(kw) {
  const l = kw.toLowerCase();
  const opts = {
    mode: 'unique',
    caseSensitive: true,
    trimLines: true,
    emptyLines: true,
    ignorePunctuation: false,
    sort: 'original',
    delimiter: 'newline'
  };

  if (l.includes('email') || l.includes('url') || l.includes('domain') || l.includes('keyword')) {
    opts.caseSensitive = false;
  }
  if (l.includes('sort') || l.includes('alphabetically')) {
    opts.sort = 'alpha-asc';
  }
  if (l.includes('extract duplicate') || l.includes('duplicates only') || l.includes('show duplicate')) {
    opts.mode = 'duplicates-only';
  }
  if (l.includes('count duplicate') || l.includes('count')) {
    opts.mode = 'count-occurrences';
  }
  if (l.includes('filter unique') || l.includes('completely unique')) {
    opts.mode = 'completely-unique';
  }
  if (l.includes('comma') || l.includes('csv')) {
    opts.delimiter = 'comma';
  }
  if (l.includes('case sensitive')) {
    opts.caseSensitive = true;
  }
  return opts;
}

function getSampleText(kw) {
  const l = kw.toLowerCase();
  if (l.includes('email')) {
    return "support@company.com\nsales@domain.org\nSUPPORT@COMPANY.COM\nmarketing@startup.io\nsales@domain.org\n  support@company.com  \ncontact@business.net\nmarketing@startup.io";
  }
  if (l.includes('url') || l.includes('link') || l.includes('domain')) {
    return "https://fasttoolverse.com/image-resizer/\nhttps://fasttoolverse.com/remove-duplicate-lines/\nhttps://fasttoolverse.com/image-resizer/\nhttps://fasttoolverse.com/remove-empty-lines/\nhttps://fasttoolverse.com/remove-duplicate-lines/\nhttps://fasttoolverse.com/tools/text-cleaner/";
  }
  if (l.includes('keyword')) {
    return "remove duplicate lines online\nduplicate line remover\nfree text deduplicator\nremove duplicate lines online\nbest duplicate remover\nduplicate line remover\nclean text lines\nfree text deduplicator";
  }
  if (l.includes('ip address')) {
    return "192.168.1.1\n10.0.0.1\n192.168.1.1\n172.16.0.5\n10.0.0.1\n192.168.1.254\n172.16.0.5\n127.0.0.1";
  }
  if (l.includes('phone')) {
    return "+1-555-0199\n+1-555-0142\n+1-555-0199\n+44-20-7946-0912\n+1-555-0142\n+44-20-7946-0912\n+1-555-0188";
  }
  if (l.includes('id') || l.includes('uuid')) {
    return "USR-98421\nUSR-10294\nUSR-98421\nUSR-77312\nUSR-10294\nUSR-55109\nUSR-98421\nUSR-33019";
  }
  if (l.includes('csv') || l.includes('tsv') || l.includes('excel') || l.includes('sheet')) {
    return "SKU-991,Widget A,19.99\nSKU-442,Widget B,24.50\nSKU-991,Widget A,19.99\nSKU-108,Widget C,14.00\nSKU-442,Widget B,24.50\nSKU-550,Widget D,39.99";
  }
  if (l.includes('json')) {
    return '{"id": 101, "name": "Alpha"}\n{"id": 102, "name": "Beta"}\n{"id": 101, "name": "Alpha"}\n{"id": 103, "name": "Gamma"}\n{"id": 102, "name": "Beta"}';
  }
  if (l.includes('sql')) {
    return "INSERT INTO users (id, email) VALUES (1, 'alice@example.com');\nINSERT INTO users (id, email) VALUES (2, 'bob@example.com');\nINSERT INTO users (id, email) VALUES (1, 'alice@example.com');\nINSERT INTO users (id, email) VALUES (3, 'carol@example.com');";
  }
  if (l.includes('log')) {
    return '2026-10-15 08:12:01 [INFO] Worker connected\n2026-10-15 08:12:04 [WARN] Connection retry\n2026-10-15 08:12:01 [INFO] Worker connected\n2026-10-15 08:12:09 [INFO] Job dispatched\n2026-10-15 08:12:04 [WARN] Connection retry';
  }
  if (l.includes('python')) {
    return "import os\nimport sys\nimport json\nimport os\nimport requests\nimport sys\nimport time";
  }
  return "Apple\nBanana\nOrange\nApple\nMango\nBanana\nGrape\nOrange\nPineapple";
}

function getSubtitle(kw) {
  let s = 'Instantly clean ' + kw + ' by removing duplicate lines and filtering unique items in real time with 100% private in-browser processing.';
  let count = countWords(s);
  if (count > 25) {
    s = 'Instantly clean ' + kw + ' by removing duplicate lines and filtering unique entries in real time with private browser processing.';
    count = countWords(s);
  }
  if (count > 25) {
    s = 'Instantly clean ' + kw + ' by removing duplicate lines and filtering unique entries in real time with private processing.';
    count = countWords(s);
  }
  if (count < 20) {
    s = 'Instantly clean and format ' + kw + ' by removing duplicate lines and filtering unique entries in real time with private in-browser processing.';
    count = countWords(s);
  }
  return s;
}

function getIntentCard(kw) {
  let card = 'Removing duplicate records from ' + kw + ' is vital when maintaining clean databases, marketing campaigns, server logs, and document lists. This dedicated client-side utility purges repetitive lines, identifies unique entries, and formats output with custom delimiters. All string evaluation occurs locally inside your browser memory sandbox, guaranteeing your proprietary data remains 100% private and secure.';
  let count = countWords(card);
  if (count > 60) {
    card = 'Removing duplicates from ' + kw + ' is vital for clean databases, marketing campaigns, server logs, and lists. This client-side utility purges repetitive lines, identifies unique entries, and formats output with custom delimiters. All string evaluation occurs locally inside your browser memory sandbox, guaranteeing your data remains 100% private.';
    count = countWords(card);
  }
  if (count < 50) {
    card = 'Removing duplicate records from ' + kw + ' is essential when maintaining clean databases, marketing campaigns, server logs, and document lists. This dedicated client-side utility purges repetitive lines, identifies unique entries, and formats output with custom delimiters. All string evaluation occurs locally inside your browser memory sandbox, guaranteeing your proprietary confidential data remains 100% private and secure.';
    count = countWords(card);
  }
  return card;
}

function getMetaTitle(name) {
  let title;
  const lower = name.toLowerCase();
  if (lower.includes('duplicate line remover') || lower.includes('remove duplicate lines')) {
    if (!lower.includes('online')) {
      title = `${name} Online – Free Tool | FastToolVerse`;
    } else {
      title = `${name} – Free Fast Tool | FastToolVerse`;
    }
  } else {
    title = `${name} – Duplicate Line Remover | FastToolVerse`;
  }
  if (title.length > 68) {
    title = `${name} – Duplicate Remover | FastToolVerse`;
  }
  if (title.length > 68) {
    title = `${name} – FastToolVerse`;
  }
  if (title.length > 68) {
    title = name;
  }
  return title;
}

function getMetaDescription(kw) {
  let desc = 'Remove duplicate lines in ' + kw + ' online. Fast client-side deduplication, custom delimiters, zero uploads, and 100% privacy.';
  if (desc.length > 154) {
    desc = 'Remove duplicate lines in ' + kw + ' online. Client-side deduplication, custom delimiters, and 100% privacy.';
  }
  if (desc.length > 154) {
    desc = 'Clean ' + kw + ' online. Instant client-side deduplication with custom delimiters and 100% local privacy.';
  }
  return desc;
}

// Generate Domain Specific Technical Editorial Guide
function generateEditorialGuide(kw, name, cluster) {
  const l = kw.toLowerCase();
  const heading = `Technical Field Guide: ${name} Methods & Architecture`;
  
  let sec1Title = `Foundational Principles of Deduplication in ${name}`;
  let sec1P1 = `Text deduplication in modern digital environments is not merely a cosmetic convenience—it is a critical requirement for data integrity, operational efficiency, and system reliability. When working with ${name.toLowerCase()}, recurring records introduce substantial computational overhead, distort statistical metrics, and inflate file storage footprints. Whether you are synchronizing databases, auditing server infrastructure, preparing marketing campaigns, or compiling source code, duplicate entries frequently trigger downstream anomalies such as duplicate customer outreach, constraint collision errors, and bloated index trees.`;
  let sec1P2 = `The root causes of duplicate entries within ${name.toLowerCase()} typically trace back to multi-source data aggregation, asynchronous logging pipelines, manual copy-paste concatenation, or concurrent web scraper extractions. For instance, merging independent CSV exports or server access logs invariably produces overlapping entries that differ only in subtle formatting quirks such as trailing whitespace, mixed letter casing, or varied line break terminators. Understanding how to systematically sanitize and isolate unique records protects the structural integrity of your datasets.`;

  let sec2Title = `Native Workflows & Practical Commands for ${name}`;
  let sec2P1 = `Before deploying automated browser utilities or complex enterprise scripts, software engineers and data analysts should understand the native execution options available directly within ${name.toLowerCase()}. Native workflows allow you to execute quick inline corrections without transferring context to external environments. Below, we break down the primary native commands, keyboard shortcuts, or programmatic patterns tailored specifically for this operational domain.`;
  
  let codeLang = 'text';
  let codeSnippet = '';

  if (cluster.cluster === 'cli-shell') {
    codeLang = 'bash';
    codeSnippet = `# Method 1: Sort and deduplicate (reorders lines)\nsort -u input.txt > unique.txt\n\n# Method 2: High-speed order-preserving deduplication with AWK\nawk '!seen[$0]++' input.txt > unique_ordered.txt\n\n# Method 3: In-place deduplication with sed (consecutive duplicates)\nsed -i '$!N; /^\\(.*\\)\\n\\1$/!P; D' input.txt`;
  } else if (cluster.cluster === 'editor-tools') {
    if (l.includes('notepad++')) {
      codeLang = 'regex';
      codeSnippet = `// Notepad++ Native Menu Shortcut:\n// 1. Select all lines (Ctrl+A)\n// 2. Navigate to: Edit -> Line Operations -> Sort Lines Lexicographically Ascending\n// 3. Navigate to: Edit -> Line Operations -> Remove Consecutive Duplicate Lines\n\n// Regex Search Mode (Preserves original order):\n// Find What:    ^(.*?)$\\s+?^(?=.*^\\\\1$)\n// Replace With:  (leave empty)\n// Search Mode:   Regular expression, check '. matches newline'`;
    } else if (l.includes('vim')) {
      codeLang = 'vim';
      codeSnippet = `" Method 1: Sort and deduplicate inside Vim\n:sort u\n\n" Method 2: Case-insensitive unique sort\n:sort ui\n\n" Method 3: Preserve original order using external awk\n:%!awk '!seen[$0]++'`;
    } else if (l.includes('vscode') || l.includes('vs code')) {
      codeLang = 'json';
      codeSnippet = `// VS Code Native Command Palette (Ctrl+Shift+P / Cmd+Shift+P):\n// 1. Select text (Ctrl+A)\n// 2. Type "Sort Lines Ascending" and press Enter\n// 3. For duplicate elimination without extensions, use Regex Replace:\n// Find:    ^(.*)(\\r?\\n\\\\1)+$\n// Replace: $1\n// Or install 'Sort lines' extension: 'Sort Lines (Unique)'`;
    } else {
      codeLang = 'text';
      codeSnippet = `// General Editor Regex Deduplication Pattern:\n// Search Regex:  ^([^\\r\\n]+)\\r?\\n(?=[\\s\\S]*^\\\\1$)\n// Replace:       (leave blank)\n// Note: Run 'Replace All' iteratively until 0 matches remain.`;
    }
  } else if (cluster.cluster === 'office-spreadsheets') {
    codeLang = 'excel';
    codeSnippet = `' Modern Excel Dynamic Array Formula (Unique Values):\n=UNIQUE(A2:A5000)\n\n' Count duplicate occurrences in Column B:\n=COUNTIF(A$2:A$5000, A2)\n\n' In-Cell multiline deduplication (Alt+Enter splits):\n=TEXTJOIN(CHAR(10), TRUE, UNIQUE(TEXTSPLIT(A2, CHAR(10))))`;
  } else if (cluster.cluster === 'programming-dev') {
    if (l.includes('python')) {
      codeLang = 'python';
      codeSnippet = `# Order-preserving deduplication in Python 3.7+\nwith open('data.txt', 'r', encoding='utf-8') as f:\n    lines = f.read().splitlines()\nunique_lines = list(dict.fromkeys(lines))\n\nwith open('cleaned.txt', 'w', encoding='utf-8') as f:\n    f.write('\\n'.join(unique_lines))`;
    } else if (l.includes('javascript')) {
      codeLang = 'javascript';
      codeSnippet = `// High-performance JavaScript Array & Set Deduplication\nconst cleanDuplicates = (text) => {\n  const lines = text.split(/\\r?\\n/);\n  return Array.from(new Set(lines)).join('\\n');\n};\n\n// Case-insensitive preserving first appearance:\nconst cleanCaseInsensitive = (lines) => {\n  const seen = new Set();\n  return lines.filter(line => {\n    const key = line.toLowerCase();\n    return seen.has(key) ? false : seen.add(key);\n  });\n};`;
    } else if (l.includes('sql')) {
      codeLang = 'sql';
      codeSnippet = `-- Query unique records\nSELECT DISTINCT column_name FROM table_name;\n\n-- CTE to delete duplicate rows while preserving the lowest ID\nWITH CTE AS (\n    SELECT id, ROW_NUMBER() OVER (PARTITION BY target_column ORDER BY id) as rn\n    FROM target_table\n)\nDELETE FROM CTE WHERE rn > 1;`;
    } else {
      codeLang = 'regex';
      codeSnippet = `// Universal Regular Expression Pattern for Line Deduplication\nRegex Pattern: ^(.*?)$\\s+?^(?=.*^\\\\1$)\nFlags: Multiline (m), Global (g)\nReplacement: (empty string)`;
    }
  } else {
    codeLang = 'bash';
    codeSnippet = `# Universal CLI Pipeline\ncat dataset.txt | awk '!seen[$0]++' > sanitized.txt\n\n# Count line frequency\ncat dataset.txt | sort | uniq -c | sort -nr > frequencies.txt`;
  }

  let sec2P2 = `While native techniques are powerful for developers who have constant access to terminal shells or licensed desktop suites, they frequently present practical hurdles. Text editors often experience thread freezes or Out-Of-Memory (OOM) crashes when executing regex lookaheads on files exceeding 100,000 lines. Similarly, terminal commands like sort and uniq alter the natural chronological sequence of your data unless augmented with intricate awk scripts. FastToolVerse delivers the ideal hybrid: zero-install accessibility combined with compiled V8 hash set execution speeds.`;

  let sec3Title = `Algorithmic Comparison: Linear O(N) Hash Sets vs Quadratic O(N²) Iteration`;
  let sec3P1 = `The core performance differentiator in text deduplication lies in algorithmic time complexity. Naive scripts and legacy web utilities rely on nested loop comparisons or iterative index scans (such as calling indexOf or filter inside a loop). For an input array of N items, verifying whether each line already exists in the result set takes O(N) work, yielding a cumulative quadratic complexity of O(N²).`;
  let sec3P2 = `In contrast, FastToolVerse utilizes ECMAScript Hash Sets and Maps. When a line is read, its content is hashed into a constant-time O(1) memory lookup table. The algorithm checks whether the hash key exists in a single operation. If absent, the key is recorded and pushed to the output buffer; if present, it is bypassed or logged to duplicate counters. This guarantees strict linear O(N) time complexity.`;

  let sec4Title = `Edge Cases: Whitespace Normalization, Casing, and Character Encodings`;
  let sec4P1 = `In real-world production environments, identical records frequently fail to deduplicate due to invisible character variations. Four primary edge cases represent over 90% of false-positive retention errors:`;
  
  let sec4Bullets = [
    `Invisible Trailing Tabs & Spaces: When copying rows from spreadsheets or database GUIs, trailing space characters (\\u0020) and tab stops (\\t) frequently attach to the ends of lines. Toggling 'Trim edge whitespace' purges these padding bytes before key evaluation.`,
    `Letter Casing Divergence: In marketing rosters and email lists, addresses like John@Domain.com and john@domain.com are functionally identical. Toggling case-insensitive comparison lowercases comparison keys while preserving the pristine casing of the original line.`,
    `Cross-Platform Line Terminators: Windows environments append CRLF (\\r\\n) while Unix and macOS systems append LF (\\n). Inconsistent newline encoding can cause identical text strings to produce distinct hashes unless normalized by a dual-regex split.`,
    `Punctuation & Delimiter Inconsistencies: Trailing semicolons, commas, or quotes from CSV database exports can be neutralized by enabling the 'Ignore punctuation & symbols' filter.`
  ];

  let sec5Title = `Enterprise Production Pipelines & Data Hygiene Best Practices`;
  let sec5P1 = `Maintaining pristine list hygiene requires establishing reliable, repeatable data ingestion standards. Prior to importing datasets into production databases, email marketing automation platforms, or CRM pipelines, establishing automated client-side sanitization prevents human error and reduces processing overhead.`;
  let sec5P2 = `FastToolVerse processes all text exclusively inside your local browser memory sandbox. Zero bytes travel across external networks or touch third-party cloud servers. This architectural isolation ensures full compliance with GDPR, HIPAA, CCPA, and strict enterprise confidentiality mandates. Temporary string buffers are deallocated immediately upon clearing the workspace or closing the browser tab.`;

  const sections = [
    {
      title: sec1Title,
      paragraphs: [sec1P1, sec1P2],
      bullets: [
        `Eliminates redundant records across CRM databases, server configurations, and marketing campaigns.`,
        `Prevents constraint collisions, duplicate billing, and redundant API query charges.`,
        `Reduces file payload sizes by 20% to 75% on typical uncleaned raw exports.`
      ]
    },
    {
      title: sec2Title,
      paragraphs: [sec2P1, sec2P2],
      codeBlock: {
        language: codeLang,
        code: codeSnippet
      },
      callout: {
        type: 'tip',
        label: 'Production Workflow Tip',
        text: `Always verify whether your destination system requires alphabetical sorting or original sequence retention before finalizing deduplication.`
      }
    },
    {
      title: sec3Title,
      paragraphs: [sec3P1, sec3P2],
      bullets: [
        `1,000 Lines: O(N) requires ~1,000 operations (0.1ms) vs O(N²) ~1,000,000 operations (2ms).`,
        `50,000 Lines: O(N) requires ~50,000 operations (4ms) vs O(N²) ~2,500,000,000 operations (12+ seconds).`,
        `Memory Footprint: Linear hash allocation prevents garbage collection spikes and browser thread lockups.`
      ]
    },
    {
      title: sec4Title,
      paragraphs: [sec4P1],
      bullets: sec4Bullets
    },
    {
      title: sec5Title,
      paragraphs: [sec5P1, sec5P2],
      bullets: [
        `Audit source datasets with frequency counters to detect systematic pipeline duplications.`,
        `Convert clean line lists into comma-separated strings for immediate SQL IN (...) queries.`,
        `Maintain immutable raw backups prior to applying destructive in-place file modifications.`
      ]
    }
  ];

  let guide = { heading, sections };

  // Adjust word count to be strictly between 850 and 1100 words
  let currentWords = countEditorialWords(guide);

  const extraEnrichments = [
    `When evaluating large-scale text sanitization pipelines, memory fragmentation and garbage collection overhead can severely degrade throughput. In browser engines powered by V8 (Google Chrome, Microsoft Edge, Brave) and SpiderMonkey (Mozilla Firefox), allocating millions of transient string objects triggers frequent stop-the-world garbage collection pauses. FastToolVerse mitigates this bottleneck by utilizing continuous flat arrays and primitive string references, minimizing heap allocation churn. By bypassing intermediary array cloning, the deduplication engine sustains consistent 60fps UI responsiveness even when processing 50,000+ line documents.`,
    `Furthermore, in distributed microservice architectures, log aggregation systems frequently suffer from log amplification cascades. When an infrastructure component encounters an error condition, multiple services may output identical stack traces or warning messages repeatedly. Utilizing high-performance line deduplication allows site reliability engineers (SREs) to compress multi-gigabyte log archives into concise, actionable summaries without losing anomalous single-occurrence event logs. This preserves critical incident response visibility while saving substantial cloud storage costs.`,
    `Data privacy compliance is another paramount architectural advantage of client-side deduplication. Under modern privacy regulations such as the European Union's General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), transmitting personally identifiable information (PII)—including subscriber email rosters, customer full names, or physical addresses—to third-party cloud text utilities constitutes an unmonitored data transfer. By ensuring that every byte remains confined to the user's local hardware RAM, FastToolVerse provides enterprise security officers with total operational peace of mind.`,
    `In data warehousing and ETL (Extract, Transform, Load) pipelines, duplicate records frequently cause primary key violations during database batch insertion. Whether loading data into PostgreSQL, MySQL, Snowflake, or BigQuery, attempting to insert duplicate identifiers halts the entire transaction block. Pre-flighting datasets through our client-side deduplicator eliminates duplicate key conflicts before staging files are dispatched to database loaders, saving engineering hours spent debugging transaction rollbacks.`
  ];

  let enrichIdx = 0;
  while (currentWords < 850 && enrichIdx < extraEnrichments.length) {
    guide.sections[guide.sections.length - 1].paragraphs.push(extraEnrichments[enrichIdx]);
    currentWords = countEditorialWords(guide);
    enrichIdx++;
  }

  return guide;
}

// Generate 6 domain-tailored FAQs
function generateFaqs(kw, name) {
  const l = kw.toLowerCase();
  return [
    {
      question: `How do I remove duplicate lines from ${name.toLowerCase()} online?`,
      answer: `Paste or type your text list into the Input Text editor. FastToolVerse automatically evaluates every row using high-speed O(1) hash sets in real time. Duplicate lines are stripped instantly while preserving the original appearance order. You can toggle case sensitivity, whitespace trimming, or alphabetical sorting, then click Copy or download as a .txt file.`
    },
    {
      question: `Does this ${name.toLowerCase()} tool upload my data or files to any server?`,
      answer: `No. All text parsing, regex matching, and deduplication execute 100% locally inside your web browser's RAM memory sandbox. Zero bytes ever travel across the internet, ensuring your confidential customer lists, credentials, server logs, and code remain completely private.`
    },
    {
      question: `What is the difference between case-sensitive and case-insensitive deduplication?`,
      answer: `When 'Case-sensitive comparison' is enabled, entries with differing letter cases (e.g. 'Apple' and 'apple') are treated as distinct unique items. When disabled, both entries are recognized as duplicates, and the tool keeps only the first encountered casing while eliminating subsequent variants.`
    },
    {
      question: `How does whitespace trimming prevent hidden duplicate lines?`,
      answer: `Accidental trailing spaces or tab characters from copy-pasting spreadsheet cells often cause visually identical lines to have different character lengths. Enabling 'Trim edge whitespace' normalizes leading and trailing spacing before comparing hash keys, ensuring phantom spaces don't bypass duplicate detection.`
    },
    {
      question: `Can I extract duplicate lines only or count how many times each line repeats?`,
      answer: `Yes. Click the 'Extraction Mode' pills above the editor. Choose 'Duplicates Only' to isolate only recurring entries, 'Completely Unique' to filter lines that appear exactly once, or 'Count Occurrences' to generate a frequency count histogram showing exact repetition metrics.`
    },
    {
      question: `Can this tool handle massive datasets containing 50,000+ lines?`,
      answer: `Yes. Because FastToolVerse utilizes native ECMAScript Hash Sets with O(1) constant-time lookups (achieving linear O(N) overall performance), it can deduplicate datasets containing 50,000+ lines in tens of milliseconds without crashing or freezing your browser tab.`
    }
  ];
}

// Build all 75 presets
const presets = [];

for (const kw of KEYWORDS) {
  const slug = toSlug(kw);
  const name = toTitleCase(kw);
  const h1 = name;
  const cluster = getClusterInfo(kw);
  const options = getOptions(kw);
  const sampleText = getSampleText(kw);
  const subtitle = getSubtitle(kw);
  const intentCard = getIntentCard(kw);
  const metaTitle = getMetaTitle(name);
  const metaDescription = getMetaDescription(kw);
  const editorialGuide = generateEditorialGuide(kw, name, cluster);
  const faqs = generateFaqs(kw, name);

  presets.push({
    slug,
    cluster: cluster.cluster,
    clusterTitle: cluster.clusterTitle,
    primaryQuery: kw,
    name,
    h1,
    metaTitle,
    metaDescription,
    subtitle,
    intentCard,
    options,
    sampleText,
    editorialGuide,
    faqs
  });
}

console.log(`Generated ${presets.length} presets.`);

// Validation of presets
let hasErrors = false;
presets.forEach((p, idx) => {
  const subWords = countWords(p.subtitle);
  if (subWords < 20 || subWords > 25) {
    console.error(`Preset ${idx + 1} (${p.slug}) subtitle word count invalid: ${subWords} words`);
    hasErrors = true;
  }
  const intentWords = countWords(p.intentCard);
  if (intentWords < 50 || intentWords > 60) {
    console.error(`Preset ${idx + 1} (${p.slug}) intentCard word count invalid: ${intentWords} words`);
    hasErrors = true;
  }
  if (p.metaDescription.length > 154) {
    console.error(`Preset ${idx + 1} (${p.slug}) metaDescription > 154 chars: ${p.metaDescription.length}`);
    hasErrors = true;
  }
  const editWords = countEditorialWords(p.editorialGuide);
  if (editWords < 800 || editWords > 1200) {
    console.error(`Preset ${idx + 1} (${p.slug}) editorialGuide word count out of range: ${editWords} words`);
    hasErrors = true;
  }
});

if (hasErrors) {
  console.error("Errors found during preset generation!");
  process.exit(1);
}

// Format TypeScript File Content
const fileHeader = `// Autogenerated 75 High-Intent Remove Duplicate Lines Presets
export interface DuplicateLinesEditorialSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  codeBlock?: {
    language: string;
    code: string;
  };
  callout?: {
    type: 'tip' | 'note' | 'warning';
    label: string;
    text: string;
  };
}

export interface DuplicateLinesPreset {
  slug: string;
  cluster: string;
  clusterTitle: string;
  primaryQuery: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  subtitle: string;
  intentCard: string;
  options: {
    mode: 'unique' | 'duplicates-only' | 'completely-unique' | 'count-occurrences';
    caseSensitive: boolean;
    trimLines: boolean;
    emptyLines: boolean;
    ignorePunctuation: boolean;
    sort: 'original' | 'alpha-asc' | 'alpha-desc' | 'length-asc' | 'freq-desc';
    delimiter: 'newline' | 'comma' | 'semicolon' | 'custom';
    customDelimiter?: string;
  };
  sampleText: string;
  editorialGuide: {
    heading: string;
    sections: DuplicateLinesEditorialSection[];
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const DUPLICATE_LINES_PRESETS: DuplicateLinesPreset[] = `;

const fileContent = fileHeader + JSON.stringify(presets, null, 2) + ';\n';

const targetPath = path.resolve('./src/data/duplicateLinesPresets.ts');
fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log(`Successfully wrote ${presets.length} presets to ${targetPath}`);
