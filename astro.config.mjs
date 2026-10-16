// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Incomplete / Coming Soon tool slugs to exclude from sitemap
const COMING_SOON_SLUGS = new Set([
  'add-prefix-suffix',
  'add-watermark',
  'aspect-ratio-calculator',
  'base64-decoder',
  'base64-encoder',
  'color-converter',
  'color-picker-from-image',
  'css-minifier',
  'exif-viewer',
  'facebook-image-resizer',
  'find-and-replace-text',
  'html-formatter',
  'image-cropper',
  'image-dimensions-calculator',
  'image-flipper',
  'image-optimizer',
  'image-rotator',
  'instagram-image-resizer',
  'js-minifier',
  'json-formatter',
  'json-minifier',
  'json-validator',
  'jwt-decoder',
  'linkedin-image-resizer',
  'passport-size',
  'passport-size-maker',
  'pinterest-image-resizer',
  'regex-tester',
  'remove-special-characters',
  'text-case-converter',
  'text-to-slug-converter',
  'tiktok-image-resizer',
  'timestamp-converter',
  'unix-timestamp-converter',
  'url-decoder',
  'url-encoder',
  'uuid-generator',
  'whatsapp-image-resizer',
  'x-twitter-image-resizer',
  'youtube-image-resizer'
]);

