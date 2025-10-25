/**
 * DEXRabbit - Основной модуль навигации с мега-меню
 * Версия 3.0 - Координатор всех модулей
 */

window.DEXRabbitNav = {
  /**
   * Инициализирует мега-меню на странице
   */
  init() {
    console.log('🚀 Инициализация DEXRabbitNav Mega Menu...');

    const config = window.DEXRabbitNavConfig;
    const render = window.DEXRabbitNavRender;
    const interactions = window.DEXRabbitNavInteractions;

    if (!config || !render || !interactions) {
      console.error('⚠️ Не все модули навигации загружены');
      return;
    }

    const navContainer = document.querySelector('.mega-nav-container');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (navContainer) {
      // 1) Рендерим только триггеры в навигацию
      navContainer.innerHTML = render.renderMegaMenu(config.megaMenu);
      console.log('✅ Триггеры мега-меню созданы');
    } else {
      console.warn('⚠️ Контейнер .mega-nav-container не найден');
    }

    if (navWrapper) {
      // 2) Рендерим панели СРАЗУ в .nav-wrapper
      navWrapper.insertAdjacentHTML('beforeend', render.renderMegaPanels(config.megaMenu));
      console.log('✅ Панели мега-меню созданы в .nav-wrapper');
    } else {
      console.warn('⚠️ Контейнер .nav-wrapper не найден');
    }

    // Обновляем CTA кнопку
    const ctaContainer = document.querySelector('.nav-cta-wrapper');
    if (ctaContainer) {
      ctaContainer.innerHTML = render.renderCTA(config.cta);
      console.log('✅ CTA кнопка добавлена');
    }

    // Инициализируем интерактивность
    interactions.init();
    interactions.setupMutationObserver();
  },

  // Экспортируем конфигурацию для обратной совместимости
  get megaMenu() {
    return window.DEXRabbitNavConfig?.megaMenu || [];
  },

  get cta() {
    return window.DEXRabbitNavConfig?.cta || {};
  },

  renderMegaMenu() {
    return window.DEXRabbitNavRender?.renderMegaMenu(this.megaMenu) || '';
  },

  renderMegaPanels() {
    return window.DEXRabbitNavRender?.renderMegaPanels(this.megaMenu) || '';
  },

  renderCTA() {
    return window.DEXRabbitNavRender?.renderCTA(this.cta) || '';
  },

  initMegaMenuInteractions() {
    window.DEXRabbitNavInteractions?.init();
  },
};

// Автоинициализация
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.DEXRabbitNav.init();
  });
} else {
  setTimeout(() => {
    window.DEXRabbitNav.init();
  }, 100);
}

console.log('✅ navigation-data-main.js v3.0 (Mega Menu) загружен');
