#!/usr/bin/env python3
"""
코드런 백엔드 E2E 검증 — 시나리오 3개.

실제로 서버에 HTTP 요청을 날려서 응답을 확인한다. (표준 라이브러리만 사용, 의존성 없음)

  시나리오 1 · 신규 유저 온보딩   : 회원가입 → 온보딩 동기화 → 진행상황/기본 퀘스트 생성
  시나리오 2 · 학습 루프          : 레슨 완료(xp·젬·에너지·스트릭·오답기록) → 힌트 에너지 차감 → 리더보드
  시나리오 3 · 상점 & 프로필      : 젬 검증 구매 → 잔액 부족 거부 → 인벤토리 → 취약 개념 집계

사용법:
  python3 verify.py                       # http://localhost:8080 기준
  python3 verify.py --base-url http://... # 다른 서버
  python3 verify.py --keep                # 테스트 계정 남기기 (기본: 정리 시도)
"""

import argparse
import json
import subprocess
import sys
import time
import urllib.error
import urllib.request

BASE_URL = "http://localhost:8080/api/v1"

# ─────────────────────────────────────────────────────────── 출력 유틸

GREEN, RED, YELLOW, DIM, BOLD, RESET = (
    "\033[32m",
    "\033[31m",
    "\033[33m",
    "\033[2m",
    "\033[1m",
    "\033[0m",
)

passed = 0
failed = 0
failures: list[str] = []


def check(label: str, actual, expected=None, predicate=None) -> bool:
    """expected 와 같은지, 또는 predicate 가 참인지 확인하고 결과를 출력한다."""
    global passed, failed

    if predicate is not None:
        ok = predicate(actual)
        want = "(조건 충족)"
    else:
        ok = actual == expected
        want = repr(expected)

    if ok:
        passed += 1
        print(f"  {GREEN}✓{RESET} {label} {DIM}= {actual!r}{RESET}")
    else:
        failed += 1
        failures.append(label)
        print(f"  {RED}✗ {label}{RESET}")
        print(f"      기대: {want}")
        print(f"      실제: {actual!r}")
    return ok


def section(title: str) -> None:
    print(f"\n{BOLD}{title}{RESET}")


# ─────────────────────────────────────────────────────────── HTTP


class ApiError(Exception):
    def __init__(self, status: int, code: str, message: str, fields):
        super().__init__(f"{status} {code}: {message}")
        self.status = status
        self.code = code
        self.message = message
        self.fields = fields


def request(method: str, path: str, body=None, token: str | None = None):
    """공통 응답 포맷을 벗겨 data 를 돌려준다. 실패하면 ApiError."""
    url = f"{BASE_URL}{path}"
    data = json.dumps(body).encode() if body is not None else None
    headers = {}
    if data:
        headers["Content-Type"] = "application/json"
    if token:
        headers["Authorization"] = f"Bearer {token}"

    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            payload = json.loads(res.read())
            return payload.get("data")
    except urllib.error.HTTPError as e:
        raw = e.read()
        try:
            payload = json.loads(raw)
            err = payload.get("error") or {}
        except json.JSONDecodeError:
            err = {}
        raise ApiError(
            e.code,
            err.get("code", "UNKNOWN"),
            err.get("message", raw.decode(errors="replace")[:200]),
            err.get("fields"),
        ) from None
    except urllib.error.URLError as e:
        print(f"\n{RED}서버에 연결할 수 없습니다: {url}{RESET}")
        print(f"  {e.reason}")
        print(f"  {DIM}백엔드를 먼저 띄우세요: cd CodingGoling-Be && ./gradlew bootRun{RESET}")
        sys.exit(2)


