@echo off
REM Personal Portfolio - Setup Script for Windows

echo.
echo ════════════════════════════════════════════════════════════════
echo         Personal Portfolio - Automated Setup Script
echo ════════════════════════════════════════════════════════════════
echo.

REM Check Node.js installation
echo 🔍 Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install Node.js 16+
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION% found

REM Create environment files
echo.
echo 📝 Setting up environment files...

if not exist "frontend\.env.local" (
    copy frontend\.env.example frontend\.env.local
    echo ✓ Created frontend\.env.local
) else (
    echo ⚠ frontend\.env.local already exists
)

if not exist "backend\.env" (
    copy backend\.env.example backend\.env
    echo ✓ Created backend\.env
) else (
    echo ⚠ backend\.env already exists
)

REM Install frontend dependencies
echo.
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..
echo ✓ Frontend dependencies installed

REM Install backend dependencies
echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install
cd ..
echo ✓ Backend dependencies installed

echo.
echo ════════════════════════════════════════════════════════════════
echo                    Setup Complete! 🎉
echo ════════════════════════════════════════════════════════════════
echo.
echo ✓ Environment files created
echo ✓ Frontend dependencies installed
echo ✓ Backend dependencies installed
echo.
echo Next Steps:
echo.
echo 1. Configure environment variables:
echo    • frontend\.env.local
echo    • backend\.env
echo.
echo 2. Start the backend:
echo    cd backend ^&^& npm run dev
echo.
echo 3. Start the frontend (new terminal):
echo    cd frontend ^&^& npm run dev
echo.
echo 4. Open browser:
echo    http://localhost:3000
echo.
echo 📚 Documentation:
echo    • QUICKSTART.md - 5 minute guide
echo    • docs/SETUP.md - Complete setup
echo    • docs/API.md - API reference
echo.
echo ════════════════════════════════════════════════════════════════
echo.
pause
