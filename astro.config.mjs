// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const WHITELIST_URLS = new Set([
  'https://fasttoolverse.com/',
  'https://fasttoolverse.com/image-resizer/',
  'https://fasttoolverse.com/image-compressor/',
  'https://fasttoolverse.com/image-converter/',
  'https://fasttoolverse.com/remove-extra-spaces/',
  'https://fasttoolverse.com/remove-duplicate-lines/',
  'https://fasttoolverse.com/remove-empty-lines/',
  'https://fasttoolverse.com/remove-line-breaks/',
  'https://fasttoolverse.com/sort-text-lines/',
  'https://fasttoolverse.com/about/',
  'https://fasttoolverse.com/contact/',
  'https://fasttoolverse.com/privacy-policy/',
  'https://fasttoolverse.com/terms/'
]);

// https://astro.build/config
export default defineConfig({
  site: 'https://fasttoolverse.com',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [
    sitemap({
      filter: (page) => {
        let normalized = page
          .replace(/^http:\/\//, 'https://')
          .replace(/^https:\/\/(www\.)?fasttoolverse\.com/, 'https://fasttoolverse.com');
        if (!normalized.endsWith('/')) {
          normalized = `${normalized}/`;
        }
        return WHITELIST_URLS.has(normalized);
      },
      serialize: (item) => {
        let url = item.url
          .replace(/^http:\/\//, 'https://')
          .replace(/^https:\/\/(www\.)?fasttoolverse\.com/, 'https://fasttoolverse.com');
        if (!url.endsWith('/')) {
          url = `${url}/`;
        }
        item.url = url;
        return item;
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
