// ========== УПРОЩЁННАЯ НАВИГАЦИЯ ТОЛЬКО НА КЛИК ==========
// Версия: 20251001-click-only

(function () {
  'use strict';
  
  var WRAPPER = document.querySelector('.nav-wrapper');
  if (!WRAPPER) {
    console.warn('⚠️ Контейнер .nav-wrapper не найден');
    return;
  }

  // ========== УТИЛИТЫ ==========
  function openGroup(g) {
    // Закрываем все остальные группы
    closeAllGroups();
    
    g.classList.add('open');
    
    var trg = g.querySelector('.mega-trigger');
    if (trg) {
      trg.setAttribute('aria-expanded', 'true');
      trg.classList.add('active');
    }
    
    var pnl = g.querySelector('.mega-panel');
    if (pnl) {
      pnl.setAttribute('aria-hidden', 'false');
      pnl.classList.add('active');
    }
    
    console.log('✅ Группа открыта по клику:', g.querySelector('.mega-trigger')?.textContent?.trim());
  }

  function closeGroup(g) {
    g.classList.remove('open');
    
    var trg = g.querySelector('.mega-trigger');
    if (trg) {
      trg.setAttribute('aria-expanded', 'false');
      trg.classList.remove('active');
    }
    
    var pnl = g.querySelector('.mega-panel');
    if (pnl) {
      pnl.setAttribute('aria-hidden', 'true');
      pnl.classList.remove('active');
    }
    
    console.log('❌ Группа закрыта по клику:', g.querySelector('.mega-trigger')?.textContent?.trim());
  }

  function closeAllGroups() {
    var groups = WRAPPER.querySelectorAll('.mega-group.open');
    groups.forEach(function(g) {
      g.classList.remove('open');
      var trg = g.querySelector('.mega-trigger');
      if (trg) {
        trg.setAttribute('aria-expanded', 'false');
        trg.classList.remove('active');
      }
      var pnl = g.querySelector('.mega-panel');
      if (pnl) {
        pnl.setAttribute('aria-hidden', 'true');
        pnl.classList.remove('active');
      }
    });
  }

  // ========== ПЕРЕНОС ПАНЕЛЕЙ В ПРАВИЛЬНОЕ МЕСТО ==========
  function relocatePanels() {
    var navContainer = document.querySelector('.mega-nav-container');
    if (!navContainer) return;

    // Находим все панели в навигации и переносим в wrapper
    var panels = navContainer.querySelectorAll('.mega-panel');
    panels.forEach(function(panel) {
      // Создаем группу для панели
      var group = document.createElement('div');
      group.className = 'mega-group';
      
      // Находим соответствующий триггер
      var targetId = panel.id;
      var trigger = navContainer.querySelector('[data-target="#' + targetId + '"]');
      
      if (trigger) {
        // Создаем копию триггера в группе
        var triggerClone = trigger.cloneNode(true);
        triggerClone.removeAttribute('data-target');
        group.appendChild(triggerClone);
        
        // Добавляем панель в группу
        group.appendChild(panel);
        
        // Вставляем группу в wrapper
        WRAPPER.appendChild(group);
        
        // Удаляем старый триггер
        trigger.remove();
      }
    });
    
    console.log('✅ Панели перенесены в правильную структуру');
  }

  // ========== СОБЫТИЯ ТОЛЬКО НА КЛИК ==========
  
  // Клик по триггеру - открыть/закрыть
  WRAPPER.addEventListener('click', function (e) {
    var t = e.target.closest('.mega-trigger');
    if (!t) return;
    
    var g = t.closest('.mega-group');
    if (!g) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    if (g.classList.contains('open')) {
      closeGroup(g);
    } else {
      openGroup(g);
    }
  });

  // Клик вне навигации - закрыть все
  document.addEventListener('click', function (e) {
    if (!WRAPPER.contains(e.target)) {
      closeAllGroups();
    }
  });

  // Escape - закрыть все
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllGroups();
    }
  });

  // ========== ИНИЦИАЛИЗАЦИЯ ==========
  function init() {
    console.log('🚀 Инициализация клик-навигации...');
    
    // Ждем загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        relocatePanels();
      });
    } else {
      relocatePanels();
    }
    
    console.log('✅ Клик-навигация инициализирована');
  }

  // Запуск
  init();

})();