def expect_error(label: str, fn, status: int, code: str) -> None:
    """호출이 특정 에러로 거부되는지 확인 (성공하면 실패로 친다)."""
    global passed, failed
    try:
        fn()
    except ApiError as e:
        if e.status == status and e.code == code:
            passed += 1
            print(f"  {GREEN}✓{RESET} {label} {DIM}= {e.status} {e.code}{RESET}")
            return
        failed += 1
        failures.append(label)
        print(f"  {RED}✗ {label}{RESET}")
        print(f"      기대: {status} {code}")
        print(f"      실제: {e.status} {e.code}")
        return

    failed += 1
    failures.append(label)
    print(f"  {RED}✗ {label}{RESET}")
    print(f"      기대: {status} {code} 로 거부")
    print(f"      실제: 요청이 성공해버림")


# ─────────────────────────────────────────────────────────── 시나리오


def scenario_1_onboarding(stamp: str) -> dict:
    """신규 유저가 게스트로 온보딩을 마치고 가입하는 흐름."""
    print(f"\n{BOLD}━━ 시나리오 1 · 신규 유저 온보딩 ━━{RESET}")

    email = f"verify-s1-{stamp}@test.com"

    section("회원가입")
    auth = request(
        "POST",
        "/auth/signup",
        {"email": email, "password": "pw123456", "nickname": f"검증유저{stamp[-4:]}"},
    )
    token = auth["access_token"]
    check("access_token 발급", bool(token), predicate=lambda v: v is True)
    check("가입 직후 온보딩 미완료", auth["onboarding_completed"], False)

    section("가입 시 서버가 만들어주는 것들")
    progress = request("GET", "/progress", token=token)
    check("초기 XP", progress["xp"], 0)
    check("초기 에너지", progress["energy"], 25)
    check("초기 젬", progress["gems"], 500)
    check("초기 스트릭", progress["streak_count"], 1)

    quests = request("GET", "/quests", token=token)
    check("기본 퀘스트 3개 생성", len(quests), 3)
    check("퀘스트는 AI 생성이 아님", all(not q["ai_generated"] for q in quests), True)

    section("게스트 온보딩 결과 동기화 (진단으로 유닛1 건너뜀)")
    me = request(
        "POST",
        "/onboarding/sync",
        {
            "language": "PYTHON",
            "learning_goal": "job",
            "self_reported_level": "syntax",
            "daily_goal_minutes": 10,
            "starting_unit_id": "py-u2",
            "diagnostic_score_ratio": 0.83,
            "completed_lesson_ids": ["py-u1-l1", "py-u1-l2", "py-u1-l3"],
        },
        token=token,
    )
    check("온보딩 완료 처리", me["onboarding_completed"], True)
    check("선택 언어 저장", me["selected_language"], "PYTHON")
    check("일일 목표 저장", me["daily_goal_minutes"], 10)
    check("학습 목표 저장", me["learning_goal"], "job")

    progress = request("GET", "/progress", token=token)
    check("건너뛴 레슨 3개가 완료 처리됨", sorted(progress["completed_lesson_ids"]),
          ["py-u1-l1", "py-u1-l2", "py-u1-l3"])

    section("중복 호출 방어 (idempotent)")
    me2 = request(
        "POST",
        "/onboarding/sync",
        {"language": "C", "learning_goal": "hacked", "daily_goal_minutes": 99},
        token=token,
    )
    check("재호출해도 언어가 덮이지 않음", me2["selected_language"], "PYTHON")
    check("재호출해도 일일목표가 덮이지 않음", me2["daily_goal_minutes"], 10)

    section("인증 경계")
    expect_error(
        "같은 이메일 재가입 거부",
        lambda: request("POST", "/auth/signup",
                        {"email": email, "password": "pw123456", "nickname": "중복"}),
        409, "E001",
    )
    expect_error(
        "틀린 비밀번호 거부",
        lambda: request("POST", "/auth/login", {"email": email, "password": "wrongpw!"}),
        401, "E002",
    )
    expect_error(
        "토큰 없이 진행상황 조회 거부",
        lambda: request("GET", "/progress"),
        401, "E007",
    )
    expect_error(
        "없는 경로는 404 (500 아님)",
        lambda: request("GET", "/auth/nope", token=token),
        404, "E008",
    )
    expect_error(
        "입력 검증 실패",
        lambda: request("POST", "/auth/signup",
                        {"email": "not-an-email", "password": "123", "nickname": ""}),
        400, "E000",
    )

    return {"email": email, "token": token}


