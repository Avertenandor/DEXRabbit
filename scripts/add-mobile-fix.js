const fs = require('fs');
const path = require('path');

// CSS для мобильного фикса
const MOBILE_FIX_CSS = `    <!-- Mobile Critical Fix -->
    <link rel="stylesheet" href="/assets/css/mobile-critical-fix.css?v=20251001-mobile-fix" />`;

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

console.log('🔧 Добавление Mobile Critical Fix на все страницы...\n');

const htmlFiles = findHTMLFiles(process.cwd());
let updatedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Проверяем, есть ли уже mobile-critical-fix
  if (content.includes('mobile-critical-fix.css')) {
    console.log(`⚪ ${relativePath} - уже есть mobile-critical-fix`);
    return;
  }
  
  // Проверяем наличие </head>
  if (!content.includes('</head>')) {
    console.log(`⚠️  ${relativePath} - нет тега </head>, пропускаем`);
    return;
  }
  
  // Вставляем перед </head>
  content = content.replace('</head>', MOBILE_FIX_CSS + '\n  </head>');
  
  fs.writeFileSync(filePath, content, 'utf8');
  updatedCount++;
  console.log(`✅ ${relativePath} - Mobile Critical Fix добавлен`);
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Обработано файлов: ${htmlFiles.length}`);
console.log(`   Добавлено Mobile Fix: ${updatedCount}`);
console.log(`   Уже было или пропущено: ${htmlFiles.length - updatedCount}`);

console.log('\n✅ ДОБАВЛЕНИЕ ЗАВЕРШЕНО!');

