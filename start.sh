#!/usr/bin/env bash

echo "==================================================="
echo "   Launching TyroTech Self-Hosted Platform...      "
echo "==================================================="

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

if [ ! -d "node_modules" ]; then
    echo "[1/3] Installing dependencies for first-time setup..."
    npm install
else
    echo "[1/3] Dependencies verified."
fi

if [ ! -f "prisma/dev.db" ]; then
    echo "[2/3] Initializing local database and seeding content..."
    npx prisma db push
    npm run db:seed
else
    echo "[2/3] Database ready."
fi

echo "[3/3] Starting TyroTech server..."
echo "Access TyroTech at: http://localhost:3000"
echo ""

npm run dev
