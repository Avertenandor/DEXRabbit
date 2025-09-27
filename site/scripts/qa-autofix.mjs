#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('# DEXRabbit Auto-Fixer\n');

// Проверяем и создаем недостающие ассеты
const missingAssets = [];

// Проверяем favicon.ico
if (!fs.existsSync('public/favicon.ico')) {
  console.log('🔧 Creating favicon.ico...');
  // Копируем favicon.svg как favicon.ico (заглушка)
  if (fs.existsSync('public/favicon.svg')) {
    fs.copyFileSync('public/favicon.svg', 'public/favicon.ico');
    console.log('✅ Created favicon.ico from favicon.svg');
  }
}

// Проверяем site.webmanifest
if (!fs.existsSync('public/site.webmanifest')) {
  console.log('🔧 Creating site.webmanifest...');
  const manifest = {
    name: 'DEXRabbit',
    short_name: 'DEXRabbit',
    description: 'Токенизация кролиководства',
    theme_color: '#0B0D10',
    background_color: '#0B0D10',
    display: 'standalone',
    start_url: '/DEXRabbit/',
    icons: [
      {
        src: '/DEXRabbit/favicon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/DEXRabbit/favicon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
  
  fs.writeFileSync('public/site.webmanifest', JSON.stringify(manifest, null, 2));
  console.log('✅ Created site.webmanifest');
}

// Проверяем sitemap.xml
if (!fs.existsSync('public/sitemap.xml')) {
  console.log('🔧 Creating sitemap.xml...');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://avertenandor.github.io/DEXRabbit/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://avertenandor.github.io/DEXRabbit/legal/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('✅ Created sitemap.xml');
}

// Проверяем robots.txt
if (!fs.existsSync('public/robots.txt')) {
  console.log('🔧 Creating robots.txt...');
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://avertenandor.github.io/DEXRabbit/sitemap.xml

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /api/
Disallow: /_astro/

# Allow all other content
Allow: /images/
Allow: /og/
Allow: /data/`;
  
  fs.writeFileSync('public/robots.txt', robots);
  console.log('✅ Created robots.txt');
}

// Проверяем 404.html
if (!fs.existsSync('public/404.html')) {
  console.log('🔧 Creating 404.html...');
  const notFound = `<!doctype html>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=/DEXRabbit/">
<link rel="canonical" href="/DEXRabbit/">
<title>DEXRabbit - Redirecting...</title>
<body>
  <p>Redirecting to <a href="/DEXRabbit/">DEXRabbit</a>...</p>
</body>`;
  
  fs.writeFileSync('public/404.html', notFound);
  console.log('✅ Created 404.html');
}

console.log('\n## Auto-Fix Summary\n');
console.log('✅ All critical assets checked and created if missing');
console.log('✅ Auto-fix completed at:', new Date().toISOString());
