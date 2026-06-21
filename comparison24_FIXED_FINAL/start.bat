@echo off
echo 🚀 Comparison24 - Windows Start Tool
echo -----------------------------------
echo 1. Dependencies installieren
echo 2. Datenbank-Schema vorbereiten
echo 3. Entwicklungs-Server starten
echo 4. Programm beenden
echo -----------------------------------
set /p choice="Waehle eine Option (1-4): "

if "%choice%"=="1" (
    echo Installiere NPM Packages...
    npm install
    pause
    goto :eof
)
if "%choice%"=="2" (
    echo Bereite Prisma vor...
    npx prisma generate
    npx prisma db push
    echo Seeding Datenbank...
    node prisma/seed.js
    pause
    goto :eof
)
if "%choice%"=="3" (
    echo Starte Server...
    npm run dev
)
if "%choice%"=="4" exit
