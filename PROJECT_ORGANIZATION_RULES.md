# 📁 **PROJECT ORGANIZATION RULES**

## 🎯 **ОСНОВНЫЕ ПРАВИЛА**

### **1. Тесты**
**Правило:** Все тесты ВСЕГДА должны находиться в папке `/тесты/tests/`

```
✅ ПРАВИЛЬНО:
/тесты/tests/dropdown.spec.js
/тесты/tests/mobile-responsive.spec.js
/тесты/tests/e2e-user-journey.spec.js

❌ НЕПРАВИЛЬНО:
/dropdown-test.js
/test_mobile.js
/tests/some-test.spec.js (не в папке тесты!)
```

---

### **2. Отчеты**
**Правило:** Все отчеты ВСЕГДА должны находиться в папке `/docs/reports/`

```
✅ ПРАВИЛЬНО:
/docs/reports/ALL_TESTS_PASSED_READY_TO_DEPLOY.md
/docs/reports/FINAL_DEPLOY_READY_REPORT.md
/docs/reports/WHAT_TESTS_FOUND_FULL_REPORT.md

❌ НЕПРАВИЛЬНО:
/REPORT.md
/test-report.md
/reports/some-report.md (не в docs!)
```

---

### **3. Исправления (Fix Reports)**
**Правило:** Все отчеты об исправлениях в папке `/docs/fixes/`

```
✅ ПРАВИЛЬНО:
/docs/fixes/CSS_CONFLICT_FINAL_FIX.md
/docs/fixes/DROPDOWN_FIX_FINAL.md
/docs/fixes/NAVIGATION_CRITICAL_FIX.md

❌ НЕПРАВИЛЬНО:
/FIX_DROPDOWN.md
/css-fix.md
```

---

### **4. Deployment Documentation**
**Правило:** Вся документация по deploy в `/docs/deployment/`

```
✅ ПРАВИЛЬНО:
/docs/deployment/DEPLOYMENT_GUIDE.md
/docs/deployment/DEPLOY_INITIATED.md

❌ НЕПРАВИЛЬНО:
/DEPLOY.md
/deployment-guide.md
```

---

## 📂 **СТРУКТУРА ПРОЕКТА**

```
DEXRabbit/
├── README.md                    # Основной README проекта
├── WORK_JOURNAL.md              # Журнал работы (может быть в корне)
├── TASK_FOR_CLAUDE_SONNET_4.md # Задачи (может быть в корне)
│
├── docs/                        # 📚 ВСЯ ДОКУМЕНТАЦИЯ
│   ├── reports/                 # 📊 Отчеты о тестировании
│   │   ├── ALL_TESTS_PASSED_READY_TO_DEPLOY.md
│   │   ├── FINAL_DEPLOY_READY_REPORT.md
│   │   ├── WHAT_TESTS_FOUND_FULL_REPORT.md
│   │   ├── WHAT_TESTS_FOUND_SHORT.md
│   │   ├── TESTS_COMPLETE_REPORT.md
│   │   ├── TESTS_FOUND_AND_FIXED_ISSUE.md
│   │   ├── INDUSTRIAL_TESTING_COMPLETE.md
│   │   ├── MOBILE_OPTIMIZATION_REPORT.md
│   │   └── DEEP_DIAGNOSIS_DEBUG.md
│   │
│   ├── fixes/                   # 🔧 Отчеты об исправлениях
│   │   ├── CSS_CONFLICT_FINAL_FIX.md
│   │   ├── DROPDOWN_FIX_FINAL.md
│   │   └── NAVIGATION_CRITICAL_FIX.md
│   │
│   ├── deployment/              # 🚀 Документация по deploy
│   │   ├── DEPLOYMENT_GUIDE.md
│   │   └── DEPLOY_INITIATED.md
│   │
│   └── tests/                   # 📋 Документация по тестам
│       └── README.md            # Описание тестовой структуры
│
├── тесты/                       # 🧪 ВСЕ ТЕСТЫ
│   ├── tests/                   # Playwright E2E тесты
│   │   ├── dropdown.spec.js
│   │   ├── mobile-responsive.spec.js
│   │   ├── e2e-user-journey.spec.js
│   │   └── console-monitor.spec.js
│   │
│   ├── tests-industrial/        # Промышленные тесты
│   ├── reports/                 # Отчеты тестов
│   ├── test-results/            # Результаты прогонов
│   └── playwright.config.js     # Конфигурация Playwright
│
├── assets/                      # 🎨 Ресурсы
│   ├── css/
│   ├── js/
│   ├── img/
│   └── media/
│
└── [другие папки проекта]
```

---

## 🚫 **ЧТО НИКОГДА НЕ ДЕЛАТЬ**

### ❌ Не создавать отчеты в корне проекта
```bash
# ПЛОХО:
touch REPORT_NEW_TESTS.md

# ХОРОШО:
touch docs/reports/REPORT_NEW_TESTS.md
```

