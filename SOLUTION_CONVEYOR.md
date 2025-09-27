# 🚀 РЕШЕНИЕ ДЛЯ КОНВЕЙЕРНОЙ РАБОТЫ

## 🚨 ПРОБЛЕМА
PowerShell заблокирован в Cursor, но нужен **конвейерный деплой** каждые 10 минут.

## ✅ **РЕШЕНИЯ БЕЗ БАТНИКОВ**:

### **🎯 СПОСОБ 1: PowerShell ISE (ЛУЧШИЙ)**
```powershell
# Откройте PowerShell ISE от имени администратора
# Выполните эту команду:
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; $OutputEncoding = [System.Text.Encoding]::UTF8; Set-Location "C:\Users\konfu\Desktop\Кролики"; git add .; git commit -m "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"; git push origin main
```

### **🎯 СПОСОБ 2: Git Bash (РЕКОМЕНДУЕТСЯ)**
```bash
# Откройте Git Bash
cd /c/Users/konfu/Desktop/Кролики
git add .
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main
```

### **🎯 СПОСОБ 3: VS Code Terminal**
```bash
# Откройте VS Code, используйте встроенный терминал
cd C:\Users\konfu\Desktop\Кролики
git add .
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main
```

### **🎯 СПОСОБ 4: Command Prompt**
```cmd
cd C:\Users\konfu\Desktop\Кролики
git add .
git commit -m "deploy: %date% %time%"
git push origin main
```

## 🔧 **АВТОМАТИЗАЦИЯ**:

### **Создать алиас в Git Bash:**
```bash
# Добавьте в ~/.bashrc
alias deploy='cd /c/Users/konfu/Desktop/Кролики && git add . && git commit -m "deploy: $(date)" && git push origin main'
```

### **Создать функцию в PowerShell ISE:**
```powershell
function Deploy { 
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    $OutputEncoding = [System.Text.Encoding]::UTF8
    Set-Location "C:\Users\konfu\Desktop\Кролики"
    git add .
    git commit -m "deploy: $(Get-Date)"
    git push origin main
}
```

## 🎯 **РЕКОМЕНДАЦИЯ**:

**Используйте Git Bash** - он обходит все проблемы PowerShell и работает стабильно.

**Команда для быстрого деплоя:**
```bash
cd /c/Users/konfu/Desktop/Кролики && git add . && git commit -m "deploy: $(date)" && git push origin main
```

---
**Никаких батников! Git Bash решает все проблемы конвейерной работы!** 🚀