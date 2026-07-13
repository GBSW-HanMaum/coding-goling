import { useEffect, useRef, useState } from "react";

import { useGame } from "@/store/useGame";

import { EnergyBattery } from "./EnergyBattery";

type Toast = { id: number; delta: number };

const LIFETIME_MS = 1800;

/**
 * 에너지가 오르내릴 때 "+5 에너지" / "-2 에너지" 를 잠깐 띄운다.
 * 스토어의 energyPulse를 구독하므로, 에너지를 건드리는 곳이 늘어나도 여기는 안 고쳐도 된다.
 */
export const EnergyToast = () => {
  const energyPulse = useGame((s) => s.energyPulse);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const lastPulseId = useRef<number | null>(null);

  useEffect(() => {
    if (!energyPulse || energyPulse.id === lastPulseId.current) return;
    lastPulseId.current = energyPulse.id;

    const toast = { id: energyPulse.id, delta: energyPulse.delta };
    setToasts((t) => [...t, toast]);

    const timer = setTimeout(
      () => setToasts((t) => t.filter((x) => x.id !== toast.id)),
      LIFETIME_MS
    );
    return () => clearTimeout(timer);
  }, [energyPulse]);

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed left-1/2 top-6 z-50 flex -translate-x-1/2 flex-col items-center gap-y-2">
      <style>{`
        @keyframes nrgToast{
          0%{opacity:0;transform:translateY(-10px) scale(.9)}
          15%{opacity:1;transform:translateY(0) scale(1)}
          75%{opacity:1;transform:translateY(0) scale(1)}
          100%{opacity:0;transform:translateY(-8px) scale(.96)}
        }
        .nrg-toast{animation:nrgToast ${LIFETIME_MS}ms ease-out forwards}
        @media (prefers-reduced-motion: reduce){.nrg-toast{animation-duration:1ms}}
      `}</style>

      {toasts.map((t) => (
        <div
          key={t.id}
          className="nrg-toast flex items-center gap-x-2 rounded-full border-2 border-coral bg-white px-4 py-2 shadow-lg"
        >
          <EnergyBattery size={24} />
          <span className="text-sm font-extrabold text-coral">
            {t.delta > 0 ? `+${t.delta}` : t.delta} 에너지
          </span>
        </div>
      ))}
    </div>
  );
};
