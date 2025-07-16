@echo off
echo Starting Student Management System Frontend...
echo.
echo Prerequisites:
echo - Node.js 16 or higher
echo - npm (comes with Node.js)
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    echo Please install npm (usually comes with Node.js)
    echo.
    pause
    exit /b 1
)

cd /d "%~dp0frontend"

echo Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo DEPENDENCY INSTALLATION FAILED
    pause
    exit /b 1
)

echo.
echo Starting React development server...
echo Frontend will be available at http://localhost:3000
echo.
npm start

pause
