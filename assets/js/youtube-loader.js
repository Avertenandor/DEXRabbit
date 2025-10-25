/**
 * YouTube Video Loader
 * Загружает последние видео с канала YouTube и отображает их в виде карточек
 *
 * Настройте API ключ в файле youtube-config.js
 */

(function() {
  'use strict';

  // Используем конфигурацию из youtube-config.js или fallback значения
  const YOUTUBE_CONFIG = window.YOUTUBE_API_CONFIG || {
    API_KEY: '',
    CHANNEL_ID: '',
    CHANNEL_HANDLE: '@DexRabbitFarm',
    MAX_RESULTS: 6,
    CACHE_DURATION: 5 * 60 * 1000,
  };

  // Вспомогательные функции
  const YouTubeLoader = {
    cache: null,
    cacheTime: null,

    /**
     * Получить ID канала по handle
     */
    async getChannelId(handle) {
      const cleanHandle = handle.replace('@', '');
      const url = `https://www.youtube.com/@${cleanHandle}`;

      try {
        // Попытка получить ID через API поиска
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${cleanHandle}&key=${YOUTUBE_CONFIG.API_KEY}`;
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          return data.items[0].snippet.channelId;
        }

        throw new Error('Channel not found');
      } catch (error) {
        console.error('Error getting channel ID:', error);
        return null;
      }
    },

    /**
     * Получить список видео с канала
     */
    async fetchVideos(channelId) {
      // Проверка кэша
      if (this.cache && this.cacheTime && (Date.now() - this.cacheTime < YOUTUBE_CONFIG.CACHE_DURATION)) {
        console.log('Using cached YouTube data');
        return this.cache;
      }

      try {
        // Получаем плейлист загрузок канала (uploads)
        const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_CONFIG.API_KEY}`;
        const channelResponse = await fetch(channelUrl);
        const channelData = await channelResponse.json();

        if (!channelData.items || channelData.items.length === 0) {
          throw new Error('Channel not found');
        }

        const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

        // Получаем видео из плейлиста
        const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${YOUTUBE_CONFIG.MAX_RESULTS}&key=${YOUTUBE_CONFIG.API_KEY}`;
        const playlistResponse = await fetch(playlistUrl);
        const playlistData = await playlistResponse.json();

        if (!playlistData.items) {
          throw new Error('No videos found');
        }

        // Получаем дополнительную информацию о видео (длительность, просмотры)
        const videoIds = playlistData.items.map(item => item.snippet.resourceId.videoId).join(',');
        const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_CONFIG.API_KEY}`;
        const videosResponse = await fetch(videosUrl);
        const videosData = await videosResponse.json();

        // Объединяем данные
        const videos = playlistData.items.map((item, index) => {
          const videoDetails = videosData.items[index];
          return {
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
            duration: videoDetails.contentDetails.duration,
            viewCount: videoDetails.statistics.viewCount,
          };
        });

        // Сохраняем в кэш
        this.cache = videos;
        this.cacheTime = Date.now();

        return videos;
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        throw error;
      }
    },

    /**
     * Конвертировать ISO 8601 длительность в читаемый формат
     */
    formatDuration(isoDuration) {
      const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (!match) return '0:00';

      const hours = parseInt(match[1] || 0);
      const minutes = parseInt(match[2] || 0);
      const seconds = parseInt(match[3] || 0);

      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },

    /**
     * Форматировать количество просмотров
     */
    formatViewCount(count) {
      const num = parseInt(count);
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    },

    /**
     * Форматировать дату публикации
     */
    formatPublishDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return 'Сегодня';
      } else if (diffDays === 1) {
        return 'Вчера';
      } else if (diffDays < 7) {
        return `${diffDays} дн. назад`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} нед. назад`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} мес. назад`;
      } else {
        const years = Math.floor(diffDays / 365);
        return `${years} г. назад`;
      }
    },

    /**
     * Создать HTML карточку видео
     */
    createVideoCard(video) {
      const card = document.createElement('div');
      card.className = 'youtube-video-card';
      card.onclick = () => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');

      card.innerHTML = `
        <div class="youtube-thumbnail">
          <img src="${video.thumbnail}" alt="${this.escapeHtml(video.title)}" loading="lazy" />
          <div class="youtube-play-overlay"></div>
          <div class="youtube-duration">${this.formatDuration(video.duration)}</div>
        </div>
        <div class="youtube-video-info">
          <h3 class="youtube-video-title">${this.escapeHtml(video.title)}</h3>
          <div class="youtube-video-meta">
            <span class="youtube-video-views">${this.formatViewCount(video.viewCount)}</span>
            <span class="youtube-video-date">${this.formatPublishDate(video.publishedAt)}</span>
          </div>
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
     * Отобразить видео на странице
     */
    async renderVideos() {
      const container = document.getElementById('youtube-videos-container');
      if (!container) {
        console.error('YouTube videos container not found');
        return;
      }

      // Показываем индикатор загрузки
      container.innerHTML = '<div class="youtube-loading">Загрузка видео с YouTube</div>';

      try {
        // Получаем ID канала если его нет
        let channelId = YOUTUBE_CONFIG.CHANNEL_ID;
        if (!channelId || channelId === 'UCvQYT0jXxF5xZ8tY6mN4wR2') {
          channelId = await this.getChannelId(YOUTUBE_CONFIG.CHANNEL_HANDLE);
          if (!channelId) {
            throw new Error('Could not determine channel ID');
          }
          YOUTUBE_CONFIG.CHANNEL_ID = channelId;
        }

        // Получаем видео
        const videos = await this.fetchVideos(channelId);

        // Очищаем контейнер
        container.innerHTML = '';

        // Создаем сетку видео
        const grid = document.createElement('div');
        grid.className = 'youtube-grid';

        // Добавляем карточки видео
        videos.forEach(video => {
          const card = this.createVideoCard(video);
          grid.appendChild(card);
        });

        container.appendChild(grid);

        console.log(`✅ Loaded ${videos.length} YouTube videos`);
      } catch (error) {
        console.error('Error rendering YouTube videos:', error);

        // Проверяем, возможно проблема с API ключом
        if (!YOUTUBE_CONFIG.API_KEY || YOUTUBE_CONFIG.API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
          console.warn('YouTube API key not configured. Using fallback embedded playlist.');
          this.renderFallbackPlaylist(container);
        } else {
          // Показываем ошибку
          container.innerHTML = `
            <div class="youtube-error">
              <p>⚠️ Не удалось загрузить видео с YouTube</p>
              <p style="font-size: 0.9rem; margin-top: 0.5rem;">
                Проверьте настройки API или попробуйте позже
              </p>
            </div>
          `;
        }
      }
    },

    /**
     * Fallback метод - встроенный плейлист YouTube
     * Используется если API не настроен или не работает
     */
    renderFallbackPlaylist(container) {
      container.innerHTML = `
        <div class="youtube-fallback-message" style="text-align: center; margin-bottom: 2rem; padding: 1rem; background: rgba(255, 200, 0, 0.1); border: 2px solid rgba(255, 200, 0, 0.3); border-radius: 12px;">
          <p style="margin: 0; color: rgba(255, 200, 0, 0.9);">
            ℹ️ YouTube API не настроен. Показываем встроенный плейлист.
          </p>
          <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: rgba(255, 255, 255, 0.6);">
            Для автоматической загрузки видео настройте API ключ в файле youtube-config.js
          </p>
        </div>
        <div style="max-width: 100%; margin: 0 auto;">
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
            <iframe
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
              src="https://www.youtube.com/embed?listType=user_uploads&list=${YOUTUBE_CONFIG.CHANNEL_HANDLE.replace('@', '')}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      `;
      console.log('Using fallback embedded YouTube playlist');
    },

    /**
     * Инициализация
     */
    init() {
      // Ждем загрузки DOM
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.renderVideos());
      } else {
        this.renderVideos();
      }
    }
  };

  // Запускаем загрузчик
  YouTubeLoader.init();

  // Экспортируем для использования в консоли/отладки
  window.YouTubeLoader = YouTubeLoader;
})();
