import os
import re
from pathlib import Path

# Директория проекта
PROJECT_DIR = Path(r"C:\Users\konfu\Desktop\Кролики")

# Функция для обновления HTML файла
def update_html_file(file_path):
    """Обновляет HTML файл с новыми метатегами и подключениями."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        updated = False
        
        # 1. Обновляем viewport
        old_viewport = r'<meta name="viewport" content="width=device-width, initial-scale=1\.0">'
        new_viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">'
        
        if re.search(old_viewport, content):
            content = re.sub(old_viewport, new_viewport, content)
            updated = True
            print(f"  ✓ Обновлен viewport")
        
        # 2. Добавляем responsive.css если его нет
        if '/assets/css/responsive.css' not in content and '/assets/css/main.css' in content:
            # Находим место после variables.css или main.css
            if '/assets/css/variables.css' in content:
                pattern = r'(<link rel="stylesheet" href="/assets/css/variables\.css">)'
                replacement = r'\1\n    <link rel="stylesheet" href="/assets/css/avatars.css">\n    <link rel="stylesheet" href="/assets/css/responsive.css">'
            else:
                pattern = r'(<link rel="stylesheet" href="/assets/css/main\.css">)'
                replacement = r'\1\n    <link rel="stylesheet" href="/assets/css/avatars.css">\n    <link rel="stylesheet" href="/assets/css/responsive.css">'
            
            content = re.sub(pattern, replacement, content)
            updated = True
            print(f"  ✓ Добавлены responsive.css и avatars.css")
        
        # 3. Добавляем nav.js если его нет
        if '/assets/js/nav.js' not in content and '</head>' in content:
            pattern = r'(</head>)'
            replacement = r'    <!-- Mobile Navigation Script -->\n    <script defer src="/assets/js/nav.js"></script>\n\1'
            content = re.sub(pattern, replacement, content)
            updated = True
            print(f"  ✓ Добавлен nav.js")
        
        # 4. Обновляем кнопку мобильного меню
        if 'onclick="toggleMenu()"' in content:
            content = content.replace(
                'onclick="toggleMenu()"', 
                'data-burger'
            )
            # Добавляем класс burger если его нет
            content = re.sub(
                r'class="mobile-nav-toggle"',
                'class="mobile-nav-toggle burger"',
                content
            )
            updated = True
            print(f"  ✓ Обновлена кнопка мобильного меню")
        
        # 5. Добавляем data-menu к nav-links
        if 'id="nav-menu"' in content and 'data-menu' not in content:
            content = content.replace(
                'id="nav-menu"',
                'id="nav-menu" data-menu'
            )
            updated = True
            print(f"  ✓ Добавлен data-menu атрибут")
        
        # Сохраняем файл если были изменения
        if updated and content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"  ✗ Ошибка: {e}")
        return False

# Главная функция
def main():
    """Обновляет все HTML файлы в проекте."""
    print("=" * 60)
    print("DEXRabbit - Обновление HTML файлов для адаптивности")
    print("=" * 60)
    
    # Получаем все HTML файлы
    html_files = list(PROJECT_DIR.glob("*.html"))
    
    print(f"\nНайдено HTML файлов: {len(html_files)}")
    print("-" * 60)
    
    updated_count = 0
    skipped_count = 0
    error_count = 0
    
    for html_file in html_files:
        print(f"\n📄 {html_file.name}:")
        
        # Пропускаем некоторые служебные файлы
        if html_file.name in ['og-test.html']:
            print(f"  ⏭️  Пропущен (служебный файл)")
            skipped_count += 1
            continue
        
        if update_html_file(html_file):
            updated_count += 1
        else:
            print(f"  ℹ️  Изменения не требуются")
    
    # Итоговая статистика
    print("\n" + "=" * 60)
    print("РЕЗУЛЬТАТЫ:")
    print(f"  ✅ Обновлено файлов: {updated_count}")
    print(f"  ⏭️  Пропущено файлов: {skipped_count}")
    print(f"  ℹ️  Без изменений: {len(html_files) - updated_count - skipped_count}")
    print("=" * 60)
    
    return updated_count > 0

if __name__ == "__main__":
    success = main()
    if success:
        print("\n✨ Обновление завершено успешно!")
        print("📌 Не забудьте закоммитить изменения в Git")
    else:
        print("\n📌 Файлы уже обновлены или изменения не требуются")
