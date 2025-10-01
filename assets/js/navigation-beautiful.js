// ========== КРАСИВАЯ НАВИГАЦИЯ - JAVASCRIPT ========== //
// Версия: 2025-10-01-stable

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav-beautiful');
    if (!nav) return;

    const mobileToggle = nav.querySelector('.nav-beautiful__mobile-toggle');
    const dropdownWrappers = nav.querySelectorAll('.nav-beautiful__dropdown-wrapper');

    // ========== МОБИЛЬНОЕ МЕНЮ ========== //
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
      });

      // Закрыть при клике вне меню
      document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
          nav.classList.remove('open');
        }
      });
    }

    // ========== DROPDOWN С ЗАДЕРЖКОЙ (DESKTOP) ========== //
    if (window.innerWidth > 768) {
      let closeTimer = null;
      const CLOSE_DELAY = 300; // 300ms задержка перед закрытием

      dropdownWrappers.forEach(wrapper => {
        const dropdown = wrapper.querySelector('.nav-beautiful__dropdown');
        if (!dropdown) return;

        // При входе курсора на wrapper - открыть
        wrapper.addEventListener('mouseenter', function() {
          clearTimeout(closeTimer);
          wrapper.classList.add('is-open');
        });

        // При выходе курсора - закрыть с задержкой
        wrapper.addEventListener('mouseleave', function() {
          closeTimer = setTimeout(function() {
            wrapper.classList.remove('is-open');
          }, CLOSE_DELAY);
        });

        // При входе на dropdown - отменить закрытие
        dropdown.addEventListener('mouseenter', function() {
          clearTimeout(closeTimer);
        });

        // При выходе из dropdown - закрыть с задержкой
        dropdown.addEventListener('mouseleave', function() {
          closeTimer = setTimeout(function() {
            wrapper.classList.remove('is-open');
          }, CLOSE_DELAY);
        });
      });
    }

    // ========== DROPDOWN ДЛЯ МОБИЛЬНЫХ (CLICK) ========== //
    if (window.innerWidth <= 768) {
      dropdownWrappers.forEach(wrapper => {
        const btn = wrapper.querySelector('.nav-beautiful__btn');
        if (btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            wrapper.classList.toggle('open');
            
            // Закрыть другие
            dropdownWrappers.forEach(other => {
              if (other !== wrapper) {
                other.classList.remove('open');
              }
            });
          });
        }
      });
    }

    console.log('✅ Beautiful Navigation с задержкой 300ms инициализирована');
  });
})();

