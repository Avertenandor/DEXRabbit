#!/bin/bash

# YouTube API Setup Script
# Быстрая настройка YouTube API ключа для DEXRabbit

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   YouTube API Setup - DEXRabbit                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Проверка наличия файла конфигурации
CONFIG_FILE="assets/js/youtube-config.js"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Ошибка: файл $CONFIG_FILE не найден!"
    exit 1
fi

echo "Для настройки YouTube API вам нужно:"
echo ""
echo "1. Перейти на: https://console.cloud.google.com/"
echo "2. Создать новый проект (или выбрать существующий)"
echo "3. Включить YouTube Data API v3:"
echo "   - APIs & Services → Library → YouTube Data API v3 → Enable"
echo "4. Создать API ключ:"
echo "   - APIs & Services → Credentials → Create Credentials → API key"
echo ""
echo "Откройте эту ссылку в браузере:"
echo "https://console.cloud.google.com/apis/credentials"
echo ""
read -p "Нажмите Enter когда получите API ключ..."

echo ""
echo "Введите ваш YouTube API ключ:"
echo "(должен начинаться с AIza и быть длиной ~39 символов)"
read -p "API Key: " API_KEY

# Проверка формата ключа
if [[ ! $API_KEY =~ ^AIza[0-9A-Za-z_-]{35}$ ]]; then
    echo ""
    echo "⚠️  Предупреждение: ключ не соответствует стандартному формату Google API"
    echo "Обычно ключи начинаются с 'AIza' и содержат 39 символов"
    read -p "Продолжить? (y/n): " CONTINUE
    if [[ $CONTINUE != "y" ]]; then
        echo "Отменено."
        exit 1
    fi
fi

echo ""
echo "Хотите указать ID канала напрямую? (опционально)"
echo "Если нет, ID будет определен автоматически по handle @DexRabbitFarm"
read -p "Channel ID (или Enter чтобы пропустить): " CHANNEL_ID

# Создаем резервную копию
cp "$CONFIG_FILE" "${CONFIG_FILE}.backup"
echo "✅ Создана резервная копия: ${CONFIG_FILE}.backup"

# Обновляем конфигурацию
sed -i "s/API_KEY: 'YOUR_YOUTUBE_API_KEY_HERE'/API_KEY: '$API_KEY'/g" "$CONFIG_FILE"

if [ ! -z "$CHANNEL_ID" ]; then
    sed -i "s/CHANNEL_ID: ''/CHANNEL_ID: '$CHANNEL_ID'/g" "$CONFIG_FILE"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   ✅ YouTube API успешно настроен!                         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Файл обновлен: $CONFIG_FILE"
echo ""
echo "Следующие шаги:"
echo "1. Закоммитьте изменения: git add $CONFIG_FILE && git commit -m 'feat: Добавлен YouTube API ключ'"
echo "2. Запушьте на сервер: git push"
echo "3. Обновите страницу сайта (Ctrl+Shift+R)"
echo ""
echo "🎬 Теперь на сайте будут отображаться последние 6 видео с вашего канала!"
echo ""
echo "Для отмены изменений используйте:"
echo "  cp ${CONFIG_FILE}.backup $CONFIG_FILE"
echo ""
