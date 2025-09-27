@echo off
echo === DEXRabbit Manual Deploy ===
cd /d "C:\Users\konfu\Desktop\Кролики"

echo Checking git status...
git status

echo Adding all files...
git add .

echo Committing changes...
git commit -m "fix: final deployment with correct CNAME and workflow"

echo Pushing to GitHub...
git push origin main

echo === Deploy completed ===
pause