#!/bin/bash
# ─────────────────────────────────────────────────────────────────
# NutriSaude — Deploy script (executed by webhook on git push to main)
# ─────────────────────────────────────────────────────────────────
set -e

APP_DIR="/opt/nutrisaude"
IMAGE="nutrisaude:latest"
CONTAINER="nutrisaude-app"
HOST_PORT="3004"
LOG="$APP_DIR/deploy.log"

echo "" >> "$LOG"
echo "════════════════════════════════════════" >> "$LOG"
echo "$(date '+%Y-%m-%d %H:%M:%S') · Deploy iniciado" >> "$LOG"

cd "$APP_DIR"

# Reset local state and pull latest
git reset --hard HEAD >> "$LOG" 2>&1
git pull origin main >> "$LOG" 2>&1

# Build new image (uses cache when possible)
docker build -t "$IMAGE" . >> "$LOG" 2>&1

# Replace running container
docker stop "$CONTAINER"  >> "$LOG" 2>&1 || true
docker rm   "$CONTAINER"  >> "$LOG" 2>&1 || true
docker run -d \
  --name "$CONTAINER" \
  --restart unless-stopped \
  -p "$HOST_PORT:80" \
  "$IMAGE" >> "$LOG" 2>&1

# Cleanup dangling images
docker image prune -f >> "$LOG" 2>&1

echo "$(date '+%Y-%m-%d %H:%M:%S') · Deploy concluído" >> "$LOG"
