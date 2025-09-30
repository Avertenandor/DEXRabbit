/**
 * DEXRabbit - Комплексное исправление всех проблем проекта
 * Версия: 1.0
 * Дата: 30.09.2025
 */

const fs = require('fs');
const path = require('path');

// ============= КОНФИГУРАЦИЯ =============

// Новая унифицированная навигация
const NEW_NAV_HTML = `    <!-- Navigation -->
    <nav class="navbar" role="navigation">
      <div class="container">
        <!-- Logo Section -->
        <div class="navbar-header">
          <div class="logo-wrapper">
            <a href="/" class="site-logo">
              <img src="/favicon.svg" alt="DEXRabbit" />
              <div class="logo-text">
                <span class="logo-title">DEXRabbit</span>
                <span class="logo-slogan">Твой пассивный доход на кроликах</span>
              </div>
            </a>
          </div>
          <button class="mobile-nav-toggle burger" aria-label="Меню" data-burger>☰</button>
        </div>

        <!-- Navigation Links -->
        <div class="navbar-inner">
          <div class="nav-links" id="nav-menu" data-menu>
            <!-- Навигация генерируется динамически из navigation-data.js -->
            <!-- Primary Navigation -->
            <div class="nav-group nav-primary"></div>

            <!-- Дополнительные разделы -->
            <div class="nav-group nav-dropdown">
              <button
                class="nav-dropdown-toggle"
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="nav-dropdown-menu"
              >
                Ещё <span class="dropdown-arrow" aria-hidden="true">▾</span>
              </button>
              <div class="nav-dropdown-content" id="nav-dropdown-menu" role="menu" hidden></div>
            </div>

            <!-- CTA кнопка -->
            <a href="https://t.me/dexrabbit_bot" class="btn btn-primary nav-cta"
              >💬 Начать инвестировать</a
            >
          </div>
        </div>
      </div>
    </nav>`;

// Стили навигации
const NAV_STYLES = `    <!-- Unified Navigation Styles -->
    <link rel="stylesheet" href="/assets/css/navigation.css">`;

// Скрипты навигации
const NAV_SCRIPTS = `    <!-- Unified Navigation Data -->
    <script defer src="/assets/js/navigation-data.js?v=2.0"></script>
    <!-- Mobile Navigation Script -->
    <script defer src="/assets/js/nav.js?v=20250930"></script>`;

// Правильные Telegram ссылки
const TELEGRAM_LINKS = {
  bot: 'https://t.me/dexrabbit_bot',
  channel: 'https://t.me/DexRebbitOfficial',
  group: 'https://t.me/DEXRabbitOfficialGroupInfo',
};

// Список всех HTML файлов для обновления
const HTML_FILES = [
  'index.html',
  'breeding.html',
  'gifts.html',
  'restaurants.html',
  'rabbits-hares.html',
  'cats-rabbits.html',
  'care.html',
  'therapy.html',
  'logistics.html',
  'development.html',
  'reports.html',
  'investors.html',
  'investment-model.html',
  'partnership.html',
  'guarantees.html',
  'contacts.html',
  'careers.html',
];

// ============= ФУНКЦИИ =============

