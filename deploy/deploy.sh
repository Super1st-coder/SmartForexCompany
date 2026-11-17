#!/usr/bin/env bash
# Deploy the local working tree to the VPS and roll the Docker Swarm service.
#
#   ./deploy/deploy.sh          (or: npm run deploy)
#
# Steps:
#   1. Pack the local project (no node_modules, .next, .git, .env*).
#   2. Upload to /opt/smartforexpro.new on the VPS, carry over the server's .env* files.
#   3. Build the Docker image there. If the build fails, the live site is untouched.
#   4. Swap folders (old one kept as /opt/smartforexpro.prev) and update the service.
#   5. Wait for the new container to be running and check https://smartforexpro.com.
#
# Rollback: ./deploy/deploy.sh --rollback  (re-points the service to the previous image)

set -euo pipefail

SSH_HOST="${SSH_HOST:-bnby}"            # alias from ~/.ssh/config
REMOTE_DIR="/opt/smartforexpro"
IMAGE="smartforexpro-app"
SERVICE="smartforexpro_app"
SITE_URL="https://smartforexpro.com"

cd "$(dirname "$0")/.."

if [[ "${1:-}" == "--rollback" ]]; then
  echo "==> Rolling back $SERVICE to the previous image"
  ssh "$SSH_HOST" "docker service rollback $SERVICE"
  exit 0
fi

REV="$(git rev-parse --short HEAD 2>/dev/null || echo nogit)"
[[ -n "$(git status --porcelain 2>/dev/null)" ]] && REV="${REV}-dirty"
TAG="$(date +%Y%m%d-%H%M%S)-${REV}"

echo "==> Uploading working tree to $SSH_HOST:$REMOTE_DIR.new (tag $TAG)"
tar -czf - \
  --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude='./.env*' \
  --exclude=./.githooks --exclude='*.tsbuildinfo' --exclude=./.claude \
  . | ssh "$SSH_HOST" "set -e
    rm -rf $REMOTE_DIR.new && mkdir -p $REMOTE_DIR.new
    tar -xzf - -C $REMOTE_DIR.new
    cp -p $REMOTE_DIR/.env* $REMOTE_DIR.new/ 2>/dev/null || true"

echo "==> Building image $IMAGE:$TAG on the VPS (live site keeps running)"
ssh "$SSH_HOST" "set -e
  cd $REMOTE_DIR.new
  docker build -q -t $IMAGE:$TAG -t $IMAGE:latest . "

echo "==> Switching folders and updating service $SERVICE"
ssh "$SSH_HOST" "set -e
  rm -rf $REMOTE_DIR.prev
  mv $REMOTE_DIR $REMOTE_DIR.prev
  mv $REMOTE_DIR.new $REMOTE_DIR
  docker service update --quiet --detach=false --update-order start-first --image $IMAGE:$TAG $SERVICE
  docker service ps $SERVICE --filter desired-state=running --format '{{.Image}}  {{.CurrentState}}' | head -1
  docker image prune -f --filter 'until=168h' >/dev/null 2>&1 || true"

echo "==> Checking $SITE_URL"
CODE=000
for _ in 1 2 3 4 5 6; do
  # checked from the VPS itself so a flaky local network can't cause a false alarm
  CODE="$(ssh "$SSH_HOST" "curl -s -o /dev/null -m 15 -w '%{http_code}' $SITE_URL" || true)"
  [[ "$CODE" == "200" ]] && break
  sleep 5
done
if [[ "$CODE" == "200" ]]; then
  echo "==> Deployed $TAG — $SITE_URL is up (HTTP 200)"
else
  echo "!! $SITE_URL returned HTTP $CODE. Check: ssh $SSH_HOST 'docker service logs --tail 50 $SERVICE'"
  echo "!! Roll back with: ./deploy/deploy.sh --rollback"
  exit 1
fi
