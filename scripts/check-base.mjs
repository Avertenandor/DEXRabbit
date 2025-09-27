import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const must = [
  'index.html',
  'favicon.ico',
  'site.webmanifest',
  'og/hero.png'
];

console.log('Checking base assets in dist/...');

for (const p of must) {
  const fullPath = path.join(dist, p);
  const ok = fs.existsSync(fullPath);
  if (!ok) { 
    console.error('MISSING in dist:', p);
    process.exitCode = 1; 
  } else {
    console.log('✓ Found:', p);
  }
}

if (process.exitCode === 0) {
  console.log('✓ check-base OK - all required assets found');
} else {
  console.log('✗ check-base FAILED - missing assets');
}
