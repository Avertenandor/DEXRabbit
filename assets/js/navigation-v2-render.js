// ========== NAVIGATION V2 RENDER - Apple/Amazon Style ==========
// Версия: 2025-10-01

(function() {
  'use strict';

  /**
   * Рендеринг навигации
   */
  window.renderNavigationV2 = function() {
    const NAV_DATA = window.NAV_DATA;
    if (!NAV_DATA) {
      console.error('⚠️ NAV_DATA не загружен');
      return null;
    }

    const nav = document.createElement('nav');
    nav.className = 'nav-v2';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Основная навигация');

    nav.innerHTML = `
      <div class="nav-v2__wrapper">
        <!-- Logo -->
        <a href="${NAV_DATA.logo.href}" class="nav-v2__logo">
          <img src="${NAV_DATA.logo.icon}" alt="${NAV_DATA.logo.title}" class="nav-v2__logo-icon" width="32" height="32">
          <div class="nav-v2__logo-text">
            <span class="nav-v2__logo-title">${NAV_DATA.logo.title}</span>
            <span class="nav-v2__logo-slogan">${NAV_DATA.logo.slogan}</span>
          </div>
        </a>

        <!-- Menu -->
        <ul class="nav-v2__menu" role="menubar">
          ${NAV_DATA.menu.map(category => `
            <li class="nav-v2__item" role="none">
              <button
                class="nav-v2__link"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded="false"
                data-dropdown="${category.id}"
              >
                ${category.title}
                <span class="nav-v2__arrow"></span>
              </button>

              <div class="nav-v2__dropdown ${category.items.length > 5 ? 'nav-v2__dropdown--large' : ''}" role="menu">
                <div class="nav-v2__dropdown-grid">
                  <div class="nav-v2__dropdown-section">
                    ${category.items.map(item => `
                      <a href="${item.href}" class="nav-v2__dropdown-item" role="menuitem">
                        <span class="nav-v2__dropdown-item-icon">${item.icon}</span>
                        <div class="nav-v2__dropdown-item-content">
                          <span class="nav-v2__dropdown-item-title">${item.title}</span>
                          <span class="nav-v2__dropdown-item-desc">${item.desc}</span>
                        </div>
                      </a>
                    `).join('')}
                  </div>
                </div>
              </div>
            </li>
          `).join('')}
        </ul>

        <!-- CTA -->
        <div class="nav-v2__cta">
          <a href="${NAV_DATA.cta.href}" class="nav-v2__cta-button">
            <span>${NAV_DATA.cta.icon}</span>
            <span>${NAV_DATA.cta.text}</span>
          </a>
        </div>

        <!-- Mobile Toggle -->
        <button class="nav-v2__mobile-toggle" aria-label="Меню" aria-expanded="false">
          <span class="nav-v2__mobile-icon"></span>
        </button>
      </div>
    `;

    return nav;
  };

  console.log('✅ navigation-v2-render.js загружен');
})();
