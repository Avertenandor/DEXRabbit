#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Массовое обновление footer на всех страницах DEXRabbit
"""

import re
import os

# Список страниц для обновления
pages_to_update = [
    "therapy.html",
    "logistics.html",
    "rabbits-hares.html",
    "cats-rabbits.html",
    "guarantees.html",
    "partnership.html",
    "contacts.html",
    "development.html",
    "investors.html",
    "careers.html",
    "reports.html",
    "wallet-instructions.html"
]

# Читаем шаблон footer
with open("templates/footer-html-only.html", "r", encoding="utf-8") as f:
    new_footer = f.read()

# Функция для замены footer
def update_footer(filename):
    try:
        with open(filename, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Паттерн для поиска footer (от <!-- Footer --> до </footer>)
        # Используем non-greedy match для последнего </footer>
        pattern = r'(\s*<!-- Footer -->.*?</footer>)'
        
        # Находим footer
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            # Заменяем старый footer на новый
            new_content = content[:match.start()] + new_footer + content[match.end():]
            
            # Записываем обновленный файл
            with open(filename, "w", encoding="utf-8") as f:
                f.write(new_content)
            
            print(f"✅ {filename} - обновлен")
            return True
        else:
            print(f"⚠️ {filename} - footer не найден")
            return False
    except Exception as e:
        print(f"❌ {filename} - ошибка: {e}")
        return False

# Обновляем все страницы
print("=" * 60)
print("Массовое обновление footer на страницах DEXRabbit")
print("=" * 60)

updated_count = 0
for page in pages_to_update:
    if os.path.exists(page):
        if update_footer(page):
            updated_count += 1
    else:
        print(f"⚠️ {page} - файл не найден")

print("=" * 60)
print(f"Обновлено страниц: {updated_count}/{len(pages_to_update)}")
print("=" * 60)
