/**
 * DEXRabbit - Единый источник данных навигации
 * Централизованное управление всеми пунктами меню
 * Версия 2.0 - Полная автоматизация
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
    { title: '🚚 Логистика и регионы', href: '/logistics.html' },
    { title: '📄 Презентация', href: '/docs/DEXRabbit_presentation.pdf', external: true },
  ],

  // CTA кнопка
  cta: {
    title: '💬 Начать инвестировать',
    href: 'https://t.me/dexrabbit_bot',
    external: true,
  },

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
        const isActive = currentPath === item.href.replace(/\/$/, '') || currentPath === item.href;
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
    console.log('🚀 Инициализация DEXRabbitNav...');

    // Находим контейнеры по новым селекторам
    const primaryContainer = document.querySelector('.nav-primary');
    const dropdownContent = document.querySelector('.nav-dropdown-content');
    const ctaContainer = document.querySelector('.nav-cta-wrapper');

    // Если новые селекторы не найдены, пробуем старые
    const fallbackPrimary = !primaryContainer
      ? document.querySelector('.nav-group:first-child')
      : null;
    const fallbackCTA = !ctaContainer ? document.querySelector('.nav-links') : null;

    // Обновляем основное меню
    if (primaryContainer) {
      primaryContainer.innerHTML = this.renderPrimaryMenu();
      console.log('✅ Primary меню обновлено');
    } else if (fallbackPrimary && !fallbackPrimary.querySelector('.nav-dropdown-toggle')) {
      fallbackPrimary.innerHTML = this.renderPrimaryMenu();
      console.log('✅ Primary меню обновлено (fallback)');
    }

    // Обновляем dropdown меню
    if (dropdownContent) {
      dropdownContent.innerHTML = this.renderDropdownMenu();
      console.log('✅ Dropdown меню обновлено');
    }

    // Обновляем CTA кнопку
    if (ctaContainer) {
      ctaContainer.innerHTML = this.renderCTA();
      console.log('✅ CTA кнопка добавлена');
    } else if (fallbackCTA) {
      const existingCTA = fallbackCTA.querySelector('.nav-cta');
      if (existingCTA) {
        existingCTA.outerHTML = this.renderCTA();
        console.log('✅ CTA кнопка обновлена (fallback)');
      } else {
        // Добавляем CTA в конец nav-links
        fallbackCTA.insertAdjacentHTML('beforeend', this.renderCTA());
        console.log('✅ CTA кнопка добавлена в конец');
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

    if (!dropdownToggle || !dropdownContent) {
      console.warn('⚠️ Dropdown элементы не найдены');
      return;
    }

    console.log('🎯 Инициализация dropdown меню...');

    // Добавляем ARIA атрибуты, если их нет
    if (!dropdownToggle.hasAttribute('aria-haspopup')) {
      dropdownToggle.setAttribute('aria-haspopup', 'true');
    }
    if (!dropdownToggle.hasAttribute('aria-expanded')) {
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
    if (!dropdownToggle.hasAttribute('aria-controls')) {
      dropdownToggle.setAttribute('aria-controls', 'nav-dropdown-menu');
    }
    if (!dropdownContent.hasAttribute('id')) {
      dropdownContent.setAttribute('id', 'nav-dropdown-menu');
    }
    if (!dropdownContent.hasAttribute('role')) {
      dropdownContent.setAttribute('role', 'menu');
    }

    // Функции управления состоянием
    const openDropdown = () => {
      dropdown.classList.add('active');
      dropdownToggle.setAttribute('aria-expanded', 'true');
      dropdownContent.removeAttribute('hidden');
      console.log('📂 Dropdown открыт');
    };

    const closeDropdown = () => {
      dropdown.classList.remove('active');
      dropdownToggle.setAttribute('aria-expanded', 'false');
      dropdownContent.setAttribute('hidden', '');
      console.log('📁 Dropdown закрыт');
    };

    const toggleDropdown = () => {
      const isOpen = dropdownToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    };

    // Удаляем старые обработчики (если есть)
    const newToggle = dropdownToggle.cloneNode(true);
    dropdownToggle.parentNode.replaceChild(newToggle, dropdownToggle);

    // Обработчик клика на кнопку
    newToggle.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
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
      const isOpen = newToggle.getAttribute('aria-expanded') === 'true';

      // Escape закрывает меню
      if (e.key === 'Escape' && isOpen) {
        closeDropdown();
        newToggle.focus();
      }

      // Arrow Down открывает меню и переходит к первому пункту
      if (e.key === 'ArrowDown' && e.target === newToggle && !isOpen) {
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
    console.log('✅ Dropdown инициализирован');
  },
};

// Автоинициализация при загрузке DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM загружен, инициализирую навигацию...');
    window.DEXRabbitNav.init();
  });
} else {
  console.log('📄 DOM уже загружен, инициализирую навигацию сразу...');
  // Небольшая задержка для гарантии загрузки всех элементов
  setTimeout(() => {
    window.DEXRabbitNav.init();
  }, 100);
}

console.log('✅ navigation-data.js загружен');
