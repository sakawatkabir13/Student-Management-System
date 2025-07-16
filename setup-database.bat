@echo off
echo ===============================================
echo     Student Management System - Database Setup
echo ===============================================
echo.

REM Check if MySQL is installed
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: MySQL is not installed or not in PATH
    echo.
    echo Please install MySQL from: https://dev.mysql.com/downloads/mysql/
    echo Or install XAMPP which includes MySQL: https://www.apachefriends.org/download.html
    echo.
    echo After installation, make sure 'mysql' command is available in your PATH
    echo.
    pause
    exit /b 1
)

echo MySQL found! Setting up database...
echo.

REM Prompt for MySQL credentials
set /p MYSQL_USER="Enter MySQL username (default: root): "
if "%MYSQL_USER%"=="" set MYSQL_USER=root

set /p MYSQL_PASSWORD="Enter MySQL password: "

echo.
echo Creating database and tables...
echo.

REM Run the SQL setup script
mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% < "%~dp0database\setup.sql"

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Database setup failed!
    echo Please check your MySQL credentials and try again.
    echo.
    pause
    exit /b 1
)

echo.
echo ===============================================
echo     Database Setup Completed Successfully!
echo ===============================================
echo.
echo Database: student_management_db
echo Tables created with sample data
echo.
echo Next steps:
echo 1. Update application.properties with your MySQL credentials
echo 2. Run the backend application
echo.
pause
