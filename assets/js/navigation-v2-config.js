// ========== NAVIGATION V2 CONFIG - Apple/Amazon Style ==========
// Версия: 2025-10-01

(function() {
  'use strict';

  window.NAV_DATA = {
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

  console.log('✅ navigation-v2-config.js загружен');
})();
