/**
 * DEXRabbit Investor Cards Interactive Functions
 * Модальные окна и интерактив для карточек инвесторов
 * Version: 1.0.0
 */

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function () {
  initInvestorPhotoModals();
  initInvestorCardAnimations();
});

/**
 * Инициализация модальных окон для фото инвесторов
 */
function initInvestorPhotoModals() {
  // Создаем контейнер для модального окна если его еще нет
  if (!document.getElementById('investorPhotoModal')) {
    const modalHTML = `
            <div id="investorPhotoModal" class="investor-photo-modal">
                <span class="investor-photo-modal-close">&times;</span>
                <div class="investor-photo-modal-content">
                    <img id="investorModalImage" src="" alt="">
                    <div class="investor-modal-info">
                        <h3 class="investor-modal-name"></h3>
                        <a class="investor-modal-telegram" href="" target="_blank"></a>
                        <div class="investor-modal-stats"></div>
                    </div>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modal = document.getElementById('investorPhotoModal');
  const modalImg = document.getElementById('investorModalImage');
  const modalName = modal.querySelector('.investor-modal-name');
  const modalTelegram = modal.querySelector('.investor-modal-telegram');
  const modalStats = modal.querySelector('.investor-modal-stats');
  const closeBtn = modal.querySelector('.investor-photo-modal-close');

  // Добавляем обработчики для всех аватаров инвесторов
  const investorAvatars = document.querySelectorAll('.investor-avatar, .avatar');

  investorAvatars.forEach(avatar => {
    avatar.style.cursor = 'pointer';

    avatar.addEventListener('click', function (e) {
      e.preventDefault();

      // Получаем данные инвестора
      const card = this.closest('.investor-card, .card');
      if (!card) return;

      const img = this.querySelector('img');
      if (!img || !img.src) return;

      // Получаем информацию об инвесторе
      const name =
        card.querySelector('h4')?.textContent ||
        card.querySelector('.investor-name')?.textContent ||
        'Инвестор';

      const telegramLink = card.querySelector('a[href*="t.me"]');
      const telegram = telegramLink?.textContent || '';
      const telegramHref = telegramLink?.href || '#';

      const rabbits =
        card.querySelector('.investor-rabbits')?.textContent ||
        card.querySelector('p[style*="margin-top: 0.5rem"]')?.textContent ||
        '';

      const status =
        card.querySelector('.investor-status')?.textContent ||
        card.querySelector('p[style*="opacity: 0.7"]')?.textContent ||
        '';

      // Заполняем модальное окно
      modalImg.src = img.src;
      modalImg.alt = name;
      modalName.textContent = name;
      modalTelegram.textContent = telegram;
      modalTelegram.href = telegramHref;
      modalStats.innerHTML = `
                ${rabbits ? `<div>${rabbits}</div>` : ''}
                ${status ? `<div style="opacity: 0.8; margin-top: 0.5rem;">${status}</div>` : ''}
            `;

      // Показываем модальное окно
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Анимация появления
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 10);
    });
  });

  // Закрытие модального окна по клику на крестик
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Закрытие модального окна по клику на фон
  modal.addEventListener('click', function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

  // Закрытие модального окна по Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Функция закрытия модального окна
  function closeModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }, 300);
  }
}

/**
 * Инициализация анимаций для карточек инвесторов
 */
function initInvestorCardAnimations() {
  const cards = document.querySelectorAll('.investor-card');

  cards.forEach((card, index) => {
    // Деловая анимация появления с минимальной задержкой
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';

    setTimeout(() => {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 50);
  });
}

/**
 * Функция для создания карточки инвестора
 * @param {Object} investor - Объект с данными инвестора
 * @returns {String} HTML карточки инвестора
 */
function createInvestorCard(investor) {
  const {
    name,
    telegram,
    telegramUrl,
    photo,
    rabbits,
    status,
    isVip = false,
    isNew = false,
  } = investor;

  const vipBadge = isVip ? '<div class="investor-vip-badge">VIP</div>' : '';
  const newClass = isNew ? 'new' : '';

  return `
        <div class="investor-card ${newClass}">
            ${vipBadge}
            <div class="investor-avatar">
                <div class="investor-avatar-wrapper">
                    <img src="${photo}" alt="${name}" 
                         onerror="this.style.opacity='0';"
                         onload="this.style.opacity='1'; this.parentElement.style.background='none';">
                </div>
            </div>
            <h4 class="investor-name">${name}</h4>
            <a href="${telegramUrl}" target="_blank" class="investor-telegram">${telegram}</a>
            <div class="investor-stats">
                <p class="investor-rabbits">🐰 ${rabbits} кроликов</p>
                <p class="investor-status">${status}</p>
            </div>
            <div class="investor-actions">
                <a href="${telegramUrl}" target="_blank" class="investor-action-btn">
                    💬 Связаться
                </a>
                <a href="${telegramUrl}" target="_blank" class="investor-action-btn secondary">
                    ❓ Вопрос
                </a>
            </div>
        </div>
    `;
}

/**
 * Список инвесторов для использования на разных страницах
 */
const dexRabbitInvestors = [
  {
    name: 'Наталья',
    telegram: '@natder',
    telegramUrl: 'https://t.me/natder',
    photo: '/assets/img/avatars/natder.jpg',
    rabbits: 14,
    status: 'Инвестор первой волны',
    isVip: true,
  },
  {
    name: 'Влад',
    telegram: '@ded_vtapkax',
    telegramUrl: 'https://t.me/ded_vtapkax',
    photo: '/assets/img/avatars/vlad.png?v=20250929-vlad',
    rabbits: 14,
    status: 'Опытный инвестор',
    isVip: true,
  },
  {
    name: 'Александр',
    telegram: '@AlexGenom8515',
    telegramUrl: 'https://t.me/AlexGenom8515',
    photo: '/assets/img/avatars/alexander.jpg?v=20250929-final',
    rabbits: 14,
    status: 'Стратегический инвестор',
    isVip: true,
  },
];

/**
 * Функция для рендера всех инвесторов в контейнер
 * @param {String} containerId - ID контейнера для вставки карточек
 */
function renderInvestorsGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const investorsHTML = dexRabbitInvestors.map(investor => createInvestorCard(investor)).join('');

  container.innerHTML = `
        <div class="investors-grid">
            ${investorsHTML}
        </div>
    `;

  // Реинициализируем модальные окна для новых элементов
  initInvestorPhotoModals();
  initInvestorCardAnimations();
}

// Экспортируем функции для использования на других страницах
window.InvestorCards = {
  init: initInvestorPhotoModals,
  createCard: createInvestorCard,
  renderGrid: renderInvestorsGrid,
  investors: dexRabbitInvestors,
};
