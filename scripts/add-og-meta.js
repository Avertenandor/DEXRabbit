// scripts/add-og-meta.js
import fs from 'fs'; 
import path from 'path';

const meta = fs.readFileSync('templates/head-meta.html','utf8');

function walk(d) { 
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d,f);
    const st = fs.statSync(p);
    if (st.isDirectory() && !f.startsWith('.') && f !== 'node_modules') {
      walk(p);
    } else if (f.endsWith('.html') && !f.includes('og-preview-test')) {
      let s = fs.readFileSync(p,'utf8');
      if (!/og:title/.test(s)) {
        s = s.replace('</head>', meta + '\n</head>');
        fs.writeFileSync(p, s, 'utf8'); 
        console.log('og meta added:', p);
      } else {
        console.log('og meta exists:', p);
      }
    }
  }
}

walk(process.cwd());