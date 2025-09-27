#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('# DEXRabbit QA Report\n');

// Проверяем статус тестов
try {
  console.log('## Test Results\n');
  
  // E2E тесты
  try {
    const e2eResult = execSync('npm run test:e2e', { encoding: 'utf8' });
    console.log('✅ E2E Tests: PASSED');
  } catch (error) {
    console.log('❌ E2E Tests: FAILED');
    console.log(error.stdout || error.message);
  }
  
  // A11y тесты
  try {
    const a11yResult = execSync('npm run test:a11y', { encoding: 'utf8' });
    console.log('✅ A11y Tests: PASSED');
  } catch (error) {
    console.log('❌ A11y Tests: FAILED');
    console.log(error.stdout || error.message);
  }
  
  // Визуальные тесты
  try {
    const visualResult = execSync('npm run test:vis', { encoding: 'utf8' });
    console.log('✅ Visual Tests: PASSED');
  } catch (error) {
    console.log('❌ Visual Tests: FAILED');
    console.log(error.stdout || error.message);
  }
  
  // Контент тесты
  try {
    const contentResult = execSync('npm run test:content', { encoding: 'utf8' });
    console.log('✅ Content Tests: PASSED');
  } catch (error) {
    console.log('❌ Content Tests: FAILED');
    console.log(error.stdout || error.message);
  }
  
  // Ассеты тесты
  try {
    const assetsResult = execSync('npm run test:assets', { encoding: 'utf8' });
    console.log('✅ Assets Tests: PASSED');
  } catch (error) {
    console.log('❌ Assets Tests: FAILED');
    console.log(error.stdout || error.message);
  }
  
} catch (error) {
  console.log('❌ Test execution failed:', error.message);
}

console.log('\n## Build Status\n');

// Проверяем сборку
try {
  execSync('npm run build', { encoding: 'utf8' });
  console.log('✅ Build: SUCCESS');
} catch (error) {
  console.log('❌ Build: FAILED');
  console.log(error.stdout || error.message);
}

console.log('\n## Asset Validation\n');

// Проверяем критические ассеты
const criticalAssets = [
  'dist/index.html',
  'dist/favicon.ico',
  'dist/site.webmanifest',
  'dist/og/og-image.svg',
  'dist/sitemap.xml',
  'dist/robots.txt'
];

for (const asset of criticalAssets) {
  if (fs.existsSync(asset)) {
    console.log(`✅ ${asset}: EXISTS`);
  } else {
    console.log(`❌ ${asset}: MISSING`);
  }
}

console.log('\n## Performance Budget\n');

// Проверяем размеры ассетов
const distPath = 'dist';
if (fs.existsSync(distPath)) {
  const stats = fs.statSync(distPath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`📊 Dist folder size: ${sizeInMB} MB`);
  
  if (stats.size > 10 * 1024 * 1024) { // 10MB
    console.log('⚠️  Warning: Dist folder is larger than 10MB');
  } else {
    console.log('✅ Dist folder size is within limits');
  }
}

console.log('\n## Summary\n');
console.log('QA Report generated at:', new Date().toISOString());
console.log('For detailed results, check individual test outputs above.');