import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

export default defineConfig({
  site: 'https://pavelc4.github.io',
  base: '/',
  integrations: [svelte(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});