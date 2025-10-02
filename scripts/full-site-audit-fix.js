const fs = require('fs');
const path = require('path');

console.log('🔍 ПОЛНЫЙ АУДИТ И ИСПРАВЛЕНИЕ ВСЕХ СТРАНИЦ...\n');

function findHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!['archive', 'templates', 'node_modules', '.git'].includes(file)) {
        findHTMLFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html') && !file.includes('demo')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const htmlFiles = findHTMLFiles(process.cwd());
const report = [];

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let issues = [];
  let fixed = false;

  // 1. Проверка main.css
  if (!content.includes('main.css')) {
    content = content.replace('</head>', '    <link rel="stylesheet" href="/assets/css/main.css">\n  </head>');
    issues.push('Добавлен main.css');
    fixed = true;
  }

  // 2. Удаление дубликатов навигации (старые header.navbar)
  const oldNavMatches = content.match(/<header class="navbar"[\s\S]*?<\/header>/g);
  if (oldNavMatches && oldNavMatches.length > 0) {
    oldNavMatches.forEach(() => {
      content = content.replace(/<header class="navbar"[\s\S]*?<\/header>/, '');
    });
    issues.push('Удалены старые header.navbar');
    fixed = true;
  }

  // 3. Удаление дубликатов header.header
  const headerMatches = content.match(/<header class="header">[\s\S]*?<\/header>/g);
  if (headerMatches && headerMatches.length > 0) {
    headerMatches.forEach(() => {
      content = content.replace(/<header class="header">[\s\S]*?<\/header>/, '');
    });
    issues.push('Удалены дубликаты header');
    fixed = true;
  }

  // 4. Замена невалидных контактов
  const invalidContacts = [
    { old: '@kupitkrolika', new: '@dexrabbit_bot' },
    { old: 'kupitkrolika.ru', new: 'kupitkrolika@gmail.com' },
    { old: 'info@kupitkrolika.ru', new: 'kupitkrolika@gmail.com' },
    { old: '+7 (999) 123-45-67', new: '' },
    { old: 'Подольск', new: 'между Улан-Удэ и озером Байкал, Республика Бурятия' },
  ];

  invalidContacts.forEach(({ old, new: newValue }) => {
    if (content.includes(old) && newValue) {
      content = content.replaceAll(old, newValue);
      issues.push(`Заменён ${old}`);
      fixed = true;
    } else if (content.includes(old) && !newValue) {
      // Удаляем неверные телефоны
      content = content.replace(new RegExp(`<a[^>]*tel:.*?${old.replace(/[+()]/g, '\\$&')}.*?</a>`, 'g'), '');
      issues.push(`Удалён неверный телефон`);
      fixed = true;
    }
  });

  // 5. Замена старого адреса контракта (если есть)
  if (content.includes('0x41d9650faf3341cbf8947fd8063a1fc88dbf1889')) {
    // Это pool address, оставляем как есть
  }

  // 6. Очистка лишних пустых строк
  content = content.replace(/\n{4,}/g, '\n\n\n');

  if (fixed) {
    fs.writeFileSync(filePath, content, 'utf8');
    report.push({ file: relativePath, issues });
    console.log(`✅ ${relativePath} - исправлено: ${issues.join(', ')}`);
  } else {
    console.log(`⚪ ${relativePath} - без изменений`);
  }
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Проверено файлов: ${htmlFiles.length}`);
console.log(`   Исправлено: ${report.length}`);

if (report.length > 0) {
  fs.writeFileSync(
    'reports/audit-fix-report.json',
    JSON.stringify(report, null, 2),
    'utf8'
  );
  console.log(`\n📁 Отчёт: reports/audit-fix-report.json`);
}

console.log('\n✅ АУДИТ И ИСПРАВЛЕНИЕ ЗАВЕРШЕНО!');

