# 🔧 РЕШЕНИЕ ПРОБЛЕМЫ С РУССКИМИ СИМВОЛАМИ

## 🚨 ПРОБЛЕМА
PowerShell не может обработать русские символы в пути `Кролики` из-за проблем с кодировкой.

## 🎯 РЕШЕНИЯ

### **✅ Вариант 1: CMD с UTF-8 (РЕКОМЕНДУЕТСЯ)**
```cmd
chcp 65001
cd C:\Users\konfu\Desktop\Кролики
git add .
git commit -m "fix: final deployment with UTF-8 encoding"
git push origin main
```

### **✅ Вариант 2: Готовый скрипт CMD**
Запустите `fix_encoding.bat` - он устанавливает UTF-8 и выполняет деплой

### **✅ Вариант 3: PowerShell с Unicode**
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
Set-Location "C:\Users\konfu\Desktop\Кролики"
git add .
git commit -m "fix: final deployment with Unicode encoding"
git push origin main
```

### **✅ Вариант 4: Готовый скрипт PowerShell**
Запустите `fix_unicode.ps1` - он настраивает Unicode и выполняет деплой

### **✅ Вариант 5: Git Bash (ОБХОДИТ ПРОБЛЕМУ)**
```bash
cd /c/Users/konfu/Desktop/Кролики
git add .
git commit -m "fix: final deployment"
git push origin main
```

### **✅ Вариант 6: Переименование папки**
```cmd
ren "C:\Users\konfu\Desktop\Кролики" "C:\Users\konfu\Desktop\Rabbits"
cd C:\Users\konfu\Desktop\Rabbits
git add .
git commit -m "fix: final deployment"
git push origin main
```

## 🔧 ТЕХНИЧЕСКОЕ РЕШЕНИЕ

### **Установка UTF-8 в CMD:**
```cmd
chcp 65001
```

### **Установка Unicode в PowerShell:**
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
```

### **Проверка кодировки:**
```cmd
chcp
```

## 🎯 РЕКОМЕНДАЦИЯ

**Используйте `fix_encoding.bat`** - он решает проблему с русскими символами и выполняет деплой автоматически.

**Проблема в кодировке, а не в системных ограничениях!** 🚀