def scenario_2_learning_loop(ctx: dict) -> None:
    """레슨을 풀고 XP·에너지·젬·스트릭이 서버에 반영되는 흐름."""
    print(f"\n{BOLD}━━ 시나리오 2 · 학습 루프 ━━{RESET}")
    token = ctx["token"]

    section("레슨 완료 (1문제 오답 후 정답 → 정답률 0.67)")
    progress = request(
        "POST",
        "/progress/lesson-complete",
        {
            "lesson_id": "py-u2-l1",
            "score_ratio": 0.67,
            "xp_earned": 15,
            "gems_earned": 10,
            "energy_delta": 3,
            "attempts": [
                {"challenge_id": "py-u2-l1-c1", "correct": False},
                {"challenge_id": "py-u2-l1-c1", "correct": True},
                {"challenge_id": "py-u2-l1-c2", "correct": True},
                {"challenge_id": "py-u2-l1-c3", "correct": True},
            ],
        },
        token=token,
    )
    check("XP 적립", progress["xp"], 15)
    check("젬 적립", progress["gems"], 510)
    check("에너지는 상한 25를 넘지 않음", progress["energy"], 25)
    check("레슨이 완료 목록에 추가", "py-u2-l1" in progress["completed_lesson_ids"], True)
    check("학습일 기록 (스트릭 갱신)", progress["last_active_date"] is not None, True)

    section("같은 레슨 재완료 (중복 행 없이 보상만)")
    before = len(progress["completed_lesson_ids"])
    progress = request(
        "POST",
        "/progress/lesson-complete",
        {"lesson_id": "py-u2-l1", "score_ratio": 1.0, "xp_earned": 5,
         "gems_earned": 0, "energy_delta": 0},
        token=token,
    )
    check("XP는 추가 적립", progress["xp"], 20)
    check("완료 레슨 수는 그대로 (유니크 제약)", len(progress["completed_lesson_ids"]), before)
    check("같은 날 재학습은 스트릭 유지", progress["streak_count"], 1)

    section("에너지 — 힌트 사용/충전 및 clamp")
    progress = request("POST", "/progress/energy", {"delta": -2}, token=token)
    check("힌트로 2 차감", progress["energy"], 23)

    progress = request("POST", "/progress/energy", {"delta": 999}, token=token)
    check("상한 clamp (25 초과 불가)", progress["energy"], 25)

    progress = request("POST", "/progress/energy", {"delta": -999}, token=token)
    check("하한 clamp (0 미만 불가)", progress["energy"], 0)

    request("POST", "/progress/energy", {"delta": 25}, token=token)  # 복구

    section("리더보드")
    board = request("GET", "/leaderboard", token=token)
    check("데모 라이벌 포함 랭킹 조회", len(board) >= 8, True)
    check("순위가 XP 내림차순", all(
        board[i]["xp"] >= board[i + 1]["xp"] for i in range(len(board) - 1)), True)

    me_rows = [r for r in board if r["is_me"]]
    check("내 행이 정확히 1개", len(me_rows), 1)
    if me_rows:
        check("내 XP가 리더보드에 반영", me_rows[0]["xp"], 20)


