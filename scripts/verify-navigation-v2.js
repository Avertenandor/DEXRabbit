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

console.log('🔍 Проверка наличия Navigation V2 на всех страницах...\n');

const htmlFiles = findHTMLFiles(process.cwd());
const report = {
  total: htmlFiles.length,
  withCSS: 0,
  withJS: 0,
  complete: 0,
  incomplete: []
};

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const hasCSS = content.includes('navigation-v2.css');
  const hasJS = content.includes('navigation-v2.js');
  
  if (hasCSS) report.withCSS++;
  if (hasJS) report.withJS++;
  
  if (hasCSS && hasJS) {
    report.complete++;
    console.log(`✅ ${relativePath} - Navigation V2 полная`);
  } else if (hasCSS || hasJS) {
    report.incomplete.push({
      file: relativePath,
      hasCSS,
      hasJS
    });
    console.log(`⚠️  ${relativePath} - неполная (CSS: ${hasCSS ? '✅' : '❌'}, JS: ${hasJS ? '✅' : '❌'})`);
  } else {
    report.incomplete.push({
      file: relativePath,
      hasCSS: false,
      hasJS: false
    });
    console.log(`❌ ${relativePath} - Navigation V2 отсутствует`);
  }
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Всего файлов: ${report.total}`);
console.log(`   С CSS: ${report.withCSS}`);
console.log(`   С JS: ${report.withJS}`);
console.log(`   Полная навигация: ${report.complete}`);
console.log(`   Неполная/отсутствует: ${report.incomplete.length}`);

if (report.incomplete.length > 0) {
  console.log(`\n⚠️  ТРЕБУЮТ ИСПРАВЛЕНИЯ (${report.incomplete.length} файлов):`);
  report.incomplete.forEach(item => {
    console.log(`   - ${item.file} (CSS: ${item.hasCSS ? '✅' : '❌'}, JS: ${item.hasJS ? '✅' : '❌'})`);
  });
}

// Сохраняем отчёт
const reportPath = path.resolve('reports', 'navigation-v2-verification.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`\n📁 Отчёт сохранён: ${reportPath}`);

console.log('\n✅ ПРОВЕРКА ЗАВЕРШЕНА!');

// Возвращаем код ошибки, если есть неполные файлы
process.exit(report.incomplete.length > 0 ? 1 : 0);

