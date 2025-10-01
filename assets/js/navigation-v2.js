// ========== NAVIGATION V2 - Apple/Amazon Style ==========
// Версия: 2025-10-01

(function() {
  'use strict';

  // ========== КОНФИГУРАЦИЯ ==========
  const NAV_DATA = {
    logo: {
      href: '/',
      icon: '/favicon.svg',
      title: 'DEXRabbit',
      slogan: 'Твой пассивный доход на кроликах'
    },
    
    menu: [
      {
        title: 'Инвестиции',
        id: 'investment',
        items: [
          {
            title: 'Модель инвестирования',
            desc: 'Как работает инвестиция в кроликов',
            href: '/investment-model.html',
            icon: '💰'
          },
          {
            title: 'Стать инвестором',
            desc: 'Начните зарабатывать уже сегодня',
            href: '/#investment',
            icon: '🚀'
          },
          {
            title: 'Гарантии',
            desc: 'Защита ваших инвестиций',
            href: '/guarantees.html',
            icon: '🛡️'
          },
          {
            title: 'Токенизация',
            desc: 'PLEX токен и его преимущества',
            href: '/#tokenization',
            icon: '💎'
          },
          {
            title: 'Наши инвесторы',
            desc: 'Отзывы и истории успеха',
            href: '/investors.html',
            icon: '👥'
          },
          {
            title: 'Отчёты',
            desc: 'Прозрачная статистика фермы',
            href: '/reports.html',
            icon: '📊'
          },
          {
            title: 'Личный кабинет',
            desc: 'Управление инвестициями',
            href: '/dashboard/',
            icon: '💼'
          },
          {
            title: 'Инструкции по кошельку',
            desc: 'Как настроить MetaMask',
            href: '/wallet-instructions.html',
            icon: '📱'
          }
        ]
      },
      
      {
        title: 'Партнёрство',
        id: 'partnership',
        items: [
          {
            title: 'Программа партнёрства',
            desc: '3 уровня рефералки',
            href: '/partnership.html',
            icon: '🤝'
          },
          {
            title: 'Для ресторанов',
            desc: 'Поставки мяса кроликов',
            href: '/restaurants.html',
            icon: '🍽️'
          },
          {
            title: 'Контакты',
            desc: 'Связаться с нами',
            href: '/#contacts',
            icon: '📞'
          },
          {
            title: 'Стать партнёром',
            desc: 'Наши партнёры',
            href: '/partners/',
            icon: '⭐'
          },
          {
            title: 'Карьера',
            desc: 'Вакансии на ферме',
            href: '/careers.html',
            icon: '💼'
          },
          {
            title: 'Логистика',
            desc: 'Доставка по России',
            href: '/logistics.html',
            icon: '🚚'
          },
          {
            title: 'Развитие проекта',
            desc: 'Дорожная карта',
            href: '/development.html',
            icon: '🎯'
          }
        ]
      },
      
      {
        title: 'Услуги',
        id: 'services',
        items: [
          {
            title: 'Подарочные сертификаты',
            desc: 'Оригинальный подарок',
            href: '/gifts.html',
            icon: '🎁'
          },
          {
            title: 'Разведение',
            desc: 'Консультации по разведению',
            href: '/breeding.html',
            icon: '🐰'
          },
          {
            title: 'Терапия кроликами',
            desc: 'Pet-therapy для детей и взрослых',
            href: '/therapy.html',
            icon: '❤️'
          },
          {
            title: 'Уход',
            desc: 'Советы по уходу за кроликами',
            href: '/care.html',
            icon: '🧡'
          },
          {
            title: 'Логистика',
            desc: 'Доставка по России',
            href: '/logistics.html',
            icon: '🚚'
          },
          {
            title: 'Галерея',
            desc: 'Фото наших кроликов',
            href: '/gallery/',
            icon: '📸'
          },
          {
            title: 'Каталог',
            desc: 'Доступные кролики',
            href: '/catalog/',
            icon: '📋'
          },
          {
            title: 'Доставка',
            desc: 'Условия и тарифы',
            href: '/delivery/',
            icon: '📦'
          }
        ]
      },
      
      {
        title: 'Породы',
        id: 'breeds',
        items: [
          {
            title: 'Кролики vs Зайцы',
            desc: 'В чём разница',
            href: '/rabbits-hares.html',
            icon: '🐇'
          },
          {
            title: 'Кролики vs Коты',
            desc: 'Сравнение питомцев',
            href: '/cats-rabbits.html',
            icon: '🐱'
          },
          {
            title: 'Разведение пород',
            desc: 'Лучшие породы для разведения',
            href: '/breeding.html',
            icon: '🏆'
          },
          {
            title: 'Уход за породами',
            desc: 'Особенности ухода',
            href: '/care.html',
            icon: '💚'
          },
          {
            title: 'Терапевтические породы',
            desc: 'Кролики для терапии',
            href: '/therapy.html',
            icon: '💕'
          }
        ]
      },
      
      {
        title: 'О нас',
        id: 'about',
        items: [
          {
            title: 'О проекте',
            desc: 'История DEXRabbit',
            href: '/#about',
            icon: 'ℹ️'
          },
          {
            title: 'Как это работает',
            desc: 'Принцип работы платформы',
            href: '/#how-it-works',
            icon: '⚙️'
          },
          {
            title: 'Фото-галерея',
            desc: 'Фото нашей фермы',
            href: '/#gallery',
            icon: '🖼️'
          },
          {
            title: 'Отчёты',
            desc: 'Финансовая отчётность',
            href: '/reports.html',
            icon: '📈'
          },
          {
            title: 'Развитие',
            desc: 'План развития проекта',
            href: '/#development',
            icon: '🚀'
          },
          {
            title: 'Контакты',
            desc: 'Свяжитесь с нами',
            href: '/contacts.html',
            icon: '✉️'
          },
          {
            title: 'FAQ',
            desc: 'Частые вопросы',
            href: '/faq/',
            icon: '❓'
          },
          {
            title: 'Политика конфиденциальности',
            desc: 'Защита персональных данных',
            href: '/policy/',
            icon: '🔒'
          },
          {
            title: 'Условия использования',
            desc: 'Правила платформы',
            href: '/terms/',
            icon: '📜'
          },
          {
            title: 'Блог',
            desc: 'Новости и статьи',
            href: '/blog/',
            icon: '📝'
          },
          {
            title: 'Презентация',
            desc: 'Скачать презентацию',
            href: '/docs/presentation.html',
            icon: '📊'
          },
          {
            title: 'Юридическая информация',
            desc: 'Договоры и соглашения',
            href: '/legal/',
            icon: '⚖️'
          }
        ]
      }
    ],
    
    cta: {
      text: 'Начать инвестировать',
      href: '/#investment',
      icon: '🚀'
    }
  };

  // ========== РЕНДЕРИНГ НАВИГАЦИИ ==========
  function renderNavigation() {
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
  }

  // ========== ИНИЦИАЛИЗАЦИЯ ==========
  function init() {
    // Проверяем, не установлена ли уже новая навигация
    if (document.querySelector('.nav-v2')) {
      console.log('✅ Navigation V2 уже установлена');
      return;
    }

    // Рендерим навигацию
    const nav = renderNavigation();
    
    // Вставляем в начало body
    if (document.body.firstChild) {
      document.body.insertBefore(nav, document.body.firstChild);
    } else {
      document.body.appendChild(nav);
    }
    
    // Инициализируем интерактивность
    initInteractions();
    
    console.log('✅ Navigation V2 инициализирована');
  }

  // ========== ИНТЕРАКТИВНОСТЬ ==========
  function initInteractions() {
    const nav = document.querySelector('.nav-v2');
    const mobileToggle = nav.querySelector('.nav-v2__mobile-toggle');
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Dropdown для mobile (только на клик)
    const dropdownButtons = nav.querySelectorAll('.nav-v2__link[aria-haspopup]');
    
    dropdownButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // На мобильных - toggle dropdown
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const parent = button.closest('.nav-v2__item');
          const isOpen = parent.classList.toggle('open');
          button.setAttribute('aria-expanded', isOpen);
          
          // Закрываем другие открытые
          document.querySelectorAll('.nav-v2__item.open').forEach(item => {
            if (item !== parent) {
              item.classList.remove('open');
              item.querySelector('.nav-v2__link').setAttribute('aria-expanded', 'false');
            }
          });
        }
      });
    });
    
    // Закрытие при клике вне навигации
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-v2')) {
        nav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Закрытие при клике на ссылку
    nav.addEventListener('click', (e) => {
      if (e.target.closest('.nav-v2__dropdown-item')) {
        nav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Keyboard navigation
    nav.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        nav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        
        // Закрываем все dropdown
        document.querySelectorAll('.nav-v2__item.open').forEach(item => {
          item.classList.remove('open');
          item.querySelector('.nav-v2__link').setAttribute('aria-expanded', 'false');
        });
      }
    });
    
    // Прозрачность при скролле
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        nav.classList.add('transparent');
      } else {
        nav.classList.remove('transparent');
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ========== ЗАПУСК ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

