#!/bin/bash
# Скрипт для автоматического применения footer ко всем страницам

TEMPLATE_FOOTER=$(cat templates/footer-template.html)

# Функция для замены footer в файле
update_footer() {
    local file=$1
    echo "Обновление: $file"
    
    # Используем Python для более надежной замены
    python3 -c "
import re
import sys

try:
    with open('$file', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Читаем новый footer
    with open('templates/footer-template.html', 'r', encoding='utf-8') as f:
        new_footer = f.read()
    
    # Паттерн для поиска старого footer
    pattern = r'(?s)<!-- Footer -->.*?</footer>'
    
    # Проверяем, есть ли footer
    if re.search(pattern, content):
        # Заменяем
        new_content = re.sub(pattern, new_footer, content)
        
        with open('$file', 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print('✅ Footer обновлен')
    else:
        print('⚠️ Footer не найден')
except Exception as e:
    print(f'❌ Ошибка: {e}')
"
}

# Обновляем все HTML файлы
for file in *.html; do
    # Пропускаем тестовые файлы
    if [[ "$file" != "og-test.html" && "$file" != "og-preview-test.html" && "$file" != "fix-svg-arrows.html" && "$file" != "404.html" ]]; then
        update_footer "$file"
    fi
done

echo ""
echo "🎉 Готово! Footer обновлен на всех страницах"
