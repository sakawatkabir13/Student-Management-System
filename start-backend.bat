@echo off
echo Starting Student Management System Backend...
echo.
echo Prerequisites:
echo - Java 17 or higher
echo - Maven 3.6 or higher
echo - MySQL 8.0 or higher
echo.

REM Check if Maven is installed
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven from https://maven.apache.org/download.cgi
    echo.
    pause
    exit /b 1
)

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 or higher
    echo.
    pause
    exit /b 1
)

cd /d "%~dp0backend"

echo Building the application...
mvn clean install -DskipTests

if %errorlevel% neq 0 (
    echo BUILD FAILED
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application...
echo Backend will be available at http://localhost:8080
echo.
mvn spring-boot:run

pause
