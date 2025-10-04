# 🧪 DEXRabbit - Комплексное Тестирование

Полноценное **E2E** и **мобильное** тестирование для сайта DEXRabbit с использованием **Playwright**.

---

## 📋 **Что тестируется**

### ✅ **Мобильная адаптивность:**
- Все популярные устройства (iPhone, Samsung, Pixel, iPad)
- Portrait и Landscape ориентации
- Отсутствие горизонтальной прокрутки
- Адаптивные изображения
- Touch targets (минимум 44x44px)
- Динамический viewport (100dvh)

### ✅ **Dropdown функционал:**
- Открытие/закрытие при клике
- Корректность computed styles
- Visibility, opacity, pointer-events
- Плавная анимация
- Работа на всех 5 секциях

### ✅ **E2E сценарии:**
- Полный путь пользователя
- Переходы между страницами
- Работа навигации

### ✅ **Консоль браузера:**
- Отсутствие JavaScript ошибок
- Отсутствие 404 ошибок
- Наличие DEBUG логов

---

## 🚀 **Быстрый старт**

### **1. Установка зависимостей:**
```bash
cd тесты
npm install
npx playwright install
```

### **2. Запуск всех тестов:**
```bash
npm test
```

### **3. Запуск конкретного теста:**
```bash
npm run test:mobile      # Мобильная адаптивность
npm run test:dropdown    # Dropdown функционал
npm run test:e2e         # E2E сценарии
npm run test:console     # Проверка консоли
```

### **4. Запуск с видимым браузером:**
```bash
npm run test:headed
```

### **5. Debug режим:**
```bash
npm run test:debug
```

### **6. Просмотр отчетов:**
```bash
npm run report
```

---

## 📱 **Тестируемые устройства**

| Устройство | Разрешение | Описание |
|-----------|-----------|----------|
| **iPhone 12** | 390x844 | Стандартный iPhone |
| **iPhone 14 Pro Max** | 430x932 | Большой iPhone |
| **Samsung Galaxy S21** | 360x800 | Android флагман |
| **Google Pixel 5** | 393x851 | Pixel устройство |
| **Galaxy Fold** | 280x653 | Складной телефон |
| **iPad Mini** | 768x1024 | Планшет |
| **Landscape** | 844x390 | Альбомная ориентация |

---

## 📊 **Структура тестов**

```
тесты/
├── package.json                    # Зависимости
├── playwright.config.js            # Конфигурация
├── README.md                       # Эта инструкция
├── tests/
│   ├── mobile-responsive.spec.js   # Адаптивность (10 тестов)
│   ├── dropdown.spec.js            # Dropdown (10 тестов)
│   ├── e2e-user-journey.spec.js    # E2E (2 теста)
│   └── console-monitor.spec.js     # Консоль (3 теста)
└── reports/                        # Автоматические отчеты
    ├── html/                       # HTML отчеты
    ├── results.json                # JSON результаты
    └── screenshots/                # Скриншоты при ошибках
```

---

## 🎯 **Пример запуска**

### **Полный цикл тестирования:**
```powershell
# Установка (только первый раз)
cd "C:\Users\konfu\Desktop\Кролики\тесты"
npm install
npx playwright install

# Запуск всех тестов
npm test

# Результат:
# ✅ 25 тестов пройдено
# ❌ 0 тестов провалено
# ⏱️ Время: ~2-3 минуты

# Просмотр отчета
npm run report
```

---

## 🔍 **Что проверяют тесты**

### **mobile-responsive.spec.js:**
```javascript
✅ Загрузка на всех устройствах
✅ Отсутствие horizontal scroll
✅ Адаптивные изображения
✅ Viewport meta tag
✅ Touch targets >= 44px
✅ Читаемые шрифты >= 14px
✅ Динамический viewport (dvh)
✅ Safe area (notch)
✅ Landscape ориентация
✅ Media queries
```

### **dropdown.spec.js:**
```javascript
✅ Все 5 dropdown найдены
✅ Открытие при клике
✅ maxHeight: 0px → 1000px
✅ opacity: 0 → 1
✅ visibility: hidden → visible
✅ pointerEvents: none → auto
✅ Закрытие при повторном клике
✅ Закрытие других dropdown
✅ Видимость всех элементов
✅ DEBUG логи выводятся
```

---

## 📈 **Интерпретация результатов**

### **✅ Все зеленое - ОТЛИЧНО!**
```
 25 passed (2.5m)
```

### **⚠️ Есть warnings - ОБРАТИТЬ ВНИМАНИЕ**
```
 23 passed, 2 skipped (2.3m)
```

### **❌ Есть ошибки - ТРЕБУЕТСЯ ИСПРАВЛЕНИЕ**
```
 20 passed, 5 failed (2.1m)

  ❌ dropdown.spec.js:25 - maxHeight остается 0px
     Expected: 1000px
     Received: 0px
```

---

## 🛠️ **Расширенные команды**

### **Тестирование конкретного браузера:**
```bash
npx playwright test --project=iphone-12
npx playwright test --project=galaxy-s21
npx playwright test --project=ipad-mini
```

### **Тестирование конкретного файла:**
```bash
npx playwright test tests/dropdown.spec.js
```

### **Генерация кода теста:**
```bash
npx playwright codegen https://xn--80apagbbfxgmuj4j.site
```

---

## 📝 **CI/CD Integration**

### **GitHub Actions:**
```yaml
- name: Install dependencies
  run: npm ci
  working-directory: ./тесты

- name: Install Playwright Browsers
  run: npx playwright install --with-deps
  working-directory: ./тесты

- name: Run Playwright tests
  run: npm test
  working-directory: ./тесты

- name: Upload report
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: тесты/reports/
```

---

## 🎓 **Дополнительные ресурсы**

- [Playwright Документация](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)

---

## 💡 **Советы**

1. **Запускайте тесты регулярно** после каждого изменения CSS/JS
2. **Проверяйте скриншоты** при падении тестов
3. **Используйте debug mode** для отладки
4. **Смотрите видео** падающих тестов
5. **Обновляйте тесты** при изменении функционала

---

## ✅ **Заключение**

Этот набор тестов проверяет **ВСЁ**:
- ✅ Мобильную адаптивность на 7+ устройствах
- ✅ Dropdown функционал от и до
- ✅ E2E пользовательские сценарии
- ✅ Консоль браузера на ошибки
- ✅ Touch targets и accessibility
- ✅ Performance и resource loading

**Запускайте `npm test` после каждого деплоя!**

---

**Создано:** GitHub Copilot  
**Дата:** 4 октября 2025 г.  
**Версия:** 1.0.0
