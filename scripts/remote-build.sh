#!/usr/bin/env bash
set -euo pipefail

export PATH="${HOME}/webo.by/webo-by/.node/bin:${PATH:-}"
cd "${HOME}/webo.by/webo-by"

npm install
npm run build
mkdir -p tmp
touch tmp/restart.txt

echo "[remote-build] Готово: $(date -Iseconds)"
