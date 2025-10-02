/**
 * 🎨 DEXRabbit - Enhanced Sections Animations
 * JavaScript for scroll-triggered animations and interactive effects
 */

(function() {
  'use strict';

  // ==================== //
  // SCROLL ANIMATIONS
  // ==================== //

  /**
   * Intersection Observer для анимаций при скролле
   */
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);

    // Добавляем классы анимации к элементам
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
      if (index === 0) return; // Пропускаем hero секцию

      // Добавляем анимацию к заголовку секции
      const header = section.querySelector('.section-header');
      if (header) {
        header.classList.add('animate-on-scroll');
        observer.observe(header);
      }

      // Добавляем анимацию к карточкам
      const cards = section.querySelectorAll('.card, .feature-card, .invest-step, .partner-card, .investor-card, .timeline-item, .gallery-item');
      cards.forEach((card, cardIndex) => {
        card.classList.add('animate-on-scroll');
        card.classList.add(`animate-delay-${Math.min(cardIndex % 5 + 1, 5)}`);
        observer.observe(card);
      });

      // Добавляем анимацию к элементам сетки
      const gridItems = section.querySelectorAll('.grid > div:not(.card)');
      gridItems.forEach((item, itemIndex) => {
        if (!item.classList.contains('animate-on-scroll')) {
          item.classList.add('animate-on-scroll');
          item.classList.add(`animate-delay-${Math.min(itemIndex % 5 + 1, 5)}`);
          observer.observe(item);
        }
      });
    });
  }

  // ==================== //
  // COPY TO CLIPBOARD
  // ==================== //

  /**
   * Функция копирования в буфер обмена с визуальной обратной связью
   */
  function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-contract-btn');
    
    copyButtons.forEach(button => {
      button.addEventListener('click', async function() {
        const dataType = this.getAttribute('data-copy-contract');
        let textToCopy = '';

        // Определяем какой адрес копировать
        if (dataType === 'plex') {
          textToCopy = '0xdf179b6cadbc61ffd86a3d2e55f6d6e083ade6c1';
        } else if (dataType === 'pool') {
          textToCopy = '0x41d9650faf3341cbf8947fd8063a1fc88dbf1889';
        }

        try {
          await navigator.clipboard.writeText(textToCopy);
          
          // Визуальная обратная связь
          const originalText = this.textContent;
          this.textContent = '✓ Скопировано!';
          this.classList.add('copied');
          
          setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Ошибка при копировании:', err);
          this.textContent = '✗ Ошибка';
          setTimeout(() => {
            this.textContent = 'Копировать';
          }, 2000);
        }
      });
    });
  }

  // ==================== //
  // PARALLAX EFFECTS
  // ==================== //

  /**
   * Простой параллакс эффект для фоновых элементов
   */
  function initParallax() {
    let ticking = false;
    let lastScrollY = window.scrollY;

    function updateParallax() {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;

      // Применяем параллакс к определенным секциям
      const parallaxSections = document.querySelectorAll('#about, .gallery-section');
      
      parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const offset = (scrollY - section.offsetTop) * 0.3;
          const before = section.querySelector('::before');
          if (before) {
            section.style.setProperty('--parallax-offset', `${offset}px`);
          }
        }
      });

      lastScrollY = scrollY;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // ==================== //
  // HOVER RIPPLE EFFECT
  // ==================== //

  /**
   * Добавляет ripple эффект при наведении на карточки
   */
  function initRippleEffect() {
    const cards = document.querySelectorAll('.card, .feature-card, .invest-step, .partner-card, .investor-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(124, 140, 255, 0.15);
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: ripple 0.8s ease-out forwards;
        `;
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
      });
    });

    // Добавляем анимацию ripple
    if (!document.getElementById('ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes ripple {
          to {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ==================== //
  // SMOOTH ANCHOR LINKS
  // ==================== //

  /**
   * Плавная прокрутка к якорям
   */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ==================== //
  // SCROLL TO TOP BUTTON
  // ==================== //

  /**
   * Показ/скрытие кнопки "Наверх"
   */
  function initScrollTopButton() {
    const scrollBtn = document.querySelector('.scroll-top-btn');
    if (!scrollBtn) return;

    let lastScroll = 0;
    let ticking = false;

    function updateScrollButton() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
        scrollBtn.style.transform = 'translateY(0)';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
        scrollBtn.style.transform = 'translateY(20px)';
      }

      lastScroll = currentScroll;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollButton);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });

    // Изначально скрываем кнопку
    scrollBtn.style.opacity = '0';
    scrollBtn.style.visibility = 'hidden';
    scrollBtn.style.transform = 'translateY(20px)';
    scrollBtn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

    // Обработчик клика
    scrollBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==================== //
  // ANIMATED COUNTERS
  // ==================== //

  /**
   * Анимация чисел при появлении в viewport
   */
  function initAnimatedCounters() {
    const counters = document.querySelectorAll('.metric-card strong, .rabbit-stat-value');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          animateCounter(entry.target);
          entry.target.classList.add('counted');
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^\d]/g, ''));
    
    if (isNaN(number)) return;

    const duration = 1000;
    const steps = 50;
    const stepDuration = duration / steps;
    const increment = number / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        element.textContent = text;
        clearInterval(timer);
      } else {
        element.textContent = text.replace(/\d+/, Math.floor(current));
      }
    }, stepDuration);
  }

  // ==================== //
  // GALLERY LIGHTBOX ENHANCEMENT
  // ==================== //

  /**
   * Улучшенный лайтбокс для галереи
   */
  function enhanceLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
          // Добавляем эффект при открытии
          const img = e.target;
          const clone = img.cloneNode(true);
          
          clone.style.cssText = `
            position: fixed;
            top: ${img.getBoundingClientRect().top}px;
            left: ${img.getBoundingClientRect().left}px;
            width: ${img.offsetWidth}px;
            height: ${img.offsetHeight}px;
            z-index: 9999;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
          `;
          
          document.body.appendChild(clone);
          
          setTimeout(() => {
            clone.style.top = '50%';
            clone.style.left = '50%';
            clone.style.transform = 'translate(-50%, -50%)';
            clone.style.width = '90vw';
            clone.style.height = 'auto';
            clone.style.maxWidth = '1200px';
            clone.style.maxHeight = '90vh';
            clone.style.objectFit = 'contain';
          }, 10);
        }
      });
    });
  }

  // ==================== //
  // PERFORMANCE OPTIMIZATION
  // ==================== //

  /**
   * Оптимизация производительности анимаций
   */
  function optimizePerformance() {
    // Проверяем, не предпочитает ли пользователь уменьшенное движение
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Отключаем сложные анимации
      document.body.classList.add('reduce-motion');
      return;
    }

    // Отключаем анимации при скролле на устройствах с низкой производительностью
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.body.classList.add('low-performance');
    }
  }

  // ==================== //
  // INITIALIZATION
  // ==================== //

  /**
   * Инициализация всех функций
   */
  function init() {
    // Ждем полной загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Проверяем производительность
    optimizePerformance();

    // Инициализируем все функции
    initScrollAnimations();
    initCopyButtons();
    initParallax();
    initRippleEffect();
    initSmoothScroll();
    initScrollTopButton();
    initAnimatedCounters();
    enhanceLightbox();

    console.log('✨ DEXRabbit Enhanced Sections initialized');
  }

  // Запускаем инициализацию
  init();

})();