// https://astro.build/config
export default defineConfig({
  site: 'https://fasttoolverse.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => {
        // Exclude 404 and non-indexable utility endpoints
        if (page.includes('/404')) return false;
        // Exclude any legacy /tools/ path
        if (page.includes('/tools/')) return false;
        // Exclude all coming soon / placeholder tools
        const pathSlug = page.replace(/^https?:\/\/[^\/]+/, '').replace(/^\/+/, '').replace(/\/+$/, '');
        if (COMING_SOON_SLUGS.has(pathSlug)) return false;
        return true;
      },
      serialize: (item) => {
        // Standardize site URL to https://fasttoolverse.com (non-www, HTTPS) and force trailing slash
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
  },
  redirects: {
    // 404 Route 301 Redirects
    '/batch-image-to-webp': '/image-converter/',
    '/batch-image-to-webp/': '/image-converter/',
    '/jpg-to-avif': '/image-converter/',
    '/jpg-to-avif/': '/image-converter/',
    '/tools/remove-special-characters': '/remove-special-characters/',
    '/tools/remove-special-characters/': '/remove-special-characters/',
    '/api': '/',

    // Social Resizer Aliases to canonical flat root
    '/pinterest-pin-resizer': '/pinterest-image-resizer/',
    '/twitter-header-resizer': '/x-twitter-image-resizer/',
    '/whatsap': '/whatsapp-image-resizer/',
    '/whatsapp-dp-resizer': '/whatsapp-image-resizer/',
    '/linkedin-banner-resizer': '/linkedin-image-resizer/',
    '/youtube-banner-resizer': '/youtube-image-resizer/',
    '/resize-image-for-instagram': '/instagram-image-resizer/',
    '/facebook-cover-photo-resizer': '/facebook-image-resizer/',
    '/tiktok-profile-picture-resizer': '/tiktok-image-resizer/',

    // All Tools Flattened Root Migrations (301)
    '/tools/image-resizer': '/image-resizer/',
    '/tools/image-compressor': '/image-compressor/',
    '/tools/image-converter': '/image-converter/',
    '/tools/image-cropper': '/image-cropper/',
    '/tools/image-rotator': '/image-rotator/',
    '/tools/image-flipper': '/image-flipper/',
    '/tools/aspect-ratio-calculator': '/aspect-ratio-calculator/',
    '/tools/image-dimensions-calculator': '/image-dimensions-calculator/',
    '/tools/add-watermark': '/add-watermark/',
    '/tools/passport-size': '/passport-size/',
    '/tools/passport-size-maker': '/passport-size-maker/',
    '/tools/image-optimizer': '/image-optimizer/',
    '/tools/exif-viewer': '/exif-viewer/',
    '/tools/color-picker-from-image': '/color-picker-from-image/',
    '/tools/youtube-image-resizer': '/youtube-image-resizer/',
    '/tools/instagram-image-resizer': '/instagram-image-resizer/',
    '/tools/facebook-image-resizer': '/facebook-image-resizer/',
    '/tools/x-twitter-image-resizer': '/x-twitter-image-resizer/',
    '/tools/linkedin-image-resizer': '/linkedin-image-resizer/',
    '/tools/pinterest-image-resizer': '/pinterest-image-resizer/',
    '/tools/tiktok-image-resizer': '/tiktok-image-resizer/',
    '/tools/whatsapp-image-resizer': '/whatsapp-image-resizer/',
    '/tools/json-formatter': '/json-formatter/',
    '/tools/json-validator': '/json-validator/',
    '/tools/json-minifier': '/json-minifier/',
    '/tools/base64-encoder': '/base64-encoder/',
    '/tools/base64-decoder': '/base64-decoder/',
    '/tools/url-encoder': '/url-encoder/',
    '/tools/url-decoder': '/url-decoder/',
    '/tools/uuid-generator': '/uuid-generator/',
    '/tools/timestamp-converter': '/timestamp-converter/',
    '/tools/unix-timestamp-converter': '/unix-timestamp-converter/',
    '/tools/regex-tester': '/regex-tester/',
    '/tools/jwt-decoder': '/jwt-decoder/',
    '/tools/html-formatter': '/html-formatter/',
    '/tools/css-minifier': '/css-minifier/',
    '/tools/js-minifier': '/js-minifier/',
    '/tools/color-converter': '/color-converter/',
    '/tools/remove-extra-spaces': '/remove-extra-spaces/',
    '/tools/remove-duplicate-lines': '/remove-duplicate-lines/',
    '/tools/remove-empty-lines': '/remove-empty-lines/',
    '/tools/remove-line-breaks': '/remove-line-breaks/',
    '/tools/sort-text-lines': '/sort-text-lines/',
    '/tools/text-case-converter': '/text-case-converter/',
    '/tools/find-and-replace-text': '/find-and-replace-text/',
    '/tools/add-prefix-suffix': '/add-prefix-suffix/',
    '/tools/text-to-slug-converter': '/text-to-slug-converter/',

    // Remove Empty Lines 301 Migrations
    '/tools/remove-empty-lines/how-to-remove-empty-lines-in-notepad-plus-plus': '/remove-empty-lines-notepad-plus-plus/',
    '/tools/remove-empty-lines/how-to-remove-empty-lines-in-excel': '/remove-empty-lines-excel/',
    '/tools/remove-empty-lines/how-to-remove-empty-lines-in-word': '/remove-empty-lines-word/',
    '/tools/remove-empty-lines/how-to-remove-empty-lines-in-google-docs': '/remove-empty-lines-google-docs/',
    '/tools/remove-empty-lines/how-to-remove-empty-lines-in-vscode': '/remove-empty-lines-vscode/',
    '/tools/remove-empty-lines/how-to-remove-empty-lines-in-google-sheets': '/remove-empty-lines-google-sheets/',
    '/tools/remove-empty-lines/how-to-remove-empty-lines-in-vim': '/remove-empty-lines-vim/',
    '/tools/remove-empty-lines/notepad-plus-plus-remove-empty-lines': '/notepad-plus-plus-remove-empty-lines/',
    '/tools/remove-empty-lines/notepad-plus-plus-remove-all-empty-lines': '/notepad-plus-plus-remove-all-empty-lines/',
    '/tools/remove-empty-lines/word-document-remove-empty-lines': '/word-document-remove-empty-lines/',
    '/tools/remove-empty-lines/google-docs-remove-empty-lines': '/google-docs-remove-empty-lines/',
    '/tools/remove-empty-lines/sublime-text-remove-empty-lines': '/sublime-text-remove-empty-lines/',
    '/tools/remove-empty-lines/ultraedit-remove-empty-lines': '/ultraedit-remove-empty-lines/',
    '/tools/remove-empty-lines/windows-notepad-remove-empty-lines': '/windows-notepad-remove-empty-lines/',
    '/tools/remove-empty-lines/vscode-remove-empty-lines': '/vscode-remove-empty-lines/',
    '/tools/remove-empty-lines/visual-studio-remove-empty-lines': '/visual-studio-remove-empty-lines/',
    '/tools/remove-empty-lines/intellij-remove-empty-lines': '/intellij-remove-empty-lines/',
    '/tools/remove-empty-lines/vim-remove-empty-lines': '/vim-remove-empty-lines/',
    '/tools/remove-empty-lines/eclipse-remove-empty-lines': '/eclipse-remove-empty-lines/',
    '/tools/remove-empty-lines/webstorm-remove-empty-lines': '/webstorm-remove-empty-lines/',
    '/tools/remove-empty-lines/remove-empty-lines-excel': '/remove-empty-lines-excel/',
    '/tools/remove-empty-lines/excel-remove-empty-lines': '/excel-remove-empty-lines/',
    '/tools/remove-empty-lines/google-sheets-remove-empty-lines': '/google-sheets-remove-empty-lines/',
    '/tools/remove-empty-lines/remove-empty-lines-csv': '/remove-empty-lines-csv/',
    '/tools/remove-empty-lines/libreoffice-calc-remove-empty-lines': '/libreoffice-calc-remove-empty-lines/',
    '/tools/remove-empty-lines/remove-empty-lines-json': '/remove-empty-lines-json/',
    '/tools/remove-empty-lines/remove-empty-lines-xml': '/remove-empty-lines-xml/',
    '/tools/remove-empty-lines/remove-empty-lines-python-string': '/remove-empty-lines-python-string/',
    '/tools/remove-empty-lines/remove-empty-lines-javascript': '/remove-empty-lines-javascript/',
    '/tools/remove-empty-lines/remove-empty-lines-sql-query': '/remove-empty-lines-sql-query/',
    '/tools/remove-empty-lines/remove-empty-lines-from-text-file': '/remove-empty-lines-from-text-file/',
    '/tools/remove-empty-lines/remove-empty-lines-online-tool': '/remove-empty-lines-online-tool/',
    '/tools/remove-empty-lines/regex-remove-empty-lines': '/regex-remove-empty-lines/',
    '/tools/remove-empty-lines/remove-whitespace-only-lines': '/remove-whitespace-only-lines/',
    '/tools/remove-empty-lines/collapse-multiple-blank-lines-to-one': '/collapse-multiple-blank-lines-to-one/',
    '/tools/remove-empty-lines/remove-leading-trailing-empty-lines': '/remove-leading-trailing-empty-lines/',
    '/tools/remove-empty-lines/remove-empty-lines-notepad-plus-plus': '/remove-empty-lines-notepad-plus-plus/',
    '/tools/remove-empty-lines/remove-empty-lines-word': '/remove-empty-lines-word/',
    '/tools/remove-empty-lines/remove-empty-lines-google-docs': '/remove-empty-lines-google-docs/',
    '/tools/remove-empty-lines/remove-empty-lines-vscode': '/remove-empty-lines-vscode/',
    '/tools/remove-empty-lines/remove-empty-lines-google-sheets': '/remove-empty-lines-google-sheets/',
    '/tools/remove-empty-lines/remove-empty-lines-vim': '/remove-empty-lines-vim/'
  }
});
