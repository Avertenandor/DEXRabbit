const fs = require('fs');

console.log('🔨 ПЕРЕСБОРКА INDEX.HTML КАК МОНОЛИТ...\n');

const currentIndex = fs.readFileSync('index.html', 'utf8');

// Извлекаем нужные части
const headMatch = currentIndex.match(/<head>[\s\S]*?<\/head>/);
const navMatch = currentIndex.match(/<nav class="nav-beautiful">[\s\S]*?<\/nav>/);
const footerMatch = currentIndex.match(/<footer class="footer">[\s\S]*?<\/html>/);

if (!headMatch || !navMatch || !footerMatch) {
  console.error('❌ Не удалось извлечь части!');
  process.exit(1);
}

const cleanHead = headMatch[0];
const cleanNav = navMatch[0];
const cleanFooter = footerMatch[0];

console.log('✅ Извлечены части');
console.log('📝 Создаю новый index.html...\n');

const newIndex = `<!doctype html>
<html lang="ru">
${cleanHead}
<body>
${cleanNav}

<main>
  <!-- Контент будет добавлен программно -->
  <section class="hero">
    <div class="container">
      <h1 class="hero-title">🐰 Первая в мире токенизированная ферма кроликов</h1>
      <p class="hero-subtitle">
        Инвестируйте в реальное разведение кроликов через блокчейн, получайте PLEX-токены
        ежедневно как ваш бонус, и прибыль от продажи потомства как вашу основную прибыль.
      </p>
    </div>
  </section>
</main>

${cleanFooter}`;

// Сохраняем чистовик
fs.writeFileSync('index-clean-draft.html', newIndex, 'utf8');
console.log('✅ Чистовик создан: index-clean-draft.html');
console.log('\n⚠️  ПРОВЕРЬТЕ ЧИСТОВИК ПЕРЕД ЗАМЕНОЙ!');

