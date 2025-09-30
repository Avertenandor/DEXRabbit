/**
 * DEXRabbit - Единый источник данных навигации
 * Централизованное управление всеми пунктами меню
 */

window.DEXRabbitNav = {
  // Основные разделы навигации
  primary: [
    { title: 'О проекте', href: '/#about' },
    { title: 'Как работает', href: '/#how-it-works' },
    { title: 'Инвестиции', href: '/#investment' },
    { title: 'Токенизация', href: '/#tokenization' },
  ],

  // Выпадающее меню "Ещё"
  more: [
    { title: '📷 Галерея', href: '/#gallery' },
    { title: '👥 Инвесторы', href: '/investors.html' },
    { title: '🤝 Партнерам', href: '/#partners' },
    { title: '💵 Партнерская программа', href: '/partnership.html' },
    { title: '🛡️ Гарантии', href: '/#guarantees' },
    { title: '📹 Отчеты', href: '/reports.html' },
    { title: '🧬 Племенная работа', href: '/breeding.html' },
    { title: '🎁 Кролик в подарок', href: '/gifts.html' },
    { title: '🍽️ Ресторанам', href: '/restaurants.html' },
    { title: '🐰 Кролики и зайцы', href: '/rabbits-hares.html' },
    { title: '🐱 Коты и кролики', href: '/cats-rabbits.html' },
    { title: '🏥 Уход за кроликами', href: '/care.html' },
    { title: '🧠 Кроликотерапия', href: '/therapy.html' },
    { title: '📄 Презентация', href: '/docs/DEXRabbit_presentation.pdf', external: true },
  ],

  // CTA кнопка
  cta: {
    title: '💬 Начать инвестировать',
    href: 'https://t.me/dexrabbit_bot',
    external: true,
  },

  // Вспомогательные функции
  /**
   * Генерирует HTML для основного меню
   */
  renderPrimaryMenu() {
    const currentPath = window.location.pathname;

    return this.primary
      .map(item => {
        const isActive =
          currentPath === item.href || (item.href.startsWith('/#') && currentPath === '/');
        const ariaCurrent = isActive ? 'aria-current="page"' : '';

        return `<a href="${item.href}" ${ariaCurrent}>${item.title}</a>`;
      })
      .join('');
  },

  /**
   * Генерирует HTML для dropdown меню
   */
  renderDropdownMenu() {
    const currentPath = window.location.pathname;

    return this.more
      .map(item => {
        const isActive = currentPath === item.href;
        const ariaCurrent = isActive ? 'aria-current="page"' : '';
        const external = item.external ? 'target="_blank" rel="noopener noreferrer"' : '';

        return `<a href="${item.href}" ${ariaCurrent} ${external} role="menuitem">${item.title}</a>`;
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
   * Инициализирует навигацию на странице
   */
  init() {
    // Находим контейнеры
    const primaryContainer = document.querySelector('.nav-group:first-child');
    const dropdownContent = document.querySelector('.nav-dropdown-content');
    const ctaContainer = document.querySelector('.nav-links');

    // Обновляем основное меню
    if (primaryContainer) {
      primaryContainer.innerHTML = this.renderPrimaryMenu();
    }

    // Обновляем dropdown меню
    if (dropdownContent) {
      dropdownContent.innerHTML = this.renderDropdownMenu();
    }

    // Обновляем CTA кнопку
    if (ctaContainer) {
      const existingCTA = ctaContainer.querySelector('.nav-cta');
      if (existingCTA) {
        existingCTA.outerHTML = this.renderCTA();
      }
    }

    // Инициализируем доступный dropdown
    this.initAccessibleDropdown();
  },

  /**
   * Инициализирует доступный dropdown с ARIA
   */
  initAccessibleDropdown() {
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownContent = document.querySelector('.nav-dropdown-content');
    const dropdown = document.querySelector('.nav-dropdown');

    if (!dropdownToggle || !dropdownContent) return;

    // Добавляем ARIA атрибуты
    dropdownToggle.setAttribute('aria-haspopup', 'true');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdownToggle.setAttribute('aria-controls', 'nav-dropdown-menu');
    dropdownContent.setAttribute('id', 'nav-dropdown-menu');
    dropdownContent.setAttribute('role', 'menu');

    // Функции управления состоянием
    const openDropdown = () => {
      dropdown.classList.add('active');
      dropdownToggle.setAttribute('aria-expanded', 'true');
      dropdownContent.removeAttribute('hidden');
    };

    const closeDropdown = () => {
      dropdown.classList.remove('active');
      dropdownToggle.setAttribute('aria-expanded', 'false');
      dropdownContent.setAttribute('hidden', '');
    };

    const toggleDropdown = () => {
      const isOpen = dropdownToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    };

    // Обработчик клика на кнопку
    dropdownToggle.addEventListener('click', e => {
      e.stopPropagation();
      toggleDropdown();
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target)) {
        closeDropdown();
      }
    });

    // Навигация с клавиатуры
    document.addEventListener('keydown', e => {
      const isOpen = dropdownToggle.getAttribute('aria-expanded') === 'true';

      // Escape закрывает меню
      if (e.key === 'Escape' && isOpen) {
        closeDropdown();
        dropdownToggle.focus();
      }

      // Arrow Down открывает меню и переходит к первому пункту
      if (e.key === 'ArrowDown' && e.target === dropdownToggle && !isOpen) {
        e.preventDefault();
        openDropdown();
        const firstItem = dropdownContent.querySelector('a');
        if (firstItem) firstItem.focus();
      }

      // Навигация внутри меню
      if (isOpen && dropdownContent.contains(e.target)) {
        const items = Array.from(dropdownContent.querySelectorAll('a'));
        const currentIndex = items.indexOf(e.target);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % items.length;
          items[nextIndex].focus();
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
          items[prevIndex].focus();
        }

        if (e.key === 'Home') {
          e.preventDefault();
          items[0].focus();
        }

        if (e.key === 'End') {
          e.preventDefault();
          items[items.length - 1].focus();
        }
      }
    });

    // Поддержка hover для десктопа
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    if (mediaQuery.matches) {
      let hoverTimeout;

      dropdown.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        openDropdown();
      });

      dropdown.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
          closeDropdown();
        }, 200);
      });
    }

    // Изначально скрываем меню
    dropdownContent.setAttribute('hidden', '');
  },
};

// Автоинициализация при загрузке DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.DEXRabbitNav.init();
  });
} else {
  window.DEXRabbitNav.init();
}
