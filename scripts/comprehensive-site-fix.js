const fs = require('fs');
const path = require('path');

console.log('🔍 КОМПЛЕКСНОЕ ИСПРАВЛЕНИЕ ВСЕХ СТРАНИЦ САЙТА...\n');

// Читаем эталонный футер из index.html
const indexHTML = fs.readFileSync('index.html', 'utf8');
const footerMatch = indexHTML.match(/<footer class="footer">[\s\S]*?<\/footer>/);
const footerStylesMatch = indexHTML.match(/<!-- Стили для footer -->[\s\S]*?<\/style>/);
const referenceFooter = footerMatch ? footerMatch[0] : '';
const footerStyles = footerStylesMatch ? footerStylesMatch[0] : '';

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
let fixedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = [];

  // 1. Проверка и добавление base CSS
  if (!content.includes('main.css')) {
    content = content.replace(
      /<link[^>]*rel="stylesheet"[^>]*>/,
      '<link rel="stylesheet" href="/assets/css/main.css">\n    <link rel="stylesheet" href="/assets/css/variables.css">\n    $&'
    );
    changes.push('✅ Добавлены base CSS');
  }

  // 2. Удаление всех старых навигаций
  content = content.replace(/<header class="navbar"[^>]*>[\s\S]*?<\/header>/g, '');
  content = content.replace(/<header class="header">[\s\S]*?<\/header>/g, '');
  
  // 3. Замена CTA кнопки в навигации на бот
  content = content.replace(
    /<a href="\/#investment" class="nav-beautiful__cta">/g,
    '<a href="https://t.me/dexrabbit_bot" target="_blank" class="nav-beautiful__cta">'
  );
  content = content.replace(
    /<span>Начать инвестировать<\/span>/g,
    '<span>Открыть бот</span>'
  );

  // 4. Замена старого футера на эталонный (если он неполный)
  const hasOldFooter = content.includes('<footer') && !content.includes('footer-grid');
  if (hasOldFooter) {
    content = content.replace(/<footer[\s\S]*?<\/footer>/, referenceFooter);
    changes.push('✅ Обновлён футер');
  }

  // 5. Добавление footer styles если их нет
  if (content.includes('<footer') && !content.includes('Footer Styles')) {
    content = content.replace('</footer>', '</footer>\n\n' + footerStyles);
    changes.push('✅ Добавлены footer styles');
  }

  // 6. Замена неверных контактов
  const contactReplacements = {
    'kupitkrolika.ru': 'kupitkrolika@gmail.com',
    'info@kupitkrolika.ru': 'kupitkrolika@gmail.com',
    'invest@kupitkrolika.ru': 'kupitkrolika@gmail.com',
    'breeding@kupitkrolika.ru': 'kupitkrolika@gmail.com',
    'delivery@kupitkrolika.ru': 'kupitkrolika@gmail.com',
    'gifts@kupitkrolika.ru': 'kupitkrolika@gmail.com',
    'vet@kupitkrolika.ru': 'kupitkrolika@gmail.com',
    'b2b@kupitkrolika.ru': 'kupitkrolika@gmail.com',
    '@kupitkrolika': '@dexrabbit_bot',
    'Подольск': 'между Улан-Удэ и озером Байкал',
    'Московская область': 'Республика Бурятия',
  };

  Object.entries(contactReplacements).forEach(([old, newVal]) => {
    if (content.includes(old)) {
      content = content.replaceAll(old, newVal);
      changes.push(`✅ Заменён ${old}`);
    }
  });

  // 7. Удаление битых телефонов
  content = content.replace(/<a[^>]*tel:\+7\d{10}[^>]*>.*?<\/a>/g, '');
  content = content.replace(/<a[^>]*wa\.me\/\d+[^>]*>.*?<\/a>/g, '');

  // 8. Удаление ссылки на рестораны (удалённая страница)
  if (content.includes('/restaurants.html')) {
    content = content.replace(/<a[^>]*href="\/restaurants\.html"[^>]*>.*?<\/a>/g, '');
    changes.push('✅ Удалена ссылка на рестораны');
  }

  // 9. Очистка пустых строк
  content = content.replace(/\n{4,}/g, '\n\n\n');

  if (changes.length > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
    console.log(`✅ ${relativePath}:`);
    changes.forEach(c => console.log(`   ${c}`));
  } else {
    console.log(`⚪ ${relativePath} - OK`);
  }
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Проверено: ${htmlFiles.length} файлов`);
console.log(`   Исправлено: ${fixedCount} файлов`);
console.log(`\n✅ КОМПЛЕКСНОЕ ИСПРАВЛЕНИЕ ЗАВЕРШЕНО!`);

