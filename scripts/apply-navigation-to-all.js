const fs = require('fs');
const path = require('path');

// HTML навигации из index.html (строки 85-283)
const NAVIGATION_HTML = `    <!-- Beautiful Navigation -->
    <nav class="nav-beautiful">
      <div class="nav-beautiful__container">
        <!-- Logo -->
        <a href="/" class="nav-beautiful__logo">
          <img src="/favicon.svg" alt="DEXRabbit" class="nav-beautiful__logo-img">
          <div class="nav-beautiful__logo-text">
            <span class="nav-beautiful__logo-title">DEXRabbit</span>
            <span class="nav-beautiful__logo-slogan">Твой пассивный доход на кроликах</span>
          </div>
        </a>

        <!-- Mobile Toggle -->
        <button class="nav-beautiful__mobile-toggle" aria-label="Меню">
          <span class="nav-beautiful__mobile-icon"></span>
        </button>

        <!-- Menu -->
        <div class="nav-beautiful__menu">
          <!-- Инвестиции -->
          <div class="nav-beautiful__dropdown-wrapper">
            <button class="nav-beautiful__btn">
              Инвестиции
              <span class="nav-beautiful__arrow"></span>
            </button>
            <div class="nav-beautiful__dropdown">
              <ul class="nav-beautiful__dropdown-list">
                <li><a href="/investment-model.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">💰</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Модель инвестирования</span>
                    <span class="nav-beautiful__dropdown-desc">Как работает инвестиция</span>
                  </div>
                </a></li>
                <li><a href="/#investment" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">🚀</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Стать инвестором</span>
                    <span class="nav-beautiful__dropdown-desc">Начните зарабатывать</span>
                  </div>
                </a></li>
                <li><a href="/guarantees.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">🛡️</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Гарантии</span>
                    <span class="nav-beautiful__dropdown-desc">Защита инвестиций</span>
                  </div>
                </a></li>
                <li><a href="/investors.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">👥</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Наши инвесторы</span>
                    <span class="nav-beautiful__dropdown-desc">Отзывы и истории</span>
                  </div>
                </a></li>
              </ul>
            </div>
          </div>

          <!-- Партнёрство -->
          <div class="nav-beautiful__dropdown-wrapper">
            <button class="nav-beautiful__btn">
              Партнёрство
              <span class="nav-beautiful__arrow"></span>
            </button>
            <div class="nav-beautiful__dropdown">
              <ul class="nav-beautiful__dropdown-list">
                <li><a href="/partnership.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">🤝</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Программа партнёрства</span>
                    <span class="nav-beautiful__dropdown-desc">3 уровня рефералки</span>
                  </div>
                </a></li>
                <li><a href="/partners/" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">⭐</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Стать партнёром</span>
                    <span class="nav-beautiful__dropdown-desc">Наши партнёры</span>
                  </div>
                </a></li>
              </ul>
            </div>
          </div>

          <!-- Услуги -->
          <div class="nav-beautiful__dropdown-wrapper">
            <button class="nav-beautiful__btn">
              Услуги
              <span class="nav-beautiful__arrow"></span>
            </button>
            <div class="nav-beautiful__dropdown">
              <ul class="nav-beautiful__dropdown-list">
                <li><a href="/gifts.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">🎁</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Подарки</span>
                    <span class="nav-beautiful__dropdown-desc">Сертификаты</span>
                  </div>
                </a></li>
                <li><a href="/breeding.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">🐰</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Разведение</span>
                    <span class="nav-beautiful__dropdown-desc">Консультации</span>
                  </div>
                </a></li>
                <li><a href="/therapy.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">❤️</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Терапия</span>
                    <span class="nav-beautiful__dropdown-desc">Pet-therapy</span>
                  </div>
                </a></li>
                <li><a href="/catalog/" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">📋</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Каталог</span>
                    <span class="nav-beautiful__dropdown-desc">Доступные кролики</span>
                  </div>
                </a></li>
              </ul>
            </div>
          </div>

          <!-- Породы -->
          <div class="nav-beautiful__dropdown-wrapper">
            <button class="nav-beautiful__btn">
              Породы
              <span class="nav-beautiful__arrow"></span>
            </button>
            <div class="nav-beautiful__dropdown">
              <ul class="nav-beautiful__dropdown-list">
                <li><a href="/rabbits-hares.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">🐇</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Кролики vs Зайцы</span>
                    <span class="nav-beautiful__dropdown-desc">В чём разница</span>
                  </div>
                </a></li>
                <li><a href="/cats-rabbits.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">🐱</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Кролики vs Коты</span>
                    <span class="nav-beautiful__dropdown-desc">Сравнение</span>
                  </div>
                </a></li>
                <li><a href="/care.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">💚</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Уход</span>
                    <span class="nav-beautiful__dropdown-desc">Особенности</span>
                  </div>
                </a></li>
              </ul>
            </div>
          </div>

          <!-- О нас -->
          <div class="nav-beautiful__dropdown-wrapper">
            <button class="nav-beautiful__btn">
              О нас
              <span class="nav-beautiful__arrow"></span>
            </button>
            <div class="nav-beautiful__dropdown">
              <ul class="nav-beautiful__dropdown-list">
                <li><a href="/#about" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">ℹ️</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">О проекте</span>
                    <span class="nav-beautiful__dropdown-desc">История</span>
                  </div>
                </a></li>
                <li><a href="/contacts.html" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">✉️</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">Контакты</span>
                    <span class="nav-beautiful__dropdown-desc">Связь</span>
                  </div>
                </a></li>
                <li><a href="/faq/" class="nav-beautiful__dropdown-item">
                  <span class="nav-beautiful__dropdown-icon">❓</span>
                  <div class="nav-beautiful__dropdown-text">
                    <span class="nav-beautiful__dropdown-title">FAQ</span>
                    <span class="nav-beautiful__dropdown-desc">Вопросы</span>
                  </div>
                </a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <a href="/#investment" class="nav-beautiful__cta">
          <span>🚀</span>
          <span>Начать инвестировать</span>
        </a>
      </div>
    </nav>
`;

