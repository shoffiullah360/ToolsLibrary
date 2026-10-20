import fs from 'fs';

const redirectsFile = 'public/_redirects';
const content = fs.readFileSync(redirectsFile, 'utf-8');
const lines = content.split('\n');

let validRules = 0;
let errors = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line || line.startsWith('#')) continue;

  const parts = line.split(/\s+/);
  if (parts.length < 2) {
    console.error(`Line ${i + 1}: Malformed redirect rule: "${line}"`);
    errors++;
    continue;
  }

  const [from, to, status] = parts;
  if (!from.startsWith('/') || !to.startsWith('/')) {
    console.error(`Line ${i + 1}: Relative path missing leading slash: "${line}"`);
    errors++;
    continue;
  }

  validRules++;
}

console.log(`\n=== PUBLIC/_REDIRECTS INTEGRITY AUDIT ===`);
console.log(`Total Valid Redirect Rules: ${validRules}`);
console.log(`Syntax Errors: ${errors}`);

if (errors === 0) {
  console.log(`✓ ALL REDIRECT RULES HAVE CLEAN SYNTAX FOR CLOUDFLARE/NETLIFY!\n`);
} else {
  process.exit(1);
}
