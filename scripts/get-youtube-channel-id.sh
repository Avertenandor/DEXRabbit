#!/bin/bash
# Скрипт для получения YouTube Channel ID по handle

CHANNEL_HANDLE="@DexRabbitFarm"

echo "🔍 Поиск Channel ID для $CHANNEL_HANDLE..."
echo ""

# Метод 1: Попытка через публичную страницу канала
echo "Метод 1: Парсинг страницы канала..."
CHANNEL_ID=$(curl -s "https://www.youtube.com/$CHANNEL_HANDLE" | grep -o '"channelId":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -n "$CHANNEL_ID" ]; then
    echo "✅ Найден Channel ID: $CHANNEL_ID"
    echo ""
    echo "📋 Скопируйте этот ID и вставьте в assets/js/youtube-rss-loader.js"
    echo "   Строка: const channelId = '$CHANNEL_ID';"
    echo ""
    echo "🔗 RSS Feed URL:"
    echo "   https://www.youtube.com/feeds/videos.xml?channel_id=$CHANNEL_ID"
    echo ""

    # Проверяем RSS feed
    echo "🧪 Проверка RSS feed..."
    RSS_CHECK=$(curl -s "https://www.youtube.com/feeds/videos.xml?channel_id=$CHANNEL_ID" | head -20)

    if echo "$RSS_CHECK" | grep -q "<feed"; then
        echo "✅ RSS feed работает!"

        # Показываем первое видео
        VIDEO_TITLE=$(echo "$RSS_CHECK" | grep -o '<title>[^<]*' | sed -n '2p' | cut -d'>' -f2)
        if [ -n "$VIDEO_TITLE" ]; then
            echo "   Последнее видео: $VIDEO_TITLE"
        fi
    else
        echo "⚠️  RSS feed не найден, возможно ID неверный"
    fi

    exit 0
else
    echo "❌ Не удалось автоматически определить Channel ID"
    echo ""
    echo "📝 Найдите его вручную:"
    echo "   1. Откройте https://www.youtube.com/@DexRabbitFarm"
    echo "   2. Нажмите F12 (Developer Tools)"
    echo "   3. Во вкладке Console введите:"
    echo "      document.querySelector('meta[itemprop=\"channelId\"]').content"
    echo "   4. Скопируйте полученный ID (начинается с UC...)"
    echo ""
    exit 1
fi