// CSS links
const CSS_LINKS = `    <!-- Beautiful Navigation -->
    <link rel="stylesheet" href="/assets/css/navigation-beautiful.css?v=20251001-stable-hover" />
    <!-- Mobile Critical Fix -->
    <link rel="stylesheet" href="/assets/css/mobile-critical-fix.css?v=20251001-android-fix" />
    <!-- Ultimate Responsive (All Devices) -->
    <link rel="stylesheet" href="/assets/css/ultimate-responsive.css?v=20251001-ultimate" />`;

// JS links
const JS_LINKS = `    <!-- Beautiful Navigation Script -->
    <script defer src="/assets/js/navigation-beautiful.js?v=20251001-stable-hover"></script>`;

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
    } else if (file.endsWith('.html') && file !== 'demo-megamenu.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

console.log('🔧 Применяю навигацию на все страницы...\n');

const htmlFiles = findHTMLFiles(process.cwd());
let updatedCount = 0;

htmlFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Проверяем, есть ли уже навигация
  if (content.includes('class="nav-beautiful"')) {
    console.log(`⚪ ${relativePath} - навигация уже есть`);
    return;
  }
  
  // Проверяем наличие </head> и <body>
  if (!content.includes('</head>') || !content.includes('<body>')) {
    console.log(`⚠️  ${relativePath} - нет тегов </head> или <body>, пропускаем`);
    return;
  }
  
  // Добавляем CSS перед </head>
  if (!content.includes('navigation-beautiful.css')) {
    content = content.replace('</head>', CSS_LINKS + '\n  </head>');
  }
  
  // Добавляем JS перед </head>
  if (!content.includes('navigation-beautiful.js')) {
    content = content.replace('</head>', JS_LINKS + '\n  </head>');
  }
  
  // Добавляем навигацию после <body>
  content = content.replace(/<body[^>]*>/, (match) => match + '\n' + NAVIGATION_HTML + '\n');
  
  fs.writeFileSync(filePath, content, 'utf8');
  updatedCount++;
  console.log(`✅ ${relativePath} - навигация добавлена`);
});

console.log(`\n📊 ИТОГО:`);
console.log(`   Обработано файлов: ${htmlFiles.length}`);
console.log(`   Добавлена навигация: ${updatedCount}`);
console.log(`   Уже была: ${htmlFiles.length - updatedCount}`);

console.log('\n✅ ДОБАВЛЕНИЕ ЗАВЕРШЕНО!');

