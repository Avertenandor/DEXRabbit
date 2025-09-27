import fs from 'node:fs';
import path from 'node:path';

const d = 'dist';
const requiredFiles = [
  'index.html',
  'CNAME',
  'favicon.ico',
  'site.webmanifest',
  'og/og-image.svg'
];

console.log('🔍 Checking dist artifacts...');

let allGood = true;
for (const file of requiredFiles) {
  const fullPath = path.join(d, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allGood = false;
  }
}

if (allGood) {
  console.log('🎉 All required files present!');
} else {
  console.log('💥 Some files missing!');
  process.exit(1);
}
