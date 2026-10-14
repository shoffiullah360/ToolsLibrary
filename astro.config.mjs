// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fasttoolverse.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  redirects: {
    '/pinterest-pin-resizer': '/tools/pinterest-image-resizer/',
    '/twitter-header-resizer': '/tools/x-twitter-image-resizer/',
    '/whatsap': '/tools/whatsapp-image-resizer/',
    '/whatsapp-dp-resizer': '/tools/whatsapp-image-resizer/',
    '/linkedin-banner-resizer': '/tools/linkedin-image-resizer/',
    '/youtube-banner-resizer': '/tools/youtube-image-resizer/',
    '/resize-image-for-instagram': '/tools/instagram-image-resizer/',
    '/facebook-cover-photo-resizer': '/tools/facebook-image-resizer/',
    '/tiktok-profile-picture-resizer': '/tools/tiktok-image-resizer/',

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
    '/tools/remove-empty-lines/remove-empty-lines-in-json': '/remove-empty-lines-json/',
    '/tools/remove-empty-lines/remove-empty-lines-json': '/remove-empty-lines-json/',
    '/tools/remove-empty-lines/remove-empty-lines-in-xml': '/remove-empty-lines-xml/',
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