def scenario_3_shop_profile(ctx: dict) -> None:
    """젬 검증 구매와 취약 개념 집계."""
    print(f"\n{BOLD}━━ 시나리오 3 · 상점 & 프로필 ━━{RESET}")
    token = ctx["token"]

    section("상점 목록")
    items = request("GET", "/shop/items", token=token)
    check("시드 아이템 4종", len(items), 4)
    check("아직 아무것도 보유하지 않음", any(i["owned"] for i in items), False)

    section("구매 (젬 510 → c-track 300 구매)")
    result = request("POST", "/shop/purchase", {"item_id": "c-track"}, token=token)
    check("젬이 정확히 차감", result["progress"]["gems"], 210)

    inventory = request("GET", "/shop/inventory", token=token)
    check("인벤토리에 기록", [i["id"] for i in inventory], ["c-track"])

    items = request("GET", "/shop/items", token=token)
    owned = next(i for i in items if i["id"] == "c-track")
    check("목록에 '보유 중' 표시", owned["owned"], True)

    section("젬 잔액 검증 (서버가 막는다)")
    expect_error(
        "젬 부족 시 구매 거부 (210젬 < 300젬)",
        lambda: request("POST", "/shop/purchase", {"item_id": "c-track"}, token=token),
        400, "E011",
    )
    progress = request("GET", "/progress", token=token)
    check("거부된 구매는 젬을 깎지 않음", progress["gems"], 210)

    expect_error(
        "없는 아이템 구매 거부",
        lambda: request("POST", "/shop/purchase", {"item_id": "nonexistent"}, token=token),
        404, "E010",
    )

    section("refill — 에너지를 최대로 채우는 특수 동작")
    request("POST", "/progress/energy", {"delta": -10}, token=token)
    before = request("GET", "/progress", token=token)
    check("에너지 소모 확인", before["energy"], 15)

    result = request("POST", "/shop/purchase", {"item_id": "refill"}, token=token)
    check("refill 구매 후 에너지 최대", result["progress"]["energy"], 25)
    check("refill 젬 차감 (210 - 200)", result["progress"]["gems"], 10)

    section("취약 개념 (challenge_attempt 집계)")
    weak = request("GET", "/profile/weak-concepts", token=token)
    check("한 번이라도 틀린 문제만 반환", len(weak), 1)
    if weak:
        row = weak[0]
        check("오답 문제 id", row["challenge_id"], "py-u2-l1-c1")
        check("시도 횟수", row["attempt_count"], 2)
        check("오답 횟수", row["wrong_count"], 1)
        check("정답률 계산", row["accuracy"], 0.5)

    all_correct = [w for w in weak if w["wrong_count"] == 0]
    check("한 번도 안 틀린 문제는 제외됨", len(all_correct), 0)


def scenario_4_execution(ctx: dict) -> None:
    """C/Java Docker 실행 (03번 문서). Docker 가 필요하고 느리므로 --exec 로만 켠다."""
    print(f"\n{BOLD}━━ 시나리오 4 · C/Java 코드 실행 (Docker) ━━{RESET}")
    token = ctx["token"]

    def run(language: str, code: str, stdin: str = ""):
        return request("POST", "/execute",
                       {"language": language, "code": code, "stdin": stdin}, token=token)

    section("C — 정상 실행 (stdin 두 수의 합)")
    r = run("C",
            '#include <stdio.h>\nint main(void){int a,b;scanf("%d %d",&a,&b);'
            'printf("%d\\n",a+b);return 0;}',
            "3 5")
    check("stdout", r["stdout"].strip(), "8")
    check("타임아웃 아님", r["timed_out"], False)
    check("컴파일 에러 아님", r["compile_error"], None)

    section("Java — 정상 실행 (stdin 곱셈)")
    r = run("JAVA",
            "import java.util.Scanner;public class Main{public static void main(String[] a){"
            "Scanner s=new Scanner(System.in);System.out.println(s.nextInt()*s.nextInt());}}",
            "6 7")
    check("stdout", r["stdout"].strip(), "42")

    section("컴파일 에러는 compile_error 로 분류")
    r = run("C", '#include <stdio.h>\nint main(void){printf("hi")\nreturn 0;}')
    check("compile_error 채워짐", bool(r["compile_error"]), True)
    check("stdout 은 비어 있음", r["stdout"], "")

    section("런타임 크래시는 compile_error 아님 (segfault)")
    r = run("C", "#include <stdio.h>\nint main(void){int*p=0;*p=1;return 0;}")
    check("compile_error 아님 (컴파일은 성공)", r["compile_error"], None)
    check("타임아웃 아님", r["timed_out"], False)

    section("무한 루프는 타임아웃 처리")
    r = run("C", "int main(void){while(1){}return 0;}")
    check("timed_out", r["timed_out"], True)

    section("격리 — 네트워크 차단 (--network none)")
    r = run("JAVA",
            "import java.net.*;public class Main{public static void main(String[] a){try{"
            'new URL("http://example.com").openStream();System.out.println("VULNERABLE");}'
            'catch(Exception e){System.out.println("blocked");}}}')
    check("네트워크 접근이 막힘", r["stdout"].strip(), "blocked")

    section("격리 — 호스트 루트 파일시스템 쓰기 차단 (--read-only)")
    r = run("C",
            '#include <stdio.h>\nint main(void){FILE*w=fopen("/evil.txt","w");'
            'printf(w?"VULNERABLE\\n":"blocked\\n");return 0;}')
    check("루트 쓰기가 막힘", r["stdout"].strip(), "blocked")

    section("지원하지 않는 언어는 거부 (Python 은 브라우저 실행)")
    expect_error(
        "PYTHON 실행 요청 거부",
        lambda: run("PYTHON", "print(1)"),
        400, "E000",
    )


