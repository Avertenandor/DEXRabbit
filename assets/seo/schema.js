/**
 * DEXRabbit - Universal SEO Schema.org Markup
 * Универсальная Schema разметка для всех страниц
 * Updated: 03.10.2025
 */

// Основная Organization Schema для всего сайта
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DEXRabbit",
  "alternateName": "Кролики.site",
  "description": "Первая в мире токенизированная кроличья ферма. Инвестируйте в реальное разведение кроликов через блокчейн с доходностью до 1300%.",
  "url": "https://xn--80apagbbfxgmuj4j.site/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://xn--80apagbbfxgmuj4j.site/favicon.svg",
    "width": "512",
    "height": "512"
  },
  "image": "https://xn--80apagbbfxgmuj4j.site/og/og-rabbit.jpg",
  "founder": {
    "@type": "Person",
    "name": "DEXRabbit Team"
  },
  "foundingDate": "2024",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU",
      "addressRegion": "Республика Бурятия",
      "addressLocality": "Между Улан-Удэ и озером Байкал"
    }
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "kupitkrolika@gmail.com",
      "availableLanguage": ["Russian"],
      "areaServed": "RU"
    },
    {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "url": "https://t.me/dexrabbit_bot"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "RU",
    "addressRegion": "Республика Бурятия",
    "addressLocality": "Улан-Удэ"
  },
  "sameAs": [
    "https://t.me/DexRebbitOfficial",
    "https://t.me/DEXRabbitOfficialGroupInfo",
    "https://t.me/dexrabbit_bot",
    "https://www.geckoterminal.com/ru/bsc/pools/0x41d9650faf3341cbf8947fd8063a1fc88dbf1889",
    "https://github.com/Avertenandor/DEXRabbit"
  ],
  "brand": {
    "@type": "Brand",
    "name": "DEXRabbit",
    "logo": "https://xn--80apagbbfxgmuj4j.site/favicon.svg"
  },
  "slogan": "Твой пассивный доход на кроликах"
};

// WebSite Schema для главной страницы
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DEXRabbit",
  "alternateName": "Кролики.site",
  "url": "https://xn--80apagbbfxgmuj4j.site/",
  "description": "Токенизированная кроличья ферма с доходностью до 1300%",
  "publisher": {
    "@type": "Organization",
    "name": "DEXRabbit",
    "logo": {
      "@type": "ImageObject",
      "url": "https://xn--80apagbbfxgmuj4j.site/favicon.svg"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://xn--80apagbbfxgmuj4j.site/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// FAQ Schema для часто задаваемых вопросов
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Как работает токенизированная кроличья ферма?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Инвестор покупает крольчиху за USDT. Крольчиха рожает до 16 крольчат, но выкармливает ровно 8. Через 120 дней (4 месяца) эти 8 подросших кроликов продаются. Инвестор получает прибыль от продажи + ежедневные выплаты в токенах PLEX."
      }
    },
    {
      "@type": "Question",
      "name": "Какая доходность инвестиций?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Доходность составляет от 500% до 1300% за 120 дней в зависимости от рыночных условий и курса токена PLEX. Базовая формула: вложил $1000 → получил ~$8000 от продажи потомства + бонусы в PLEX."
      }
    },
    {
      "@type": "Question",
      "name": "Какие гарантии предоставляются инвесторам?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "100% возврат вложений гарантирован в USDT или PLEX. Каждый инвестор гарантирован по вкладу, но не по прибыли. Форс-мажоры касаются только прибыли. Ветеринарный контроль 24/7, замена кроликов в случае болезни или гибели."
      }
    },
    {
      "@type": "Question",
      "name": "Что такое партнерская программа?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3 уровня по 5% от вложений и 5% от прибыли партнеров. Выплаты моментальные в USDT на BSC. Партнеры закреплены пожизненно. Нет ограничений по количеству рефералов."
      }
    },
    {
      "@type": "Question",
      "name": "Как получить токены PLEX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "За каждый $1 ваших инвестиций вы получаете 0.2 PLEX токена ЕЖЕДНЕВНО на протяжении всех 120 дней. PLEX - единственный утилитарный токен экосистемы с конечной эмиссией 12,600,000 токенов."
      }
    }
  ]
};

// Investment Product Schema
const investmentProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Инвестиции в токенизированную кроличью ферму",
  "description": "Инвестируйте от 100 до 2000 USDT и получайте доходность 500-1300% за 120 дней",
  "brand": {
    "@type": "Brand",
    "name": "DEXRabbit"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://xn--80apagbbfxgmuj4j.site/investment-model.html",
    "priceCurrency": "USD",
    "price": "100",
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "DEXRabbit"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Breadcrumb Schema (динамически генерируется на каждой странице)
function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Функция для добавления Schema на страницу
function addSchemaToPage(schemaObjects) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaObjects);
  document.head.appendChild(script);
}

// Автоматическая инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем базовую Organization Schema на все страницы
  addSchemaToPage(organizationSchema);
  
  // На главной странице добавляем WebSite Schema
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    addSchemaToPage(websiteSchema);
    addSchemaToPage(faqSchema);
    addSchemaToPage(investmentProductSchema);
  }
  
  // Генерируем breadcrumbs автоматически
  const pathArray = window.location.pathname.split('/').filter(x => x);
  if (pathArray.length > 0) {
    const breadcrumbItems = [
      { name: 'Главная', url: 'https://xn--80apagbbfxgmuj4j.site/' }
    ];
    
    let currentPath = '';
    pathArray.forEach((segment, index) => {
      currentPath += '/' + segment;
      const name = segment.replace('.html', '').replace(/-/g, ' ');
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      breadcrumbItems.push({
        name: capitalizedName,
        url: 'https://xn--80apagbbfxgmuj4j.site' + currentPath
      });
    });
    
    addSchemaToPage(generateBreadcrumbSchema(breadcrumbItems));
  }
});

// Экспорт для использования в других скриптах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    organizationSchema,
    websiteSchema,
    faqSchema,
    investmentProductSchema,
    generateBreadcrumbSchema,
    addSchemaToPage
  };
}