/**
 * DEXRabbit - Функции для копирования адресов смарт-контрактов
 */

/**
 * Копирует текст в буфер обмена
 * @param {HTMLElement} button - Кнопка, которую нажали
 */
async function copyToClipboard(button) {
  try {
    // Получаем адрес из data-атрибута
    const address = button.getAttribute('data-address');
    
    if (!address) {
      console.error('Адрес не найден');
      return;
    }

    // Пробуем современный API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(address);
    } else {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = address;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        textArea.remove();
      } catch (err) {
        console.error('Ошибка копирования (fallback):', err);
        textArea.remove();
        throw err;
      }
    }

    // Визуальная обратная связь
    const originalHTML = button.innerHTML;
    button.classList.add('copied');
    button.innerHTML = '✓ Скопировано!';
    button.disabled = true;

    // Возвращаем исходное состояние через 2 секунды
    setTimeout(() => {
      button.classList.remove('copied');
      button.innerHTML = originalHTML;
      button.disabled = false;
    }, 2000);

    // Вибрация на мобильных устройствах (если поддерживается)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    console.log('Адрес успешно скопирован:', address);
  } catch (error) {
    console.error('Ошибка при копировании:', error);
    
    // Показываем сообщение об ошибке
    button.classList.add('error');
    button.innerHTML = '❌ Ошибка';
    button.disabled = true;
    
    setTimeout(() => {
      button.classList.remove('error');
      button.innerHTML = originalHTML;
      button.disabled = false;
    }, 2000);
  }
}

/**
 * Копирует текст из элемента по клику на сам элемент
 * @param {string} elementId - ID элемента с текстом
 */
function copyElementText(elementId) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Элемент не найден:', elementId);
    return;
  }
  
  const text = element.textContent || element.innerText;
  copyToClipboard({ getAttribute: () => text });
}

/**
 * Инициализация подсказок для кнопок копирования
 */
function initCopyButtons() {
  document.querySelectorAll('.copy-address-btn').forEach(button => {
    button.setAttribute('title', 'Нажмите чтобы скопировать адрес');
    button.setAttribute('aria-label', 'Копировать адрес смарт-контракта');
  });
}

// Инициализация при загрузке страницы
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCopyButtons);
} else {
  initCopyButtons();
}
