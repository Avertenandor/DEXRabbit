// ========== NAVIGATION V2 MAIN - Apple/Amazon Style ==========
// Версия: 2025-10-01

(function() {
  'use strict';

  /**
   * Инициализация навигации V2
   */
  function initNavigationV2() {
    // Проверяем, не установлена ли уже новая навигация
    if (document.querySelector('.nav-v2')) {
      console.log('✅ Navigation V2 уже установлена');
      return;
    }

    // Проверяем наличие зависимостей
    if (typeof window.renderNavigationV2 !== 'function') {
      console.error('⚠️ renderNavigationV2 не загружен');
      return;
    }

    if (typeof window.initNavigationV2Interactions !== 'function') {
      console.error('⚠️ initNavigationV2Interactions не загружен');
      return;
    }

    // Рендерим навигацию
    const nav = window.renderNavigationV2();
    if (!nav) {
      console.error('⚠️ Не удалось отрендерить навигацию');
      return;
    }

    // Вставляем в начало body
    if (document.body.firstChild) {
      document.body.insertBefore(nav, document.body.firstChild);
    } else {
      document.body.appendChild(nav);
    }

    // Инициализируем интерактивность
    window.initNavigationV2Interactions();

    console.log('✅ Navigation V2 инициализирована');
  }

  // Запуск
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigationV2);
  } else {
    initNavigationV2();
  }

  console.log('✅ navigation-v2-main.js загружен');
})();
