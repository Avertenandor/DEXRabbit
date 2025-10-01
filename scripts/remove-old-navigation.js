const fs = require('fs');
const path = require('path');

// Паттерны для удаления старой навигации
const NAV_PATTERNS = [
  // Navigation container
  /<nav\s+class="navbar"[^>]*>[\s\S]*?<\/nav>/gi,
  
  // CSS imports старой навигации
  /<link[^>]*href="\/assets\/css\/navigation\.css[^>]*>/gi,
  /<link[^>]*href="\/assets\/css\/mega-menu\.css[^>]*>/gi,
  /<link[^>]*href="\/assets\/css\/nav-refactor\.css[^>]*>/gi,
  /<link[^>]*href="\/assets\/css\/mega-menu-click-only\.css[^>]*>/gi,
  
  // JS imports старой навигации
  /<script[^>]*src="\/assets\/js\/navigation-data\.js[^>]*>[\s\S]*?<\/script>/gi,
  /<script[^>]*src="\/assets\/js\/mega-menu-click-only\.js[^>]*>[\s\S]*?<\/script>/gi,
  /<script[^>]*src="\/assets\/js\/nav\.js[^>]*>[\s\S]*?<\/script>/gi,
  
  // Комментарии старой навигации
  /<!--\s*Navigation.*?-->/gi,
  /<!--\s*Unified Navigation.*?-->/gi,
  /<!--\s*Click-Only Navigation.*?-->/gi,
  /<!--\s*Mobile Navigation.*?-->/gi,
  /<!--\s*Mega Menu.*?-->/gi,
];

// Рекурсивно находим все HTML файлы
function findHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Пропускаем служебные папки
      if (!['archive', 'templates', 'node_modules', '.git'].includes(file)) {
        findHTMLFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

console.log('🗑️  Удаляю старую навигацию со всех страниц...\n');

// Находим все HTML файлы
const htmlFiles = findHTMLFiles(process.cwd());

let removedCount = 0;
const report = [];

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  let changes = 0;
  
  // Применяем все паттерны удаления
  NAV_PATTERNS.forEach((pattern) => {
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
    removedCount++;
    report.push({
      file: relativePath,
      changes,
    });
    console.log(`✅ ${relativePath} - удалено ${changes} элементов навигации`);
  } else {
    console.log(`⚪ ${relativePath} - навигация не найдена`);
  }
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Обработано файлов: ${htmlFiles.length}`);
console.log(`   Изменено файлов: ${removedCount}`);
console.log(`   Без изменений: ${htmlFiles.length - removedCount}`);

// Сохраняем отчёт
const reportPath = path.resolve('reports', 'navigation-removal-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`\n📁 Отчёт сохранён: ${reportPath}`);

console.log('\n✅ УДАЛЕНИЕ ЗАВЕРШЕНО!');

