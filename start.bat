@echo off
echo ===================================================
echo    Launching TyroTech Self-Hosted Platform...
echo ===================================================

cd /d "%~dp0"

IF NOT EXIST "node_modules" (
    echo [1/3] Installing dependencies for first-time setup...
    call npm install
) ELSE (
    echo [1/3] Dependencies verified.
)

IF NOT EXIST "prisma\dev.db" (
    echo [2/3] Initializing local database and seeding content...
    call npx prisma db push
    call npm run db:seed
) ELSE (
    echo [2/3] Database ready.
)

echo [3/3] Starting TyroTech server...
echo Access TyroTech at: http://localhost:3000
echo.

call npm run dev
