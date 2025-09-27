# DEXRabbit Manual Deploy Script
Write-Host "=== DEXRabbit Manual Deploy ===" -ForegroundColor Green

Set-Location "C:\Users\konfu\Desktop\Кролики"

Write-Host "Checking git status..." -ForegroundColor Yellow
git status

Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "fix: final deployment with correct CNAME and workflow"

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "=== Deploy completed ===" -ForegroundColor Green
Write-Host "Check GitHub Actions: https://github.com/Avertenandor/DEXRabbit/actions" -ForegroundColor Cyan
Write-Host "Check site: https://xn--80apagbbfxgmuj4j.site/" -ForegroundColor Cyan