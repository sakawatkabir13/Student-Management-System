@echo off
echo ===============================================
echo     OneDrive Node Modules Exclusion Setup
echo ===============================================
echo.
echo This will exclude node_modules from OneDrive sync
echo to prevent sync issues with special characters.
echo.
echo Manual steps:
echo 1. Right-click on the 'frontend' folder in File Explorer
echo 2. Select 'Always keep on this device' (uncheck if checked)
echo 3. Right-click on 'frontend/node_modules' folder specifically
echo 4. Select 'Free up space' or 'Always available on this device' (uncheck)
echo.
echo Alternative: Move the project outside OneDrive folder
echo.
echo Current location: %CD%
echo.
echo Recommended location: C:\Projects\Student Management System
echo.
set /p MOVE="Would you like to move the project outside OneDrive? (Y/N): "
if /i "%MOVE%"=="Y" (
    echo.
    echo Moving project to C:\Projects\...
    if not exist "C:\Projects\" mkdir "C:\Projects\"
    xcopy "%CD%" "C:\Projects\Student Management System\" /E /I /H /Y
    echo.
    echo Project moved successfully!
    echo Please open the new location in VS Code:
    echo C:\Projects\Student Management System
) else (
    echo.
    echo Please manually exclude node_modules from OneDrive sync.
)
echo.
pause
