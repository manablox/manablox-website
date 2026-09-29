#!/usr/bin/env bash
# Build the production image from docker/Dockerfile.website: the prerendered website
# behind nginx, named <prefix>/website:<tag> (ghcr.io/manablox/website:0.50.0 by default),
# the name the release workflow pushes. CI builds with the docker actions instead, for the
# layer cache; the Dockerfile is the same.
#
# `@manablox/*` installs from the registry the repository's `.npmrc` names (the CMS's local
# registry in development, README.md "Development"), else from npmjs.
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib/common.sh"
cd "$ROOT"

prefix="${IMAGE_PREFIX:-ghcr.io/manablox}"
tag=""
push=false
registry=""

usage() {
  cat <<'USAGE'
Usage: scripts/docker-build.sh [options]

  --tag <tag>        image tag (default: the version in package.json, e.g. 0.50.0)
  --prefix <name>    registry and namespace (default: $IMAGE_PREFIX or ghcr.io/manablox)
  --registry <url>   where @manablox/* installs from (default: the @manablox:registry of
                     .npmrc, else npmjs)
  --push             push the image after building it (log in to the registry first)
  -h, --help         this message

Build arguments of the site (WEBSITE_URL, LICENSE_PORTAL_URL, LICENSE_API, CHANGELOG_URL,
CHANGELOG_STRICT, ANALYTICS_ORIGIN) are passed on from the environment when set.
USAGE
}

while [ $# -gt 0 ]; do
  case "$1" in
    --tag) tag="${2:?--tag needs a tag}"; shift ;;
    --prefix) prefix="${2:?--prefix needs a name}"; shift ;;
    --registry) registry="${2:?--registry needs a URL}"; shift ;;
    --push) push=true ;;
    -h|--help) usage; exit 0 ;;
    *) usage_error "unknown option '$1'" ;;
  esac
  shift
done

if [ -z "$tag" ]; then
  tag="$(sed -nE 's/^  "version": "([^"]+)",?$/\1/p' package.json | head -n1)"
  [ -n "$tag" ] || die "could not read the version from package.json; pass --tag"
fi
if [ -z "$registry" ] && [ -f .npmrc ]; then
  registry="$(sed -nE 's/^@manablox:registry=(.+)$/\1/p' .npmrc | head -n1)"
fi

require_docker

args=()
if [ -n "$registry" ]; then
  args+=(--build-arg "MANABLOX_REGISTRY=$registry")
  # The local registry listens on the host's loopback only, which the build reaches
  # through the host's network.
  case "$registry" in
    http://localhost:*|http://127.0.0.1:*) args+=(--network host) ;;
  esac
  log "installing @manablox/* from $registry"
fi
for name in WEBSITE_URL LICENSE_PORTAL_URL LICENSE_API CHANGELOG_URL CHANGELOG_STRICT ANALYTICS_ORIGIN; do
  if [ -n "${!name:-}" ]; then args+=(--build-arg "$name=${!name}"); fi
done

name="$prefix/website:$tag"
log "building $name from docker/Dockerfile.website"
DOCKER_BUILDKIT=1 docker build \
  --file docker/Dockerfile.website \
  --tag "$name" \
  --label "org.opencontainers.image.source=https://github.com/manablox/manablox-website" \
  --label "org.opencontainers.image.version=$tag" \
  "${args[@]}" \
  .

if [ "$push" = true ]; then
  log "pushing $name"
  docker push "$name"
fi

log "built: $name"
