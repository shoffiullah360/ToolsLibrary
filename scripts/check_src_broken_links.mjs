import fs from 'fs';
import path from 'path';

function getFiles(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) res.push(...getFiles(p));
    else res.push(p);
  }
  return res;
}

const srcFiles = getFiles('src');
const distFiles = new Set(getFiles('dist').map(f => f.replace(/\\/g, '/').replace(/^dist\//, '')));

const srcBrokenLinks = [];
for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const matches = content.matchAll(/href=["'](\/[a-zA-Z0-9_\-\/]*|https?:\/\/(?:www\.)?fasttoolverse\.com\/[a-zA-Z0-9_\-\/]*)["']/g);
  for (const m of matches) {
    const fullHref = m[1];
    let clean = fullHref.replace(/^https?:\/\/(?:www\.)?fasttoolverse\.com/, '');
    clean = clean.split('#')[0].split('?')[0];
    if (!clean) clean = '/';
    if (clean.match(/\.(svg|png|jpg|ico|css|js)$/)) continue;
    const norm = clean.replace(/\/+$/, '');
    const t1 = norm ? norm.replace(/^\/+/, '') + '/index.html' : 'index.html';
    const t2 = norm ? norm.replace(/^\/+/, '') + '.html' : 'index.html';
    if (!distFiles.has(t1) && !distFiles.has(t2)) {
      srcBrokenLinks.push({ file: file.replace(/\\/g, '/'), href: fullHref, clean });
    }
  }
}

console.log('Broken links found directly in src/ files:', srcBrokenLinks.length);
if (srcBrokenLinks.length > 0) {
  console.log(srcBrokenLinks);
}
