/**
 * YouTube RSS Loader
 * Автоматически загружает видео с канала через RSS ленту
 *
 * Преимущества:
 * - Не нужен API ключ
 * - Автоматически обновляется при выходе новых видео
 * - Нет лимитов и квот
 * - Превью от YouTube
 */

(function() {
  'use strict';

  const YouTubeRSSLoader = {
    // Конфигурация
    config: {
      channelHandle: '@DexRabbitFarm',
      maxResults: 6,
      cacheDuration: 5 * 60 * 1000, // 5 минут
    },

    cache: null,
    cacheTime: null,

    /**
     * Получить Channel ID из handle через перенаправление
     */
    async getChannelIdFromHandle(handle) {
      try {
        // YouTube перенаправляет @handle на channel/{CHANNEL_ID}
        const cleanHandle = handle.replace('@', '');

        // Используем RSS feed с handle - YouTube сам разберется
        // Формат: https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
        // Но мы можем попробовать через playlist_id или использовать workaround

        // Альтернативный подход: используем публичный API поиска каналов
        const searchUrl = `https://www.youtube.com/results?search_query=${cleanHandle}`;

        // Так как мы не можем делать прямые запросы из-за CORS,
        // используем известный workaround - RSS feed ищет по имени канала

        // Для @DexRabbitFarm попробуем несколько вариантов
        console.log(`Trying to fetch videos for channel: ${handle}`);

        return null; // Вернемся к этому позже, сначала попробуем прямой RSS
      } catch (error) {
        console.warn('Could not determine channel ID:', error);
        return null;
      }
    },

    /**
     * Загрузить RSS ленту канала
     */
    async fetchRSSFeed(channelId) {
      // Проверяем кэш
      if (this.cache && this.cacheTime && (Date.now() - this.cacheTime < this.config.cacheDuration)) {
        console.log('Using cached YouTube RSS data');
        return this.cache;
      }

      try {
        // RSS feed URL
        // Формат: https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

        // Пробуем загрузить через CORS proxy или напрямую
        let response;

        try {
          // Попытка #1: Прямой запрос (может не работать из-за CORS)
          response = await fetch(rssUrl);

          if (!response.ok) {
            throw new Error(`RSS fetch failed: ${response.status}`);
          }
        } catch (corsError) {
          // Попытка #2: Используем CORS proxy
          console.log('Direct fetch failed, trying CORS proxy...');
          const corsProxy = 'https://api.allorigins.win/raw?url=';
          response = await fetch(corsProxy + encodeURIComponent(rssUrl));

          if (!response.ok) {
            throw new Error(`CORS proxy fetch failed: ${response.status}`);
          }
        }

        const xmlText = await response.text();
        const videos = this.parseRSSFeed(xmlText);

        // Сохраняем в кэш
        this.cache = videos;
        this.cacheTime = Date.now();

        return videos;
      } catch (error) {
        console.error('Error fetching YouTube RSS feed:', error);
        throw error;
      }
    },

    /**
     * Парсить XML RSS ленту
     */
    parseRSSFeed(xmlText) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      // Проверяем на ошибки парсинга
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        throw new Error('XML parsing error');
      }

      // Получаем все записи (entry) из RSS
      const entries = xmlDoc.querySelectorAll('entry');
      const videos = [];

      entries.forEach((entry, index) => {
        if (index >= this.config.maxResults) return;

        // Извлекаем данные
        const videoId = entry.querySelector('videoId')?.textContent;
        const title = entry.querySelector('title')?.textContent;
        const published = entry.querySelector('published')?.textContent;
        const thumbnail = entry.querySelector('thumbnail')?.getAttribute('url');

        // Альтернативный способ получить video ID из link
        if (!videoId) {
          const link = entry.querySelector('link')?.getAttribute('href');
          const match = link?.match(/watch\?v=([^&]+)/);
          if (match) {
            videoId = match[1];
          }
        }

        if (videoId && title) {
          videos.push({
            id: videoId,
            title: title,
            publishedAt: published,
            // YouTube RSS использует формат превью: https://i.ytimg.com/vi/{VIDEO_ID}/hqdefault.jpg
            // Мы используем maxresdefault для лучшего качества
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          });
        }
      });

      return videos;
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
      const card = document.createElement('a');
      card.href = `https://www.youtube.com/watch?v=${video.id}`;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.className = 'youtube-video-card';

      card.innerHTML = `
        <div class="youtube-thumbnail" style="background-image: url('${video.thumbnail}');">
          <div class="youtube-play-overlay"></div>
        </div>
        <div class="youtube-video-info">
          <h3 class="youtube-video-title">${this.escapeHtml(video.title)}</h3>
          <div class="youtube-video-meta">
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
     * Загрузить видео из JSON файла (fallback метод)
     */
    async loadVideosFromJSON() {
      try {
        const response = await fetch('/assets/js/youtube-videos.json');
        if (!response.ok) {
          throw new Error(`Failed to load JSON: ${response.status}`);
        }

        const data = await response.json();

        if (!data.videos || data.videos.length === 0) {
          throw new Error('No videos in JSON');
        }

        // Конвертируем формат JSON в формат видео
        return data.videos.map(v => ({
          id: v.id,
          title: v.title,
          publishedAt: new Date().toISOString(), // Для JSON у нас нет даты
          thumbnail: `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`,
        }));
      } catch (error) {
        console.error('Error loading from JSON:', error);
        return null;
      }
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

      // Показываем индикатор загрузки
      container.innerHTML = '<div class="youtube-loading">Загрузка видео с YouTube...</div>';

      let videos = null;

      // Попытка #1: Загрузка через RSS (автоматически)
      // ВАЖНО: Найдите ваш Channel ID и вставьте сюда!
      // Как найти: откройте https://www.youtube.com/@ВашКанал
      //            нажмите F12 → Console → введите:
      //            document.querySelector('meta[itemprop="channelId"]').content
      const channelId = ''; // ← ВСТАВЬТЕ СЮДА ВАШ CHANNEL ID (начинается с UC...)

      if (channelId && channelId.startsWith('UC')) {
        console.log('📡 Trying to load videos via RSS feed...');
        try {
          videos = await this.fetchRSSFeed(channelId);
          console.log(`✅ Loaded ${videos.length} videos from RSS (automatic)`);
        } catch (error) {
          console.warn('RSS feed failed, falling back to JSON:', error.message);
        }
      } else {
        console.log('⚠️  Channel ID not configured, using JSON fallback');
      }

      // Попытка #2: Загрузка из JSON (ручное обновление)
      if (!videos || videos.length === 0) {
        console.log('📄 Loading videos from JSON file...');
        videos = await this.loadVideosFromJSON();

        if (videos && videos.length > 0) {
          console.log(`✅ Loaded ${videos.length} videos from JSON (manual)`);
        }
      }

      // Если ничего не получилось - показываем fallback
      if (!videos || videos.length === 0) {
        console.log('❌ All methods failed, showing fallback');
        this.renderFallback(container);
        return;
      }

      // Отображаем видео
      container.innerHTML = '';

      const grid = document.createElement('div');
      grid.className = 'youtube-grid';

      videos.slice(0, this.config.maxResults).forEach(video => {
        const card = this.createVideoCard(video);
        grid.appendChild(card);
      });

      container.appendChild(grid);
    },

    /**
     * Fallback - показываем карточку с призывом посетить канал
     */
    renderFallback(container) {
      container.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
          <div style="text-align: center; max-width: 600px; padding: 3rem 2rem; background: linear-gradient(135deg, rgba(255, 0, 0, 0.1), rgba(255, 100, 100, 0.05)); border: 2px solid rgba(255, 0, 0, 0.3); border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
            <div style="font-size: 4rem; margin-bottom: 1.5rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">📺</div>
            <h3 style="font-size: 1.8rem; margin-bottom: 1rem; background: linear-gradient(135deg, #ff0000, #ff6b6b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              Смотрите нас на YouTube!
            </h3>
            <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.6;">
              Подписывайтесь на наш канал <strong>${this.config.channelHandle}</strong><br>
              чтобы не пропустить новые видео о жизни фермы!
            </p>
            <a
              href="https://www.youtube.com/${this.config.channelHandle}"
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
        document.addEventListener('DOMContentLoaded', () => this.loadVideos());
      } else {
        this.loadVideos();
      }
    }
  };

  // Запускаем загрузчик
  YouTubeRSSLoader.init();

  // Экспортируем для отладки
  window.YouTubeRSSLoader = YouTubeRSSLoader;
})();
