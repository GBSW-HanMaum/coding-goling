# 06. 디자인 시스템 참고 (이미 구현 완료 — 새로 만들지 말 것)

`tailwind.config.ts`에 이미 다 정의돼 있음. 새 화면(온보딩 등) 만들 때 아래 토큰만 그대로 재사용.

## 컬러
- **브랜드/CTA**: `coral` (#ff6b4a) — 버튼, 로고
- **정답/완료**: `feather` (#58cc02, 듀오링고 그린) — 정답 표시 전용, 브랜드색과 분리해서 씀
- **정보/포인트**: `macaw` (#1cb0f6) — 에너지 아이콘, 선택 강조 배경(`macaw-light`)
- **오답/경고**: `cardinal` (#ff4b4b)
- **XP/젬**: `bee` (#ffc800, 골드)
- **스트릭**: `violet` (#7c6bf0)
- **중립**: `eel`(본문 텍스트) / `wolf`(보조 텍스트) / `hare`(흐린 텍스트) / `swan`(테두리) / `polar`(옅은 배경)

## 컴포넌트 패턴 (새 화면 만들 때 이 클래스 조합 그대로 따라가기)
- 카드: `rounded-2xl border-2 border-swan p-5`
- 버튼: `components/ui/Button.tsx`의 `buttonVariants` 재사용 (`primary`/`secondary`/`primaryOutline`/`ghost`/`sidebar`/`sidebarActive`)
- 정답/오답 결과 박스: `border-feather/40 bg-feather-light` / `border-cardinal/40 bg-cardinal-light`
- 애니메이션: `animate-bounce-in`(등장), `animate-wiggle`(오답 흔들림) 이미 keyframe 정의됨
- 폰트: Nunito(본문), JetBrains Mono류(코드)

## 마스코트
- 이름 "코리(Cory)", 코랄빛 앵무새 컨셉, `components/Mascot.tsx`
- `mood`, `celebrate`, `shake`, `interactive` props로 상황별 리액션 이미 지원
- **언어별 캐릭터 스킨은 아직 없음** — 온보딩(01번 문서)에서 언어 선택 시 다른 캐릭터/컬러 보여주고 싶으면
  `Mascot`에 `variant?: Language` prop 추가해서 언어별 색상만 다르게 주는 정도로 확장 추천 (전혀 새로 그릴 필요 없이 `mood`/색상 변형만)
