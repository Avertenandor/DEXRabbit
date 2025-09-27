// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // для IDN-домена указываем ПУНИКОД (или используй Unicode — Astro умеет оба)
  site: 'https://xn--80apagbbfxgmuj4j.site/',
  base: '/',
  trailingSlash: 'never',
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: { port: 4322, strictPort: false }
  }
});