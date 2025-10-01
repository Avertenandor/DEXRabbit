const fs = require('fs');
const path = require('path');

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

console.log('🔄 Обновление версии navigation-v2.js на всех страницах...\n');

const htmlFiles = findHTMLFiles(process.cwd());
let updatedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Обновляем версию JS
  content = content.replace(
    /navigation-v2\.js\?v=20251001-v2/g,
    'navigation-v2.js?v=20251001-hover-fix'
  );
  
  if (originalContent !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`✅ ${relativePath} - версия JS обновлена`);
  } else {
    console.log(`⚪ ${relativePath} - уже актуальная версия или нет navigation-v2.js`);
  }
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Обработано файлов: ${htmlFiles.length}`);
console.log(`   Обновлено: ${updatedCount}`);
console.log(`   Без изменений: ${htmlFiles.length - updatedCount}`);

console.log('\n✅ ОБНОВЛЕНИЕ ЗАВЕРШЕНО!');

