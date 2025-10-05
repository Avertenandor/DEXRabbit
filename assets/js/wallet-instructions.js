/**
 * 📋 Wallet Instructions Copy Functionality
 * Функция копирования адреса контракта для виджетов кошельков
 */

/**
 * Копирование адреса контракта
 * @param {HTMLElement} button - Кнопка копирования
 */
function copyContractAddress(button) {
  const contractAddress = '0xdf179b6cadbc61ffd86a3d2e55f6d6e083ade6c1';
  
  // Копируем в буфер обмена
  navigator.clipboard.writeText(contractAddress).then(() => {
    // Успешное копирование
    console.log('✅ Contract address copied:', contractAddress);
    
    // Визуальный feedback
    const originalHTML = button.innerHTML;
    button.classList.add('copied');
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
      </svg>
    `;
    button.style.color = '#4ade80';
    
    // Показываем уведомление (если есть функция)
    if (typeof showNotification === 'function') {
      showNotification('✅ Адрес скопирован!', 'success');
    }
    
    // Возвращаем исходный вид через 2 секунды
    setTimeout(() => {
      button.classList.remove('copied');
      button.innerHTML = originalHTML;
      button.style.color = '';
    }, 2000);
    
  }).catch(err => {
    // Ошибка копирования
    console.error('❌ Failed to copy contract address:', err);
    
    // Fallback: показываем текст для ручного копирования
    alert(`Скопируйте адрес вручную:\n\n${contractAddress}`);
  });
}

/**
 * Показываем уведомление (опциональная функция)
 * @param {string} message - Текст уведомления
 * @param {string} type - Тип: 'success', 'error', 'info'
 */
function showNotification(message, type = 'info') {
  // Создаём уведомление
  const notification = document.createElement('div');
  notification.className = `wallet-notification wallet-notification-${type}`;
  notification.textContent = message;
  
  // Стили уведомления
  notification.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 16px 24px;
    background: ${type === 'success' ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.95), rgba(34, 197, 94, 0.95))' : 'rgba(124, 140, 255, 0.95)'};
    color: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    font-size: 15px;
    font-weight: 600;
    z-index: 10000;
    animation: slideInUp 0.3s ease, fadeOut 0.3s ease 2.7s;
    pointer-events: none;
  `;
  
  // Добавляем в body
  document.body.appendChild(notification);
  
  // Удаляем через 3 секунды
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Добавляем CSS для анимации уведомлений
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  /* Mobile адаптация уведомлений */
  @media (max-width: 767px) {
    .wallet-notification {
      right: 16px !important;
      bottom: 16px !important;
      left: 16px !important;
      font-size: 14px !important;
      padding: 14px 20px !important;
    }
  }
`;
document.head.appendChild(style);

// Экспорт для использования в модулях (если нужно)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { copyContractAddress, showNotification };
}

// === ИСПРАВЛЕНИЕ PASSIVE EVENT LISTENERS WARNINGS ===
// Добавляем touch-action для предотвращения warnings
document.addEventListener('DOMContentLoaded', () => {
  // Находим все интерактивные элементы в виджетах
  const interactiveElements = document.querySelectorAll(
    '.copy-btn-mini, .wallet-card, .step-item'
  );
  
  interactiveElements.forEach(element => {
    // Добавляем CSS свойство для оптимизации touch events
    element.style.touchAction = 'manipulation';
  });
  
  console.log('✅ Wallet instructions: Touch optimization applied');
});

// Предотвращаем passive warnings для touch events
if ('ontouchstart' in window) {
  // Для мобильных устройств оптимизируем обработку touch
  document.querySelectorAll('.wallet-card').forEach(card => {
    card.addEventListener('touchstart', function() {
      // Пустой обработчик для оптимизации
    }, { passive: true });
  });
}

console.log('✅ Wallet instructions script loaded (v2.0 - optimized)');
