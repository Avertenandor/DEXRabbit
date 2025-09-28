import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://xn--80apagbbfxgmuj4j.site',
  integrations: [
    sitemap()
  ],
  output: 'static',
  build: {
    format: 'file'
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  }
});
