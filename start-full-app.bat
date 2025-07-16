@echo off
echo Starting Complete Student Management System...
echo.
echo This will start both backend and frontend servers
echo - Backend: http://localhost:8080
echo - Frontend: http://localhost:3000
echo.
echo Press any key to continue...
pause >nul

REM Start backend in a new window
start "Backend Server" cmd /k "start-backend.bat"

REM Wait a moment for backend to start
timeout /t 5 /nobreak >nul

REM Start frontend in a new window
start "Frontend Server" cmd /k "start-frontend.bat"

echo.
echo Both servers are starting...
echo Please wait for both servers to fully start before using the application.
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
pause
