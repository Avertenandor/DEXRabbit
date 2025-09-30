#!/usr/bin/env node
/**
 * Скрипт для унификации навигации на всех страницах проекта DEXRabbit
 * Обновляет все HTML файлы для использования централизованной системы навигации
 */

const fs = require('fs').promises;
const path = require('path');

// HTML шаблон правильной навигации
const NAVIGATION_TEMPLATE = `    <!-- Navigation -->
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

            <!-- Dropdown Menu -->
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

            <!-- CTA Button -->
            <div class="nav-cta-wrapper"></div>
          </div>
        </div>
      </div>
    </nav>`;

// Скрипты, которые должны быть в конце body
const NAVIGATION_SCRIPTS = `    <!-- Navigation scripts -->
    <script defer src="/assets/js/navigation-data.js?v=2.0"></script>
    <script defer src="/assets/js/nav.js?v=20250930"></script>`;

// Список страниц для обновления (исключаем системные файлы)
const pagesToUpdate = [
  'index.html',
  'therapy.html',
  'care.html',
  'breeding.html',
  'gifts.html',
  'restaurants.html',
  'rabbits-hares.html',
  'cats-rabbits.html',
  'investment-model.html',
  'partnership.html',
  'investors.html',
  'reports.html',
  'development.html',
  'logistics.html',
  'guarantees.html',
  'contacts.html',
  'careers.html',
];

async function updateNavigation(filePath) {
  try {
    console.log(`📝 Обновляю: ${filePath}`);

    let content = await fs.readFile(filePath, 'utf8');

    // Сохраняем оригинал для отката
    const backupPath = filePath.replace('.html', '.backup.html');
    await fs.writeFile(backupPath, content);

    // Находим и заменяем навигацию
    const navStartPattern = /<!-- Navigation -->/;
    const navEndPattern = /<\/nav>/;

    const navStartIndex = content.search(navStartPattern);
    const navEndIndex = content.indexOf('</nav>', navStartIndex);

    if (navStartIndex !== -1 && navEndIndex !== -1) {
      // Вырезаем старую навигацию и вставляем новую
      const beforeNav = content.substring(0, navStartIndex);
      const afterNav = content.substring(navEndIndex + 7); // 7 = length of '</nav>'

      content = beforeNav + NAVIGATION_TEMPLATE + afterNav;

      // Обновляем подключение скриптов
      // Удаляем старые подключения navigation-data.js и nav.js
      content = content.replace(/<script[^>]*navigation-data\.js[^>]*><\/script>\s*/g, '');
      content = content.replace(/<script[^>]*nav\.js[^>]*><\/script>\s*/g, '');

      // Добавляем новые перед закрывающим body
      const bodyCloseIndex = content.lastIndexOf('</body>');
      if (bodyCloseIndex !== -1) {
        // Ищем место перед последним скриптом или перед </body>
        const lastScriptIndex = content.lastIndexOf('<script>', bodyCloseIndex);

        if (lastScriptIndex !== -1 && lastScriptIndex > navEndIndex) {
          // Вставляем перед последними скриптами
          content =
            content.substring(0, lastScriptIndex) +
            NAVIGATION_SCRIPTS +
            '\n\n' +
            content.substring(lastScriptIndex);
        } else {
          // Вставляем перед </body>
          content =
            content.substring(0, bodyCloseIndex) +
            '\n' +
            NAVIGATION_SCRIPTS +
            '\n  ' +
            content.substring(bodyCloseIndex);
        }
      }

      // Сохраняем обновленный файл
      await fs.writeFile(filePath, content);
      console.log(`✅ Успешно обновлен: ${filePath}`);

      return true;
    } else {
      console.log(`⚠️ Не найдена навигация в: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Ошибка при обновлении ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Начинаю обновление навигации на всех страницах...\n');

  const results = {
    success: [],
    failed: [],
    skipped: [],
  };

  for (const fileName of pagesToUpdate) {
    const filePath = path.join('C:\\Users\\konfu\\Desktop\\Кролики', fileName);

    try {
      // Проверяем существование файла
      await fs.access(filePath);

      const updated = await updateNavigation(filePath);
      if (updated) {
        results.success.push(fileName);
      } else {
        results.failed.push(fileName);
      }
    } catch {
      console.log(`⏭️ Пропущен (не найден): ${fileName}`);
      results.skipped.push(fileName);
    }

    // Небольшая пауза между файлами
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Итоговый отчет
  console.log('\n' + '='.repeat(50));
  console.log('📊 ИТОГОВЫЙ ОТЧЕТ:');
  console.log('='.repeat(50));
  console.log(`✅ Успешно обновлено: ${results.success.length} файлов`);
  if (results.success.length > 0) {
    results.success.forEach(f => console.log(`   - ${f}`));
  }

  if (results.failed.length > 0) {
    console.log(`\n❌ Не удалось обновить: ${results.failed.length} файлов`);
    results.failed.forEach(f => console.log(`   - ${f}`));
  }

  if (results.skipped.length > 0) {
    console.log(`\n⏭️ Пропущено: ${results.skipped.length} файлов`);
    results.skipped.forEach(f => console.log(`   - ${f}`));
  }

  console.log('\n💡 Совет: Проверьте работу навигации на сайте после деплоя!');
  console.log('📝 Созданы резервные копии всех файлов (.backup.html)');
}

// Запускаем скрипт
main().catch(console.error);
