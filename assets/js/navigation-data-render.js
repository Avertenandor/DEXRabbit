/**
 * DEXRabbit - Функции рендеринга навигации
 * Версия 3.0
 */

window.DEXRabbitNavRender = {
  /**
   * Генерирует HTML для мега-меню (только триггеры)
   */
  renderMegaMenu(megaMenu) {
    const currentPath = window.location.pathname;

    return megaMenu
      .map(category => {
        // Если это одиночная ссылка без подразделов
        if (category.single) {
          const isActive = currentPath === category.href || currentPath === '/index.html';
          return `
            <div class="mega-nav-item">
              <a href="${category.href}" class="mega-nav-link${isActive ? ' active' : ''}">
                ${category.title}
              </a>
            </div>
          `;
        }

        // Иначе это категория с подразделами - ТОЛЬКО ТРИГГЕР
        return `
          <div class="mega-nav-item">
            <button
              class="mega-trigger"
              data-target="#mega-panel-${category.category}"
              aria-haspopup="true"
              aria-expanded="false"
            >
              ${category.icon ? category.icon + ' ' : ''}${category.title}
              <span class="mega-arrow">▾</span>
            </button>
          </div>
        `;
      })
      .join('');
  },

  /**
   * Генерирует HTML для панелей (отдельно от триггеров)
   */
  renderMegaPanels(megaMenu) {
    return megaMenu
      .filter(category => !category.single) // Только категории с подразделами
      .map(category => `
        <div
          class="mega-panel"
          id="mega-panel-${category.category}"
          role="menu"
          aria-hidden="true"
          style="display: none;"
        >
          <div class="mega-panel-content">
            <div class="mega-panel-grid">
              ${category.items
                .map(
                  item => `
                <a
                  href="${item.href}"
                  class="mega-panel-item"
                  role="menuitem"
                >
                  <span class="mega-item-icon">${item.icon}</span>
                  <div class="mega-item-content">
                    <span class="mega-item-title">${item.title}</span>
                    <span class="mega-item-desc">${item.description}</span>
                  </div>
                </a>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      `)
      .join('');
  },

  /**
   * Генерирует HTML для CTA кнопки
   */
  renderCTA(cta) {
    const external = cta.external ? 'target="_blank" rel="noopener noreferrer"' : '';
    return `
      <a href="${cta.href}"
         class="btn btn-primary nav-cta"
         ${external}>
        ${cta.title}
      </a>
    `;
  },
};

console.log('✅ navigation-data-render.js v3.0 загружен');
