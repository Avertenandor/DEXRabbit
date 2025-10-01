# -*- coding: utf-8 -*-
"""
Скрипт для обновления footer на всех HTML страницах сайта DEXRabbit
"""

import os
import re
from pathlib import Path

# Путь к проекту
PROJECT_DIR = Path(r"C:\Users\konfu\Desktop\Кролики")
TEMPLATE_FILE = PROJECT_DIR / "templates" / "footer-template.html"

# Список файлов для обновления
HTML_FILES = [
    "index.html",
    "breeding.html",
    "care.html",
    "careers.html",
    "cats-rabbits.html",
    "contacts.html",
    "development.html",
    "gifts.html",
    "guarantees.html",
    "investment-model.html",
    "investors.html",
    "logistics.html",
    "partnership.html",
    "rabbits-hares.html",
    "reports.html",
    "restaurants.html",
    "therapy.html",
    "wallet-instructions.html",
]

def read_file(filepath):
    """Читает файл с кодировкой UTF-8"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """Записывает файл с кодировкой UTF-8"""
    with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)

def find_footer_section(content):
    """Находит секцию footer в HTML"""
    # Паттерн для поиска footer
    pattern = r'(?s)<!-- Footer -->.*?</footer>'
    match = re.search(pattern, content)
    return match

def update_footer(html_file):
    """Обновляет footer в HTML файле"""
    filepath = PROJECT_DIR / html_file
    
    if not filepath.exists():
        print(f"⚠️  Файл не найден: {html_file}")
        return False
    
    try:
        # Читаем содержимое
        content = read_file(filepath)
        template = read_file(TEMPLATE_FILE)
        
        # Ищем footer
        match = find_footer_section(content)
        
        if match:
            # Заменяем старый footer на новый
            new_content = content[:match.start()] + template + content[match.end():]
            write_file(filepath, new_content)
            print(f"✅ {html_file}: Footer обновлен")
            return True
        else:
            # Если footer не найден, добавляем перед </body>
            if '</body>' in content:
                new_content = content.replace('</body>', f'{template}\n</body>')
                write_file(filepath, new_content)
                print(f"✅ {html_file}: Footer добавлен перед </body>")
                return True
            else:
                print(f"❌ {html_file}: Не найден тег </body>")
                return False
                
    except Exception as e:
        print(f"❌ {html_file}: Ошибка - {str(e)}")
        return False

def main():
    """Главная функция"""
    print("🐰 DEXRabbit - Обновление footer на всех страницах\n")
    print("=" * 60)
    
    # Проверяем наличие шаблона
    if not TEMPLATE_FILE.exists():
        print(f"❌ Шаблон не найден: {TEMPLATE_FILE}")
        return
    
    # Обновляем все файлы
    success_count = 0
    error_count = 0
    
    for html_file in HTML_FILES:
        if update_footer(html_file):
            success_count += 1
        else:
            error_count += 1
    
    print("=" * 60)
    print(f"\n📊 Результаты:")
    print(f"   ✅ Успешно обновлено: {success_count} файлов")
    print(f"   ❌ Ошибок: {error_count}")
    print(f"\n🎉 Готово!\n")

if __name__ == "__main__":
    main()
