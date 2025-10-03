/**
 * Guarantees Page Interactions
 * Улучшенная интерактивность для страницы гарантий
 */

(function() {
  'use strict';

  // ============================================
  // Utility Functions
  // ============================================

  /**
   * Проверка видимости элемента в viewport
   */
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  /**
   * Throttle function для оптимизации событий прокрутки
   */
  const throttle = (func, delay) => {
    let lastCall = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func(...args);
    };
  };

  // ============================================
  // Intersection Observer для анимаций при скролле
  // ============================================

  const initScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Для карточек с задержкой
          if (entry.target.dataset.delay) {
            entry.target.style.animationDelay = entry.target.dataset.delay;
          }
        }
      });
    }, observerOptions);

    // Наблюдаем за всеми анимируемыми элементами
    const animatedElements = document.querySelectorAll(
      '.guarantee-card, .risk-item, .rights-card, .force-card, .document-card, .faq-item'
    );

    animatedElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.dataset.delay = `${index * 0.1}s`;
      observer.observe(element);
    });

    // CSS для анимации
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        animation: fadeInUp 0.6s ease forwards;
      }

      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  };

  // ============================================
  // Счетчики для статистики
  // ============================================

  const animateCounters = () => {
    const counters = document.querySelectorAll('.hero-stat__value');
    
    counters.forEach(counter => {
      const target = counter.textContent;
      const isPercentage = target.includes('%');
      const numericValue = parseInt(target.replace(/\D/g, ''));
      
      if (!isNaN(numericValue)) {
        let current = 0;
        const increment = numericValue / 60; // 60 кадров анимации
        const duration = 2000; // 2 секунды
        const step = duration / 60;

        const updateCounter = () => {
          current += increment;
          if (current < numericValue) {
            counter.textContent = isPercentage 
              ? `${Math.floor(current)}%` 
              : Math.floor(current);
            setTimeout(updateCounter, step);
          } else {
            counter.textContent = target;
          }
        };

        // Запускаем анимацию только когда элемент виден
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        });

        observer.observe(counter);
      }
    });
  };

  // ============================================
  // Плавная прокрутка к якорям
  // ============================================

  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 100; // Отступ для навигации
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  };

  // ============================================
  // Копирование адреса контракта
  // ============================================

  const initCopyButtons = () => {
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        const textToCopy = button.dataset.copy;
        
        try {
          await navigator.clipboard.writeText(textToCopy);
          
          // Визуальная обратная связь
          const originalText = button.textContent;
          button.textContent = '✓ Скопировано!';
          button.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
          
          setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
          }, 2000);
        } catch (err) {
          console.error('Ошибка копирования:', err);
          
          // Fallback для старых браузеров
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          
          try {
            document.execCommand('copy');
            button.textContent = '✓ Скопировано!';
          } catch (err) {
            button.textContent = '✗ Ошибка';
          }
          
          document.body.removeChild(textArea);
          
          setTimeout(() => {
            button.textContent = originalText;
          }, 2000);
        }
      });
    });
  };

  // ============================================
  // FAQ аккордеон с улучшенной доступностью
  // ============================================

  const initFAQAccordion = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const summary = item.querySelector('.faq-question');
      
      if (summary) {
        // Добавляем ARIA атрибуты
        summary.setAttribute('role', 'button');
        summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
        
        // Обработчик toggle
        item.addEventListener('toggle', () => {
          summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
          
          // Закрываем другие открытые FAQ (опционально)
          if (item.open) {
            faqItems.forEach(otherItem => {
              if (otherItem !== item && otherItem.open) {
                otherItem.open = false;
              }
            });
          }
        });

        // Клавиатурная навигация
        summary.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.open = !item.open;
          }
        });
      }
    });
  };

  // ============================================
  // Параллакс эффект для декоративных элементов
  // ============================================

  const initParallax = () => {
    const parallaxElements = document.querySelectorAll('.cta-shield, .guarantee-card__icon');
    
    const handleParallax = throttle((e) => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, 10);

    window.addEventListener('scroll', handleParallax);
  };

  // ============================================
  // Подсветка активных карточек при наведении
  // ============================================

  const initCardHighlight = () => {
    const cards = document.querySelectorAll(
      '.guarantee-card, .rights-card, .force-card, .document-card'
    );

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
      });

      card.addEventListener('mouseleave', () => {
        card.style.zIndex = '';
      });
    });
  };

  // ============================================
  // Отслеживание взаимодействия с документами
  // ============================================

  const trackDocumentDownloads = () => {
    const documentLinks = document.querySelectorAll('.document-card');
    
    documentLinks.forEach(link => {
      link.addEventListener('click', () => {
        const documentName = link.querySelector('.document-card__title')?.textContent || 'Unknown';
        
        // Здесь можно добавить отправку аналитики
        console.log(`Документ скачан: ${documentName}`);
        
        // Пример отправки в Google Analytics (если подключен)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'download', {
            'event_category': 'Documents',
            'event_label': documentName
          });
        }
      });
    });
  };

  // ============================================
  // Прогресс-бар чтения страницы
  // ============================================

  const initReadingProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #7c8cff, #4cc9f0);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    const updateProgress = throttle(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.pageYOffset;
      const progress = (scrolled / documentHeight) * 100;
      
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }, 50);

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Инициализация
  };

  // ============================================
  // Lazy loading изображений
  // ============================================

  const initLazyLoading = () => {
    if ('loading' in HTMLImageElement.prototype) {
      // Браузер поддерживает нативный lazy loading
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    } else {
      // Fallback для старых браузеров
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  };

  // ============================================
  // Показ кнопки "Наверх"
  // ============================================

  const initScrollToTop = () => {
    const scrollBtn = document.querySelector('.scroll-top-btn');
    
    if (scrollBtn) {
      const toggleScrollButton = throttle(() => {
        if (window.pageYOffset > 300) {
          scrollBtn.style.opacity = '1';
          scrollBtn.style.pointerEvents = 'auto';
        } else {
          scrollBtn.style.opacity = '0';
          scrollBtn.style.pointerEvents = 'none';
        }
      }, 100);

      window.addEventListener('scroll', toggleScrollButton);
      toggleScrollButton(); // Инициализация
    }
  };

  // ============================================
  // Инициализация при загрузке DOM
  // ============================================

  const init = () => {
    // Проверяем, что находимся на странице guarantees
    if (!document.body.classList.contains('guarantees-page') && 
        !window.location.pathname.includes('guarantees')) {
      // Добавляем класс для идентификации
      if (window.location.pathname.includes('guarantees')) {
        document.body.classList.add('guarantees-page');
      }
    }

    try {
      initScrollAnimations();
      animateCounters();
      initSmoothScroll();
      initCopyButtons();
      initFAQAccordion();
      initParallax();
      initCardHighlight();
      trackDocumentDownloads();
      initReadingProgress();
      initLazyLoading();
      initScrollToTop();

      console.log('✅ Guarantees page interactions initialized');
    } catch (error) {
      console.error('❌ Error initializing guarantees interactions:', error);
    }
  };

  // Запуск при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Экспорт для возможного использования извне
  window.GuaranteesPage = {
    init,
    animateCounters,
    initScrollAnimations
  };

})();