# ─────────────────────────────────────────────────────────── 정리


def cleanup(emails: list[str]) -> None:
    """검증용 계정을 DB에서 지운다 (mysql 클라이언트가 있을 때만)."""
    if not emails:
        return
    in_list = ",".join(f"'{e}'" for e in emails)
    sql = f"DELETE FROM users WHERE email IN ({in_list});"  # FK ON DELETE CASCADE
    try:
        subprocess.run(
            ["mysql", "-h", "127.0.0.1", "-u", "root", "-pmysql", "codingoling_db", "-e", sql],
            check=True, capture_output=True, timeout=15,
        )
        print(f"\n{DIM}검증 계정 {len(emails)}개 정리 완료{RESET}")
    except (subprocess.CalledProcessError, FileNotFoundError, subprocess.TimeoutExpired):
        print(f"\n{YELLOW}검증 계정을 자동 정리하지 못했습니다 (수동 삭제 필요){RESET}")
        for e in emails:
            print(f"  {DIM}{e}{RESET}")


# ─────────────────────────────────────────────────────────── 메인


def main() -> int:
    global BASE_URL

    parser = argparse.ArgumentParser(description="코드런 백엔드 E2E 검증")
    parser.add_argument("--base-url", default=BASE_URL, help="API 베이스 URL")
    parser.add_argument("--keep", action="store_true", help="테스트 계정을 지우지 않는다")
    parser.add_argument("--exec", action="store_true",
                        help="시나리오 4(C/Java Docker 실행)도 돌린다 — Docker 필요, 느림")
    args = parser.parse_args()
    BASE_URL = args.base_url.rstrip("/")

    print(f"{BOLD}코드런 백엔드 검증{RESET}  {DIM}{BASE_URL}{RESET}")

    health = request("GET", "/health")
    check("서버 헬스체크", health, "ok")

    stamp = str(int(time.time()))
    started = time.time()

    ctx = scenario_1_onboarding(stamp)
    scenario_2_learning_loop(ctx)
    scenario_3_shop_profile(ctx)
    if args.exec:
        scenario_4_execution(ctx)

    if not args.keep:
        cleanup([ctx["email"]])

    elapsed = time.time() - started
    total = passed + failed
    print(f"\n{BOLD}{'─' * 52}{RESET}")
    if failed == 0:
        print(f"{GREEN}{BOLD}통과 {passed}/{total}{RESET}  {DIM}({elapsed:.1f}s){RESET}")
        return 0

    print(f"{RED}{BOLD}실패 {failed}/{total}{RESET}  {DIM}({elapsed:.1f}s){RESET}")
    for f in failures:
        print(f"  {RED}·{RESET} {f}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
