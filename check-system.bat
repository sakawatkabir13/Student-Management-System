@echo off
echo ===============================================
echo     Student Management System - System Check
echo ===============================================
echo.

echo Checking prerequisites...
echo.

REM Check Java
echo [1/4] Checking Java...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java is NOT installed
    echo    Download from: https://www.oracle.com/java/technologies/downloads/
    echo    Required: Java 17 or higher
    set JAVA_OK=0
) else (
    echo ✅ Java is installed
    java -version 2>&1 | findstr /i "version"
    set JAVA_OK=1
)
echo.

REM Check Maven
echo [2/4] Checking Maven...
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Maven is NOT installed
    echo    Download from: https://maven.apache.org/download.cgi
    echo    Required: Maven 3.6 or higher
    set MAVEN_OK=0
) else (
    echo ✅ Maven is installed
    mvn -version 2>&1 | findstr /i "Apache Maven"
    set MAVEN_OK=1
)
echo.

REM Check Node.js
echo [3/4] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is NOT installed
    echo    Download from: https://nodejs.org/
    echo    Required: Node.js 16 or higher
    set NODE_OK=0
) else (
    echo ✅ Node.js is installed
    node --version
    set NODE_OK=1
)
echo.

REM Check MySQL
echo [4/4] Checking MySQL...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MySQL is NOT installed
    echo    Download from: https://dev.mysql.com/downloads/mysql/
    echo    Or install XAMPP: https://www.apachefriends.org/download.html
    echo    Required: MySQL 8.0 or higher
    set MYSQL_OK=0
) else (
    echo ✅ MySQL is installed
    mysql --version
    set MYSQL_OK=1
)
echo.

echo ===============================================
echo                 SUMMARY
echo ===============================================
if %JAVA_OK%==1 if %MAVEN_OK%==1 if %NODE_OK%==1 if %MYSQL_OK%==1 (
    echo ✅ All prerequisites are installed!
    echo.
    echo Next steps:
    echo 1. Run 'setup-database.bat' to create the database
    echo 2. Update application.properties with your MySQL credentials
    echo 3. Run 'start-full-app.bat' to start the application
) else (
    echo ❌ Some prerequisites are missing!
    echo.
    echo Please install the missing components and run this script again.
)
echo.
pause
