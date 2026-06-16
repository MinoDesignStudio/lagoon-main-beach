// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// DEPLOY_TARGET=pages builds the GitHub Pages client preview (subpath + noindex).
// Default build is production for the live domain on Cloudflare.
const isPagesPreview = process.env.DEPLOY_TARGET === 'pages';

export default defineConfig({
  site: isPagesPreview
    ? 'https://minodesignstudio.github.io'
    : 'https://lagoonmainbeach.com',
  base: isPagesPreview ? '/lagoon-main-beach' : '/',
  trailingSlash: 'ignore',
  compressHTML: true,
  integrations: [react(), sitemap()],
});
