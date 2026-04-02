import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compressor from '@playform/compress';

export default defineConfig({
  site: 'https://pavelc4.github.io', 
  integrations: [
    svelte(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    compressor(),
  ],
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'github.com' }],
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});