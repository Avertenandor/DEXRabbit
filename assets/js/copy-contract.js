/**
 * DEXRabbit - Копирование адреса смарт-контракта
 * Версия 1.0
 */

// Адреса смарт-контрактов
const CONTRACTS = {
  plex: '0xdf179b6cadbc61ffd86a3d2e55f6d6e083ade6c1',
  pool: '0x41d9650faf3341cbf8947fd8063a1fc88dbf1889'
};

/**
 * Копирует адрес контракта в буфер обмена
 * @param {string} contractType - тип контракта ('plex' или 'pool')
 * @param {HTMLElement} button - кнопка, которую нажали
 */
async function copyContractAddress(contractType, button) {
  const address = CONTRACTS[contractType];
  
  if (!address) {
    console.error('Неизвестный тип контракта:', contractType);
    return;
  }

  try {
    // Копируем в буфер обмена
    await navigator.clipboard.writeText(address);
    
    // Показываем уведомление об успешном копировании
    showCopyNotification(button, true);
    
    // Анимация кнопки
    button.classList.add('copied');
    setTimeout(() => {
      button.classList.remove('copied');
    }, 2000);
    
  } catch (err) {
    console.error('Ошибка копирования:', err);
    
    // Fallback для старых браузеров
    const tempInput = document.createElement('input');
    tempInput.value = address;
    document.body.appendChild(tempInput);
    tempInput.select();
    
    try {
      document.execCommand('copy');
      showCopyNotification(button, true);
      
      button.classList.add('copied');
      setTimeout(() => {
        button.classList.remove('copied');
      }, 2000);
    } catch (fallbackErr) {
      console.error('Ошибка fallback копирования:', fallbackErr);
      showCopyNotification(button, false);
    }
    
    document.body.removeChild(tempInput);
  }
}

/**
 * Показывает уведомление о результате копирования
 * @param {HTMLElement} button - кнопка копирования
 * @param {boolean} success - успешно ли скопировано
 */
function showCopyNotification(button, success) {
  // Создаем уведомление
  const notification = document.createElement('div');
  notification.className = `copy-notification ${success ? 'success' : 'error'}`;
  notification.textContent = success ? '✓ Скопировано!' : '✗ Ошибка копирования';
  
  // Позиционируем относительно кнопки
  const rect = button.getBoundingClientRect();
  notification.style.position = 'fixed';
  notification.style.top = `${rect.top - 40}px`;
  notification.style.left = `${rect.left + rect.width / 2}px`;
  notification.style.transform = 'translateX(-50%)';
  
  document.body.appendChild(notification);
  
  // Анимация появления
  requestAnimationFrame(() => {
    notification.classList.add('show');
  });
  
  // Удаляем через 2 секунды
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 2000);
}

/**
 * Инициализация всех кнопок копирования
 */
function initCopyButtons() {
  // Находим все кнопки копирования
  const copyButtons = document.querySelectorAll('[data-copy-contract]');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const contractType = button.getAttribute('data-copy-contract');
      copyContractAddress(contractType, button);
    });
  });
  
  console.log(`✓ Инициализировано ${copyButtons.length} кнопок копирования адресов контрактов`);
}

// Инициализация при загрузке DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCopyButtons);
} else {
  initCopyButtons();
}

// Экспортируем для использования в других скриптах
window.copyContractAddress = copyContractAddress;
window.CONTRACTS = CONTRACTS;

console.log('✓ copy-contract.js v1.0 загружен');
