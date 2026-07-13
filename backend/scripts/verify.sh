#!/usr/bin/env bash
#
# 코드런 백엔드 검증 러너.
#   - MySQL / 백엔드가 떠 있는지 먼저 확인하고
#   - 백엔드가 없으면 (--boot 옵션 시) 직접 띄운 뒤
#   - verify.py 의 시나리오 3개를 돌린다.
#
# 사용법:
#   ./scripts/verify.sh              # 이미 떠 있는 서버에 대고 검증
#   ./scripts/verify.sh --boot       # 백엔드를 직접 띄우고 검증 후 종료
#   ./scripts/verify.sh --keep       # 테스트 계정 남기기
#
set -uo pipefail

BASE_URL="${BASE_URL:-http://localhost:8080/api/v1}"
DB_NAME="${DB_NAME:-codingoling_db}"
DB_PASSWORD="${DB_PASSWORD:-mysql}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BOOT=false
PY_ARGS=()

for arg in "$@"; do
  case "$arg" in
    --boot) BOOT=true ;;
    *) PY_ARGS+=("$arg") ;;
  esac
done

GREEN=$'\033[32m'; RED=$'\033[31m'; YELLOW=$'\033[33m'; DIM=$'\033[2m'; RESET=$'\033[0m'
ok()   { echo "  ${GREEN}✓${RESET} $1"; }
warn() { echo "  ${YELLOW}!${RESET} $1"; }
die()  { echo "  ${RED}✗${RESET} $1"; exit 1; }

BOOT_PID=""
cleanup() {
  if [[ -n "$BOOT_PID" ]]; then
    echo "${DIM}백엔드 종료 (pid $BOOT_PID)${RESET}"
    kill "$BOOT_PID" 2>/dev/null
  fi
}
trap cleanup EXIT

echo "사전 점검"

# 1. MySQL — 스키마가 실제로 들어가 있는지까지 본다
if ! command -v mysql >/dev/null 2>&1; then
  warn "mysql 클라이언트 없음 — DB 점검과 계정 정리를 건너뜁니다"
else
  tables=$(mysql -h 127.0.0.1 -u root -p"$DB_PASSWORD" "$DB_NAME" \
            -N -e "SHOW TABLES;" 2>/dev/null | wc -l | tr -d ' ')
  if [[ "$tables" -lt 7 ]]; then
    die "DB '$DB_NAME' 에 테이블이 부족합니다 (${tables}개). 먼저: mysql -u root -p < docs/schema.sql"
  fi
  ok "MySQL — $DB_NAME 테이블 ${tables}개"
fi

# 2. 백엔드
health_url="${BASE_URL}/health"
if curl -sf -o /dev/null "$health_url"; then
  ok "백엔드 응답 중 — $BASE_URL"
elif [[ "$BOOT" == true ]]; then
  echo "  ${DIM}백엔드를 띄웁니다…${RESET}"
  (cd "$ROOT" && ./gradlew bootRun --console=plain >/tmp/coderun-verify-boot.log 2>&1) &
  BOOT_PID=$!
  for _ in $(seq 1 60); do
    curl -sf -o /dev/null "$health_url" && break
    sleep 2
  done
  curl -sf -o /dev/null "$health_url" \
    || die "백엔드 기동 실패 — 로그: /tmp/coderun-verify-boot.log"
  ok "백엔드 기동 완료"
else
  die "백엔드가 응답하지 않습니다. './gradlew bootRun' 으로 띄우거나 --boot 을 붙이세요."
fi

command -v python3 >/dev/null 2>&1 || die "python3 가 필요합니다"

# 3. 시나리오 실행
echo
# macOS 기본 bash(3.2)에서는 set -u + 빈 배열 확장이 에러이므로 개수를 먼저 본다
if [[ ${#PY_ARGS[@]} -gt 0 ]]; then
  python3 "$ROOT/scripts/verify.py" --base-url "$BASE_URL" "${PY_ARGS[@]}"
else
  python3 "$ROOT/scripts/verify.py" --base-url "$BASE_URL"
fi
exit $?
