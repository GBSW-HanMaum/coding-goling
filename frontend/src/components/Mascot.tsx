type MascotProps = {
  size?: number;
  mood?: "happy" | "sad";
  animate?: boolean;
  interactive?: boolean; // 마우스 올리면 신나서 통통
  celebrate?: boolean; // 정답! 폴짝 뛰며 축하
  shake?: boolean; // 오답… 시무룩 흔들림
  className?: string;
};

/**
 * 코드런 마스코트 "코리(Cory)" — 코랄빛 앵무새.
 * 앵무새는 듣고 따라 하며 배운다 → "매일 반복 학습" 컨셉과 맞고,
 * 홍금강앵무(scarlet macaw)의 코랄 톤이 브랜드 색과 일치한다.
 *
 * 입체감: 방사형 그라데이션 음영 + 하이라이트 + 바닥 그림자.
 * 생동감: 둥실 떠오르기 · 고개 갸웃 · 눈 깜빡임 · 날개 파닥 · 볏 흔들림.
 * 인터랙션: hover 시 통통, 정답 시 축하 점프, 오답 시 흔들림.
 *   (transform 기반이라 크기와 무관하게 매끄럽게 스케일. prefers-reduced-motion 존중)
 */
export const Mascot = ({
  size = 120,
  mood = "happy",
  animate = true,
  interactive = false,
  celebrate = false,
  shake = false,
  className,
}: MascotProps) => {
  const rootClass = [
    className,
    animate && interactive ? "cory-int" : "",
    animate && celebrate ? "cory-celebrate" : "",
    animate && shake ? "cory-shake" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 132"
      className={rootClass || undefined}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="코드런 앵무새 마스코트 코리"
    >
      <defs>
        <radialGradient id="coryBody" cx="38%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ff8f6b" />
          <stop offset="55%" stopColor="#ff6b4a" />
          <stop offset="100%" stopColor="#e14b2a" />
        </radialGradient>
        <radialGradient id="coryHead" cx="36%" cy="26%" r="82%">
          <stop offset="0%" stopColor="#ff9a78" />
          <stop offset="58%" stopColor="#ff6b4a" />
          <stop offset="100%" stopColor="#e2542f" />
        </radialGradient>
        <radialGradient id="coryBelly" cx="50%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#fff5f0" />
          <stop offset="100%" stopColor="#ffd7cc" />
        </radialGradient>
        <linearGradient id="coryBeak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffdc57" />
          <stop offset="100%" stopColor="#e6a600" />
        </linearGradient>
        <radialGradient id="coryWing" cx="50%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#f0532f" />
          <stop offset="100%" stopColor="#c93d1f" />
        </radialGradient>
      </defs>

      <style>{`
        .cory-float{animation:coryFloat 3.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
        .cory-head{animation:coryHead 4.6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 88%}
        .cory-eyes{animation:coryBlink 4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
        .cory-wl{animation:coryWingL 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:82% 18%}
        .cory-wr{animation:coryWingR 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:18% 18%}
        .cory-crest{animation:coryCrest 3.4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
        .cory-shadow{animation:coryShadow 3.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
        .cory-int{cursor:pointer}
        .cory-int:hover .cory-float{animation:coryHop 0.7s ease-in-out infinite}
        .cory-int:hover .cory-eyes{animation:coryWink 0.7s ease-in-out infinite}
        .cory-int:hover .cory-wl{animation:coryWingL 0.5s ease-in-out infinite}
        .cory-int:hover .cory-wr{animation:coryWingR 0.5s ease-in-out infinite}
        .cory-celebrate .cory-float{animation:coryCelebrate 0.9s ease-in-out infinite}
        .cory-celebrate .cory-wl{animation:coryWingL 0.45s ease-in-out infinite}
        .cory-celebrate .cory-wr{animation:coryWingR 0.45s ease-in-out infinite}
        .cory-shake .cory-float{animation:coryShake 0.45s ease-in-out infinite}
        @keyframes coryFloat{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-4px) rotate(-1.4deg)}}
        @keyframes coryHead{0%,100%{transform:rotate(2.2deg)}50%{transform:rotate(-2.2deg)}}
        @keyframes coryBlink{0%,90%,100%{transform:scaleY(1)}94%{transform:scaleY(0.08)}}
        @keyframes coryWink{0%,100%{transform:scaleY(1)}50%{transform:scaleY(0.1)}}
        @keyframes coryWingL{0%,100%{transform:rotate(2deg)}50%{transform:rotate(11deg)}}
        @keyframes coryWingR{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(-11deg)}}
        @keyframes coryCrest{0%,100%{transform:rotate(-3.5deg)}50%{transform:rotate(3.5deg)}}
        @keyframes coryShadow{0%,100%{transform:scaleX(1);opacity:.18}50%{transform:scaleX(.88);opacity:.12}}
        @keyframes coryHop{0%,100%{transform:translateY(0) rotate(0)}30%{transform:translateY(-10px) rotate(-3deg)}60%{transform:translateY(0) rotate(0)}}
        @keyframes coryCelebrate{0%{transform:translateY(0) rotate(0)}20%{transform:translateY(-14px) rotate(-6deg)}45%{transform:translateY(0) rotate(0)}65%{transform:translateY(-8px) rotate(5deg)}100%{transform:translateY(0) rotate(0)}}
        @keyframes coryShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
        @media (prefers-reduced-motion: reduce){svg [class^="cory-"]{animation:none!important}}
      `}</style>

      {/* 바닥 그림자 */}
      <ellipse
        className={animate ? "cory-shadow" : undefined}
        cx="60"
        cy="124"
        rx="30"
        ry="6"
        fill="#000"
        opacity="0.16"
      />

      <g className={animate ? "cory-float" : undefined}>
        {/* 꼬리깃 */}
        <path d="M60 84 L49 116 L60 103 L71 116 Z" fill="#c93d1f" />

        {/* 날개 */}
        <g className={animate ? "cory-wl" : undefined}>
          <ellipse cx="27" cy="74" rx="12" ry="20" fill="url(#coryWing)" />
        </g>
        <g className={animate ? "cory-wr" : undefined}>
          <ellipse cx="93" cy="74" rx="12" ry="20" fill="url(#coryWing)" />
        </g>

        {/* 몸통 */}
        <ellipse cx="60" cy="76" rx="30" ry="26" fill="url(#coryBody)" />
        {/* 배 */}
        <ellipse cx="60" cy="82" rx="17" ry="16" fill="url(#coryBelly)" />
        {/* 몸통 하이라이트 */}
        <ellipse cx="48" cy="64" rx="9" ry="6" fill="#fff" opacity="0.18" />

        {/* 발 */}
        <path
          d="M50 99 L50 107 M45 107 H55"
          stroke="#d99400"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M70 99 L70 107 M65 107 H75"
          stroke="#d99400"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* 머리 + 얼굴 (고개 갸웃) */}
        <g className={animate ? "cory-head" : undefined}>
          {/* 볏 */}
          <g className={animate ? "cory-crest" : undefined}>
            <path d="M60 24 C55 16 55 8 60 4 C65 8 65 16 60 24 Z" fill="#ffc800" />
            <path d="M52 26 C45 18 44 10 50 6 C56 12 57 20 52 26 Z" fill="#ff7a52" />
            <path d="M68 26 C75 18 76 10 70 6 C64 12 63 20 68 26 Z" fill="#ff7a52" />
          </g>

          <circle cx="60" cy="46" r="27" fill="url(#coryHead)" />
          {/* 머리 하이라이트 */}
          <ellipse cx="49" cy="34" rx="8" ry="6" fill="#fff" opacity="0.2" />
          {/* 얼굴 패치 */}
          <ellipse cx="60" cy="44" rx="21" ry="16" fill="url(#coryBelly)" />

          {mood === "happy" ? (
            <g className={animate ? "cory-eyes" : undefined}>
              <circle cx="51" cy="42" r="5.6" fill="#fff" />
              <circle cx="51" cy="42" r="3.3" fill="#3a2f2a" />
              <circle cx="49.6" cy="40.6" r="1.2" fill="#fff" />
              <circle cx="69" cy="42" r="5.6" fill="#fff" />
              <circle cx="69" cy="42" r="3.3" fill="#3a2f2a" />
              <circle cx="67.6" cy="40.6" r="1.2" fill="#fff" />
            </g>
          ) : (
            <g>
              <path d="M46 38 L56 41" stroke="#3a2f2a" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M74 38 L64 41" stroke="#3a2f2a" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="51" cy="44" r="3" fill="#3a2f2a" />
              <circle cx="69" cy="44" r="3" fill="#3a2f2a" />
            </g>
          )}

          {/* 부리 */}
          <path
            d="M52 50 Q60 46 68 50 Q69 61 60 67 Q51 61 52 50 Z"
            fill="url(#coryBeak)"
            stroke="#d99400"
            strokeWidth="1.2"
          />
          <path d="M55 57 Q60 61 65 57" fill="none" stroke="#d99400" strokeWidth="1.4" />
        </g>
      </g>
    </svg>
  );
};
