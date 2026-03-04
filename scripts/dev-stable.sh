#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NODE20_BIN="/opt/homebrew/opt/node@20/bin"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-3000}"

export PATH="${NODE20_BIN}:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${PATH}"

if [ ! -x "${NODE20_BIN}/node" ]; then
  echo "Warnung: node@20 nicht gefunden. Installiere mit: brew install node@20"
fi

cd "${ROOT_DIR}"

# Stabiler Dev-Start: fehleranfälligen webpack-Dateicache entfernen
rm -rf .next/cache/webpack 2>/dev/null || true

exec ./node_modules/.bin/next dev -H "${HOST}" -p "${PORT}"