// Обновление навигации
function updateNavigation(content, filename) {
  let updated = false;

  // Добавляем navigation.css если его нет
  if (!content.includes('navigation.css')) {
    const insertPoint = content.indexOf('</head>');
    if (insertPoint !== -1) {
      content =
        content.substring(0, insertPoint) + NAV_STYLES + '\n' + content.substring(insertPoint);
      updated = true;
    }
  }

  // Заменяем старую навигацию на новую
  const navStart = content.indexOf('<!-- Navigation -->');
  const navEnd = content.indexOf('</nav>');

  if (navStart !== -1 && navEnd !== -1) {
    const endTag = content.indexOf('>', navEnd) + 1;
    const oldNav = content.substring(navStart, endTag);

    // Проверяем, нужно ли обновление
    if (!oldNav.includes('navigation-data.js')) {
      content = content.replace(oldNav, NEW_NAV_HTML);
      updated = true;
      console.log(`  ✅ Навигация обновлена в ${filename}`);
    }
  }

  // Добавляем скрипты навигации если их нет
  if (!content.includes('navigation-data.js')) {
    const bodyEnd = content.lastIndexOf('</body>');
    if (bodyEnd !== -1) {
      // Удаляем старые inline скрипты toggleMenu если есть
      content = content.replace(/<script>\s*\/\/\s*Mobile menu toggle[\s\S]*?<\/script>/g, '');
      content = content.replace(/function toggleMenu\(\)[\s\S]*?\n    }/g, '');

      // Вставляем новые скрипты
      content =
        content.substring(0, bodyEnd) + '\n' + NAV_SCRIPTS + '\n' + content.substring(bodyEnd);
      updated = true;
    }
  }

  return { content, updated };
}

// Исправление Telegram ссылок
function fixTelegramLinks(content, filename) {
  let updated = false;
  const oldLinks = [
    { old: 'https://t.me/dexrabbit_channel', new: TELEGRAM_LINKS.channel },
    { old: 't.me/dexrabbit_channel', new: TELEGRAM_LINKS.channel },
    { old: '@dexrabbit_channel', new: '@DexRebbitOfficial' },
    { old: 'https://t.me/dexrabbit_group', new: TELEGRAM_LINKS.group },
    { old: 't.me/dexrabbit_group', new: TELEGRAM_LINKS.group },
    { old: '@dexrabbit_group', new: '@DEXRabbitOfficialGroupInfo' },
  ];

  oldLinks.forEach(link => {
    const regex = new RegExp(escapeRegex(link.old), 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, link.new);
      updated = true;
      console.log(`  ✅ Заменено ${matches.length} ссылок: ${link.old} → ${link.new}`);
    }
  });

  return { content, updated };
}

// Исправление адреса контракта PLEX
function fixPlexAddress(content, filename) {
  let updated = false;

  // Ищем упоминания адреса пула и правильно подписываем
  if (
    content.includes('Адрес контракта PLEX:</strong> 0x41d9650faf3341cbf8947fd8063a1fc88dbf1889')
  ) {
    content = content.replace(
      'Адрес контракта PLEX:</strong> 0x41d9650faf3341cbf8947fd8063a1fc88dbf1889',
      'Адрес пула ликвидности PLEX/WBNB:</strong> 0x41d9650faf3341cbf8947fd8063a1fc88dbf1889'
    );
    updated = true;
    console.log(`  ✅ Исправлена подпись адреса контракта в ${filename}`);
  }

  return { content, updated };
}

// Добавление OG мета-тегов
function addOGMetaTags(content, filename) {
  let updated = false;

  if (!content.includes('og:image')) {
    const ogTags = `    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://xn--80apagbbfxgmuj4j.site/og/og-rabbit.jpg?v=20250930" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="DEXRabbit" />
    <meta property="og:locale" content="ru_RU" />
    
    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://xn--80apagbbfxgmuj4j.site/og/og-rabbit.jpg?v=20250930" />`;

    const insertPoint = content.indexOf('</head>');
    if (insertPoint !== -1) {
      content =
        content.substring(0, insertPoint) + '\n' + ogTags + '\n' + content.substring(insertPoint);
      updated = true;
      console.log(`  ✅ Добавлены OG мета-теги в ${filename}`);
    }
  }

  return { content, updated };
}

