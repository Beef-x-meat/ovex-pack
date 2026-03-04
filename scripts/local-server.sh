#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-3000}"
HOST="${HOST:-127.0.0.1}"
LOG_FILE="${LOG_FILE:-/tmp/ovex-local.log}"
NODE20_BIN="/opt/homebrew/opt/node@20/bin"

export PATH="${NODE20_BIN}:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${PATH}"

is_running() {
  if lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
    return 0
  fi
  return 1
}

wait_until_ready() {
  for _ in $(seq 1 45); do
    if nc -z "${HOST}" "${PORT}" >/dev/null 2>&1; then
      return 0
    fi
    sleep 1
  done
  return 1
}

start_server() {
  cd "${ROOT_DIR}"

  if is_running; then
    echo "Server laeuft bereits auf http://${HOST}:${PORT}"
    return 0
  fi

  nohup npm run dev > "${LOG_FILE}" 2>&1 &
  disown || true

  if wait_until_ready; then
    echo "Server gestartet: http://${HOST}:${PORT}"
    return 0
  fi

  echo "Server konnte nicht gestartet werden. Letzte Logs:"
  tail -n 80 "${LOG_FILE}" || true
  return 1
}

stop_server() {
  if is_running; then
    lsof -tiTCP:"${PORT}" -sTCP:LISTEN | xargs kill -TERM >/dev/null 2>&1 || true
    sleep 1
  fi

  pkill -f "next dev" >/dev/null 2>&1 || true

  if is_running; then
    lsof -tiTCP:"${PORT}" -sTCP:LISTEN | xargs kill -KILL >/dev/null 2>&1 || true
  fi

  echo "Server gestoppt."
}

show_status() {
  if is_running; then
    echo "Server ist online: http://${HOST}:${PORT}"
    lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN | sed -n '1,5p'
  else
    echo "Server ist offline."
  fi
}

open_browser() {
  start_server
  if command -v open >/dev/null 2>&1; then
    open "http://${HOST}:${PORT}"
  else
    echo "Bitte im Browser oeffnen: http://${HOST}:${PORT}"
  fi
}

case "${1:-}" in
  start)
    start_server
    ;;
  stop)
    stop_server
    ;;
  restart)
    stop_server
    start_server
    ;;
  status)
    show_status
    ;;
  open)
    open_browser
    ;;
  *)
    echo "Verwendung: $0 {start|stop|restart|status|open}"
    exit 1
    ;;
esac
