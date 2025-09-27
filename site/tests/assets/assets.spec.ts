import { describe, test, expect } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';

describe('Assets Validation', () => {
  test('logo files exist', async () => {
    const logoFiles = [
      'public/logo.svg',
      'public/logo-light.svg'
    ];
    
    for (const file of logoFiles) {
      const filePath = path.join(process.cwd(), file);
      try {
        await fs.access(filePath);
        expect(true).toBe(true); // File exists
      } catch {
        expect.fail(`Logo file ${file} does not exist`);
      }
    }
  });

  test('favicon files exist', async () => {
    const faviconFiles = [
      'public/favicon.ico',
      'public/favicon-32.png',
      'public/favicon-192.png',
      'public/favicon-512.png',
      'public/apple-touch-icon.png',
      'public/mask-icon.svg'
    ];
    
    for (const file of faviconFiles) {
      const filePath = path.join(process.cwd(), file);
      try {
        await fs.access(filePath);
        expect(true).toBe(true);
      } catch {
        expect.fail(`Favicon file ${file} does not exist`);
      }
    }
  });

  test('webmanifest exists and is valid', async () => {
    const manifestPath = path.join(process.cwd(), 'public/site.webmanifest');
    
    try {
      const manifestContent = await fs.readFile(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestContent);
      
      expect(manifest.name).toBeTruthy();
      expect(manifest.short_name).toBeTruthy();
      expect(manifest.theme_color).toBe('#0B0D10');
      expect(manifest.background_color).toBe('#0B0D10');
      expect(manifest.display).toBe('standalone');
      expect(manifest.icons).toBeInstanceOf(Array);
      expect(manifest.icons.length).toBeGreaterThan(0);
    } catch {
      expect.fail('Webmanifest file does not exist or is invalid');
    }
  });

  test('OG images exist', async () => {
    const ogFiles = [
      'public/og/hero.png',
      'public/og/plex.png',
      'public/og/gallery.png'
    ];
    
    for (const file of ogFiles) {
      const filePath = path.join(process.cwd(), file);
      try {
        await fs.access(filePath);
        expect(true).toBe(true);
      } catch {
        expect.fail(`OG image ${file} does not exist`);
      }
    }
  });

  test('rabbits data file exists and is valid', async () => {
    const dataPath = path.join(process.cwd(), 'public/data/rabbits.json');
    
    try {
      const dataContent = await fs.readFile(dataPath, 'utf-8');
      const rabbits = JSON.parse(dataContent);
      
      expect(Array.isArray(rabbits)).toBe(true);
      expect(rabbits.length).toBeGreaterThan(0);
      
      // Check required fields
      for (const rabbit of rabbits) {
        expect(rabbit.src).toBeTruthy();
        expect(rabbit.w).toBeTypeOf('number');
        expect(rabbit.h).toBeTypeOf('number');
        expect(rabbit.title).toBeTruthy();
        expect(Array.isArray(rabbit.tags)).toBe(true);
        expect(rabbit.date).toBeTruthy();
      }
    } catch {
      expect.fail('Rabbits data file does not exist or is invalid');
    }
  });

  test('browserconfig.xml exists', async () => {
    const configPath = path.join(process.cwd(), 'public/browserconfig.xml');
    
    try {
      await fs.access(configPath);
      expect(true).toBe(true);
    } catch {
      expect.fail('browserconfig.xml does not exist');
    }
  });
});
