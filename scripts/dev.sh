#!/usr/bin/env bash
# Control the development docker compose stack: the website in Vite's dev server.
#
# Every command is a thin wrapper around `docker compose -f docker/compose.dev.yml`, so
# the stack can be driven without node or pnpm on the host. Arguments after the command
# are passed straight through to docker compose (e.g. `dev.sh logs website -n 100`).
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib/common.sh"

usage() {
  cat <<'USAGE'
Usage: scripts/dev.sh <command> [docker compose args...]

  up               build and start the stack in the background
  down             stop the stack
  logs             follow the logs
  reset            stop the stack, delete its containers and volumes, and remove the
                   build output (dist/, dist-ssr/)
  services:up      the same as `up`: the website has no backing services
  services:down    stop the stack (same as `down`)
  <other>          any other docker compose command, forwarded as-is

  -h, --help       this message

Port: website 3005. `pnpm install` in the stack reads @manablox/* from the CMS's local
registry (http://verdaccio:4873 on the docker network manablox-registry), so the CMS
stack must be up first (`pnpm dev:services` in manablox-cms).
USAGE
}

if [ $# -eq 0 ]; then
  usage >&2
  exit 2
fi

command="$1"
shift

case "$command" in
  -h|--help) usage; exit 0 ;;
esac

require_docker

registry_network() {
  docker network inspect manablox-registry >/dev/null 2>&1 \
    || die "the docker network manablox-registry is missing; start the CMS stack first (pnpm dev:services in manablox-cms)"
}

case "$command" in
  up|services:up|services-up)
    registry_network
    # `up -d --wait` returns once the website answers its healthcheck.
    compose up -d --build --wait "$@"
    printf '\n  website      http://localhost:3005\n'
    ;;
  down|services:down|services-down) compose down "$@" ;;
  logs) compose logs -f "$@" ;;
  reset)
    compose down -v --remove-orphans "$@"
    rm -rf "$ROOT/dist" "$ROOT/dist-ssr"
    ;;
  *) compose "$command" "$@" ;;
esac
