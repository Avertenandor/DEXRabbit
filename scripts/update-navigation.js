const fs = require('fs');
const path = require('path');

// Полная навигация из index.html
const fullNavigationHTML = `    <!-- Navigation -->
    <header class="navbar" role="navigation">
      <div class="nav-wrapper">
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
            <div class="nav-group nav-primary">
              <div class="mega-nav-container"></div>
            </div>

            <!-- CTA Button -->
            <div class="nav-cta-wrapper"></div>
          </div>
        </div>
      </div>
    </header>`;

// Полные стили из index.html
const fullStylesHTML = `    <!-- Performance Optimizations - 0 layout thrashing -->
    <link rel="stylesheet" href="/assets/css/performance.css" />
    <!-- Unified Navigation Styles -->
    <link rel="stylesheet" href="/assets/css/navigation.css?v=20251001-fix" />
    <!-- Mega Menu Styles -->
    <link rel="stylesheet" href="/assets/css/mega-menu.css?v=20251001-nav-container" />
    <!-- Navigation Refactor Styles -->
    <link rel="stylesheet" href="/assets/css/nav-refactor.css?v=20251001-refactor" />
    <!-- Investor Cards Styles -->
    <link rel="stylesheet" href="/assets/css/investor-cards.css" />
    <!-- Copy Button Styles -->
    <link rel="stylesheet" href="/assets/css/copy-button.css" />
    <!-- Copy Contract Styles -->
    <link rel="stylesheet" href="/assets/css/copy-contract.css" />
    <!-- Footer Styles -->
    <link rel="stylesheet" href="/assets/css/footer.css" />
    <!-- Print Styles -->
    <link rel="stylesheet" href="/assets/css/print.css" />`;

// JavaScript для навигации
const navigationJS = `    <!-- Navigation Data & Logic -->
    <script src="/assets/js/navigation-data.js?v=20251001-full-nav"></script>
    <script src="/assets/js/nav.js"></script>`;

// Функция для обновления HTML файла
function updateHTMLFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Проверяем, есть ли уже полная навигация
    if (content.includes('mega-nav-container')) {
      console.log(`✅ ${filePath} уже имеет полную навигацию`);
      return;
    }
    
    // Заменяем старую навигацию на новую
    const oldNavRegex = /<nav class="navbar"[^>]*>[\s\S]*?<\/nav>/;
    if (oldNavRegex.test(content)) {
      content = content.replace(oldNavRegex, fullNavigationHTML);
      console.log(`🔄 Обновлена навигация в ${filePath}`);
    } else {
      // Если нет навигации, добавляем после <body>
      const bodyRegex = /<body[^>]*>/;
      if (bodyRegex.test(content)) {
        content = content.replace(bodyRegex, `$&\n${fullNavigationHTML}`);
        console.log(`➕ Добавлена навигация в ${filePath}`);
      }
    }
    
    // Добавляем стили в <head>
    const headRegex = /<\/head>/;
    if (headRegex.test(content) && !content.includes('nav-fix.css')) {
      content = content.replace(headRegex, `    ${fullStylesHTML}\n</head>`);
      console.log(`🎨 Добавлены стили в ${filePath}`);
    }
    
    // Добавляем JavaScript перед </body>
    const bodyEndRegex = /<\/body>/;
    if (bodyEndRegex.test(content) && !content.includes('navigation-data.js')) {
      content = content.replace(bodyEndRegex, `    ${navigationJS}\n</body>`);
      console.log(`⚡ Добавлен JavaScript в ${filePath}`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filePath} обновлен`);
    
  } catch (error) {
    console.error(`❌ Ошибка при обновлении ${filePath}:`, error.message);
  }
}

// Список файлов для обновления
const filesToUpdate = [
  'breeding.html',
  'care.html', 
  'careers.html',
  'cats-rabbits.html',
  'contacts.html',
  'development.html',
  'gifts.html',
  'guarantees.html',
  'investment-model.html',
  'investors.html',
  'logistics.html',
  'partnership.html',
  'rabbits-hares.html',
  'reports.html',
  'restaurants.html',
  'therapy.html',
  'wallet-instructions.html',
  'docs/presentation.html',
  'legal/agreement.html',
  'legal/contract.html',
  'legal/license.html',
  'legal/privacy.html',
  'legal/terms.html'
];

console.log('🚀 Начинаю обновление навигации на всех страницах...\n');

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    updateHTMLFile(filePath);
  } else {
    console.log(`⚠️ Файл не найден: ${filePath}`);
  }
});

console.log('\n🎯 Обновление навигации завершено!');
