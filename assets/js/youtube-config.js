/**
 * YouTube API Configuration
 *
 * Как получить YouTube Data API v3 ключ:
 *
 * 1. Перейдите на https://console.cloud.google.com/
 * 2. Создайте новый проект (или выберите существующий)
 * 3. Включите YouTube Data API v3:
 *    - В меню перейдите в "APIs & Services" > "Library"
 *    - Найдите "YouTube Data API v3"
 *    - Нажмите "Enable"
 * 4. Создайте API ключ:
 *    - В меню перейдите в "APIs & Services" > "Credentials"
 *    - Нажмите "Create Credentials" > "API key"
 *    - Скопируйте сгенерированный ключ
 * 5. (Опционально) Настройте ограничения для ключа:
 *    - Ограничьте по домену вашего сайта
 *    - Ограничьте только YouTube Data API v3
 *
 * ВАЖНО: Для production рекомендуется использовать backend proxy
 * для безопасного хранения API ключа
 */

const YOUTUBE_API_CONFIG = {
  // ЗАМЕНИТЕ этот ключ на ваш реальный YouTube Data API v3 ключ
  // Получите его на https://console.cloud.google.com/
  API_KEY: 'YOUR_YOUTUBE_API_KEY_HERE',

  // Вы можете указать ID канала напрямую (начинается с UC...)
  // Или оставьте пустым, и он будет определен автоматически по handle
  CHANNEL_ID: '',

  // Handle вашего YouTube канала (например, @DexRabbitFarm)
  CHANNEL_HANDLE: '@DexRabbitFarm',

  // Количество видео для отображения (максимум 50)
  MAX_RESULTS: 6,

  // Время кэширования в миллисекундах (5 минут = 300000 мс)
  CACHE_DURATION: 5 * 60 * 1000,
};

// Экспортируем конфигурацию
window.YOUTUBE_API_CONFIG = YOUTUBE_API_CONFIG;
