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
      icon: 'ℹ️',
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
   * Генерирует HTML для мега-меню
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

        // Иначе это категория с подразделами
        return `
          <div class="mega-nav-item mega-nav-dropdown" data-category="${category.category}">
            <button 
              class="mega-nav-link" 
              aria-haspopup="true" 
              aria-expanded="false"
              aria-controls="mega-panel-${category.category}"
            >
              ${category.icon} ${category.title}
              <span class="mega-arrow">▾</span>
            </button>
            <div 
              class="mega-panel" 
              id="mega-panel-${category.category}"
              role="menu"
              hidden
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
          </div>
        `;
      })
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

    if (navContainer) {
      navContainer.innerHTML = this.renderMegaMenu();
      console.log('✅ Мега-меню создано');
      this.initMegaMenuInteractions();
    } else {
      console.warn('⚠️ Контейнер .mega-nav-container не найден');
    }

    // Обновляем CTA кнопку
    const ctaContainer = document.querySelector('.nav-cta-wrapper');
    if (ctaContainer) {
      ctaContainer.innerHTML = this.renderCTA();
      console.log('✅ CTA кнопка добавлена');
    }
  },

  /**
   * Инициализирует интерактивность мега-меню
   */
  initMegaMenuInteractions() {
    const dropdowns = document.querySelectorAll('.mega-nav-dropdown');

    dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('.mega-nav-link');
      const panel = dropdown.querySelector('.mega-panel');
      let closeTimeout;

      // Функции управления
      const open = () => {
        clearTimeout(closeTimeout);
        dropdown.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
      };

      const close = () => {
        dropdown.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        panel.setAttribute('hidden', '');
      };

      const delayedClose = () => {
        closeTimeout = setTimeout(close, 200);
      };

      // Desktop hover
      if (window.matchMedia('(hover: hover)').matches) {
        dropdown.addEventListener('mouseenter', open);
        dropdown.addEventListener('mouseleave', delayedClose);
      }

      // Click для всех устройств
      button.addEventListener('click', e => {
        e.preventDefault();
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          close();
        } else {
          // Закрываем другие панели
          document.querySelectorAll('.mega-nav-dropdown.active').forEach(other => {
            if (other !== dropdown) {
              const otherBtn = other.querySelector('.mega-nav-link');
              const otherPanel = other.querySelector('.mega-panel');
              other.classList.remove('active');
              otherBtn.setAttribute('aria-expanded', 'false');
              otherPanel.setAttribute('hidden', '');
            }
          });
          open();
        }
      });

      // Закрытие при клике вне
      document.addEventListener('click', e => {
        if (!dropdown.contains(e.target)) {
          close();
        }
      });

      // Keyboard navigation
      button.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isOpen = button.getAttribute('aria-expanded') === 'true';
          if (isOpen) {
            close();
          } else {
            open();
            // Фокус на первом элементе
            const firstItem = panel.querySelector('.mega-panel-item');
            if (firstItem) firstItem.focus();
          }
        } else if (e.key === 'Escape') {
          close();
          button.focus();
        }
      });
    });

    console.log('✅ Интерактивность мега-меню настроена');
    
    // ✅ КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Перемещаем панели в .nav-wrapper
    this.fixMegaPanelPositioning();
  },

  /**
   * Исправляет позиционирование мега-панелей
   */
  fixMegaPanelPositioning() {
    const WRAPPER = document.querySelector('.nav-wrapper');
    if (!WRAPPER) {
      console.warn('⚠️ .nav-wrapper не найден');
      return;
    }

    // 1) Вытащить панели из .mega-nav-container и переместить в .nav-wrapper
    document.querySelectorAll('.mega-nav-container .mega-panel').forEach(panel => {
      WRAPPER.appendChild(panel);
      console.log('✅ Панель перемещена в .nav-wrapper');
    });

    // 2) Страховка от «повторной сборки» меню где-то ещё
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.mega-nav-container .mega-panel').forEach(panel => {
        WRAPPER.appendChild(panel);
        console.log('🔄 Панель повторно перемещена в .nav-wrapper');
      });
    });
    
    const navContainer = document.querySelector('.mega-nav-container');
    if (navContainer) {
      observer.observe(navContainer, { childList: true, subtree: true });
    }
    
    console.log('✅ Система мониторинга панелей активирована');
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
