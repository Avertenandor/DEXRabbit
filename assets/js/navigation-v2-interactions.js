// ========== NAVIGATION V2 INTERACTIONS - Apple/Amazon Style ==========
// Версия: 2025-10-01

(function() {
  'use strict';

  /**
   * Инициализация интерактивности
   */
  window.initNavigationV2Interactions = function() {
    const nav = document.querySelector('.nav-v2');
    if (!nav) {
      console.warn('⚠️ Навигация .nav-v2 не найдена');
      return;
    }

    const mobileToggle = nav.querySelector('.nav-v2__mobile-toggle');

    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Desktop hover dropdown
    setupDesktopDropdowns(nav);

    // Mobile dropdowns
    setupMobileDropdowns(nav);

    // Outside click handler
    setupOutsideClick(nav, mobileToggle);

    // Link click handler
    setupLinkClick(nav, mobileToggle);

    // Keyboard navigation
    setupKeyboardNav(nav, mobileToggle);

    // Scroll transparency
    setupScrollTransparency(nav);

    console.log('✅ Navigation V2 interactions initialized');
  };

  function setupDesktopDropdowns(nav) {
    const navItems = nav.querySelectorAll('.nav-v2__item');

    navItems.forEach(item => {
      const link = item.querySelector('.nav-v2__link');
      const dropdown = item.querySelector('.nav-v2__dropdown');

      if (!dropdown || !link) return;

      if (window.matchMedia('(hover: hover)').matches) {
        let hoverTimeout;

        const showDropdown = () => {
          clearTimeout(hoverTimeout);
          link.setAttribute('aria-expanded', 'true');
        };

        const hideDropdown = () => {
          hoverTimeout = setTimeout(() => {
            link.setAttribute('aria-expanded', 'false');
          }, 200);
        };

        item.addEventListener('mouseenter', showDropdown);
        item.addEventListener('mouseleave', hideDropdown);
        dropdown.addEventListener('mouseenter', () => clearTimeout(hoverTimeout));
        dropdown.addEventListener('mouseleave', hideDropdown);
      }
    });
  }

  function setupMobileDropdowns(nav) {
    const dropdownButtons = nav.querySelectorAll('.nav-v2__link[aria-haspopup]');

    dropdownButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const parent = button.closest('.nav-v2__item');
          const isOpen = parent.classList.toggle('open');
          button.setAttribute('aria-expanded', isOpen);

          document.querySelectorAll('.nav-v2__item.open').forEach(item => {
            if (item !== parent) {
              item.classList.remove('open');
              item.querySelector('.nav-v2__link').setAttribute('aria-expanded', 'false');
            }
          });
        }
      });
    });
  }

  function setupOutsideClick(nav, mobileToggle) {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-v2')) {
        nav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function setupLinkClick(nav, mobileToggle) {
    nav.addEventListener('click', (e) => {
      if (e.target.closest('.nav-v2__dropdown-item')) {
        nav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function setupKeyboardNav(nav, mobileToggle) {
    nav.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        nav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');

        document.querySelectorAll('.nav-v2__item.open').forEach(item => {
          item.classList.remove('open');
          item.querySelector('.nav-v2__link').setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  function setupScrollTransparency(nav) {
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

  console.log('✅ navigation-v2-interactions.js загружен');
})();
