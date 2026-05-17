#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONFIG="${ROOT}/deploy/beget.config"

if [[ -f "$CONFIG" ]]; then
  # shellcheck source=/dev/null
  source "$CONFIG"
fi

SSH_HOST="${BEGET_SSH_HOST:-admite@admite.beget.tech}"
REMOTE_DIR="${BEGET_REMOTE_DIR:-webo.by/webo-by}"

echo "→ Синхронизация файлов на ${SSH_HOST}:~/${REMOTE_DIR}/"
cd "$ROOT"
rsync -avz --delete \
  --exclude-from="${ROOT}/deploy/beget.rsync-exclude" \
  -e ssh \
  ./ "${SSH_HOST}:~/${REMOTE_DIR}/"

echo "→ Сборка на сервере (Docker)…"
ssh "${SSH_HOST}" "ssh localhost -p 222 'bash ~/${REMOTE_DIR}/scripts/remote-build.sh'"

echo "→ Деплой завершён: https://webo.by"
