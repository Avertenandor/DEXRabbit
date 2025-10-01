const fs = require('fs');
const path = require('path');

// Паттерны для удаления
const PATTERNS_TO_REMOVE = [
  // Старая кнопка "На главную"
  /<!-- Кнопка "На главную" -->[\s\S]*?<\/div>\s*<\/div>\s*<!-- Hero Section -->/,
  // Старые стили кнопки
  /\/\* Кнопка "На главную" \*\/[\s\S]*?\.btn-back-home:active \{[\s\S]*?\}/,
  // Старая навигация V2
  /<header class="navbar">[\s\S]*?<\/header>/,
  // Старые CSS navigation-v2
  /<!-- Navigation V2.*?-->\s*<link.*?navigation-v2\.css.*?>/g,
  // Дубликаты mobile-critical-fix
  /<!-- Mobile Critical Fix -->\s*<link.*?mobile-critical-fix\.css.*?>\s*/g,
];

function findHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['archive', 'templates', 'node_modules', '.git'].includes(file)) {
        findHTMLFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html') && file !== 'demo-megamenu.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

console.log('🧹 Очистка от старых элементов навигации...\n');

const htmlFiles = findHTMLFiles(process.cwd());
let cleanedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Удаляем кнопку "На главную"
  content = content.replace(/<!-- Кнопка "На главную" -->[\s\S]*?<\/div>\s*<\/div>\s*\n\s*<!-- Hero Section -->/m, '        <!-- Hero Section -->');
  
  // Удаляем стили кнопки
  content = content.replace(/\/\* Кнопка "На главную" \*\/[\s\S]*?\.btn-back-home:active \{[\s\S]*?\}/m, '');
  
  // Удаляем старую навигацию header.navbar
  content = content.replace(/<header class="navbar">[\s\S]*?<\/header>\s*/m, '');
  
  // Удаляем старые CSS links
  content = content.replace(/<!-- Navigation V2.*?-->\s*<link.*?navigation-v2\.css.*?>\s*/g, '');
  
  // Оставляем только ОДИН mobile-critical-fix (последний)
  const mobileFixes = content.match(/<!-- Mobile Critical Fix -->\s*<link.*?mobile-critical-fix\.css.*?>\s*/g);
  if (mobileFixes && mobileFixes.length > 1) {
    // Удаляем все кроме последнего
    for (let i = 0; i < mobileFixes.length - 1; i++) {
      content = content.replace(mobileFixes[i], '');
    }
  }
  
  // Очищаем лишние пустые строки
  content = content.replace(/\n{3,}/g, '\n\n');
  
  if (originalContent !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    cleanedCount++;
    console.log(`✅ ${relativePath} - очищено`);
  } else {
    console.log(`⚪ ${relativePath} - нет изменений`);
  }
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Обработано файлов: ${htmlFiles.length}`);
console.log(`   Очищено: ${cleanedCount}`);
console.log(`   Без изменений: ${htmlFiles.length - cleanedCount}`);

console.log('\n✅ ОЧИСТКА ЗАВЕРШЕНА!');

