import fs from 'node:fs';
import path from 'node:path';

const must = ['index.html','CNAME','favicon.ico','site.webmanifest','og/og-image.svg'];
let ok = true;
for (const f of must) {
  const exists = fs.existsSync(path.join('dist', f));
  if (!exists) { console.error('MISSING in dist:', f); ok = false; }
}
process.exit(ok ? 0 : 1);
console.log('dist OK');
