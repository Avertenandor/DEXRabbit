// ========== КРАСИВАЯ НАВИГАЦИЯ - JAVASCRIPT ========== //
// Версия: 2025-10-01

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

    // ========== DROPDOWN ДЛЯ МОБИЛЬНЫХ ========== //
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

    console.log('✅ Beautiful Navigation инициализирована');
  });
})();

