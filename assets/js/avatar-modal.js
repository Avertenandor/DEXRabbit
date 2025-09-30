/**
 * Avatar Modal System - Hover Version
 * Показывает увеличенное изображение при наведении на аватарку инвестора
 */

(function () {
  'use strict';

  let hoverTimeout = null;
  let currentAvatar = null;
  let isModalOpen = false;

  // Создаём элементы модального окна
  function createModal() {
    // Проверяем, не создан ли уже модал
    if (document.querySelector('.avatar-modal')) {
      return;
    }

    // Создаём overlay
    const overlay = document.createElement('div');
    overlay.className = 'avatar-modal-overlay';
    document.body.appendChild(overlay);

    // Создаём модальное окно
    const modal = document.createElement('div');
    modal.className = 'avatar-modal';
    modal.innerHTML = '<img src="" alt="Увеличенное фото">';
    document.body.appendChild(modal);

    // Закрытие по клику на overlay
    overlay.addEventListener('click', closeModal);

    // Предотвращаем закрытие при наведении на модалку
    modal.addEventListener('mouseenter', function () {
      clearTimeout(hoverTimeout);
    });

    modal.addEventListener('mouseleave', function () {
      hoverTimeout = setTimeout(closeModal, 300);
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  // Открытие модального окна
  function openModal(imageSrc, imageAlt) {
    const modal = document.querySelector('.avatar-modal');
    const overlay = document.querySelector('.avatar-modal-overlay');
    const modalImage = modal.querySelector('img');

    if (!modal || !overlay) return;

    // Устанавливаем изображение
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt || 'Увеличенное фото';

    // Показываем модал с анимацией
    requestAnimationFrame(() => {
      overlay.classList.add('avatar-modal-overlay--active');
      modal.classList.add('avatar-modal--active');
    });

    isModalOpen = true;
    // Блокируем прокрутку body
    document.body.style.overflow = 'hidden';
  }

  // Закрытие модального окна
  function closeModal() {
    const modal = document.querySelector('.avatar-modal');
    const overlay = document.querySelector('.avatar-modal-overlay');

    if (!modal || !overlay) return;

    // Скрываем модал
    overlay.classList.remove('avatar-modal-overlay--active');
    modal.classList.remove('avatar-modal--active');

    isModalOpen = false;
    currentAvatar = null;
    // Возвращаем прокрутку body
    document.body.style.overflow = '';
  }

  // Инициализация
  function initAvatarModals() {
    // Создаём структуру модала
    createModal();

    // Находим все аватарки инвесторов
    const investorAvatars = document.querySelectorAll('.investor-avatar');

    investorAvatars.forEach(avatar => {
      const img = avatar.querySelector('img');

      if (!img) return;

      // Обработчик наведения мыши
      avatar.addEventListener('mouseenter', function (e) {
        clearTimeout(hoverTimeout);
        currentAvatar = avatar;

        // Небольшая задержка перед показом (200ms)
        hoverTimeout = setTimeout(() => {
          if (currentAvatar === avatar) {
            const imageSrc = img.src;
            const imageAlt = img.alt;
            openModal(imageSrc, imageAlt);
          }
        }, 200);
      });

      avatar.addEventListener('mouseleave', function (e) {
        clearTimeout(hoverTimeout);
        // Задержка перед закрытием (300ms)
        hoverTimeout = setTimeout(() => {
          if (currentAvatar === avatar && isModalOpen) {
            closeModal();
          }
        }, 300);
      });

      // Также поддерживаем клик для мобильных устройств
      avatar.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (window.innerWidth <= 768) {
          // Мобильные устройства
          const imageSrc = img.src;
          const imageAlt = img.alt;

          if (isModalOpen && currentAvatar === avatar) {
            closeModal();
          } else {
            openModal(imageSrc, imageAlt);
            currentAvatar = avatar;
          }
        }
      });

      // Добавляем title для подсказки
      if (window.innerWidth > 768) {
        avatar.title = 'Наведите для увеличения';
      } else {
        avatar.title = 'Нажмите для увеличения';
      }
    });

    // Также применяем для любых других карточек с классом avatar в карточках инвесторов
    const allAvatars = document.querySelectorAll('.avatar:not(.investor-avatar)');

    allAvatars.forEach(avatar => {
      // Проверяем, находится ли аватарка в карточке инвестора
      const isInInvestorCard = avatar.closest('.investor-card, .team-card, .partner-card');

      if (isInInvestorCard) {
        const img = avatar.querySelector('img');

        if (!img) return;

        // Обработчик наведения
        avatar.addEventListener('mouseenter', function (e) {
          clearTimeout(hoverTimeout);
          currentAvatar = avatar;

          hoverTimeout = setTimeout(() => {
            if (currentAvatar === avatar) {
              const imageSrc = img.src;
              const imageAlt = img.alt;
              openModal(imageSrc, imageAlt);
            }
          }, 200);
        });

        avatar.addEventListener('mouseleave', function (e) {
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            if (currentAvatar === avatar && isModalOpen) {
              closeModal();
            }
          }, 300);
        });

        // Поддержка клика для мобильных
        avatar.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();

          if (window.innerWidth <= 768) {
            const imageSrc = img.src;
            const imageAlt = img.alt;

            if (isModalOpen && currentAvatar === avatar) {
              closeModal();
            } else {
              openModal(imageSrc, imageAlt);
              currentAvatar = avatar;
            }
          }
        });

        if (window.innerWidth > 768) {
          avatar.title = 'Наведите для увеличения';
        } else {
          avatar.title = 'Нажмите для увеличения';
        }
      }
    });
  }

  // Запускаем после загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAvatarModals);
  } else {
    initAvatarModals();
  }

  // Обновляем подсказки при изменении размера окна
  window.addEventListener('resize', function () {
    const avatars = document.querySelectorAll('.investor-avatar, .avatar');
    avatars.forEach(avatar => {
      if (avatar.closest('.investor-card, .team-card, .partner-card')) {
        if (window.innerWidth > 768) {
          avatar.title = 'Наведите для увеличения';
        } else {
          avatar.title = 'Нажмите для увеличения';
        }
      }
    });
  });

  // Экспортируем функции для использования в других скриптах
  window.AvatarModal = {
    open: openModal,
    close: closeModal,
    init: initAvatarModals,
  };
})();
