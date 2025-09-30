/**
 * DEXRabbit - Оптимизированные адаптивные утилиты
 * Версия 2.0 - Исправлены проблемы производительности
 */

(function () {
  'use strict';

  // Кэш DOM элементов для предотвращения повторных запросов
  const domCache = {
    navbar: null,
    viewport: null,
    heroElements: null,
    tables: null,
  };

  // Флаги для предотвращения повторной инициализации
  const initialized = {
    styles: false,
    tables: false,
    embeds: false,
    scroll: false,
  };

  // 1. Определение типа устройства (один раз при загрузке)
  const deviceInfo = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
    isAndroid: /Android/i.test(navigator.userAgent),
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  };

  // 2. Оптимизированная установка высоты viewport
  function setViewportHeight() {
    // Используем requestAnimationFrame для предотвращения forced reflow
    requestAnimationFrame(() => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      // Кэшируем элементы при первом вызове
      if (!domCache.heroElements) {
        domCache.heroElements = document.querySelectorAll('.hero, .fullscreen');
      }

      // Batch DOM updates
      if (deviceInfo.isMobile && domCache.heroElements.length > 0) {
        const height = `${window.innerHeight}px`;
        // Используем DocumentFragment для batch updates
        domCache.heroElements.forEach(el => {
          el.style.minHeight = height;
        });
      }
    });
  }

  // 3. Дебаунс функция для оптимизации resize событий
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 4. Throttle функция для scroll событий
  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // 5. Оптимизация таблиц для мобильных
  function optimizeTables() {
    if (initialized.tables) return;

    requestAnimationFrame(() => {
      const tables = document.querySelectorAll('.table:not(.optimized)');

      if (tables.length === 0) {
        initialized.tables = true;
        return;
      }

      // Batch DOM operations
      const fragment = document.createDocumentFragment();

      tables.forEach(table => {
        if (!table.parentElement.classList.contains('table-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'table-wrapper';
          const parent = table.parentNode;
          const nextSibling = table.nextSibling;

          wrapper.appendChild(table);

          if (nextSibling) {
            parent.insertBefore(wrapper, nextSibling);
          } else {
            parent.appendChild(wrapper);
          }
        }
        table.classList.add('optimized');

        // Для узких экранов
        if (window.innerWidth < 480) {
          table.setAttribute('role', 'list');
          const rows = table.querySelectorAll('tbody tr');
          rows.forEach(row => {
            row.setAttribute('role', 'listitem');
          });
        }
      });

      initialized.tables = true;
    });
  }

  // 6. Lazy loading для изображений
  function setupLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const images = document.querySelectorAll('img[loading="lazy"]:not(.observed)');

    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;

            requestAnimationFrame(() => {
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              img.classList.add('loaded');
            });

            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    images.forEach(img => {
      img.classList.add('observed');
      imageObserver.observe(img);
    });
  }

  // 7. Оптимизация видео виджетов
  function optimizeEmbeds() {
    if (initialized.embeds) return;

    requestAnimationFrame(() => {
      const iframes = document.querySelectorAll('iframe:not(.optimized)');

      if (iframes.length === 0) {
        initialized.embeds = true;
        return;
      }

      iframes.forEach(iframe => {
        if (!iframe.parentElement.classList.contains('embed-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'embed-wrapper';

          const width = parseInt(iframe.getAttribute('width')) || 16;
          const height = parseInt(iframe.getAttribute('height')) || 9;
          const ratio = ((height / width) * 100).toFixed(2);

          wrapper.style.paddingBottom = `${ratio}%`;

          iframe.parentNode.insertBefore(wrapper, iframe);
          wrapper.appendChild(iframe);

          iframe.removeAttribute('width');
          iframe.removeAttribute('height');
        }
        iframe.classList.add('optimized');
      });

      initialized.embeds = true;
    });
  }

  // 8. Smooth scroll с учетом sticky header
  function setupSmoothScroll() {
    if (initialized.scroll) return;

    // Кэшируем navbar
    if (!domCache.navbar) {
      domCache.navbar = document.querySelector('.navbar');
    }

    const navHeight = domCache.navbar ? domCache.navbar.offsetHeight : 0;

    document.querySelectorAll('a[href^="#"]:not(.scroll-setup)').forEach(anchor => {
      anchor.classList.add('scroll-setup');

      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const targetPosition = targetElement.offsetTop - navHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      });
    });

    initialized.scroll = true;
  }

  // 9. Адаптивные кнопки CTA
  function adaptCTAButtons() {
    requestAnimationFrame(() => {
      const ctaRows = document.querySelectorAll('.hero-cta, .cta-row');

      if (ctaRows.length === 0) return;

      const isMobile = window.innerWidth < 640;

      ctaRows.forEach(row => {
        const buttons = row.querySelectorAll('.btn');
        buttons.forEach(btn => {
          if (isMobile) {
            btn.classList.add('btn-full-mobile');
          } else {
            btn.classList.remove('btn-full-mobile');
          }
        });
      });
    });
  }

  // 10. Предотвращение зума при фокусе на input (iOS)
  function preventZoomOnFocus() {
    if (!deviceInfo.isIOS) return;

    // Кэшируем viewport meta tag
    if (!domCache.viewport) {
      domCache.viewport = document.querySelector('meta[name="viewport"]');
    }

    if (!domCache.viewport) return;

    const inputs = document.querySelectorAll(
      'input[type="text"]:not(.zoom-fixed), input[type="email"]:not(.zoom-fixed), input[type="tel"]:not(.zoom-fixed), textarea:not(.zoom-fixed), select:not(.zoom-fixed)'
    );

    inputs.forEach(input => {
      input.classList.add('zoom-fixed');
      input.style.fontSize = '16px';

      input.addEventListener('focus', function () {
        domCache.viewport.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        );
      });

      input.addEventListener('blur', function () {
        domCache.viewport.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0, viewport-fit=cover'
        );
      });
    });
  }

  // 11. Адаптивные карточки инвесторов
  function adaptInvestorCards() {
    requestAnimationFrame(() => {
      const investorCards = document.querySelectorAll('.investor-card');

      if (investorCards.length === 0) return;

      const isMobileSmall = window.innerWidth < 640;
      const isMobileXSmall = window.innerWidth < 480;

      investorCards.forEach(card => {
        const avatar = card.querySelector('.avatar, .investor-avatar');
        if (avatar) {
          if (isMobileSmall) {
            avatar.classList.add('avatar--sm');
          } else {
            avatar.classList.remove('avatar--sm');
          }
        }

        const buttons = card.querySelectorAll('a.contact-button, .btn');
        buttons.forEach(btn => {
          if (isMobileXSmall) {
            btn.style.fontSize = '0.75rem';
            btn.style.padding = '0.4rem 0.8rem';
          } else {
            btn.style.fontSize = '';
            btn.style.padding = '';
          }
        });
      });
    });
  }

  // 12. Оптимизированная загрузка отложенных стилей
  function loadDeferredStyles() {
    if (initialized.styles) return;
    initialized.styles = true;

    // Загружаем стили через link tags без предварительной проверки
    const deferredStyles = [
      { href: './assets/css/animations.css', media: 'all' },
      { href: './assets/css/print.css', media: 'print' },
    ];

    requestAnimationFrame(() => {
      deferredStyles.forEach(style => {
        // Проверяем, не загружен ли уже стиль
        const existing = document.querySelector(`link[href="${style.href}"]`);
        if (!existing) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = style.href;
          link.media = style.media;
          link.onerror = function () {
            console.warn(`Failed to load style: ${style.href}`);
          };
          document.head.appendChild(link);
        }
      });
    });
  }

  // 13. Добавляем классы для определения возможностей
  function detectFeatures() {
    const html = document.documentElement;

    // Touch support
    if (deviceInfo.isTouchDevice) {
      html.classList.add('touch');
    } else {
      html.classList.add('no-touch');
    }

    // Device type
    if (deviceInfo.isMobile) {
      html.classList.add('mobile');
    }
    if (deviceInfo.isIOS) {
      html.classList.add('ios');
    }
    if (deviceInfo.isAndroid) {
      html.classList.add('android');
    }

    // Размер экрана
    const updateSizeClass = () => {
      requestAnimationFrame(() => {
        html.classList.remove('xs', 'sm', 'md', 'lg', 'xl', 'xxl');

        const width = window.innerWidth;
        if (width < 576) html.classList.add('xs');
        else if (width < 768) html.classList.add('sm');
        else if (width < 992) html.classList.add('md');
        else if (width < 1200) html.classList.add('lg');
        else if (width < 1920) html.classList.add('xl');
        else html.classList.add('xxl');

        // Обновляем deviceInfo
        deviceInfo.screenWidth = width;
        deviceInfo.screenHeight = window.innerHeight;
      });
    };

    updateSizeClass();

    // Дебаунс для resize
    const debouncedUpdateSize = debounce(updateSizeClass, 250);
    window.addEventListener('resize', debouncedUpdateSize);
  }

  // 14. Инициализация всех оптимизаций
  function init() {
    // Критические функции
    detectFeatures();
    setViewportHeight();
    setupSmoothScroll();

    // Некритические функции с задержкой
    requestIdleCallback(
      () => {
        optimizeTables();
        setupLazyLoading();
        optimizeEmbeds();
        adaptCTAButtons();
        preventZoomOnFocus();
        adaptInvestorCards();
      },
      { timeout: 2000 }
    );

    // Отложенная загрузка стилей
    if (window.requestIdleCallback) {
      requestIdleCallback(
        () => {
          loadDeferredStyles();
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(loadDeferredStyles, 3000);
    }
  }

  // 15. Обработчики событий с оптимизацией
  const handleResize = debounce(() => {
    setViewportHeight();
    adaptCTAButtons();
    adaptInvestorCards();
    optimizeTables();
  }, 250);

  const handleOrientationChange = () => {
    setTimeout(() => {
      setViewportHeight();
      adaptCTAButtons();
    }, 100);
  };

  // Регистрация обработчиков
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleOrientationChange);

  // Polyfill для requestIdleCallback
  if (!window.requestIdleCallback) {
    window.requestIdleCallback = function (callback, options) {
      const timeout = options?.timeout || 0;
      return setTimeout(callback, timeout);
    };
  }

  // 16. Запуск при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM уже загружен
    init();
  }

  // 17. Экспорт для использования в других скриптах
  window.DEXRabbitResponsive = {
    deviceInfo,
    setViewportHeight: debounce(setViewportHeight, 100),
    optimizeTables: debounce(optimizeTables, 100),
    adaptCTAButtons: debounce(adaptCTAButtons, 100),
    refresh: function () {
      // Принудительное обновление всех компонентов
      Object.keys(initialized).forEach(key => {
        initialized[key] = false;
      });
      init();
    },
  };
})();
