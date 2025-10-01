const fs = require('fs');
const path = require('path');

// Паттерны старых CSS/JS навигации для удаления
const OLD_NAV_PATTERNS = [
  /<link[^>]*href="\/assets\/css\/navigation\.css[^>]*>/gi,
  /<link[^>]*href="\/assets\/css\/mega-menu\.css[^>]*>/gi,
  /<link[^>]*href="\/assets\/css\/nav-refactor\.css[^>]*>/gi,
  /<link[^>]*href="\/assets\/css\/nav-fix\.css[^>]*>/gi,
  /<link[^>]*href="\/assets\/css\/mega-menu-click-only\.css[^>]*>/gi,
  /<link[^>]*href="\/assets\/css\/mega-menu-stable\.css[^>]*>/gi,
  /<script[^>]*src="\/assets\/js\/navigation-data\.js[^>]*>[\s\S]*?<\/script>/gi,
  /<script[^>]*src="\/assets\/js\/mega-menu-click-only\.js[^>]*>[\s\S]*?<\/script>/gi,
  /<script[^>]*src="\/assets\/js\/mega-menu-stable\.js[^>]*>[\s\S]*?<\/script>/gi,
  /<script[^>]*src="\/assets\/js\/nav\.js[^>]*>[\s\S]*?<\/script>/gi,
];

// Рекурсивно находим все HTML файлы
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

console.log('🧹 Очистка остатков старой навигации...\n');

const htmlFiles = findHTMLFiles(process.cwd());
let cleanedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  let changes = 0;
  
  // Применяем все паттерны удаления
  OLD_NAV_PATTERNS.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      changes += matches.length;
      content = content.replace(pattern, '');
    }
  });
  
  // Очищаем лишние пустые строки
  content = content.replace(/\n{3,}/g, '\n\n');
  
  if (originalContent !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    cleanedCount++;
    console.log(`✅ ${relativePath} - удалено ${changes} ссылок на старую навигацию`);
  } else {
    console.log(`⚪ ${relativePath} - чисто`);
  }
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Обработано файлов: ${htmlFiles.length}`);
console.log(`   Очищено файлов: ${cleanedCount}`);
console.log(`   Без изменений: ${htmlFiles.length - cleanedCount}`);

console.log('\n✅ ОЧИСТКА ЗАВЕРШЕНА!');

