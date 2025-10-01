const fs = require('fs');
const path = require('path');

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

console.log('🧹 Удаляю Navigation V2 со всех страниц...\n');

const htmlFiles = findHTMLFiles(process.cwd());
let cleanedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Удаляем script navigation-v2.js
  content = content.replace(/<script[^>]+src="[^"]*navigation-v2\.js[^"]*"[^>]*><\/script>\s*/g, '');
  
  // Удаляем CSS navigation-v2.css (если остались)
  content = content.replace(/<link[^>]+href="[^"]*navigation-v2\.css[^"]*"[^>]*>\s*/g, '');
  
  // Очищаем лишние пустые строки
  content = content.replace(/\n{3,}/g, '\n\n');
  
  if (originalContent !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    cleanedCount++;
    console.log(`✅ ${relativePath}`);
  }
});

console.log(`\n📊 ИТОГО: ${cleanedCount} файлов очищено`);
console.log('\n✅ Navigation V2 удалена!');

