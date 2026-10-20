import fs from 'fs';

// 1. Read the pruned slugs from scripts/live-redirect-audit.md
const auditContent = fs.readFileSync('scripts/live-redirect-audit.md', 'utf8');

const lbSection = auditContent.split('## 2. Remove Duplicate Lines Pruned Presets')[0];
const dlSection = auditContent.split('## 2. Remove Duplicate Lines Pruned Presets')[1].split('## 3. Bash Verification Script')[0];

const lbSlugs = [...lbSection.matchAll(/\| \d+ \| https:\/\/fasttoolverse\.com\/(?:tools\/remove-line-breaks\/)?([a-z0-9\-]+)\/ \|/g)].map(m => m[1]);
const dlSlugs = [...dlSection.matchAll(/\| \d+ \| https:\/\/fasttoolverse\.com\/(?:tools\/remove-duplicate-lines\/)?([a-z0-9\-]+)\/ \|/g)].map(m => m[1]);

console.log(`Extracted ${lbSlugs.length} Remove Line Breaks pruned slugs.`);
console.log(`Extracted ${dlSlugs.length} Remove Duplicate Lines pruned slugs.`);

if (lbSlugs.length !== 139 || dlSlugs.length !== 27) {
  console.error('Mismatch in expected counts: expected 139 LB and 27 DL slugs!');
  process.exit(1);
}

// 2. Read public/_redirects base header (lines 1 to 56)
const existingRedirects = fs.readFileSync('public/_redirects', 'utf8');
const baseHeader = existingRedirects.split('# ==============================================================================')[0].trimEnd();

let newRedirects = baseHeader + '\n\n';

newRedirects += '# ==============================================================================\n';
newRedirects += '# Pruned Remove Line Breaks Presets (Forced 301! Permanent Redirects to Tool)\n';
newRedirects += '# ==============================================================================\n';

const formatRule = (from, to) => `${from.padEnd(86, ' ')}  ${to}  301!\n`;

for (const slug of lbSlugs) {
  newRedirects += formatRule(`/${slug}/`, '/remove-line-breaks/');
  newRedirects += formatRule(`/${slug}`, '/remove-line-breaks/');
  newRedirects += formatRule(`/tools/remove-line-breaks/${slug}/`, '/remove-line-breaks/');
  newRedirects += formatRule(`/tools/remove-line-breaks/${slug}`, '/remove-line-breaks/');
}

newRedirects += '\n# ==============================================================================\n';
newRedirects += '# Pruned Remove Duplicate Lines Presets (Forced 301! Permanent Redirects to Tool)\n';
newRedirects += '# ==============================================================================\n';

for (const slug of dlSlugs) {
  newRedirects += formatRule(`/${slug}/`, '/remove-duplicate-lines/');
  newRedirects += formatRule(`/${slug}`, '/remove-duplicate-lines/');
  newRedirects += formatRule(`/tools/remove-duplicate-lines/${slug}/`, '/remove-duplicate-lines/');
  newRedirects += formatRule(`/tools/remove-duplicate-lines/${slug}`, '/remove-duplicate-lines/');
}

fs.writeFileSync('public/_redirects', newRedirects, 'utf8');
console.log('✓ Successfully regenerated public/_redirects with enforced root 301! redirects.');

// 3. Update scripts/live-redirect-audit.md with direct root URLs
let updatedAudit = '# Full Production 301 Redirect Audit Report\n\n';
updatedAudit += 'Production Domain: `https://fasttoolverse.com`\n\n';
updatedAudit += '## 1. Remove Line Breaks Pruned Presets (1 to 139)\n\n';
updatedAudit += '| # | Old Live URL (Root URL Crawled by Googlebot) | Target Destination (301 Redirect) |\n';
updatedAudit += '| :--- | :--- | :--- |\n';

for (let i = 0; i < lbSlugs.length; i++) {
  updatedAudit += `| ${i + 1} | https://fasttoolverse.com/${lbSlugs[i]}/ | https://fasttoolverse.com/remove-line-breaks/ |\n`;
}

updatedAudit += '\n## 2. Remove Duplicate Lines Pruned Presets (1 to 27)\n\n';
updatedAudit += '| # | Old Live URL (Root URL Crawled by Googlebot) | Target Destination (301 Redirect) |\n';
updatedAudit += '| :--- | :--- | :--- |\n';

for (let i = 0; i < dlSlugs.length; i++) {
  updatedAudit += `| ${i + 1} | https://fasttoolverse.com/${dlSlugs[i]}/ | https://fasttoolverse.com/remove-duplicate-lines/ |\n`;
}

updatedAudit += '\n## 3. Bash Verification Script (curl -I)\n\n';
updatedAudit += '```bash\n#!/usr/bin/env bash\n# FastToolVerse Live 301 Redirect Verification Script (Root URLs)\n\nURLS=(\n';

for (const slug of lbSlugs) {
  updatedAudit += `  "https://fasttoolverse.com/${slug}/"\n`;
}
for (const slug of dlSlugs) {
  updatedAudit += `  "https://fasttoolverse.com/${slug}/"\n`;
}

updatedAudit += ')\n\necho "Testing ${#URLS[@]} live redirect URLs against https://fasttoolverse.com..."\n';
updatedAudit += 'for url in "${URLS[@]}"; do\n';
updatedAudit += '  res=$(curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}" "$url")\n';
updatedAudit += '  echo "GET $url => $res"\ndone\n```\n';

fs.writeFileSync('scripts/live-redirect-audit.md', updatedAudit, 'utf8');
console.log('✓ Successfully updated scripts/live-redirect-audit.md to reflect direct root URLs.');

// 4. Update scripts/redirect-audit-links.md if it exists
if (fs.existsSync('scripts/redirect-audit-links.md')) {
  let doc = fs.readFileSync('scripts/redirect-audit-links.md', 'utf8');
  doc = doc.replaceAll('| `/tools/remove-line-breaks/` |', '| `/remove-line-breaks/` |');
  doc = doc.replaceAll('| `/tools/remove-duplicate-lines/` |', '| `/remove-duplicate-lines/` |');
  doc = doc.replaceAll('Target Redirect Hub: `http://localhost:4321/tools/remove-line-breaks/` (or `/remove-line-breaks/`)', 'Target Redirect Hub: `http://localhost:4321/remove-line-breaks/`');
  doc = doc.replaceAll('Target Redirect Hub: `http://localhost:4321/tools/remove-duplicate-lines/` (or `/remove-duplicate-lines/`)', 'Target Redirect Hub: `http://localhost:4321/remove-duplicate-lines/`');
  fs.writeFileSync('scripts/redirect-audit-links.md', doc, 'utf8');
  console.log('✓ Successfully updated scripts/redirect-audit-links.md.');
}