### ❌ Не создавать тесты вне папки тесты
```bash
# ПЛОХО:
touch new-test.spec.js

# ХОРОШО:
touch тесты/tests/new-test.spec.js
```

### ❌ Не смешивать типы документов
```bash
# ПЛОХО:
mv FIX_DROPDOWN.md docs/reports/  # Это fix, не report!

# ХОРОШО:
mv FIX_DROPDOWN.md docs/fixes/
```

---

## ✅ **ЧЕКЛИСТ ПЕРЕД СОЗДАНИЕМ НОВОГО ФАЙЛА**

1. **Это тест?** → `/тесты/tests/`
2. **Это отчет о тестировании?** → `/docs/reports/`
3. **Это отчет об исправлении?** → `/docs/fixes/`
4. **Это документация по deploy?** → `/docs/deployment/`
5. **Это общий документ проекта?** → Может быть в корне (README, CHANGELOG и т.д.)

---

## 📝 **NAMING CONVENTIONS**

### **Отчеты (Reports):**
```
PATTERN: [TYPE]_[DESCRIPTION]_REPORT.md

Примеры:
- ALL_TESTS_PASSED_READY_TO_DEPLOY.md
- FINAL_DEPLOY_READY_REPORT.md
- MOBILE_OPTIMIZATION_REPORT.md
```

### **Исправления (Fixes):**
```
PATTERN: [COMPONENT]_[ISSUE]_FIX.md

Примеры:
- CSS_CONFLICT_FINAL_FIX.md
- DROPDOWN_FIX_FINAL.md
- NAVIGATION_CRITICAL_FIX.md
```

### **Тесты:**
```
PATTERN: [component].spec.js

Примеры:
- dropdown.spec.js
- mobile-responsive.spec.js
- e2e-user-journey.spec.js
```

---

## 🔄 **WORKFLOW ПРИ СОЗДАНИИ ДОКУМЕНТОВ**

### **Создание отчета:**
```bash
# 1. Создать в правильной папке
cd docs/reports/
touch NEW_FEATURE_TESTING_REPORT.md

# 2. Заполнить содержимое
# 3. Коммит
git add docs/reports/NEW_FEATURE_TESTING_REPORT.md
git commit -m "docs(reports): добавлен отчет о тестировании новой фичи"
```

### **Создание исправления:**
```bash
# 1. Создать в правильной папке
cd docs/fixes/
touch HEADER_LAYOUT_FIX.md

# 2. Заполнить описание проблемы и решения
# 3. Коммит
git add docs/fixes/HEADER_LAYOUT_FIX.md
git commit -m "docs(fixes): задокументировано исправление header layout"
```

### **Создание теста:**
```bash
# 1. Создать в правильной папке
cd тесты/tests/
touch new-feature.spec.js

# 2. Написать тесты
# 3. Запустить
npx playwright test tests/new-feature.spec.js

# 4. Коммит
git add тесты/tests/new-feature.spec.js
git commit -m "test: добавлены тесты для новой фичи"
```

---

## 🎓 **ПРАВИЛА ДЛЯ AI ASSISTANT**

### **При создании ЛЮБОГО документа:**
1. ✅ Определить тип документа (отчет/fix/deploy/test)
2. ✅ Выбрать правильную папку согласно структуре
3. ✅ Использовать правильное naming convention
4. ✅ Создать файл в нужной директории
5. ✅ НИКОГДА не создавать документы в корне проекта

### **При создании ТЕСТА:**
1. ✅ Всегда создавать в `/тесты/tests/`
2. ✅ Использовать `.spec.js` расширение
3. ✅ Именовать по компоненту или фиче
4. ✅ Добавлять описание в начале файла

### **Исключения (что МОЖНО в корне):**
- ✅ README.md (основной)
- ✅ CHANGELOG.md
- ✅ LICENSE
- ✅ .gitignore
- ✅ package.json
- ✅ WORK_JOURNAL.md (журнал работы)

---

## 🔍 **ПРОВЕРКА ОРГАНИЗАЦИИ**

### **Проверить что всё на своих местах:**
```powershell
# В корне не должно быть отчетов:
Get-ChildItem -Filter "*REPORT*.md" | Select-Object Name
Get-ChildItem -Filter "*FIX*.md" | Select-Object Name

# Должно быть пусто! Если есть файлы - переместить!
```

---

## ✨ **SUMMARY**

```
📁 Тесты         → /тесты/tests/
📊 Отчеты        → /docs/reports/
🔧 Исправления   → /docs/fixes/
🚀 Deploy docs   → /docs/deployment/
📚 Общие docs    → /docs/
```

**Запомнить:** Никакие отчеты, тесты или фиксы НЕ ДОЛЖНЫ валяться в корне проекта!

---

**Создано:** 4 октября 2025 г.  
**Автор:** GitHub Copilot  
**Цель:** Поддержание чистоты и организованности проекта
