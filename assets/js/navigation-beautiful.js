// ========== КРАСИВАЯ НАВИГАЦИЯ - JAVASCRIPT ========== //
// Версия: 2025-10-03-dr001-ultimate-fix

(function() {
  'use strict';

  // ========== КРИТИЧЕСКИЙ FIX DR-001: Полный сброс состояния ========== //
  function resetAllMenuState() {
    const nav = document.querySelector('.nav-beautiful');
    if (!nav) return;

    const dropdownWrappers = nav.querySelectorAll('.nav-beautiful__dropdown-wrapper');
    
    // Убрать все классы открытия
    dropdownWrappers.forEach(wrapper => {
      wrapper.classList.remove('is-open', 'open');
    });
    nav.classList.remove('open');
    
    // Принудительно отключить pointer-events на 500ms (увеличено!)
    nav.style.pointerEvents = 'none';
    setTimeout(() => {
      nav.style.pointerEvents = '';
    }, 500);
  }

  // НЕМЕДЛЕННЫЙ сброс ДО загрузки DOM
  if (document.readyState === 'loading') {
    resetAllMenuState();
  }

  // Сброс при загрузке И при возврате назад
  window.addEventListener('pageshow', resetAllMenuState);
  window.addEventListener('load', resetAllMenuState);
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      resetAllMenuState();
    }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav-beautiful');
    if (!nav) return;

    const mobileToggle = nav.querySelector('.nav-beautiful__mobile-toggle');
    const dropdownWrappers = nav.querySelectorAll('.nav-beautiful__dropdown-wrapper');

    // Немедленный сброс
    resetAllMenuState();

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
      const CLOSE_DELAY = 200; // 200ms задержка перед закрытием (было 300)

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

    // ========== DROPDOWN ДЛЯ МОБИЛЬНЫХ (CLICK) - ВСЕГДА АКТИВНО ========== //
    console.log(`🔍 DEBUG: Найдено dropdown wrappers: ${dropdownWrappers.length}`);
    
    dropdownWrappers.forEach((wrapper, index) => {
      const btn = wrapper.querySelector('.nav-beautiful__btn');
      if (btn) {
        console.log(`✅ DEBUG: Wrapper ${index + 1} - кнопка найдена`);
        
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          console.log(`🖱️ DEBUG: КЛИК на dropdown ${index + 1}`);
          
          // Переключить состояние dropdown
          const isOpen = wrapper.classList.contains('open');
          console.log(`📦 DEBUG: Состояние БЫЛО: ${isOpen ? 'открыто' : 'закрыто'}`);
          
          // Закрыть все другие dropdown
          dropdownWrappers.forEach(other => {
            if (other !== wrapper) {
              other.classList.remove('open');
            }
          });
          
          // Переключить текущий
          if (isOpen) {
            wrapper.classList.remove('open');
            console.log(`📦 DEBUG: Класс .open УДАЛЕН`);
          } else {
            wrapper.classList.add('open');
            console.log(`📦 DEBUG: Класс .open ДОБАВЛЕН`);
            
            // Проверка computed styles
            const dropdown = wrapper.querySelector('.nav-beautiful__dropdown');
            if (dropdown) {
              setTimeout(() => {
                const computed = window.getComputedStyle(dropdown);
                console.log(`📊 DEBUG: Computed styles:`, {
                  maxHeight: computed.maxHeight,
                  opacity: computed.opacity,
                  visibility: computed.visibility,
                  pointerEvents: computed.pointerEvents,
                  overflow: computed.overflow
                });
              }, 100);
            }
          }
        });
      } else {
        console.error(`❌ DEBUG: Wrapper ${index + 1} - кнопка НЕ НАЙДЕНА!`);
      }
    });

    // ========== ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ НА ССЫЛКУ (DR-001 FIX) ========== //
    const dropdownLinks = nav.querySelectorAll('.nav-beautiful__dropdown-item');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // НЕМЕДЛЕННО закрыть все dropdown
        dropdownWrappers.forEach(wrapper => {
          wrapper.classList.remove('is-open', 'open');
        });
        // Закрыть мобильное меню
        nav.classList.remove('open');
        
        // КРИТИЧНО: Отключить pointer-events перед переходом
        nav.style.pointerEvents = 'none';
        
        // Если это внутренняя ссылка - дать время на переход
        if (!link.target || link.target === '_self') {
          e.preventDefault();
          const href = link.getAttribute('href');
          setTimeout(() => {
            window.location.href = href;
          }, 50);
        }
      });
    });
    
    // ========== ДОПОЛНИТЕЛЬНЫЙ FIX: Отключить hover при уходе со страницы ========== //
    window.addEventListener('beforeunload', function() {
      nav.style.pointerEvents = 'none';
      resetAllMenuState();
    });

    console.log('✅ Beautiful Navigation DR-001 Ultimate Fix инициализирована');
  });
})();

