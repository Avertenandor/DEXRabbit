/**
 * DEXRabbit - Скрипт обновления навигации на всех страницах
 * Заменяет старую навигацию на новую унифицированную версию
 */

const fs = require('fs');
const path = require('path');

// Новый код навигации
const newNavHTML = `    <!-- Navigation -->
    <nav class="navbar" role="navigation">
        <div class="container">
            <!-- Logo Section -->
            <div class="navbar-header">
                <div class="logo-wrapper">
                    <a href="/" class="site-logo">
                        <img src="/favicon.svg" alt="DEXRabbit">
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
                    <!-- Основные разделы -->
                    <div class="nav-group">
                        <a href="/#about">О проекте</a>
                        <a href="/#how-it-works">Как работает</a>
                        <a href="/#investment">Инвестиции</a>
                        <a href="/#tokenization">Токенизация</a>
                    </div>
                    
                    <!-- Дополнительные разделы -->
                    <div class="nav-group nav-dropdown">
                        <button class="nav-dropdown-toggle" 
                                type="button"
                                aria-haspopup="true" 
                                aria-expanded="false" 
                                aria-controls="nav-dropdown-menu">
                            Ещё <span class="dropdown-arrow" aria-hidden="true">▾</span>
                        </button>
                        <div class="nav-dropdown-content" 
                             id="nav-dropdown-menu" 
                             role="menu" 
                             hidden>
                            <a href="/#gallery" role="menuitem">📷 Галерея</a>
                            <a href="/investors.html" role="menuitem">👥 Инвесторы</a>
                            <a href="/#partners" role="menuitem">🤝 Партнерам</a>
                            <a href="/partnership.html" role="menuitem">💵 Партнерская программа</a>
                            <a href="/#guarantees" role="menuitem">🛡️ Гарантии</a>
                            <a href="/reports.html" role="menuitem">📹 Отчеты</a>
                            <a href="/breeding.html" role="menuitem">🧬 Племенная работа</a>
                            <a href="/gifts.html" role="menuitem">🎁 Кролик в подарок</a>
                            <a href="/restaurants.html" role="menuitem">🍽️ Ресторанам</a>
                            <a href="/rabbits-hares.html" role="menuitem">🐰 Кролики и зайцы</a>
                            <a href="/cats-rabbits.html" role="menuitem">🐱 Коты и кролики</a>
                            <a href="/care.html" role="menuitem">🏥 Уход за кроликами</a>
                            <a href="/therapy.html" role="menuitem">🧠 Кроликотерапия</a>
                            <a href="/logistics.html" role="menuitem">🚚 Логистика и регионы</a>
                            <a href="/development.html" role="menuitem">🚀 Развитие и планы</a>
                            <a href="/careers.html" role="menuitem">💼 Вакансии</a>
                            <a href="/contacts.html" role="menuitem">📞 Контакты</a>
                            <a href="/docs/DEXRabbit_presentation.pdf" target="_blank" rel="noopener noreferrer" role="menuitem">📄 Презентация</a>
                        </div>
                    </div>
                    
                    <!-- CTA кнопка -->
                    <a href="https://t.me/dexrabbit_bot" 
                       class="btn btn-primary nav-cta"
                       target="_blank" 
                       rel="noopener noreferrer">
                        💬 Начать инвестировать
                    </a>
                </div>
            </div>
        </div>
    </nav>`;

// Новые стили для добавления
const navStyles = `    <link rel="stylesheet" href="/assets/css/navigation.css">`;

// Новые скрипты для добавления
const navScripts = `    <!-- Navigation scripts -->
    <script defer src="/assets/js/navigation-data.js?v=1.0"></script>
    <script defer src="/assets/js/nav.js?v=20250930"></script>`;

// Список файлов для обновления
const filesToUpdate = [
  'breeding.html',
  'gifts.html',
  'restaurants.html',
  'rabbits-hares.html',
  'cats-rabbits.html',
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

// Функция обновления файла
function updateFile(filename) {
  const filePath = path.join(__dirname, '..', filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Файл не найден: ${filename}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Добавляем navigation.css если его нет
  if (!content.includes('navigation.css')) {
    content = content.replace(
      '<link rel="stylesheet" href="/assets/css/variables.css">',
      '<link rel="stylesheet" href="/assets/css/variables.css">\n' + navStyles
    );
    updated = true;
  }

  // Заменяем старую навигацию на новую
  const navStart = content.indexOf('<!-- Navigation -->');
  const navEnd = content.indexOf('</nav>') + 6;

  if (navStart !== -1 && navEnd > navStart) {
    const oldNav = content.substring(navStart, navEnd);
    content = content.replace(oldNav, newNavHTML);
    updated = true;
  }

  // Добавляем скрипты навигации перед закрывающим </body>
  if (!content.includes('navigation-data.js')) {
    // Находим место для вставки скриптов
    const scriptInsertPoint = content.lastIndexOf('</body>');
    if (scriptInsertPoint !== -1) {
      // Удаляем старые inline скрипты toggleMenu если есть
      content = content.replace(/function toggleMenu\(\)[^}]*}/g, '');

      // Вставляем новые скрипты
      content =
        content.substring(0, scriptInsertPoint) +
        '\n' +
        navScripts +
        '\n' +
        content.substring(scriptInsertPoint);
      updated = true;
    }
  }

  // Добавляем aria-current для текущей страницы
  const currentPage = '/' + filename;
  content = content.replace(
    `href="${currentPage}" role="menuitem">`,
    `href="${currentPage}" role="menuitem" aria-current="page">`
  );

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Обновлен: ${filename}`);
  } else {
    console.log(`ℹ️  Пропущен (уже обновлен): ${filename}`);
  }
}

// Запускаем обновление
console.log('🚀 Начинаем обновление навигации...\n');

filesToUpdate.forEach(file => {
  updateFile(file);
});

console.log('\n✨ Обновление завершено!');
console.log('📝 Не забудьте проверить изменения и закоммитить в git');
