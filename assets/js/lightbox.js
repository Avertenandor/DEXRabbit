/**
 * Lightbox для галереи кроликов
 * DEXRabbit Project
 */

// Создаем элементы lightbox при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Создаем контейнер lightbox если его нет
  if (!document.querySelector('.lightbox')) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="lightbox-close" aria-label="Закрыть">×</span>
      <img src="" alt="" class="lightbox-image">
    `;
    document.body.appendChild(lightbox);

    // Закрытие по клику на фон
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        closeLightbox();
      }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    });
  }
});

/**
 * Открыть lightbox с изображением
 * @param {HTMLElement} element - элемент галереи с изображением
 */
function openLightbox(element) {
  const img = element.querySelector('img');
  if (!img) return;

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-image');
  
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
}

/**
 * Закрыть lightbox
 */
function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Восстанавливаем прокрутку
}

// Экспортируем функцию для глобального использования
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
