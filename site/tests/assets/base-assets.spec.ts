import { describe, test, expect } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';

describe('Base Assets Validation', () => {
  test('required assets exist in dist', async () => {
    const distPath = path.resolve('dist');
    const requiredAssets = [
      'index.html',
      'favicon.ico',
      'site.webmanifest',
      'og/hero.png'
    ];

    for (const asset of requiredAssets) {
      const fullPath = path.join(distPath, asset);
      const exists = await fs.access(fullPath).then(() => true).catch(() => false);
      expect(exists).toBe(true, `Asset ${asset} should exist in dist/`);
    }
  });

  test('favicon.ico is valid', async () => {
    const faviconPath = path.resolve('dist/favicon.ico');
    const stats = await fs.stat(faviconPath);
    expect(stats.size).toBeGreaterThan(0);
  });

  test('site.webmanifest is valid JSON', async () => {
    const manifestPath = path.resolve('dist/site.webmanifest');
    const content = await fs.readFile(manifestPath, 'utf-8');
    const manifest = JSON.parse(content);
    
    expect(manifest.name).toBe('DEXRabbit');
    expect(manifest.short_name).toBe('DEXRabbit');
    expect(manifest.theme_color).toBe('#0B0D10');
    expect(manifest.background_color).toBe('#0B0D10');
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons).toBeDefined();
    expect(Array.isArray(manifest.icons)).toBe(true);
  });

  test('index.html contains correct base path', async () => {
    const indexPath = path.resolve('dist/index.html');
    const content = await fs.readFile(indexPath, 'utf-8');
    
    expect(content).toContain('/DEXRabbit/');
    expect(content).toContain('DEXRabbit');
  });
});
