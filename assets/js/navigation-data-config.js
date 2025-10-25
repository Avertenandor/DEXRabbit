/**
 * DEXRabbit - Конфигурация данных навигации с мега-меню
 * Версия 3.0 - Мега-меню с категориями
 */

window.DEXRabbitNavConfig = {
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
          href: '/guarantees.html',
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
        {
          title: 'Отчеты',
          href: '/reports.html',
          description: 'Финансовая отчетность',
          icon: '📊',
        },
        {
          title: 'Дашборд',
          href: '/dashboard/',
          description: 'Личный кабинет инвестора',
          icon: '📱',
        },
        {
          title: 'Инструкции кошелька',
          href: '/wallet-instructions.html',
          description: 'Как подключить кошелек',
          icon: '💳',
        },
        {
          title: 'Презентация',
          href: '/docs/presentation.html',
          description: 'Презентация проекта',
          icon: '📊',
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
          title: 'Для блогеров',
          href: '/#contacts',
          description: 'Повышенные комиссии',
          icon: '📹',
        },
        {
          title: 'Активные партнеры',
          href: '/partners/',
          description: 'Наши партнеры',
          icon: '🤝',
        },
        {
          title: 'Карьера',
          href: '/careers.html',
          description: 'Вакансии и возможности',
          icon: '💼',
        },
        {
          title: 'Логистика',
          href: '/logistics.html',
          description: 'Логистические услуги',
          icon: '🚚',
        },
        {
          title: 'Разработка',
          href: '/development.html',
          description: 'Техническая информация',
          icon: '⚙️',
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
        {
          title: 'Каталог',
          href: '/catalog/',
          description: 'Наши кролики',
          icon: '📋',
        },
        {
          title: 'Галерея',
          href: '/gallery/',
          description: 'Фото наших кроликов',
          icon: '📸',
        },
        {
          title: 'Доставка',
          href: '/delivery/',
          description: 'Логистические услуги',
          icon: '🚚',
        },
        {
          title: 'Гарантии',
          href: '/guarantees.html',
          description: 'Гарантийные обязательства',
          icon: '🛡️',
        },
        {
          title: 'Каталог',
          href: '/catalog/',
          description: 'Наши кролики',
          icon: '📋',
        },
        {
          title: 'Галерея',
          href: '/gallery/',
          description: 'Фото наших кроликов',
          icon: '📸',
        },
        {
          title: 'Доставка',
          href: '/delivery/',
          description: 'Логистические услуги',
          icon: '🚚',
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
          href: '/contacts.html',
          description: 'Связаться с нами',
          icon: '📞',
        },
        {
          title: 'FAQ',
          href: '/faq/',
          description: 'Часто задаваемые вопросы',
          icon: '❓',
        },
        {
          title: 'Политика',
          href: '/policy/',
          description: 'Политика конфиденциальности',
          icon: '🔒',
        },
        {
          title: 'Условия',
          href: '/terms/',
          description: 'Условия использования',
          icon: '📄',
        },
        {
          title: 'Блог',
          href: '/blog/',
          description: 'Новости и статьи',
          icon: '📝',
        },
        {
          title: 'Презентация',
          href: '/docs/presentation.html',
          description: 'Презентация проекта',
          icon: '📊',
        },
        {
          title: 'Инструкции кошелька',
          href: '/wallet-instructions.html',
          description: 'Как подключить кошелек',
          icon: '💳',
        },
        {
          title: 'Юридические документы',
          href: '/legal/',
          description: 'Договоры и лицензии',
          icon: '⚖️',
        },
      ],
    },
    {
      title: 'Породы',
      category: 'breeds',
      icon: '🐰',
      items: [
        {
          title: 'Кролики и зайцы',
          href: '/rabbits-hares.html',
          description: 'Различия и особенности',
          icon: '🐰',
        },
        {
          title: 'Коты и кролики',
          href: '/cats-rabbits.html',
          description: 'Совместимость животных',
          icon: '🐱',
        },
        {
          title: 'Разведение',
          href: '/breeding.html',
          description: 'Процесс разведения',
          icon: '👶',
        },
        {
          title: 'Уход',
          href: '/care.html',
          description: 'Как ухаживать за кроликами',
          icon: '🛁',
        },
        {
          title: 'Терапия',
          href: '/therapy.html',
          description: 'Лечебные процедуры',
          icon: '🏥',
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
};

console.log('✅ navigation-data-config.js v3.0 загружен');
