import { test, expect } from 'vitest';
import { existsSync } from 'fs';
import { join } from 'path';

const PUBLIC_DIR = 'public';
const DIST_DIR = 'dist';

const requiredFiles = [
  'index.html',
  'CNAME',
  'favicon.ico',
  'site.webmanifest',
  'og/og-image.svg'
];

test('All required files should exist in public', () => {
  for (const file of requiredFiles) {
    const filePath = join(PUBLIC_DIR, file);
    expect(existsSync(filePath)).toBe(true);
  }
});

test('All required files should exist in dist after build', () => {
  for (const file of requiredFiles) {
    const filePath = join(DIST_DIR, file);
    expect(existsSync(filePath)).toBe(true);
  }
});

test('CNAME should contain correct domain', () => {
  const cnamePath = join(PUBLIC_DIR, 'CNAME');
  const cnameContent = require('fs').readFileSync(cnamePath, 'utf8').trim();
  expect(cnameContent).toBe('xn--80apagbbfxgmuj4j.site');
});

test('Manifest should be valid JSON', () => {
  const manifestPath = join(PUBLIC_DIR, 'site.webmanifest');
  const manifestContent = require('fs').readFileSync(manifestPath, 'utf8');

  // Should be valid JSON
  const manifest = JSON.parse(manifestContent);
  expect(manifest).toBeDefined();
  expect(manifest.name).toBeDefined();
  expect(manifest.start_url).toBe('/');
});
