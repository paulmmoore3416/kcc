#!/bin/bash
# Build and install KCC as systemd user services (standalone, no Kubernetes).
# Usage: deploy/standalone/install.sh   (run from anywhere inside the repo)
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
mkdir -p ~/.local/share/kcc ~/.config/kcc ~/.config/systemd/user
[ -f ~/.config/kcc/kcc.env ] || { cp "$ROOT/deploy/standalone/kcc.env.example" ~/.config/kcc/kcc.env; chmod 600 ~/.config/kcc/kcc.env; }

echo "Building backend..."
(cd "$ROOT/backend" && go build -o ~/.local/share/kcc/kcc-backend ./cmd/server)

echo "Building dashboard..."
API="$(grep -E '^KCC_HTTP_ADDR=' ~/.config/kcc/kcc.env | cut -d= -f2)"
(cd "$ROOT/frontend" && npm ci --no-audit --no-fund && NEXT_PUBLIC_KCC_API="http://${API:-127.0.0.1:8080}" npm run build)

sed "s#%h/kcc/frontend#$ROOT/frontend#" "$ROOT/deploy/standalone/kcc-frontend.service" > ~/.config/systemd/user/kcc-frontend.service
cp "$ROOT/deploy/standalone/kcc-backend.service" ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now kcc-backend.service kcc-frontend.service
echo "KCC is running: http://127.0.0.1:4200/dashboard (Mining Ops tab)"
