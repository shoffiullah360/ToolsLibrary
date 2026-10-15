// scripts/generate-all-75-presets.mjs
import fs from 'node:fs';
import path from 'node:path';

const KEYWORDS = [
  "notepad++ remove duplicate lines",
  "vim remove duplicate lines",
  "linux remove duplicate lines from file",
  "bash remove duplicate lines from file",
  "vscode remove duplicate lines",
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
  
  // Category A: Code Editors & IDEs
  if (
    l.includes('notepad++') ||
    l.includes('vim') ||
    l.includes('vscode') ||
    l.includes('vs code') ||
    l.includes('notepad') ||
    l.includes('sublime') ||
    l.includes('intellij') ||
    l.includes('dbeaver') ||
    l.includes('textedit') ||
    (l.includes('regex') && !l.includes('python') && !l.includes('javascript') && !l.includes('linux'))
  ) {
    return { cluster: 'editor-tools', clusterTitle: 'Code Editors & IDEs' };
  }
  
  // Category B: Linux & Terminal CLI
  if (
    l.includes('linux') ||
    l.includes('bash') ||
    l.includes('sed') ||
    l.includes('awk') ||
    l.includes('powershell') ||
    l.includes('sort uniq') ||
    l.includes('log file')
  ) {
    return { cluster: 'cli-shell', clusterTitle: 'Linux & Terminal CLI' };
  }
  
  // Category C: Spreadsheets & Data Entry
  if (
    l.includes('excel') ||
    l.includes('sheets') ||
    l.includes('docs') ||
    l.includes('word')
  ) {
    return { cluster: 'office-spreadsheets', clusterTitle: 'Spreadsheets & Data Entry' };
  }
  
  // Category D: Data Formats & Programming
  if (
    l.includes('csv') ||
    l.includes('json') ||
    l.includes('tsv') ||
    l.includes('sql') ||
    l.includes('markdown') ||
    l.includes('python') ||
    l.includes('javascript') ||
    l.includes('php') ||
    l.includes('java') ||
    l.includes('text file') ||
    l.includes('txt file')
  ) {
    return { cluster: 'data-formats', clusterTitle: 'Data Formats & Programming' };
  }
  
  // Category E: Marketing & List Hygiene
  return { cluster: 'marketing-crm', clusterTitle: 'Marketing & List Hygiene' };
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

// ==========================================
// 5 CATEGORY ARCHITECTURES (600+ WORDS EACH)
// ==========================================

// --- CATEGORY A: Code Editors & IDEs ---
function generateCategoryAEditorial(kw, name) {
  const l = kw.toLowerCase();
  const heading = `Technical Guide: ${name} in Code Editors & IDEs`;
  
  const sec1Title = `Developer Context: Why Clean Lists & Deduplication Matter in ${name}`;
  const sec1P1 = `When engineering software, managing infrastructure configuration manifests, or inspecting stack traces, duplicate entries frequently infiltrate developer buffers. Programmers working with ${name.toLowerCase()} often encounter duplicated lines after merging Git feature branches, concatenating raw API query dumps, or copying database result grids into active workspace tabs. If unaddressed, redundant rows in code or configuration files lead to syntax redundancy, unexpected override behavior in YAML/JSON structures, and bloated source repositories that slow down continuous integration builds.`;
  const sec1P2 = `Executing a targeted ${name.toLowerCase()} routine inside your coding environment resolves visual noise and restores strict file hygiene. Rather than scanning thousands of lines manually, understanding how to apply ${kw} workflows directly allows engineers to isolate unique code statements, environment keys, and dependency lists in seconds. Whether refactoring CSS selector rules, consolidating Docker container variables, or cleaning up SQL seed scripts, establishing a reliable line deduplication workflow is an essential competency for daily development efficiency.`;

  let sec2Title = `Native Editor Shortcuts & Regex Methods for ${name}`;
  let sec2P1 = `Modern development environments provide native commands, menu operations, and regular expression engines to clean repetitive rows locally. Here are the exact commands and shortcuts calibrated for your workspace:`;
  let codeLang = 'text';
  let codeSnippet = '';
  let calloutText = '';

  if (l.includes('notepad++') || l.includes('notepad')) {
    codeLang = 'regex';
    codeSnippet = `// Method 1: Native Menu Workflow in Notepad++
// 1. Select all lines (Ctrl+A)
// 2. Click: Edit -> Line Operations -> Sort Lines Lexicographically Ascending
// 3. Click: Edit -> Line Operations -> Remove Consecutive Duplicate Lines

// Method 2: Order-Preserving Regular Expression Search & Replace
Find What:    ^(.*?)$\\s+?^(?=([\\s\\S]*?)^\\1$)
Replace With: (leave completely empty)
Search Mode:  Regular expression (check "Wrap around" and ". matches newline")`;
    calloutText = `In Notepad++, the TextFX plugin (TextFX -> TextFX Tools -> Sort lines, only UNIQUE) also deletes duplicates in a single click if installed.`;
  } else if (l.includes('vscode') || l.includes('vs code')) {
    codeLang = 'markdown';
    codeSnippet = `// Method 1: VS Code Native Command Palette
1. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Run: "Sort Lines Ascending"
3. To delete duplicates without extensions, open Find and Replace (Ctrl+H):
   Find:    ^(.*)(\\r?\\n\\1)+$
   Replace: $1
   Enable:  Use Regular Expression (Alt+R)

// Method 2: Popular VS Code Extensions
Install "Sort lines" or "Filter Lines" from the VS Code Marketplace:
- Execute "Sort Lines (Unique)" to alphabetize and eliminate repeats simultaneously.`;
    calloutText = `For massive logs (>100,000 lines), VS Code's regex engine can throttle extension host processes; in those cases, browser memory sandboxing offers zero latency.`;
  } else if (l.includes('vim')) {
    codeLang = 'vim';
    codeSnippet = `" Method 1: Sort and deduplicate in Vim Command Mode
:sort u

" Method 2: Case-insensitive unique sort
:sort ui

" Method 3: Keep original chronological order using Awk filter
:%!awk '!seen[$0]++'

" Method 4: Visual range deduplication (select lines with Shift+V then type):
:'<,'>sort u`;
    calloutText = `Typing ':sort u' alters original line sequence. To keep first occurrences chronologically intact inside Vim, always pipe through ':%!awk'.`;
  } else if (l.includes('sublime')) {
    codeLang = 'markdown';
    codeSnippet = `// Sublime Text 3/4 Native Menu Commands
1. Select the target text block or press Ctrl+A (Cmd+A on macOS)
2. Press F9 to sort lines alphabetically
3. Navigate to top menu: Edit -> Permute Lines -> Unique
4. Sublime Text will immediately drop all duplicate rows in-place.`;
    calloutText = `Edit -> Permute Lines -> Unique does not require prior sorting in Sublime Text; it retains original line sequence while dropping later duplicates.`;
  } else if (l.includes('intellij')) {
    codeLang = 'markdown';
    codeSnippet = `// IntelliJ IDEA & JetBrains IDEs Workflow
1. Select lines or document (Ctrl+A / Cmd+A)
2. Press Shift twice (Search Everywhere) and type "Sort Lines"
3. For dedicated uniqueness, install the "String Manipulation" plugin:
   - Press Alt+M -> "Filter / Remove..." -> "Remove Duplicates"
4. Alternatively, use Regex Replace:
   Find:    ^([^\\r\\n]+)\\r?\\n(?=[\\s\\S]*^\\1$)
   Replace: (empty)`;
    calloutText = `JetBrains IDEs provide strong multi-cursor support (Alt+J), but regex lookaheads on large files can trigger high memory warning dialogues.`;
  } else if (l.includes('dbeaver')) {
    codeLang = 'sql';
    codeSnippet = `-- In DBeaver SQL Editor & Result Sets:
-- Method 1: Deduplicate query results directly at database engine level
SELECT DISTINCT target_column FROM source_table ORDER BY target_column;

-- Method 2: In DBeaver Data Grid
-- Right-click column header -> Filter by Distinct / Unique values
-- To clean pasted script text: Ctrl+F -> Regular Expression mode -> Replace duplicate patterns`;
    calloutText = `Filtering database result grids in DBeaver only alters the client view; use client-side text tools to sanitize raw pasted column exports cleanly.`;
  } else if (l.includes('textedit')) {
    codeLang = 'bash';
    codeSnippet = `# Mac TextEdit Terminal Clipboard Pipeline
# TextEdit lacks native regex deduplication menus; use macOS clipboard piping:
pbpaste | sort -u | pbcopy

# To preserve chronological line order on macOS:
pbpaste | awk '!seen[$0]++' | pbcopy
# Once executed in Terminal, switch back to TextEdit and press Cmd+V to paste clean text.`;
    calloutText = `Make sure TextEdit is in Plain Text mode (Format -> Make Plain Text or Shift+Cmd+T) to avoid rich text RTF metadata interference.`;
  } else {
    codeLang = 'regex';
    codeSnippet = `// Universal Regular Expression Pattern for Code Editors & IDEs
Find Pattern:    ^(.*?)$\\s+?^(?=([\\s\\S]*?)^\\1$)
Replace Pattern: (leave blank)
Flags Required:  Multiline mode enabled, Dot matches newline checked

// Fast Single-Pass Sorted File Pattern:
Find Pattern:    ^(.*)(\\r?\\n\\1)+$
Replace Pattern: $1`;
    calloutText = `Ensure regular expression mode is toggled on in your editor's Find & Replace dialog before running batch replacements.`;
  }

  const sec3Title = `Browser Sandbox Advantage: Eliminating Editor Freezes & Memory Leaks`;
  const sec3P1 = `While native desktop editors are indispensable for daily authoring, applying complex regex lookahead patterns on large text buffers frequently strains internal syntax lexers. Editors like VS Code and IntelliJ run background indexing engines, linting processes, and Language Server Protocols (LSP) that parse every document modification. Executing nested regular expression searches across 20,000 to 100,000 lines can trigger catastrophic backtracking, causing the editor process to freeze and prompting "Window is not responding" dialogs.`;
  const sec3P2 = `FastToolVerse eliminates IDE thread contention by offloading the entire deduplication workload to an isolated client-side browser memory sandbox. Built on ECMAScript Hash Sets with constant-time O(1) key lookups, our engine processes 50,000+ line documents in under 40 milliseconds without allocating heavy language AST trees. You gain instantaneous, zero-latency processing without installing marketplace extensions, configuring regex flags, or risking editor instability.`;

  const sec4Title = `Edge Cases in Source Code: Whitespace, Indentation & Encodings`;
  const sec4P1 = `Source code and technical files present unique edge cases where automated deduplicators can inadvertently break program logic if not carefully tuned:`;
  const sec4Bullets = [
    `Indentation Sensitivity: In Python, YAML, and Haml, leading tabs or spaces define semantic code scope. Enabling 'Trim edge whitespace' will normalize indentation, so keep it unchecked if block hierarchy must be preserved.`,
    `CRLF vs LF Line Endings: Windows development environments use CRLF (\\r\\n) while Unix, Linux, and macOS use LF (\\n). Inconsistent newline terminators between pasted snippets can cause identical code lines to evaluate as distinct hashes unless parsed with universal newline splitting.`,
    `Code Comments vs Statement Duplication: Identical comment headers (e.g. '// TODO: Review' or '/* separator */') may be intentionally repeated across classes. Using 'Duplicates Only' extraction allows you to audit recurring annotations before deletion.`,
    `Blank Lines Between Methods: Purging empty lines cleans compact scripts, but may disrupt visual readability between function declarations. Toggle 'Strip blank lines' based on whether method spacing is desired.`
  ];

  return {
    heading,
    sections: [
      {
        title: sec1Title,
        paragraphs: [sec1P1, sec1P2],
        bullets: [
          `Cleans merged Git branches, SQL script dumps, and environment variable files in seconds.`,
          `Avoids editor extension bloat, background thread locks, and out-of-memory crashes on large files.`,
          `Preserves precise code structure with customizable whitespace trimming and sorting options.`
        ]
      },
      {
        title: sec2Title,
        paragraphs: [sec2P1],
        codeBlock: { language: codeLang, code: codeSnippet },
        callout: { type: 'tip', label: 'Editor Tip', text: calloutText }
      },
      {
        title: sec3Title,
        paragraphs: [sec3P1, sec3P2],
        bullets: [
          `Zero Plugin Setup: No marketplace downloads, package permissions, or corporate security audits required.`,
          `Instant Microsecond Lookups: O(1) hash tables process multi-megabyte text payloads without freezing editor tabs.`,
          `100% Private Sandbox: Client credentials, private API keys, and internal source code never leave your device RAM.`
        ]
      },
      {
        title: sec4Title,
        paragraphs: [sec4P1],
        bullets: sec4Bullets
      }
    ]
  };
}

// --- CATEGORY B: Linux & Terminal CLI ---
function generateCategoryBEditorial(kw, name) {
  const l = kw.toLowerCase();
  const heading = `Technical Guide: ${name} in Linux & Terminal CLI`;

  const sec1Title = `DevOps & Systems Context: Stream Sanitization for ${name}`;
  const sec1P1 = `Site reliability engineers, cloud architects, and system administrators frequently inspect massive log outputs, network telemetry dumps, and server configuration files. In high-traffic microservice environments, repetitive lines rapidly accumulate when aggregating Nginx access logs, journalctl system metrics, or Docker container stdout streams. Executing an effective ${name.toLowerCase()} operation prevents storage volume bloat, accelerates log indexing in Elasticsearch or Grafana Loki, and isolates anomalous single-occurrence errors during critical incident triage.`;
  const sec1P2 = `Whether sanitizing firewall IP drop tables, consolidating SSH authorized_keys entries, or pruning duplicated crontab schedules, mastering ${kw} is an indispensable administrative skill. Repetitive lines often creep into system scripts through automated retry loops, multi-node log synchronization, or manual script appending. Employing streamlined deduplication techniques ensures that your production servers and shell automation scripts operate with predictable efficiency and data clarity.`;

  let sec2Title = `Native Shell Pipelines & Command-Line One-Liners for ${name}`;
  let sec2P1 = `On Unix-like platforms, standard POSIX utilities provide powerful stream processing capabilities. Below are the verified terminal commands tailored for ${name.toLowerCase()}:`;
  let codeLang = 'bash';
  let codeSnippet = '';
  let calloutText = '';

  if (l.includes('awk')) {
    codeSnippet = `# High-speed order-preserving line deduplication with Awk
awk '!seen[$0]++' raw_file.txt > clean_file.txt

# Case-insensitive deduplication preserving first occurrence casing
awk '!seen[tolower($0)]++' raw_file.txt > clean_file.txt

# Trim leading and trailing whitespace before deduplicating
awk '{ gsub(/^[ \\t]+|[ \\t]+$/, ""); if (!seen[$0]++) print }' raw_file.txt > clean_file.txt`;
    calloutText = `Awk's associative array lookup '!seen[$0]++' evaluates each line in O(1) time while strictly maintaining original chronological order.`;
  } else if (l.includes('sed')) {
    codeSnippet = `# Adjacent duplicate removal using sed (requires sorted input)
sed '$!N; /^\\(.*\\)\\n\\1$/!P; D' sorted_file.txt > clean_file.txt

# In-place file deduplication with sed (Linux GNU sed)
sed -i '$!N; /^\\(.*\\)\\n\\1$/!P; D' file.txt

# Strip empty/blank lines with sed before deduplicating
sed '/^[[:space:]]*$/d' input.txt | awk '!seen[$0]++' > clean.txt`;
    calloutText = `Sed stream editors operate directly on pattern spaces. Because Sed evaluates adjacent lines, piping through sort first is generally required.`;
  } else if (l.includes('powershell')) {
    codeLang = 'powershell';
    codeSnippet = `# Method 1: Using Select-Object -Unique (Alphabetizes/requires sorting)
Get-Content raw_file.txt | Select-Object -Unique | Set-Content clean_file.txt

# Method 2: High-speed order-preserving deduplication using HashSets
$seen = [System.Collections.Generic.HashSet[string]]::new()
Get-Content raw_file.txt | Where-Object { $seen.Add($_) } | Set-Content clean_file.txt

# Case-insensitive mode in PowerShell:
$seen = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
Get-Content raw_file.txt | Where-Object { $seen.Add($_) } | Set-Content clean_file.txt`;
    calloutText = `Using .NET Generic HashSets in PowerShell executes up to 20x faster than 'Select-Object -Unique' on large datasets exceeding 10,000 rows.`;
  } else if (l.includes('sort uniq') || l.includes('sort')) {
    codeSnippet = `# Standard Unix Sort & Uniq Pipeline (Alphabetical order)
sort raw_file.txt | uniq > clean_file.txt

# Count occurrences and sort by frequency (highest repeats first)
sort raw_file.txt | uniq -c | sort -nr > frequency_report.txt

# Output duplicate lines ONLY (entries that repeat at least once)
sort raw_file.txt | uniq -d > duplicates_only.txt

# Output completely unique lines ONLY (entries that appear exactly once)
sort raw_file.txt | uniq -u > unique_only.txt`;
    calloutText = `'uniq' only discards adjacent identical rows; always pipe your text through 'sort' before running 'uniq' in standard shell scripts.`;
  } else if (l.includes('log file')) {
    codeSnippet = `# Sanitize web server access logs by isolating unique client IPs
awk '{print $1}' access.log | sort | uniq -c | sort -nr > top_visitors.txt

# Extract unique error message signatures from application logs
grep "ERROR" app.log | awk '!seen[$0]++' > unique_errors.log

# Real-time stream deduplication on live log outputs
tail -f access.log | awk '!seen[$0]++'`;
    calloutText = `Stripping timestamp prefixes and request IDs from log entries before deduplication ensures identical underlying error signatures are grouped accurately.`;
  } else {
    codeSnippet = `# Method 1: High-Performance Alphabetical Deduplication (GNU coreutils)
sort -u input.txt > output.txt

# Method 2: Fast Chronological Order Retention (Awk)
awk '!seen[$0]++' input.txt > output.txt

# Method 3: In-Place Linux File Modification
sort -u input.txt -o input.txt`;
    calloutText = `When processing files over SSH connections, ensure you have sufficient disk space in /tmp if using 'sort -u' on multi-gigabyte logs.`;
  }

  const sec3Title = `Browser Sandbox Advantage: Safe Visual Inspection Without Overwrite Risks`;
  const sec3P1 = `While terminal pipelines are standard for automated shell scripts, executing CLI commands directly on production disk files carries inherent operational risks. A common accidental keystroke—such as writing '>' instead of '>>', or running 'sort -u input.txt > input.txt' (which truncates the file to zero bytes before reading)—can permanently corrupt mission-critical configuration files or historical logs. Furthermore, terminal pipelines lack immediate visual previews, making it difficult to inspect which specific lines were dropped without generating file diffs.`;
  const sec3P2 = `FastToolVerse provides a safe, visual, client-side sandbox for validating and sanitizing text snippets prior to deployment. Operating entirely in local browser RAM, the studio displays instant line, word, and duplicate counters alongside real-time extraction modes ('Duplicates Only' and 'Count Occurrences'). You can verify changes visually, test whitespace trimming rules, and copy clean output with zero risk of file system corruption or server crashes.`;

  const sec4Title = `Edge Cases in DevOps: Log Formatting, Escape Codes & Line Endings`;
  const sec4P1 = `System logs and shell outputs frequently contain hidden character artifacts that bypass standard string comparisons:`;
  const sec4Bullets = [
    `ANSI Color Escape Codes: Terminal programs output escape sequences (e.g. \\x1b[32m for green text). If two identical log entries differ in terminal styling, standard comparison treats them as distinct records.`,
    `Timestamp & Thread ID Variance: Application log entries usually begin with dynamic timestamps (e.g. '2026-10-15 14:02:11.104'). Deduplicating the entire line will fail; isolate the message body before applying deduplication.`,
    `Mixed Windows/Unix Carriage Returns: Transferring files between Windows workstations and Linux servers often introduces dangling carriage returns (\\r). FastToolVerse normalizes line breaks seamlessly across operating systems.`,
    `Trailing Tabs & Hostname Whitespace: Configuration files like /etc/hosts and Apache VirtualHosts often contain uneven tab indentation between IPs and domain names. Toggling 'Trim edge whitespace' prevents phantom duplicate retention.`
  ];

  return {
    heading,
    sections: [
      {
        title: sec1Title,
        paragraphs: [sec1P1, sec1P2],
        bullets: [
          `Compresses voluminous application logs, firewall tables, and system telemetry into clean datasets.`,
          `Prevents accidental file truncation and command pipeline errors on production Linux servers.`,
          `Supports both chronological sequence preservation (Awk) and alphabetical ordering (sort -u).`
        ]
      },
      {
        title: sec2Title,
        paragraphs: [sec2P1],
        codeBlock: { language: codeLang, code: codeSnippet },
        callout: { type: 'tip', label: 'DevOps Tip', text: calloutText }
      },
      {
        title: sec3Title,
        paragraphs: [sec3P1, sec3P2],
        bullets: [
          `Visual Sanity Check: Live before-and-after counters prevent accidental file truncation errors.`,
          `Zero Server Transmission: Confidential server IPs, database passwords, and auth logs never touch external clouds.`,
          `Interactive Multi-Mode Inspection: Instantly isolate duplicates or generate occurrence histograms in one click.`
        ]
      },
      {
        title: sec4Title,
        paragraphs: [sec4P1],
        bullets: sec4Bullets
      }
    ]
  };
}

// --- CATEGORY C: Spreadsheets & Data Entry ---
function generateCategoryCEditorial(kw, name) {
  const l = kw.toLowerCase();
  const heading = `Technical Guide: ${name} in Spreadsheets & Data Entry`;

  const sec1Title = `Spreadsheet Hygiene: Why Deduplicating ${name} is Essential`;
  const sec1P1 = `In corporate accounting, sales operations, and digital marketing rosters, spreadsheets serve as the central repository for operational data. When compiling customer leads, sales transaction logs, or inventory catalogs in Excel, Google Sheets, or Word, duplicate records introduce severe operational liabilities. Recurring entries skew pivot table aggregations, artificially inflate revenue forecasts, generate duplicate email communications that alienate subscribers, and produce costly fulfillment errors in enterprise supply chains.`;
  const sec1P2 = `Conducting a thorough ${name.toLowerCase()} routine restores mathematical precision to your workbooks and reports. Knowing how to systematically apply ${kw} workflows allows analysts to sanitize raw exports from CRM portals, e-commerce engines, and SQL databases before sharing final summaries with executive teams. Whether isolating unique customer IDs, standardizing vendor catalogs, or cleaning email rosters, adopting dependable list deduplication practices guarantees that your business intelligence reports remain credible and actionable.`;

  let sec2Title = `Native Excel & Google Sheets Methods for ${name}`;
  let sec2P1 = `Modern spreadsheet applications offer both destructive Ribbon dialogs and non-destructive dynamic array formulas for managing duplicate rows:`;
  let codeLang = 'excel';
  let codeSnippet = '';
  let calloutText = '';

  if (l.includes('excel cell') || l.includes('cell')) {
    codeSnippet = `' Method 1: Modern Excel 365 / Excel 2021+ Formula for In-Cell Multi-Line Deduplication
' (Assumes multi-line text separated by Alt+Enter in cell A2)
=TEXTJOIN(CHAR(10), TRUE, UNIQUE(TEXTSPLIT(A2, CHAR(10))))

' Method 2: Google Sheets Formula for In-Cell Line Deduplication
=JOIN(CHAR(10), UNIQUE(SPLIT(A2, CHAR(10))))

' Note: Enable "Wrap Text" on the target cell to display multi-line results correctly.`;
    calloutText = `In Excel, CHAR(10) represents the line break character created by Alt+Enter. Wrapping with TEXTSPLIT and UNIQUE purges duplicates inside individual cells.`;
  } else if (l.includes('sheets')) {
    codeSnippet = `' Method 1: Dynamic Array Formula (Non-Destructive)
=UNIQUE(A2:A5000)

' Method 2: Native Menu Interface in Google Sheets
1. Highlight your target data range or select columns (e.g. Column A:D)
2. Click top menu: Data -> Data cleanup -> Remove duplicates
3. Check "Data has header row" if applicable, select key columns, and click "Remove duplicates"

' Method 3: Count duplicate occurrences in Column B
=COUNTIF(A$2:A$5000, A2)`;
    calloutText = `The =UNIQUE() formula in Google Sheets spills dynamically into adjacent cells without altering original raw source rows.`;
  } else if (l.includes('docs') || l.includes('word')) {
    codeLang = 'markdown';
    codeSnippet = `// Microsoft Word & Google Docs Table Deduplication Workflow
1. Select text list and convert to table:
   - In Word: Insert -> Table -> Convert Text to Table (Separate text at Paragraphs)
   - In Google Docs: Format -> Table -> Convert text to table
2. Sort table alphabetically (Table Tools -> Layout -> Sort)
3. For large lists, copy table column into FastToolVerse for instant 1-click deduplication
4. Paste the cleaned unique list back into Word or Docs.`;
    calloutText = `Word processors do not feature native 'Remove Duplicates' buttons; converting text to tables or utilizing web sandbox tools saves hours of manual pruning.`;
  } else {
    codeSnippet = `' Method 1: Modern Excel Dynamic Array Formula (Microsoft 365, Excel 2021+)
=UNIQUE(A2:A5000)

' Method 2: Native Ribbon Command (Destructive In-Place Deletion)
1. Select your target table or range
2. Navigate to: Data tab -> Data Tools group -> Remove Duplicates
3. Select columns to evaluate and click OK (Caution: Permanently deletes rows)

' Method 3: Identify duplicates with Conditional Formatting
Home -> Conditional Formatting -> Highlight Cells Rules -> Duplicate Values`;
    calloutText = `Always create a backup copy of your worksheet before using Excel's native 'Remove Duplicates' button, as deleted rows cannot always be restored via Undo.`;
  }

  const sec3Title = `Browser Sandbox Advantage: Non-Destructive Cleaning Without Formula Errors`;
  const sec3P1 = `While Excel's native 'Remove Duplicates' feature is popular, it comes with serious practical limitations. The native Ribbon command permanently modifies the active worksheet in place without creating a transaction log, making it impossible to see which specific records were dropped. Furthermore, if you are working on older versions of Microsoft Excel (such as Excel 2016 or 2019), modern dynamic array functions like '=UNIQUE()' and '=TEXTSPLIT()' are completely unsupported, forcing users to write cumbersome legacy array formulas ('INDEX/MATCH' with 'Ctrl+Shift+Enter') or complex VBA macros.`;
  const sec3P2 = `FastToolVerse provides an intuitive, non-destructive bridge for office workers. You simply copy your spreadsheet column, paste it into our studio, and instantly inspect unique counts, occurrence histograms, and duplicate lists. Our tool normalizes accidental whitespace tabs, resolves mixed email casing, and lets you re-export data with one-click comma or semicolon delimiters for immediate re-import into Excel or Google Sheets.`;

  const sec4Title = `Edge Cases in Spreadsheets: Trailing Spaces, Hidden Tabs & Mixed Casing`;
  const sec4P1 = `Spreadsheets are notorious for subtle formatting discrepancies that cause identical entries to evade detection:`;
  const sec4Bullets = [
    `Invisible Trailing Tabs & Spaces: Copying cells often captures trailing tab stops (\\t) or spaces. 'Sales ' and 'Sales' will evaluate as distinct rows in Excel unless trimmed with FastToolVerse or the '=TRIM()' formula.`,
    `Non-Breaking Spaces (ASCII 160): Data exported from web portals or CRM systems frequently contains non-breaking spaces (&nbsp; / CHAR(160)) that Excel's native '=TRIM()' function ignores. Our tool cleans all whitespace variants automatically.`,
    `Case-Insensitive Email Records: In spreadsheets, 'client@email.com' and 'Client@email.com' may count as unique depending on your Excel comparison settings. FastToolVerse lets you toggle case-sensitivity to guarantee clean contact rosters.`,
    `Empty & Blank Rows: Accidental blank cells scattered throughout spreadsheet columns can corrupt list lookups. Enabling 'Strip blank lines' removes all empty rows while preserving all authentic data entries.`
  ];

  return {
    heading,
    sections: [
      {
        title: sec1Title,
        paragraphs: [sec1P1, sec1P2],
        bullets: [
          `Guarantees data integrity for customer rosters, inventory catalogs, and budget forecasts.`,
          `Avoids destructive overwrites and provides transparent visibility into dropped records.`,
          `Supports in-cell multi-line deduplication (Alt+Enter) and single-column spreadsheet values.`
        ]
      },
      {
        title: sec2Title,
        paragraphs: [sec2P1],
        codeBlock: { language: codeLang, code: codeSnippet },
        callout: { type: 'tip', label: 'Spreadsheet Tip', text: calloutText }
      },
      {
        title: sec3Title,
        paragraphs: [sec3P1, sec3P2],
        bullets: [
          `Non-Destructive Sandbox: Retains your original source spreadsheet while generating clean previews.`,
          `Universal Compatibility: Works instantly regardless of whether you use Excel 2016, 365, Google Sheets, or LibreOffice.`,
          `Custom Delimiter Export: Transform deduplicated rows into comma-separated lists with one click.`
        ]
      },
      {
        title: sec4Title,
        paragraphs: [sec4P1],
        bullets: sec4Bullets
      }
    ]
  };
}

// --- CATEGORY D: Data Formats & Programming ---
function generateCategoryDEditorial(kw, name) {
  const l = kw.toLowerCase();
  const heading = `Technical Guide: ${name} in Data Formats & Programming`;

  const sec1Title = `Data Architecture: Clean Formats & Record Integrity for ${name}`;
  const sec1P1 = `In relational database administration, backend software development, and big data engineering, data purity is the foundation of system performance. When ingesting CSV files, serializing JSON payloads, processing TSV archives, or generating SQL migration scripts, duplicate entries introduce catastrophic bottlenecks. Redundant rows trigger primary key constraint violations in PostgreSQL and MySQL, corrupt document indexes in MongoDB, and artificially inflate cloud database hosting bills across enterprise clusters.`;
  const sec1P2 = `Executing a systematic ${name.toLowerCase()} routine ensures that data serialization pipelines run smoothly and adhere to schema constraints. Knowing how to efficiently apply ${kw} workflows prevents pipeline crashes during ETL batch loading, protects machine learning training datasets from redundant sample bias, and reduces REST API response payloads. Furthermore, integrating routine data deduplication helps data teams maintain uniform formatting across distributed microservices. Whether cleaning SQL query exports, sanitizing tabular flat files, or preparing clean programming arrays, automated line deduplication is a critical engineering hygiene standard.`;

  let sec2Title = `Native Code Snippets & Database Queries for ${name}`;
  let sec2P1 = `Engineers can execute deduplication natively across languages and database systems using optimized standard libraries:`;
  let codeLang = 'text';
  let codeSnippet = '';
  let calloutText = '';

  if (l.includes('python')) {
    codeLang = 'python';
    codeSnippet = `# Method 1: High-Speed Order-Preserving Deduplication in Python 3.7+
with open('input.txt', 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

# Using dict.fromkeys() preserves first-appearance order in O(N) time
unique_lines = list(dict.fromkeys(lines))

with open('output.txt', 'w', encoding='utf-8') as f:
    f.write('\\n'.join(unique_lines))

# Method 2: Case-insensitive deduplication preserving original casing
seen = set()
unique_case_folded = [x for x in lines if not (x.lower() in seen or seen.add(x.lower()))]`;
    calloutText = `In Python 3.7+, dictionaries maintain insertion order by default, making 'list(dict.fromkeys(lines))' faster and cleaner than set-based alternatives.`;
  } else if (l.includes('javascript')) {
    codeLang = 'javascript';
    codeSnippet = `// High-Performance ES6 Set Deduplication
const deduplicateLines = (text) => {
  const lines = text.split(/\\r?\\n/);
  return Array.from(new Set(lines)).join('\\n');
};

// Case-Insensitive Deduplication Preserving Original Casing
const dedupeCaseInsensitive = (lines) => {
  const seen = new Set();
  return lines.filter(line => {
    const key = line.toLowerCase();
    return seen.has(key) ? false : seen.add(key);
  });
};`;
    calloutText = `Using native ES6 Set lookups in V8 JavaScript provides constant-time O(1) membership checks, processing 50,000 items in milliseconds.`;
  } else if (l.includes('sql')) {
    codeLang = 'sql';
    codeSnippet = `-- Method 1: Query unique records from table
SELECT DISTINCT column_name FROM table_name;

-- Method 2: Delete duplicate rows while retaining the lowest ID (PostgreSQL / SQL Server)
WITH DuplicateCTE AS (
    SELECT id, ROW_NUMBER() OVER (
        PARTITION BY unique_key_column ORDER BY id ASC
    ) as row_num
    FROM dataset_table
)
DELETE FROM DuplicateCTE WHERE row_num > 1;

-- Method 3: Group by and count frequency
SELECT column_name, COUNT(*) as frequency
FROM dataset_table GROUP BY column_name HAVING COUNT(*) > 1;`;
    calloutText = `Always run a SELECT query with the CTE before executing the DELETE statement to review exactly which duplicate records will be purged.`;
  } else if (l.includes('php')) {
    codeLang = 'php';
    codeSnippet = `<?php
// Order-Preserving Array Deduplication in PHP
$rawText = file_get_contents('dataset.txt');
$lines = explode("\\n", str_replace("\\r", "", $rawText));

// array_unique preserves keys, array_values resets numerical indexing
$uniqueLines = array_values(array_unique($lines, SORT_STRING));

file_put_contents('cleaned.txt', implode("\\n", $uniqueLines));
?>`;
    calloutText = `Always wrap array_unique() with array_values() in PHP if you intend to json_encode the resulting array, preventing JSON object conversion.`;
  } else if (l.includes('java')) {
    codeLang = 'java';
    codeSnippet = `// High-Performance Java 8+ Stream Deduplication
import java.io.IOException;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

public class Deduplicator {
    public static void main(String[] args) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get("data.txt"));
        List<String> uniqueLines = lines.stream()
                                        .distinct()
                                        .collect(Collectors.toList());
        Files.write(Paths.get("clean.txt"), uniqueLines);
    }
}`;
    calloutText = `Java Streams .distinct() utilizes Object.equals() internally. Ensure proper trimming if whitespace variations exist in source data.`;
  } else if (l.includes('csv') || l.includes('tsv')) {
    codeLang = 'bash';
    codeSnippet = `# Method 1: Deduplicate single-column CSV/TSV exports preserving order
awk -F',' '!seen[$1]++' dataset.csv > clean_dataset.csv

# Method 2: Skip header row before deduplicating
awk 'NR==1; NR>1 && !seen[$0]++' dataset.csv > clean_dataset.csv

# Method 3: TSV (Tab-Separated) Column Deduplication
awk -F'\\t' '!seen[$1]++' dataset.tsv > clean_dataset.tsv`;
    calloutText = `When deduplicating CSVs with embedded commas inside quotes (e.g. "Smith, John"), dedicated client-side tools avoid awk parsing bugs.`;
  } else if (l.includes('json')) {
    codeLang = 'javascript';
    codeSnippet = `// Deduplicate Array of Strings or Objects in JSON
const rawJson = '["apple", "banana", "apple", "orange", "banana"]';
const array = JSON.parse(rawJson);
const uniqueArray = [...new Set(array)];

console.log(JSON.stringify(uniqueArray, null, 2));`;
    calloutText = `Ensure your raw JSON is valid before extracting arrays; FastToolVerse processes clean lines of JSON objects without breaking syntax brackets.`;
  } else {
    codeLang = 'bash';
    codeSnippet = `# Universal File Deduplication Pipeline
cat input_data.txt | awk '!seen[$0]++' > output_data.txt

# Count line frequency across flat files
cat input_data.txt | sort | uniq -c | sort -nr > counts.txt`;
    calloutText = `Flat-file text datasets should always be verified for UTF-8 encoding before batch loading into relational database instances.`;
  }

  const sec3Title = `Browser Sandbox Advantage: Zero Compilation & Rapid Data Pre-Flighting`;
  const sec3P1 = `Writing ad-hoc Python scripts, compiling Java binaries, or executing heavy 'DELETE' statements on production database tables creates unnecessary friction and operational danger. Running exploratory scripts locally requires installing runtime environments, managing dependency packages, and setting up file I/O permissions. In live production databases, executing multi-row deletion queries risks locking active tables, slowing down client connections, and triggering database replication lag across failover replicas.`;
  const sec3P2 = `FastToolVerse serves as an instantaneous, zero-install data staging area. Data engineers can copy unformatted single-column exports directly from SQL query GUIs, CSV logs, or JSON arrays, paste them into our studio, and verify unique counts in real time. Processing is executed in pure browser memory via compiled V8 hash sets, providing immediate confidence before committing changes to database tables or data ingestion pipelines. In addition, instant one-click delimiter transformations allow converting vertical database column dumps into comma-separated arrays for SQL IN clauses in seconds.`;

  const sec4Title = `Edge Cases in Structured Data: Quotes, Delimiters & Nulls`;
  const sec4P1 = `Structured data formats possess syntactic boundaries that require careful consideration during deduplication:`;
  const sec4Bullets = [
    `Escaped Quotes & Delimiters: In CSV exports, entries containing internal commas are wrapped in double quotes (e.g. '"New York, NY"'). FastToolVerse preserves quotation marks intact while deduplicating full line entries.`,
    `Database NULL and Blank Strings: In SQL dumps, 'NULL', 'null', and empty strings ('') often represent different data states. Toggling case sensitivity ensures case-specific keywords are respected.`,
    `Trailing Commas in Array Dumps: When exporting lists from JSON or SQL INSERT queries, trailing commas often linger at the end of rows. Use our custom delimiter tools to format clean separators.`,
    `BOM (Byte Order Mark) Headers: Files exported from Microsoft SQL Server or Windows Excel often prepend an invisible UTF-8 BOM character (\\uFEFF) to line 1. FastToolVerse trims leading BOM artifacts automatically.`
  ];

  return {
    heading,
    sections: [
      {
        title: sec1Title,
        paragraphs: [sec1P1, sec1P2],
        bullets: [
          `Eliminates primary key constraint violations and transaction rollback errors in SQL pipelines.`,
          `Avoids writing throwaway scripts or installing local runtime environments for simple data cleaning.`,
          `Preserves data integrity across CSV, JSON, TSV, and programming language collections.`
        ]
      },
      {
        title: sec2Title,
        paragraphs: [sec2P1],
        codeBlock: { language: codeLang, code: codeSnippet },
        callout: { type: 'tip', label: 'Developer Tip', text: calloutText }
      },
      {
        title: sec3Title,
        paragraphs: [sec3P1, sec3P2],
        bullets: [
          `Zero-Install Staging: Clean and format data on the fly without setting up virtual environments or Docker.`,
          `Instant 0ms Execution: Processes 50,000+ line datasets in RAM without locking live database tables.`,
          `Enterprise Security: Zero bytes ever leave your workstation; proprietary datasets remain 100% confidential.`
        ]
      },
      {
        title: sec4Title,
        paragraphs: [sec4P1],
        bullets: sec4Bullets
      }
    ]
  };
}

// --- CATEGORY E: Marketing & List Hygiene ---
function generateCategoryEEditorial(kw, name) {
  const l = kw.toLowerCase();
  const heading = `Practical Field Guide: ${name} & Marketing List Hygiene`;

  const sec1Title = `List Hygiene Context: Protecting Deliverability & Data Quality in ${name}`;
  const sec1P1 = `In modern digital marketing, growth operations, and CRM administration, clean audience lists directly dictate campaign ROI and brand reputation. When compiling newsletter subscriber databases, outbound sales leads, crawl sitemaps, or keyword advertising lists, duplicate records introduce serious operational hazards. In email marketing, sending duplicate messages to the same contact triggers spam complaints, damages domain sender scores with Gmail and Outlook, and inflates ESP subscription tiers on platforms like Mailchimp, HubSpot, and Klaviyo.`;
  const sec1P2 = `Executing a proactive ${name.toLowerCase()} routine safeguards your outreach channels and optimizes your advertising spend. Knowing how to efficiently apply ${kw} workflows enables marketing teams to merge contact rosters from webinars, lead magnets, and customer checkout databases without creating redundant records. Whether auditing URL redirect lists, standardizing PPC keywords, or cleaning customer contact files, maintaining clean unique lists is the foundation of high-converting marketing campaigns.`;

  let sec2Title = `Step-by-Step Lead Sanitization & Protocol Guide for ${name}`;
  let sec2P1 = `Effective list hygiene requires following standardized normalization steps before importing data into CRM and email marketing engines:`;
  let codeLang = 'markdown';
  let codeSnippet = '';
  let calloutText = '';

  if (l.includes('email')) {
    codeSnippet = `// Recommended 4-Step Email List Hygiene Protocol:
1. Normalize Letter Casing:
   - Email addresses are case-insensitive (e.g. Sales@Domain.com == sales@domain.com)
   - Enable "Case-Insensitive" mode to preserve only the first appearance.
2. Trim Edge Whitespace:
   - Purge leading and trailing spaces copied from form inputs or spreadsheet cells.
3. Validate Domain & Format:
   - Verify presence of '@' and valid top-level domain extensions (.com, .org, etc.)
4. Delimiter Joiner Export:
   - Convert cleaned lines to comma-separated strings for direct import into ESP suppression lists.`;
    calloutText = `Always apply case-insensitive comparison on email rosters; letter casing variations account for over 35% of false-negative duplicate records in CRM databases.`;
  } else if (l.includes('url') || l.includes('link') || l.includes('domain')) {
    codeSnippet = `// Standard URL & Sitemap Normalization Protocol:
1. Strip Tracking Query Parameters:
   - Remove Google Analytics UTM tags (utm_source, utm_medium, utm_campaign)
2. Standardize Trailing Slashes:
   - Ensure consistency (e.g., https://example.com/page/ vs https://example.com/page)
3. Normalize Protocols & Subdomains:
   - Consolidate http:// and https:// or www and non-www variants
4. Deduplicate & Re-Sort:
   - Paste into FastToolVerse with "Alphabetical Sort" to generate clean crawl lists.`;
    calloutText = `Stripping protocol prefixes and trailing query parameters before deduplicating ensures that duplicate web pages with varied referral tags are identified accurately.`;
  } else if (l.includes('keyword')) {
    codeSnippet = `// PPC & SEO Keyword De-Duplication Protocol:
1. Lowercase All Search Queries:
   - Search engines evaluate queries identically regardless of capitalization.
2. Trim Extra Internal & Edge Spaces:
   - Remove double spaces between search terms before upload to Google Ads.
3. Filter by Negative Match Criteria:
   - Use "Duplicates Only" mode in FastToolVerse to identify overlapping keywords across ad groups.
4. Export Cleaned Keyword Roster:
   - Copy unique keywords directly into Google Ads Editor or Semrush keyword tracking.`;
    calloutText = `Eliminating duplicate keywords prevents internal budget cannibalization and bidding against your own ad groups in Google Ads auctions.`;
  } else if (l.includes('phone')) {
    codeSnippet = `// SMS & Telephony Number Hygiene Protocol:
1. Standardize Country Dialing Codes:
   - Convert numbers to international E.164 format (+15551234567).
2. Remove Punctuation & Separators:
   - Strip hyphens, brackets, periods, and spaces: e.g. (555) 123-4567 -> 5551234567
3. Run Deduplication with Punctuation Normalized:
   - Enable "Ignore punctuation & symbols" in FastToolVerse to unify divergent formatting.
4. Export Clean Number Array for SMS Gateway Dispatch.`;
    calloutText = `Formatting telephone numbers into uniform numeric strings before deduplicating prevents sending duplicate SMS notifications to the same customer.`;
  } else if (l.includes('count') || l.includes('frequency')) {
    codeSnippet = `// Frequency Analysis & Anomaly Detection Workflow:
1. Paste text into FastToolVerse input editor
2. Select "Count Occurrences" in the Extraction Mode selector
3. Select Sort: "Frequency (High -> Low)"
4. The studio displays an exact occurrence histogram:
   - Example output:
     user@example.com (x4)
     admin@domain.org (x2)
     support@startup.io (x1)
5. Identify severe repeat offenders and inspect data pipeline anomalies.`;
    calloutText = `Frequency counting identifies runaway web crawlers or webhook retry loops that bombard your systems with identical repetitive requests.`;
  } else if (l.includes('extract duplicate') || l.includes('duplicates only') || l.includes('show duplicate')) {
    codeSnippet = `// Duplicate Isolation & Audit Workflow:
1. Paste source text list into FastToolVerse
2. Select "Duplicates Only" extraction mode
3. The studio filters and outputs ONLY records that appeared 2 or more times
4. Export the duplicate list to investigate source data errors
5. Switch to "Unique Lines" mode to generate the finalized sanitized production roster.`;
    calloutText = `'Duplicates Only' extraction lets you audit exactly which contacts or entries were redundant before permanently discarding them.`;
  } else {
    codeSnippet = `// Universal 3-Step List Sanitization Protocol:
1. Paste raw text list from your clipboard into the Input Editor
2. Configure normalization toggles:
   - Enable "Trim edge whitespace"
   - Select case-sensitivity based on your data type
   - Choose desired sorting: Original order vs Alphabetical (A-Z)
3. Instant Export:
   - Click "Copy Result" or export with custom delimiters (commas, semicolons, or tabs).`;
    calloutText = `Always check whether your destination software requires comma-separated values or one-entry-per-line formatting before copying results.`;
  }

  const sec3Title = `Browser Sandbox Advantage: Absolute Privacy for Confidential Contact Records`;
  const sec3P1 = `Customer email addresses, phone directories, personal names, and commercial lead lists constitute Personally Identifiable Information (PII). Under strict global data privacy frameworks—including the European Union's General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and enterprise SOC 2 standards—transmitting unencrypted customer data over the internet to unknown third-party cloud servers represents a severe compliance breach. Many free online text tools monetize by scraping clipboard inputs or logging uploaded data to backend servers.`;
  const sec3P2 = `FastToolVerse provides enterprise-grade data privacy through 100% in-browser memory execution. All string parsing, hash comparisons, and uniqueness filtering run strictly inside your local browser tab's RAM sandbox. Zero bytes ever travel across the internet, no cookies track your entries, and no logs are recorded. The moment you clear the workspace or close the browser tab, the browser's garbage collection sweeps and frees all memory, guaranteeing that your proprietary marketing assets remain completely confidential.`;

  const sec4Title = `Edge Cases in List Hygiene: Whitespace, Casing & Separator Quirks`;
  const sec4P1 = `Marketing lists frequently gather data from multiple landing pages and form builders, introducing subtle discrepancies:`;
  const sec4Bullets = [
    `Case-Insensitive Identifiers: Email addresses and usernames are often entered with mixed capitalization ('Support@Domain.com' vs 'support@domain.com'). Disabling case sensitivity unifies these variants while preserving the clean casing of the first appearance.`,
    `Accidental Trailing Spaces: When users copy-paste emails or keywords from spreadsheets, an invisible trailing space (ASCII 32) frequently attaches to the end. 'Trim edge whitespace' purges edge spaces before uniqueness evaluation.`,
    `Delimiter Formatting for Ad Platforms: Google Ads and Facebook Ads bulk uploaders require comma-separated keyword formats. Use our instant Delimiter selector to transform vertical line breaks into comma-joined rows with one click.`,
    `Blank Rows and Empty Submissions: Form dropouts often create empty lines in raw CSV exports. Enabling 'Strip blank lines' removes all empty and whitespace-only rows from your cleaned dataset.`
  ];

  return {
    heading,
    sections: [
      {
        title: sec1Title,
        paragraphs: [sec1P1, sec1P2],
        bullets: [
          `Protects email sender reputation, reduces bounce rates, and prevents duplicate outreach.`,
          `Guarantees 100% compliance with GDPR and CCPA by processing customer PII locally in browser RAM.`,
          `Offers instant multi-mode inspection including occurrence frequency counting and duplicate extraction.`
        ]
      },
      {
        title: sec2Title,
        paragraphs: [sec2P1],
        codeBlock: { language: codeLang, code: codeSnippet },
        callout: { type: 'tip', label: 'Hygiene Tip', text: calloutText }
      },
      {
        title: sec3Title,
        paragraphs: [sec3P1, sec3P2],
        bullets: [
          `100% Client-Side RAM Sandbox: Zero network requests, zero server uploads, complete PII protection.`,
          `Instant 0ms Lookups: Linear O(N) Hash Sets handle 50,000+ subscriber lists without lag or page reloads.`,
          `One-Click Delimiter Joiner: Instantly convert cleaned lists into comma-separated strings for ad platforms.`
        ]
      },
      {
        title: sec4Title,
        paragraphs: [sec4P1],
        bullets: sec4Bullets
      }
    ]
  };
}

// Dispatcher for the 5 categories
function generateEditorialGuide(kw, name, cluster) {
  switch (cluster.cluster) {
    case 'editor-tools':
      return generateCategoryAEditorial(kw, name);
    case 'cli-shell':
      return generateCategoryBEditorial(kw, name);
    case 'office-spreadsheets':
      return generateCategoryCEditorial(kw, name);
    case 'data-formats':
      return generateCategoryDEditorial(kw, name);
    case 'marketing-crm':
    default:
      return generateCategoryEEditorial(kw, name);
  }
}

// Generate 6 domain-tailored FAQs
function generateFaqs(kw, name) {
  return [
    {
      question: `How do I remove duplicate lines in ${name} online?`,
      answer: `Paste or type your text list into the Input Text editor. FastToolVerse automatically evaluates every row using high-speed O(1) hash sets in real time. Duplicate lines are stripped instantly while preserving the original appearance order. You can toggle case sensitivity, whitespace trimming, or alphabetical sorting, then click Copy or download as a .txt file.`
    },
    {
      question: `Does this ${name} tool upload my data or files to any server?`,
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

console.log(`Generated ${presets.length} presets across 5 distinct category architectures.`);

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
  if (editWords < 600 || editWords > 1200) {
    console.error(`Preset ${idx + 1} (${p.slug}) editorialGuide word count out of range: ${editWords} words`);
    hasErrors = true;
  }
});

if (hasErrors) {
  console.error("Errors found during preset generation!");
  process.exit(1);
}

// Format TypeScript File Content
const fileHeader = `// Autogenerated 67 High-Intent Remove Duplicate Lines Presets
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
