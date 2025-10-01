const fs = require('fs');
const path = require('path');

// CSS и JS для новой навигации
const NAV_CSS = `    <!-- Navigation V2 - Apple/Amazon Style -->
    <link rel="stylesheet" href="/assets/css/navigation-v2.css?v=20251001-v2" />`;

const NAV_JS = `    <!-- Navigation V2 Script -->
    <script defer src="/assets/js/navigation-v2.js?v=20251001-v2"></script>`;

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

console.log('🚀 Применяю Navigation V2 на все страницы...\n');

const htmlFiles = findHTMLFiles(process.cwd());
let appliedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Проверяем, есть ли уже новая навигация
  if (content.includes('navigation-v2.css')) {
    console.log(`⚪ ${relativePath} - Navigation V2 уже установлена`);
    return;
  }
  
  // Проверяем, есть ли тег <head>
  if (!content.includes('<head>') || !content.includes('</head>')) {
    console.log(`⚠️  ${relativePath} - нет тега <head>, пропускаем`);
    return;
  }
  
  // Вставляем CSS перед первым найденным <link> или <style>
  const cssInsertPoint = content.search(/<link[^>]*rel="stylesheet"/i);
  if (cssInsertPoint !== -1) {
    const beforeCSS = content.substring(0, cssInsertPoint);
    const afterCSS = content.substring(cssInsertPoint);
    content = beforeCSS + NAV_CSS + '\n' + afterCSS;
  } else {
    // Если нет других CSS, вставляем перед </head>
    content = content.replace('</head>', NAV_CSS + '\n  </head>');
  }
  
  // Вставляем JS перед первым найденным <script> или перед </head>
  const jsInsertPoint = content.search(/<script[^>]*>/i);
  if (jsInsertPoint !== -1) {
    const beforeJS = content.substring(0, jsInsertPoint);
    const afterJS = content.substring(jsInsertPoint);
    content = beforeJS + NAV_JS + '\n' + afterJS;
  } else {
    // Если нет других скриптов, вставляем перед </head>
    content = content.replace('</head>', NAV_JS + '\n  </head>');
  }
  
  // Сохраняем файл
  if (originalContent !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    appliedCount++;
    console.log(`✅ ${relativePath} - Navigation V2 применена`);
  }
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Обработано файлов: ${htmlFiles.length}`);
console.log(`   Применено Navigation V2: ${appliedCount}`);
console.log(`   Пропущено: ${htmlFiles.length - appliedCount}`);

console.log('\n✅ ПРИМЕНЕНИЕ ЗАВЕРШЕНО!');
console.log('\n🔍 Проверьте сайт в браузере для теста новой навигации.');

