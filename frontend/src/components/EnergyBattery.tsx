import { useEffect, useRef, useState } from "react";

import { MAX_ENERGY, useGame } from "@/store/useGame";

type Props = { size?: number; className?: string };

/**
 * 에너지 배터리 — 남은 에너지만큼 분홍빛으로 차오르고, 가운데 번개가 박혀 있다.
 * 에너지가 변하면(energyPulse) 충전은 통통 튀며 반짝이고, 소모는 짧게 흔들린다.
 */
export const EnergyBattery = ({ size = 26, className }: Props) => {
  const energy = useGame((s) => s.energy);
  const energyPulse = useGame((s) => s.energyPulse);

  const [anim, setAnim] = useState<"charge" | "drain" | null>(null);
  const lastPulseId = useRef<number | null>(null);

  useEffect(() => {
    if (!energyPulse || energyPulse.id === lastPulseId.current) return;
    lastPulseId.current = energyPulse.id;
    setAnim(energyPulse.delta > 0 ? "charge" : "drain");
    const t = setTimeout(() => setAnim(null), 700);
    return () => clearTimeout(t);
  }, [energyPulse]);

  const ratio = Math.max(0, Math.min(1, energy / MAX_ENERGY));
  const fillW = 18 * ratio; // 배터리 내부 폭 18

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={[
        className,
        anim === "charge" ? "nrg-charge" : "",
        anim === "drain" ? "nrg-drain" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="img"
      aria-label={`에너지 ${energy}`}
    >
      <defs>
        <linearGradient id="nrgFill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff6b9d" />
          <stop offset="100%" stopColor="#ff6b4a" />
        </linearGradient>
      </defs>

      <style>{`
        .nrg-charge{animation:nrgPop .7s ease-out}
        .nrg-drain{animation:nrgShake .4s ease-in-out}
        .nrg-charge .nrg-level{animation:nrgGlow .7s ease-out}
        .nrg-charge .nrg-bolt{animation:nrgBolt .7s ease-out}
        @keyframes nrgPop{0%{transform:scale(1)}35%{transform:scale(1.25)}70%{transform:scale(.95)}100%{transform:scale(1)}}
        @keyframes nrgShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}
        @keyframes nrgGlow{0%{opacity:.35}40%{opacity:1}100%{opacity:1}}
        @keyframes nrgBolt{0%,100%{opacity:1}30%{opacity:.2}60%{opacity:1}}
        @media (prefers-reduced-motion: reduce){.nrg-charge,.nrg-drain{animation:none!important}}
      `}</style>

      {/* 배터리 몸통 */}
      <rect
        x="3"
        y="9"
        width="22"
        height="14"
        rx="4"
        fill="#fff"
        stroke="#ff6b4a"
        strokeWidth="2"
      />
      {/* 단자 */}
      <rect x="26" y="13" width="3.5" height="6" rx="1.5" fill="#ff6b4a" />

      {/* 충전량 */}
      <rect
        className="nrg-level"
        x="5"
        y="11"
        width={fillW}
        height="10"
        rx="2"
        fill="url(#nrgFill)"
        style={{ transition: "width .45s ease-out" }}
      />

      {/* 번개 */}
      <path
        className="nrg-bolt"
        d="M16.5 10.5 L12 17 h3 l-1.5 4.5 L18 15 h-3 z"
        fill="#fff"
        stroke="#ff6b4a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
};
