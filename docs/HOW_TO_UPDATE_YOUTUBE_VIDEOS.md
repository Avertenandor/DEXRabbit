# Как обновить YouTube видео на сайте

Простая инструкция по обновлению YouTube видео на главной странице сайта.

## Шаг 1: Получите ID ваших видео

1. Откройте нужное видео на YouTube
2. Посмотрите на URL в адресной строке:
   ```
   https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                  └──────────┘
                                  Это VIDEO_ID
   ```
3. Скопируйте ID (часть после `v=`)

## Шаг 2: Обновите HTML файл

1. Откройте файл `index.html`

2. Найдите секцию YouTube (строка ~1072):
   ```html
   <!-- Сетка YouTube видео -->
   <div class="youtube-grid">
   ```

3. Замените `VIDEO_ID_1`, `VIDEO_ID_2` и т.д. на реальные ID ваших видео:

   **Было:**
   ```html
   <iframe
     src="https://www.youtube.com/embed/VIDEO_ID_1"
     ...
   ></iframe>
   ```

   **Стало:**
   ```html
   <iframe
     src="https://www.youtube.com/embed/dQw4w9WgXcQ"
     ...
   ></iframe>
   ```

4. Обновите все 6 видео

## Шаг 3: Сохраните и деплойте

```bash
git add index.html
git commit -m "update: Обновлены YouTube видео"
git push
```

## Пример: Полная замена одного видео

**Было:**
```html
<!-- Видео 1 -->
<div class="youtube-video-card">
  <div class="youtube-embed-wrapper">
    <iframe
      src="https://www.youtube.com/embed/VIDEO_ID_1"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      title="Видео 1 - DexRabbitFarm"
    ></iframe>
  </div>
</div>
```

**Стало:**
```html
<!-- Видео 1 -->
<div class="youtube-video-card">
  <div class="youtube-embed-wrapper">
    <iframe
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      title="Кролики на ферме - DexRabbitFarm"
    ></iframe>
  </div>
</div>
```

## Советы:

- **Обновляйте title** для каждого видео чтобы описать его содержание
- **Используйте последние видео** для привлечения внимания
- **Проверьте после деплоя** что видео отображаются корректно

## Как добавить/удалить видео

### Добавить видео:

Скопируйте блок одного видео и вставьте еще раз:

```html
<!-- Видео 7 - новое! -->
<div class="youtube-video-card">
  <div class="youtube-embed-wrapper">
    <iframe
      src="https://www.youtube.com/embed/НОВЫЙ_VIDEO_ID"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      title="Новое видео - DexRabbitFarm"
    ></iframe>
  </div>
</div>
```

### Удалить видео:

Просто удалите весь блок от `<!-- Видео X -->` до `</div>`.

## Что НЕ нужно:

- ❌ YouTube API ключ
- ❌ Сложная настройка
- ❌ JavaScript код
- ❌ База данных

Просто меняете ID в HTML - и все!

## Troubleshooting

### Видео не показывается

1. Проверьте что ID скопирован правильно (11 символов)
2. Проверьте что видео не приватное
3. Проверьте что URL правильный: `https://www.youtube.com/embed/ID`

### Видео растянуто/сжато

Соотношение сторон установлено 16:9 автоматически. Это стандарт YouTube.

### Хочу показать плейлист

Замените:
```html
src="https://www.youtube.com/embed/VIDEO_ID"
```

На:
```html
src="https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID"
```

Где PLAYLIST_ID - это ID вашего плейлиста (находится в URL плейлиста после `list=`).
