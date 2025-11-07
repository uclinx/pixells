
@echo off
:: Pixells Auto Deploy Script by Adham
cd /d F:\Pixells

echo =====================================
echo Deploying Pixells Website...
echo =====================================

:: Step 1 - Pull latest version from GitHub
git pull origin main

:: Step 2 - Stage all changes
git add .

:: Step 3 - Ask for commit message
set /p msg="Commit message: "

:: Step 4 - Commit with message
git commit -m "%msg%"

:: Step 5 - Push to GitHub
git push origin main

:: Step 6 - Wait for Render auto-deploy
echo.
echo Pushed successfully! Render will deploy automatically.
echo Opening website: https://www.pixells.com
echo.

:: Step 7 - Open site in browser
start https://www.pixells.com

echo =====================================
echo Deployment complete!
echo =====================================

pause
