/**
 * YouTube Simple Loader
 * Загружает видео из JSON файла и генерирует красивые карточки
 *
 * Преимущества:
 * - Не нужен YouTube API ключ
 * - Превью берутся напрямую от YouTube
 * - Просто обновлять - меняй только JSON файл
 */

(function() {
  'use strict';

  const YouTubeSimpleLoader = {
    /**
     * Создать HTML карточку видео
     */
    createVideoCard(video) {
      const card = document.createElement('a');
      card.href = `https://www.youtube.com/watch?v=${video.id}`;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.className = 'youtube-video-card';

      // Превью от YouTube (автоматически)
      const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

      card.innerHTML = `
        <div class="youtube-thumbnail" style="background-image: url('${thumbnailUrl}');">
          <div class="youtube-play-overlay"></div>
        </div>
        <div class="youtube-video-info">
          <h3 class="youtube-video-title">${this.escapeHtml(video.title)}</h3>
        </div>
      `;

      return card;
    },

    /**
     * Экранировать HTML
     */
    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },

    /**
     * Загрузить и отобразить видео
     */
    async loadVideos() {
      const container = document.getElementById('youtube-videos-container');
      if (!container) {
        console.error('YouTube videos container not found');
        return;
      }

      try {
        // Загружаем JSON файл
        const response = await fetch('/assets/js/youtube-videos.json');
        if (!response.ok) {
          throw new Error(`Failed to load videos: ${response.status}`);
        }

        const data = await response.json();

        if (!data.videos || data.videos.length === 0) {
          throw new Error('No videos found in JSON');
        }

        // Очищаем контейнер
        container.innerHTML = '';

        // Создаем сетку
        const grid = document.createElement('div');
        grid.className = 'youtube-grid';

        // Генерируем карточки
        data.videos.forEach(video => {
          const card = this.createVideoCard(video);
          grid.appendChild(card);
        });

        container.appendChild(grid);

        console.log(`✅ Loaded ${data.videos.length} YouTube videos from JSON`);

      } catch (error) {
        console.error('Error loading YouTube videos:', error);
        container.innerHTML = `
          <div style="text-align: center; padding: 3rem; color: rgba(255, 255, 255, 0.7);">
            <p>⚠️ Не удалось загрузить видео</p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">
              Проверьте файл youtube-videos.json
            </p>
          </div>
        `;
      }
    },

    /**
     * Инициализация
     */
    init() {
      // Ждем загрузки DOM
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.loadVideos());
      } else {
        this.loadVideos();
      }
    }
  };

  // Запускаем загрузчик
  YouTubeSimpleLoader.init();

  // Экспортируем для отладки
  window.YouTubeSimpleLoader = YouTubeSimpleLoader;
})();
