/**
 * DEXRabbit - Universal SEO Meta Tags Manager
 * Автоматическое управление мета-тегами на всех страницах
 * Updated: 03.10.2025
 */

(function() {
  'use strict';
  
  // Определяем текущую страницу
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  
  // SEO данные для всех страниц
  const seoData = {
    "index": {
      "title": "DEXRabbit — Токенизированная кроличья ферма | Доход до 1300%",
      "description": "💰 Первая в мире токенизированная ферма кроликов. Инвестируйте от 100 USDT, получайте 500-1300% за 4 месяца + ежедневные PLEX токены. Прозрачность через блокчейн BSC.",
      "keywords": "dexrabbit, токенизация, кролики, ферма, инвестиции, криптовалюта, plex, usdt, доход, пассивный доход, блокчейн",
      "ogType": "website"
    },
    "investment-model": {
      "title": "Инвестиционная модель DEXRabbit | 800% за 4 месяца",
      "description": "💎 Подробная инвестиционная модель: 100-2000 USDT → 800-1300% прибыли за 120 дней. Базовая формула: вложил $1000 → получил $8000. + Бонус: ежедневные PLEX токены.",
      "keywords": "инвестиции в кроликов, доходность, roi, plex токен, usdt, круг а, круг б, токенизация, ферма"
    },
    "partnership": {
      "title": "Партнерская программа DEXRabbit | До 15% с каждого инвестора",
      "description": "🤝 Зарабатывайте на привлечении: 3 уровня × 5% от вложений + 5% от прибыли. Моментальные выплаты в USDT BSC. Партнеры закреплены пожизненно. Без ограничений.",
      "keywords": "партнерская программа, реферальная программа, заработок, комиссия, usdt, пассивный доход, млм"
    },
    "contacts": {
      "title": "Контакты DEXRabbit | Ферма между Байкалом и Улан-Удэ",
      "description": "📞 Свяжитесь с DEXRabbit: @dexrabbit_bot, канал @DexRebbitOfficial, email: kupitkrolika@gmail.com. Ферма в Республике Бурятия, между озером Байкал и Улан-Удэ.",
      "keywords": "контакты, telegram, байкал, улан-удэ, бурятия, ферма кроликов, связаться"
    },
    "guarantees": {
      "title": "Гарантии и обязательства DEXRabbit | Защита инвестиций 100%",
      "description": "🛡️ 100% гарантия возврата вложений в USDT или PLEX. Страхование от форс-мажоров. Ветеринарный контроль 24/7. Резервный фонд 15% от оборота. Юридическая прозрачность.",
      "keywords": "гарантии, безопасность, страхование, защита инвестиций, возврат средств, юридические гарантии"
    },
    "default": {
      "title": "DEXRabbit — Токенизированная ферма кроликов",
      "description": "Первая в мире токенизированная кроличья ферма. Инвестируйте в реальное разведение через блокчейн.",
      "keywords": "dexrabbit, кролики, ферма, инвестиции, блокчейн"
    }
  };
  
  // Получаем данные для текущей страницы
  const pageData = seoData[currentPage] || seoData.default;
  
  // Функция для обновления или создания мета-тега
  function updateMetaTag(name, content, type = 'name') {
    if (!content) return;
    
    let meta = document.querySelector(`meta[${type}="${name}"]`);
    
    if (meta) {
      meta.setAttribute('content', content);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute(type, name);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  }
  
  // Функция для обновления canonical URL
  function updateCanonicalURL() {
    const baseURL = 'https://xn--80apagbbfxgmuj4j.site';
    const currentPath = window.location.pathname;
    const canonicalURL = baseURL + (currentPath === '/' ? '/' : currentPath);
    
    let link = document.querySelector('link[rel="canonical"]');
    
    if (link) {
      link.setAttribute('href', canonicalURL);
    } else {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonicalURL);
      document.head.appendChild(link);
    }
  }
  
  // Функция для обновления Open Graph тегов
  function updateOpenGraphTags() {
    const baseURL = 'https://xn--80apagbbfxgmuj4j.site';
    const currentPath = window.location.pathname;
    const currentURL = baseURL + (currentPath === '/' ? '/' : currentPath);
    
    // OG Title
    updateMetaTag('og:title', pageData.title, 'property');
    
    // OG Description
    updateMetaTag('og:description', pageData.description, 'property');
    
    // OG URL
    updateMetaTag('og:url', currentURL, 'property');
    
    // OG Type
    updateMetaTag('og:type', pageData.ogType || 'website', 'property');
    
    // OG Image (используем общую картинку если не указана специфичная)
    const ogImage = pageData.ogImage || baseURL + '/og/og-rabbit.jpg?v=20251003';
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:image:alt', 'DEXRabbit - Токенизированная ферма кроликов', 'property');
    
    // OG Site Name
    updateMetaTag('og:site_name', 'DEXRabbit', 'property');
    
    // OG Locale
    updateMetaTag('og:locale', 'ru_RU', 'property');
  }
  
  // Функция для обновления Twitter Card тегов
  function updateTwitterCardTags() {
    const baseURL = 'https://xn--80apagbbfxgmuj4j.site';
    
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', pageData.title, 'name');
    updateMetaTag('twitter:description', pageData.description, 'name');
    
    const twitterImage = pageData.ogImage || baseURL + '/og/og-rabbit.jpg?v=20251003';
    updateMetaTag('twitter:image', twitterImage, 'name');
    updateMetaTag('twitter:image:alt', 'DEXRabbit - Токенизированная ферма кроликов', 'name');
  }
  
  // Функция для обновления дополнительных SEO тегов
  function updateAdditionalSEOTags() {
    // Author
    updateMetaTag('author', 'DEXRabbit Team', 'name');
    
    // Robots
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', 'name');
    
    // Googlebot
    updateMetaTag('googlebot', 'index, follow', 'name');
    
    // Language
    updateMetaTag('language', 'Russian', 'name');
    
    // Geo Tags (для Бурятии)
    updateMetaTag('geo.region', 'RU-BU', 'name');
    updateMetaTag('geo.placename', 'Республика Бурятия', 'name');
    
    // Publisher
    updateMetaTag('publisher', 'DEXRabbit', 'name');
    
    // Copyright
    const year = new Date().getFullYear();
    updateMetaTag('copyright', `© ${year} DEXRabbit. Все права защищены.`, 'name');
  }
  
  // Инициализация при загрузке DOM
  function initSEO() {
    // Обновляем title страницы
    if (pageData.title) {
      document.title = pageData.title;
    }
    
    // Обновляем description
    updateMetaTag('description', pageData.description, 'name');
    
    // Обновляем keywords
    if (pageData.keywords) {
      updateMetaTag('keywords', pageData.keywords, 'name');
    }
    
    // Обновляем canonical URL
    updateCanonicalURL();
    
    // Обновляем Open Graph теги
    updateOpenGraphTags();
    
    // Обновляем Twitter Card теги
    updateTwitterCardTags();
    
    // Обновляем дополнительные SEO теги
    updateAdditionalSEOTags();
    
    console.log('✅ SEO мета-теги успешно обновлены для страницы:', currentPage);
  }
  
  // Запускаем инициализацию
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSEO);
  } else {
    initSEO();
  }
  
  // Экспорт для использования в других скриптах
  if (typeof window !== 'undefined') {
    window.DEXRabbitSEO = {
      updateMetaTag,
      updateCanonicalURL,
      updateOpenGraphTags,
      updateTwitterCardTags,
      initSEO
    };
  }
})();