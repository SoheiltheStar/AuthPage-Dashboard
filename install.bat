@echo off
title Dekamond Auth Dashboard
echo.
echo Starting Dekamond Auth Dashboard...
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js not found! Please install from https://nodejs.org/
    pause
    exit
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Open browser
timeout /t 2 /nobreak >nul
start http://localhost:3000

REM Start server (keeps window open)
echo.
echo Server starting... Opening http://localhost:3000
echo Press Ctrl+C to stop
echo.
npm run dev