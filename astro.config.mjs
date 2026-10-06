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
    '/tiktok-profile-picture-resizer': '/tools/tiktok-image-resizer/'
  }
});

