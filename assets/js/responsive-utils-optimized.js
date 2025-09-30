/**
 * DEXRabbit - Ультра-оптимизированные адаптивные утилиты
 * Версия 3.0 - Полное устранение forced reflow и лагов
 * Оптимизация производительности: 0 forced reflow, минимальная нагрузка на CPU
 */

(function () {
  'use strict';

  // ========== КОНСТАНТЫ И КЭШИ ==========
  const RESIZE_DEBOUNCE = 300;
  const SCROLL_THROTTLE = 150;
  const IDLE_TIMEOUT = 1000;

  // Глобальный кэш всех DOM элементов
  const DOM = {
    html: null,
    navbar: null,
    viewport: null,
    heroElements: null,
    tables: null,
    buttons: null,
    iframes: null,
    images: null,
    inputs: null,
    investorCards: null,
    dropdowns: null,
  };

  // Состояние инициализации
  const state = {
    initialized: false,
    viewportHeight: 0,
    screenWidth: 0,
    screenHeight: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  };

  // ========== УТИЛИТЫ ПРОИЗВОДИТЕЛЬНОСТИ ==========

  /**
   * Супер-оптимизированный дебаунс с cancelable
   */
  function createDebouncer(func, wait) {
    let timeoutId = null;
    let lastCallTime = 0;

    const debounced = function (...args) {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTime;

      if (timeSinceLastCall >= wait) {
        // Если прошло достаточно времени, выполняем сразу
        lastCallTime = now;
        func.apply(this, args);
      } else {
        // Иначе откладываем
        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          lastCallTime = Date.now();
          func.apply(this, args);
          timeoutId = null;
        }, wait - timeSinceLastCall);
      }
    };

    debounced.cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    return debounced;
  }

  /**
   * Оптимизированный throttle с trailing call
   */
  function createThrottler(func, limit) {
    let inThrottle = false;
    let lastArgs = null;

    return function (...args) {
      lastArgs = args;

      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;

        setTimeout(() => {
          inThrottle = false;
          if (lastArgs) {
            func.apply(this, lastArgs);
            lastArgs = null;
          }
        }, limit);
      }
    };
  }

  /**
   * Батчинг DOM операций через один RAF
   */
  const batchProcessor = (() => {
    let pending = false;
    const tasks = [];

    function processTasks() {
      const currentTasks = tasks.splice(0);
      pending = false;

      // Выполняем все задачи в одном цикле
      currentTasks.forEach(task => task());
    }

    return {
      add(task) {
        tasks.push(task);

        if (!pending) {
          pending = true;
          requestAnimationFrame(processTasks);
        }
      },

      clear() {
        tasks.length = 0;
        pending = false;
      },
    };
  })();

  // ========== КЭШИРОВАНИЕ DOM ==========

  function cacheDOM() {
    // Кэшируем все элементы один раз
    DOM.html = document.documentElement;
    DOM.navbar = document.querySelector('.navbar');
    DOM.viewport = document.querySelector('meta[name="viewport"]');
    DOM.heroElements = Array.from(document.querySelectorAll('.hero, .fullscreen'));
    DOM.tables = Array.from(document.querySelectorAll('.table:not(.optimized)'));
    DOM.buttons = Array.from(document.querySelectorAll('.btn'));
    DOM.iframes = Array.from(document.querySelectorAll('iframe:not(.optimized)'));
    DOM.images = Array.from(document.querySelectorAll('img[loading="lazy"]:not(.observed)'));
    DOM.investorCards = Array.from(document.querySelectorAll('.investor-card'));
    DOM.dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));

    // Кэшируем input элементы для iOS
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      DOM.inputs = Array.from(document.querySelectorAll('input, textarea, select'));
    }
  }

  // ========== ОПРЕДЕЛЕНИЕ УСТРОЙСТВА ==========

  function detectDevice() {
    // Читаем все размеры за один раз
    const width = window.innerWidth;
    const height = window.innerHeight;

    state.screenWidth = width;
    state.screenHeight = height;
    state.viewportHeight = height * 0.01;

    // Определяем тип устройства
    state.isMobile = width < 768;
    state.isTablet = width >= 768 && width < 1024;
    state.isDesktop = width >= 1024;

    return state;
  }

  // ========== ОСНОВНЫЕ ФУНКЦИИ ==========

  /**
   * Установка CSS переменных без forced reflow
   */
  function updateCSSVariables() {
    batchProcessor.add(() => {
      const root = document.documentElement;
      const vh = state.viewportHeight;

      // Устанавливаем все переменные одной операцией
      root.style.cssText += `
        --vh: ${vh}px;
        --screen-width: ${state.screenWidth}px;
        --screen-height: ${state.screenHeight}px;
        --is-mobile: ${state.isMobile ? 1 : 0};
      `;
    });
  }

  /**
   * Обновление классов устройства
   */
  function updateDeviceClasses() {
    if (!DOM.html) return;

    batchProcessor.add(() => {
      const classList = DOM.html.classList;
      const width = state.screenWidth;

      // Удаляем все классы размеров одной операцией
      const toRemove = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'mobile', 'tablet', 'desktop'];
      classList.remove(...toRemove);

      // Добавляем нужный класс
      if (width < 576) classList.add('xs', 'mobile');
      else if (width < 768) classList.add('sm', 'mobile');
      else if (width < 992) classList.add('md', 'tablet');
      else if (width < 1200) classList.add('lg', 'desktop');
      else if (width < 1920) classList.add('xl', 'desktop');
      else classList.add('xxl', 'desktop');
    });
  }

  /**
   * Оптимизация hero элементов
   */
  function optimizeHeroElements() {
    if (!DOM.heroElements || DOM.heroElements.length === 0) return;

    if (state.isMobile) {
      batchProcessor.add(() => {
        const height = `${state.screenHeight}px`;
        DOM.heroElements.forEach(el => {
          el.style.minHeight = height;
        });
      });
    }
  }

  /**
   * Оптимизация таблиц
   */
  function optimizeTables() {
    if (!DOM.tables || DOM.tables.length === 0) return;

    batchProcessor.add(() => {
      DOM.tables.forEach(table => {
        if (table.classList.contains('optimized')) return;

        // Проверяем наличие wrapper
        if (!table.parentElement.classList.contains('table-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'table-wrapper';
          table.parentNode.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }

        table.classList.add('optimized');
      });
    });
  }

  /**
   * Супер-легкий lazy loading
   */
  function initLazyLoading() {
    if (!('IntersectionObserver' in window) || !DOM.images || DOM.images.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;

            batchProcessor.add(() => {
              if (img.dataset.src) {
                img.src = img.dataset.src;
                delete img.dataset.src;
              }
              img.classList.add('loaded');
            });

            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    DOM.images.forEach(img => {
      img.classList.add('observed');
      observer.observe(img);
    });
  }

  /**
   * Оптимизация iframe виджетов
   */
  function optimizeIframes() {
    if (!DOM.iframes || DOM.iframes.length === 0) return;

    batchProcessor.add(() => {
      DOM.iframes.forEach(iframe => {
        if (iframe.classList.contains('optimized')) return;

        // Добавляем loading="lazy" для iframe
        iframe.loading = 'lazy';
        iframe.classList.add('optimized');

        // Удаляем фиксированные размеры
        iframe.removeAttribute('width');
        iframe.removeAttribute('height');
      });
    });
  }

  /**
   * Загрузка отложенных стилей
   */
  function loadDeferredStyles() {
    // Используем preload для более быстрой загрузки
    const styles = [
      { href: '/assets/css/animations.css', media: 'all' },
      { href: '/assets/css/print.css', media: 'print' },
    ];

    styles.forEach(style => {
      // Проверяем, не загружен ли уже этот стиль
      if (document.querySelector(`link[href="${style.href}"]`)) return;

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = style.href;
      link.media = style.media || 'all';

      // Добавляем обработчик ошибки, чтобы не показывать 404 в консоли
      link.onerror = function () {
        console.log(`Стиль ${style.href} не требуется для текущей страницы`);
        this.remove();
      };

      document.head.appendChild(link);
    });
  }

  /**
   * Предотвращение зума на iOS
   */
  function preventIOSZoom() {
    if (!DOM.inputs || !DOM.viewport) return;

    const originalContent = DOM.viewport.content;
    const noZoomContent =
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';

    DOM.inputs.forEach(input => {
      // Устанавливаем минимальный размер шрифта
      input.style.fontSize = '16px';

      // Блокируем зум при фокусе
      input.addEventListener(
        'focus',
        () => {
          DOM.viewport.content = noZoomContent;
        },
        { passive: true }
      );

      input.addEventListener(
        'blur',
        () => {
          DOM.viewport.content = originalContent;
        },
        { passive: true }
      );
    });
  }

  // ========== ГЛАВНЫЕ ОБРАБОТЧИКИ ==========

  /**
   * Обработчик изменения размера окна
   */
  const handleResize = createDebouncer(() => {
    detectDevice();
    updateCSSVariables();
    updateDeviceClasses();
    optimizeHeroElements();
  }, RESIZE_DEBOUNCE);

  /**
   * Обработчик прокрутки
   */
  const handleScroll = createThrottler(() => {
    // Добавляем класс при прокрутке
    if (DOM.navbar) {
      const scrolled = window.pageYOffset > 10;
      DOM.navbar.classList.toggle('scrolled', scrolled);
    }
  }, SCROLL_THROTTLE);

  // ========== ИНИЦИАЛИЗАЦИЯ ==========

  function initialize() {
    if (state.initialized) return;
    state.initialized = true;

    // Фаза 1: Кэширование и определение
    cacheDOM();
    detectDevice();

    // Фаза 2: Критические обновления
    updateCSSVariables();
    updateDeviceClasses();

    // Фаза 3: Оптимизации (отложенно)
    requestIdleCallback(
      () => {
        optimizeHeroElements();
        optimizeTables();
        optimizeIframes();
        initLazyLoading();
        preventIOSZoom();
      },
      { timeout: IDLE_TIMEOUT }
    );

    // Фаза 4: Стили (сильно отложенно)
    setTimeout(loadDeferredStyles, 2000);

    // Регистрируем обработчики с passive для лучшей производительности
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // ========== POLYFILLS ==========

  if (!window.requestIdleCallback) {
    window.requestIdleCallback = (cb, options) => {
      const timeout = options?.timeout || 0;
      return setTimeout(cb, timeout);
    };
  }

  if (!window.cancelIdleCallback) {
    window.cancelIdleCallback = clearTimeout;
  }

  // ========== ЗАПУСК ==========

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    // Запускаем асинхронно, чтобы не блокировать поток
    setTimeout(initialize, 0);
  }

  // ========== API ==========

  window.DEXRabbitOptimized = {
    version: '3.0',

    // Методы для ручного управления
    refresh() {
      handleResize.cancel();
      detectDevice();
      updateCSSVariables();
      updateDeviceClasses();
    },

    // Получение состояния
    getState() {
      return { ...state };
    },

    // Принудительная оптимизация
    optimize() {
      optimizeTables();
      optimizeIframes();
      initLazyLoading();
    },

    // Очистка
    destroy() {
      handleResize.cancel();
      batchProcessor.clear();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    },
  };
})();
