/**
 * DEXRabbit - Мобильная навигация
 * Версия: 2025-09-29
 * Описание: Управление мобильным меню с поддержкой всех устройств
 */

(() => {
  'use strict';
  
  // Ждем полной загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
  
  function initNavigation() {
    // Поиск элементов
    const burger = document.querySelector('[data-burger], .mobile-nav-toggle, .burger');
    const menu = document.querySelector('[data-menu], .nav-links, #nav-menu');
    const navbar = document.querySelector('.navbar');
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    if (!burger || !menu) {
      // Если не нашли элементы с data-атрибутами, пробуем по функции toggleMenu
      if (typeof window.toggleMenu === 'undefined') {
        window.toggleMenu = function() {
          const menuById = document.getElementById('nav-menu');
          if (menuById) {
            const isOpen = menuById.getAttribute('aria-expanded') === 'true';
            menuById.setAttribute('aria-expanded', !isOpen);
            menuById.classList.toggle('open');
          }
        };
      }
      return;
    }
    
    // Функция переключения меню
    const toggleMenu = () => {
      const isOpen = menu.classList.contains('open') || 
                    menu.getAttribute('aria-expanded') === 'true';
      
      menu.classList.toggle('open');
      menu.setAttribute('aria-expanded', !isOpen);
      burger.setAttribute('aria-expanded', !isOpen);
      
      // Блокируем скролл body при открытом меню
      document.body.style.overflow = !isOpen ? 'hidden' : '';
      
      // Анимация бургера
      if (burger.innerHTML.trim() === '☰') {
        burger.innerHTML = !isOpen ? '✕' : '☰';
      }
    };
    
    // Клик по бургеру
    burger.addEventListener('click', toggleMenu);
    
    // Закрытие при клике по пункту меню
    menu.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (burger.innerHTML.trim() === '✕') {
          burger.innerHTML = '☰';
        }
      });
    });
    
    // Обработка dropdown меню
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.nav-dropdown-toggle');
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          dropdown.classList.toggle('active');
          
          // Закрываем другие dropdown
          dropdowns.forEach(other => {
            if (other !== dropdown) {
              other.classList.remove('active');
            }
          });
        });
      }
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && menu.classList.contains('open')) {
        menu.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (burger.innerHTML.trim() === '✕') {
          burger.innerHTML = '☰';
        }
      }
      
      // Закрытие dropdown при клике вне
      if (!e.target.closest('.nav-dropdown')) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });
    
    // Закрытие при нажатии Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (burger.innerHTML.trim() === '✕') {
          burger.innerHTML = '☰';
        }
      }
    });
    
    // Адаптивность при изменении размера окна
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 900 && menu.classList.contains('open')) {
          menu.classList.remove('open');
          menu.setAttribute('aria-expanded', 'false');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          if (burger.innerHTML.trim() === '✕') {
            burger.innerHTML = '☰';
          }
        }
      }, 250);
    });
    
    // Поддержка свайпов на мобильных
    if ('ontouchstart' in window) {
      let touchStartX = 0;
      let touchEndX = 0;
      
      menu.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });
      
      menu.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
      
      function handleSwipe() {
        if (touchEndX < touchStartX - 50 && menu.classList.contains('open')) {
          // Свайп влево - закрываем меню
          menu.classList.remove('open');
          menu.setAttribute('aria-expanded', 'false');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          if (burger.innerHTML.trim() === '✕') {
            burger.innerHTML = '☰';
          }
        }
      }
    }
    
    // Экспорт функции для совместимости
    window.toggleMenu = toggleMenu;
  }
  
  // Sticky navbar при скролле
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        navbar.classList.remove('scroll-down');
        return;
      }
      
      if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Скролл вниз
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Скролл вверх
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
      }
      
      lastScroll = currentScroll;
    });
  }
})();
