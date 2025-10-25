/**
 * DEXRabbit - Интерактивность мега-меню
 * Версия 3.0
 */

window.DEXRabbitNavInteractions = {
  /**
   * Инициализирует интерактивность мега-меню
   */
  init() {
    const WRAPPER = document.querySelector('.nav-wrapper');
    if (!WRAPPER) {
      console.warn('⚠️ .nav-wrapper не найден');
      return;
    }

    // 1) ВЫРЕЗАЕМ ПАНЕЛИ ИЗ НАВИГАЦИИ (если там остались) И ПЕРЕНОСИМ В WRAPPER
    this.movePanelsToWrapper(WRAPPER);

    // 2) УЛУЧШЕННАЯ HOVER-ФУНКЦИОНАЛЬНОСТЬ
    this.setupHoverInteractions(WRAPPER);

    // 3) Клик вне — закрыть все
    this.setupOutsideClick();

    // 4) Закрытие при нажатии Escape
    this.setupEscapeKey();

    console.log('✅ Улучшенная интерактивность мега-меню настроена');
  },

  /**
   * Перемещает панели из навигации в wrapper
   */
  movePanelsToWrapper(wrapper) {
    const navContainer = document.querySelector('.mega-nav-container');
    if (navContainer) {
      navContainer.querySelectorAll('.mega-panel').forEach(panel => {
        wrapper.appendChild(panel);
        console.log('✅ Панель перемещена из навигации в .nav-wrapper');
      });
    }
  },

  /**
   * Настраивает hover-взаимодействие
   */
  setupHoverInteractions(wrapper) {
    const triggers = wrapper.querySelectorAll('.mega-trigger');
    let hoverTimeout;
    let isHovering = false;

    const closeAllPanels = () => {
      wrapper.querySelectorAll('.mega-panel').forEach(panel => {
        panel.setAttribute('aria-hidden', 'true');
        panel.style.display = 'none';
        panel.classList.remove('active');
      });
      triggers.forEach(trigger => {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.classList.remove('active');
      });
    };

    const openPanel = (trigger, panel) => {
      clearTimeout(hoverTimeout);
      closeAllPanels();

      // Добавляем will-change перед анимацией
      panel.classList.add('animating');

      // Открыть нужную панель
      panel.style.display = 'block';
      panel.setAttribute('aria-hidden', 'false');
      panel.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('active');

      // Убираем will-change после анимации
      setTimeout(() => {
        panel.classList.remove('animating');
      }, 300);

      console.log('✅ Панель открыта:', trigger.textContent.trim());
    };

    const closePanel = (trigger, panel) => {
      if (!isHovering) {
        hoverTimeout = setTimeout(() => {
          panel.setAttribute('aria-hidden', 'true');
          panel.style.display = 'none';
          panel.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          trigger.classList.remove('active');
        }, 300);
      }
    };

    // Настройка для каждого триггера
    triggers.forEach(trigger => {
      const targetId = trigger.getAttribute('data-target');
      const panel = targetId ? document.querySelector(targetId) : null;

      if (!panel) return;

      // Desktop hover - улучшенная логика
      if (window.matchMedia('(hover: hover)').matches) {
        trigger.addEventListener('mouseenter', () => {
          isHovering = true;
          clearTimeout(hoverTimeout);
          openPanel(trigger, panel);
        });

        trigger.addEventListener('mouseleave', () => {
          isHovering = false;
          closePanel(trigger, panel);
        });

        // Hover на панель - не закрывать
        panel.addEventListener('mouseenter', () => {
          isHovering = true;
          clearTimeout(hoverTimeout);
        });

        panel.addEventListener('mouseleave', () => {
          isHovering = false;
          closePanel(trigger, panel);
        });
      }

      // Click для всех устройств
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          closeAllPanels();
        } else {
          openPanel(trigger, panel);
        }
      });

      // Keyboard navigation
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isOpen = trigger.getAttribute('aria-expanded') === 'true';
          if (isOpen) {
            closeAllPanels();
          } else {
            openPanel(trigger, panel);
            // Фокус на первом элементе панели
            const firstItem = panel.querySelector('.mega-panel-item');
            if (firstItem) firstItem.focus();
          }
        } else if (e.key === 'Escape') {
          closeAllPanels();
          trigger.focus();
        }
      });
    });

    // Сохраняем функцию для использования в других методах
    this._closeAllPanels = closeAllPanels;
  },

  /**
   * Настраивает закрытие при клике вне навигации
   */
  setupOutsideClick() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.mega-trigger') || e.target.closest('.mega-panel')) return;
      if (this._closeAllPanels) this._closeAllPanels();
    });
  },

  /**
   * Настраивает закрытие при нажатии Escape
   */
  setupEscapeKey() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this._closeAllPanels) this._closeAllPanels();
      }
    });
  },

  /**
   * Устанавливает финальный фикс для панелей
   */
  setupMutationObserver() {
    const WRAPPER = document.querySelector('.nav-wrapper');
    const NAVBOX = document.querySelector('.mega-nav-container');
    if (!WRAPPER || !NAVBOX) return;

    // один раз вынести всё, что умудрилось оказаться внутри навигации
    NAVBOX.querySelectorAll('.mega-panel').forEach(function (p) { WRAPPER.appendChild(p); });

    // на будущее: если кто-то опять подсунет панели в NAVBOX — тут же вытянуть назад
    new MutationObserver(function () {
      NAVBOX.querySelectorAll('.mega-panel').forEach(function (p) { WRAPPER.appendChild(p); });
    }).observe(NAVBOX, {childList: true, subtree: true});
  }
};

console.log('✅ navigation-data-interactions.js v3.0 загружен');
