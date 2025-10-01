const fs = require('fs');
const path = require('path');

const NEW_VERSION = '20251001-fixed-top';

function findHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['archive', 'templates', 'node_modules', '.git'].includes(file)) {
        findHTMLFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

console.log(`🔄 Обновляю версию CSS до ${NEW_VERSION}...\n`);

const htmlFiles = findHTMLFiles(process.cwd());
let updatedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Обновляем версию navigation-beautiful.css
  const updated = content.replace(
    /navigation-beautiful\.css\?v=[^"]+"/g,
    `navigation-beautiful.css?v=${NEW_VERSION}"`
  );
  
  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    updatedCount++;
    console.log(`✅ ${relativePath}`);
  }
});

console.log(`\n📊 ИТОГО: ${updatedCount} файлов обновлено`);