// Вспомогательная функция для экранирования регулярных выражений
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Обработка одного файла
function processFile(filename) {
  const filePath = path.join(__dirname, '..', filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Файл не найден: ${filename}`);
    return;
  }

  console.log(`\n📄 Обработка: ${filename}`);

  let content = fs.readFileSync(filePath, 'utf8');
  let totalUpdates = false;

  // Применяем все исправления
  let result;

  result = updateNavigation(content, filename);
  content = result.content;
  totalUpdates = totalUpdates || result.updated;

  result = fixTelegramLinks(content, filename);
  content = result.content;
  totalUpdates = totalUpdates || result.updated;

  result = fixPlexAddress(content, filename);
  content = result.content;
  totalUpdates = totalUpdates || result.updated;

  result = addOGMetaTags(content, filename);
  content = result.content;
  totalUpdates = totalUpdates || result.updated;

  // Сохраняем если были изменения
  if (totalUpdates) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  💾 Файл сохранен`);
  } else {
    console.log(`  ℹ️  Изменений не требуется`);
  }
}

// ============= СОЗДАНИЕ ОТСУТСТВУЮЩИХ CSS ФАЙЛОВ =============

function createMissingCSSFiles() {
  console.log('\n📦 Создание отсутствующих CSS файлов...\n');

  const cssDir = path.join(__dirname, '..', 'assets', 'css');

  // print.css
  const printCss = path.join(cssDir, 'print.css');
  if (!fs.existsSync(printCss)) {
    const printContent = `/* DEXRabbit - Print Styles */
@media print {
  /* Скрываем элементы при печати */
  .navbar,
  .footer,
  .hero-cta,
  .btn,
  .mobile-nav-toggle,
  .nav-dropdown,
  video,
  iframe {
    display: none !important;
  }
  
  /* Оптимизация для печати */
  body {
    font-size: 12pt;
    line-height: 1.5;
    color: #000;
    background: #fff;
  }
  
  .container {
    max-width: 100%;
    margin: 0;
    padding: 0;
  }
  
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
    color: #000;
  }
  
  img {
    max-width: 100%;
    page-break-inside: avoid;
  }
  
  a {
    color: #000;
    text-decoration: underline;
  }
  
  a[href^="http"]:after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
  }
}`;
    fs.writeFileSync(printCss, printContent, 'utf8');
    console.log('  ✅ Создан print.css');
  }

  // animations.css
  const animationsCss = path.join(cssDir, 'animations.css');
  if (!fs.existsSync(animationsCss)) {
    const animationsContent = `/* DEXRabbit - Animations */

/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Slide In */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Bounce */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Gradient Animation */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Применение анимаций */
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

.animate-slideIn {
  animation: slideIn 0.5s ease-out;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Hover эффекты */
.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
}

.hover-glow {
  transition: box-shadow 0.3s ease;
}

.hover-glow:hover {
  box-shadow: 0 0 20px rgba(124, 140, 255, 0.4);
}`;
    fs.writeFileSync(animationsCss, animationsContent, 'utf8');
    console.log('  ✅ Создан animations.css');
  }
}

// ============= ОСНОВНАЯ ЛОГИКА =============

console.log('🚀 DEXRabbit - Комплексное исправление проблем');
console.log('================================================\n');

// Создаем отсутствующие CSS файлы
createMissingCSSFiles();

// Обрабатываем все HTML файлы
console.log('\n📝 Обработка HTML файлов...');
HTML_FILES.forEach(file => {
  processFile(file);
});

// Итоговая информация
console.log('\n================================================');
console.log('✨ Исправление завершено!');
console.log('\n📋 Выполненные действия:');
console.log('  • Унифицирована навигация на всех страницах');
console.log('  • Исправлены все Telegram ссылки');
console.log('  • Исправлена подпись адреса контракта PLEX');
console.log('  • Добавлены OG мета-теги');
console.log('  • Созданы отсутствующие CSS файлы');
console.log('\n⚠️  Не забудьте:');
console.log('  1. Проверить изменения: git status');
console.log('  2. Добавить в git: git add -A');
console.log('  3. Сделать коммит: git commit -m "fix: комплексное исправление навигации и ссылок"');
console.log('  4. Отправить на GitHub: git push origin main');
console.log('\n🌐 Изменения появятся на сайте через 2-3 минуты после push');
