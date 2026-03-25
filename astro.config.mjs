// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://youragency.lt',
  adapter: vercel(),
  integrations: [sitemap()],
});
