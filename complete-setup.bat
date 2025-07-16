@echo off
echo ===============================================
echo   Student Management System - Complete Setup
echo ===============================================
echo.
echo This script will guide you through the complete setup process.
echo.
echo Steps:
echo 1. Check system prerequisites
echo 2. Update database configuration
echo 3. Setup database and tables
echo 4. Install frontend dependencies
echo 5. Test the application
echo.
pause

REM Step 1: Check Prerequisites
echo.
echo ===============================================
echo STEP 1: Checking Prerequisites
echo ===============================================
call "%~dp0check-system.bat"

REM Step 2: Update Database Configuration
echo.
echo ===============================================
echo STEP 2: Database Configuration
echo ===============================================
echo.
set /p CONTINUE="Continue with database configuration? (Y/N): "
if /i "%CONTINUE%"=="Y" (
    call "%~dp0update-database-config.bat"
)

REM Step 3: Setup Database
echo.
echo ===============================================
echo STEP 3: Database Setup
echo ===============================================
echo.
set /p CONTINUE="Continue with database setup? (Y/N): "
if /i "%CONTINUE%"=="Y" (
    call "%~dp0setup-database.bat"
)

REM Step 4: Install Frontend Dependencies
echo.
echo ===============================================
echo STEP 4: Installing Frontend Dependencies
echo ===============================================
echo.
cd /d "%~dp0frontend"
echo Installing React dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd /d "%~dp0"

REM Step 5: Final Instructions
echo.
echo ===============================================
echo SETUP COMPLETE!
echo ===============================================
echo.
echo Your Student Management System is now ready!
echo.
echo To start the application:
echo 1. Double-click 'start-full-app.bat'
echo 2. Or use VS Code tasks (Ctrl+Shift+P → Tasks: Run Task)
echo.
echo Access URLs:
echo • Backend API: http://localhost:8080
echo • Frontend App: http://localhost:3000
echo.
echo Would you like to start the application now?
set /p START="Start the application? (Y/N): "
if /i "%START%"=="Y" (
    start "" "%~dp0start-full-app.bat"
)
echo.
pause
