/**
 * DEXRabbit - Единый источник данных навигации с мега-меню
 * Версия 3.0 - Мега-меню с категориями
 */

window.DEXRabbitNav = {
  // Структура мега-меню с категориями
  megaMenu: [
    {
      title: 'Главная',
      href: '/',
      single: true, // Без подразделов
    },
    {
      title: 'Инвестиции',
      category: 'investment',
      icon: '💰',
      items: [
        {
          title: 'Инвестиционная модель',
          href: '/investment-model.html',
          description: 'Круги финансирования А и Б',
          icon: '📊',
        },
        {
          title: 'Доходность',
          href: '/#investment',
          description: 'Расчет прибыли и ROI',
          icon: '📈',
        },
        {
          title: 'Гарантии',
          href: '/#guarantees',
          description: 'Защита ваших вложений',
          icon: '🛡️',
        },
        {
          title: 'PLEX токен',
          href: '/#tokenization',
          description: 'Курс и экономика токена',
          icon: '🪙',
        },
        {
          title: 'Наши инвесторы',
          href: '/investors.html',
          description: 'Реальные отзывы',
          icon: '👥',
        },
      ],
    },
    {
      title: 'Партнёрство',
      category: 'partnership',
      icon: '🤝',
      items: [
        {
          title: 'Партнерская программа',
          href: '/partnership.html',
          description: '3 уровня, 5% на каждом',
          icon: '💵',
        },
        {
          title: 'Для ресторанов',
          href: '/restaurants.html',
          description: 'Прямые поставки мяса',
          icon: '🍽️',
        },
        {
          title: 'Для блогеров',
          href: '/#contacts',
          description: 'Повышенные комиссии',
          icon: '📹',
        },
        {
          title: 'Активные партнеры',
          href: '/#partners',
          description: 'Наши партнеры',
          icon: '🤝',
        },
      ],
    },
    {
      title: 'Услуги',
      category: 'services',
      icon: '🐰',
      items: [
        {
          title: 'Кролик в подарок',
          href: '/gifts.html',
          description: 'Оригинальный подарок',
          icon: '🎁',
        },
        {
          title: 'Племенная работа',
          href: '/breeding.html',
          description: 'Селекция и разведение',
          icon: '🧬',
        },
        {
          title: 'Кроликотерапия',
          href: '/therapy.html',
          description: 'Терапия с кроликами',
          icon: '💆',
        },
        {
          title: 'Уход за кроликами',
          href: '/care.html',
          description: 'Профессиональный уход',
          icon: '🏥',
        },
        {
          title: 'Логистика',
          href: '/logistics.html',
          description: 'Доставка по России',
          icon: '🚚',
        },
        {
          title: 'Кролики и зайцы',
          href: '/rabbits-hares.html',
          description: 'Отличия и особенности',
          icon: '🐰',
        },
        {
          title: 'Кролики и кошки',
          href: '/cats-rabbits.html',
          description: 'Совместимость',
          icon: '🐱',
        },
      ],
    },
    {
      title: 'О нас',
      category: 'about',
      items: [
        {
          title: 'О проекте',
          href: '/#about',
          description: 'Миссия и цели',
          icon: '🏆',
        },
        {
          title: 'Как работает',
          href: '/#how-it-works',
          description: 'Механика инвестирования',
          icon: '⚙️',
        },
        {
          title: 'Галерея',
          href: '/#gallery',
          description: 'Фото наших кроликов',
          icon: '📷',
        },
        {
          title: 'Отчеты',
          href: '/reports.html',
          description: 'Видео с фермы',
          icon: '📹',
        },
        {
          title: 'Развитие',
          href: '/#development',
          description: 'Планы на будущее',
          icon: '🚀',
        },
        {
          title: 'Контакты',
          href: '/#contacts',
          description: 'Связаться с нами',
          icon: '📞',
        },
      ],
    },
  ],

  // CTA кнопка
  cta: {
    title: '💬 Начать инвестировать',
    href: 'https://t.me/dexrabbit_bot',
    external: true,
  },

  /**
   * Генерирует HTML для мега-меню (только триггеры)
   */
  renderMegaMenu() {
    const currentPath = window.location.pathname;

    return this.megaMenu
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
  renderMegaPanels() {
    return this.megaMenu
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
  renderCTA() {
    const external = this.cta.external ? 'target="_blank" rel="noopener noreferrer"' : '';
    return `
      <a href="${this.cta.href}" 
         class="btn btn-primary nav-cta" 
         ${external}>
        ${this.cta.title}
      </a>
    `;
  },

  /**
   * Инициализирует мега-меню на странице
   */
  init() {
    console.log('🚀 Инициализация DEXRabbitNav Mega Menu...');

    const navContainer = document.querySelector('.mega-nav-container');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (navContainer) {
      // 1) Рендерим только триггеры в навигацию
      navContainer.innerHTML = this.renderMegaMenu();
      console.log('✅ Триггеры мега-меню созданы');
    } else {
      console.warn('⚠️ Контейнер .mega-nav-container не найден');
    }

    if (navWrapper) {
      // 2) Рендерим панели СРАЗУ в .nav-wrapper
      navWrapper.insertAdjacentHTML('beforeend', this.renderMegaPanels());
      console.log('✅ Панели мега-меню созданы в .nav-wrapper');
    } else {
      console.warn('⚠️ Контейнер .nav-wrapper не найден');
    }

    // Обновляем CTA кнопку
    const ctaContainer = document.querySelector('.nav-cta-wrapper');
    if (ctaContainer) {
      ctaContainer.innerHTML = this.renderCTA();
      console.log('✅ CTA кнопка добавлена');
    }

    // Инициализируем интерактивность
    this.initMegaMenuInteractions();
  },

  /**
   * Инициализирует интерактивность мега-меню
   */
  initMegaMenuInteractions() {
    const WRAPPER = document.querySelector('.nav-wrapper');
    if (!WRAPPER) {
      console.warn('⚠️ .nav-wrapper не найден');
      return;
    }

    // 1) ВЫРЕЗАЕМ ПАНЕЛИ ИЗ НАВИГАЦИИ (если там остались) И ПЕРЕНОСИМ В WRAPPER
    const navContainer = document.querySelector('.mega-nav-container');
    if (navContainer) {
      navContainer.querySelectorAll('.mega-panel').forEach(panel => {
        WRAPPER.appendChild(panel);
        console.log('✅ Панель перемещена из навигации в .nav-wrapper');
      });
    }

    // 2) СВЯЗЫВАЕМ ТРИГГЕРЫ С ПАНЕЛЯМИ ПО data-target
    WRAPPER.addEventListener('click', (e) => {
      const trigger = e.target.closest('.mega-trigger');
      if (!trigger) return;
      
      const targetId = trigger.getAttribute('data-target');
      const panel = targetId ? document.querySelector(targetId) : null;
      if (!panel) return;

      // Закрыть все панели
      WRAPPER.querySelectorAll('.mega-panel[aria-hidden="false"]').forEach(p => {
        p.setAttribute('aria-hidden', 'true');
        p.style.display = 'none';
      });

      // Открыть нужную панель
      panel.style.display = 'block';
      panel.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      
      console.log('✅ Панель открыта:', targetId);
    });

    // 3) Клик вне — закрыть все
    document.addEventListener('click', (e) => {
      if (e.target.closest('.mega-trigger') || e.target.closest('.mega-panel')) return;
      
      WRAPPER.querySelectorAll('.mega-panel').forEach(panel => {
        panel.setAttribute('aria-hidden', 'true');
        panel.style.display = 'none';
      });
      
      // Сбросить состояние триггеров
      document.querySelectorAll('.mega-trigger').forEach(trigger => {
        trigger.setAttribute('aria-expanded', 'false');
      });
    });

    console.log('✅ Интерактивность мега-меню настроена (новая система)');
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

console.log('✅ navigation-data.js v3.0 (Mega Menu) загружен');
