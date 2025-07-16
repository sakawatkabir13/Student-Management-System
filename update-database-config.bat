@echo off
echo ===============================================
echo   Update Database Configuration
echo ===============================================
echo.
echo Current database configuration:
echo.
type "%~dp0backend\src\main\resources\application.properties"
echo.
echo ===============================================
echo.

set /p DB_USER="Enter your MySQL username (current: root): "
if "%DB_USER%"=="" set DB_USER=root

set /p DB_PASSWORD="Enter your MySQL password: "
if "%DB_PASSWORD%"=="" set DB_PASSWORD=password

set /p DB_PORT="Enter MySQL port (current: 3306): "
if "%DB_PORT%"=="" set DB_PORT=3306

echo.
echo Updating application.properties...

REM Create backup
copy "%~dp0backend\src\main\resources\application.properties" "%~dp0backend\src\main\resources\application.properties.backup" >nul

REM Create new configuration
echo # Database Configuration > "%~dp0backend\src\main\resources\application.properties"
echo spring.datasource.url=jdbc:mysql://localhost:%DB_PORT%/student_management_db >> "%~dp0backend\src\main\resources\application.properties"
echo spring.datasource.username=%DB_USER% >> "%~dp0backend\src\main\resources\application.properties"
echo spring.datasource.password=%DB_PASSWORD% >> "%~dp0backend\src\main\resources\application.properties"
echo spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver >> "%~dp0backend\src\main\resources\application.properties"
echo. >> "%~dp0backend\src\main\resources\application.properties"
echo # JPA Configuration >> "%~dp0backend\src\main\resources\application.properties"
echo spring.jpa.hibernate.ddl-auto=update >> "%~dp0backend\src\main\resources\application.properties"
echo spring.jpa.show-sql=true >> "%~dp0backend\src\main\resources\application.properties"
echo spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect >> "%~dp0backend\src\main\resources\application.properties"
echo. >> "%~dp0backend\src\main\resources\application.properties"
echo # Server Configuration >> "%~dp0backend\src\main\resources\application.properties"
echo server.port=8080 >> "%~dp0backend\src\main\resources\application.properties"
echo. >> "%~dp0backend\src\main\resources\application.properties"
echo # CORS Configuration >> "%~dp0backend\src\main\resources\application.properties"
echo spring.web.cors.allowed-origins=http://localhost:3000 >> "%~dp0backend\src\main\resources\application.properties"
echo spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS >> "%~dp0backend\src\main\resources\application.properties"
echo spring.web.cors.allowed-headers=* >> "%~dp0backend\src\main\resources\application.properties"
echo spring.web.cors.allow-credentials=true >> "%~dp0backend\src\main\resources\application.properties"

echo.
echo ✅ Configuration updated successfully!
echo.
echo New configuration:
echo.
type "%~dp0backend\src\main\resources\application.properties"
echo.
echo Backup saved as: application.properties.backup
echo.
pause
