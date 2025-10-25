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
     * Проверить валидность API ключа
     */
    isApiKeyValid() {
      return YOUTUBE_CONFIG.API_KEY &&
             YOUTUBE_CONFIG.API_KEY !== '' &&
             YOUTUBE_CONFIG.API_KEY !== 'YOUR_YOUTUBE_API_KEY_HERE';
    },

    /**
     * Получить ID канала по handle
     */
    async getChannelId(handle) {
      if (!this.isApiKeyValid()) {
        return null;
      }

      const cleanHandle = handle.replace('@', '');

      try {
        // Попытка получить ID через API поиска
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${cleanHandle}&key=${YOUTUBE_CONFIG.API_KEY}`;
        const response = await fetch(searchUrl);

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
          return data.items[0].snippet.channelId;
        }

        return null;
      } catch (error) {
        console.warn('Could not fetch channel ID from YouTube API:', error.message);
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

      // Проверяем API ключ ДО попытки загрузки
      if (!this.isApiKeyValid()) {
        console.log('YouTube API key not configured. Using fallback embedded playlist.');
        this.renderFallbackPlaylist(container);
        return;
      }

      // Показываем индикатор загрузки
      container.innerHTML = '<div class="youtube-loading">Загрузка видео с YouTube...</div>';

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
        console.warn('Failed to load YouTube videos via API, using fallback:', error.message);
        this.renderFallbackPlaylist(container);
      }
    },

    /**
     * Fallback метод - карточка с призывом посетить канал
     * Используется если API не настроен или не работает
     */
    renderFallbackPlaylist(container) {
      container.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
          <div style="text-align: center; max-width: 600px; padding: 3rem 2rem; background: linear-gradient(135deg, rgba(255, 0, 0, 0.1), rgba(255, 100, 100, 0.05)); border: 2px solid rgba(255, 0, 0, 0.3); border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
            <div style="font-size: 4rem; margin-bottom: 1.5rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">📺</div>
            <h3 style="font-size: 1.8rem; margin-bottom: 1rem; background: linear-gradient(135deg, #ff0000, #ff6b6b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              Смотрите нас на YouTube!
            </h3>
            <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.6;">
              Подписывайтесь на наш канал <strong>${YOUTUBE_CONFIG.CHANNEL_HANDLE}</strong><br>
              чтобы не пропустить новые видео о жизни фермы!
            </p>
            <a
              href="https://www.youtube.com/${YOUTUBE_CONFIG.CHANNEL_HANDLE}"
              target="_blank"
              rel="noopener noreferrer"
              style="display: inline-block; padding: 1rem 3rem; background: linear-gradient(135deg, #ff0000, #cc0000); color: white; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 1.1rem; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);"
              onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(255, 0, 0, 0.6)';"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(255, 0, 0, 0.4)';"
            >
              🎬 Перейти на канал
            </a>
          </div>
        </div>
      `;
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
