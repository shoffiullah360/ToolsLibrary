import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const KEY = 'e4b8a2c1f9d04768b9123456789abcdef';
const HOST = 'fasttoolverse.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.join(rootDir, 'dist', 'sitemap-0.xml');
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error(`Error: Sitemap not found at ${SITEMAP_PATH}. Please run "npm run build" first.`);
    process.exit(1);
  }

  const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  const urlList = [];
  let match;

  while ((match = locRegex.exec(sitemapContent)) !== null) {
    urlList.push(match[1]);
  }

  if (urlList.length === 0) {
    console.error('Error: No URLs found in sitemap.');
    process.exit(1);
  }

  console.log(`Discovered ${urlList.length} URLs to submit to IndexNow.`);
  console.log(`Host: ${HOST}`);
  console.log(`Key: ${KEY}`);
  console.log(`Key Location: ${KEY_LOCATION}`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log(`Response Status: ${response.status} ${response.statusText}`);
    if (responseText) {
      console.log(`Response Body: ${responseText}`);
    }

    if (response.status === 200 || response.status === 202) {
      console.log('✓ Successfully submitted URLs to IndexNow!');
    } else {
      console.warn(`! Note: IndexNow returned status ${response.status}.`);
    }
  } catch (error) {
    console.error('Failed to submit to IndexNow:', error);
    process.exit(1);
  }
}

main();
