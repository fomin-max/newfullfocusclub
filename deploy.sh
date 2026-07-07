#!/usr/bin/env bash
# Обновление fullfocusclub.ru на VPS. Запускать НА СЕРВЕРЕ из /var/www/fullfocusclub.
# См. DEPLOY.md → «Обновление сайта (последующие деплои)».
set -euo pipefail

cd "$(dirname "$0")"

echo "→ git pull"
git pull origin main

echo "→ npm ci"
npm ci --production=false

echo "→ next build (NODE_ENV=production)"
NODE_ENV=production npm run build

echo "→ pm2 reload fullfocusclub"
pm2 reload fullfocusclub

echo "→ done"
pm2 status fullfocusclub
