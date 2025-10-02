const fs = require('fs');
const path = require('path');

console.log('🔄 СИНХРОНИЗАЦИЯ НАВИГАЦИИ НА ВСЕХ СТРАНИЦАХ...\n');

// Читаем эталонную навигацию из index.html
const indexHTML = fs.readFileSync('index.html', 'utf8');
const navMatch = indexHTML.match(/<nav class="nav-beautiful">[\s\S]*?<\/nav>/);

if (!navMatch) {
  console.error('❌ Не найдена навигация в index.html!');
  process.exit(1);
}

const referenceNav = navMatch[0];

function findHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!['archive', 'templates', 'node_modules', '.git'].includes(file)) {
        findHTMLFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html') && !file.includes('demo') && file !== 'index.html') {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const htmlFiles = findHTMLFiles(process.cwd());
let updatedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Проверяем наличие investor-cards.css
  if (!content.includes('investor-cards.css')) {
    content = content.replace(
      /<link rel="stylesheet" href="\/assets\/css\/performance\.css"/,
      '<link rel="stylesheet" href="/assets/css/performance.css" />\n    <link rel="stylesheet" href="/assets/css/investor-cards.css" />'
    );
  }
  
  // Заменяем навигацию на эталонную
  const hasNav = content.includes('<nav class="nav-beautiful">');
  if (hasNav) {
    content = content.replace(
      /<nav class="nav-beautiful">[\s\S]*?<\/nav>/,
      referenceNav
    );
    updatedCount++;
    console.log(`✅ ${relativePath}`);
  } else {
    console.log(`⚠️  ${relativePath} - нет навигации`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Обработано: ${htmlFiles.length}`);
console.log(`   Обновлено навигации: ${updatedCount}`);
console.log('\n✅ СИНХРОНИЗАЦИЯ ЗАВЕРШЕНА!');

