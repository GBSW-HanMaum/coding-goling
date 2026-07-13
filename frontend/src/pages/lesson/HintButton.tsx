import { useState } from "react";

import { Lightbulb, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { HINT_COST_MAX, HINT_COST_MIN, useGame } from "@/store/useGame";

type HintButtonProps = {
  challengeId: string;
  explanation: string;
};

/**
 * 에너지를 쓰는 유일한 곳 — 힌트/해설.
 * 정답·오답에는 에너지가 들지 않는다는 걸 UI로도 보여준다.
 */
export const HintButton = ({ challengeId, explanation }: HintButtonProps) => {
  const usedHints = useGame((s) => s.usedHints);
  const energy = useGame((s) => s.energy);
  const useHint = useGame((s) => s.useHint);

  const alreadyUsed = !!usedHints[challengeId];
  const [open, setOpen] = useState(alreadyUsed);
  const noEnergy = energy < HINT_COST_MIN && !alreadyUsed;

  const onClick = () => {
    if (open) return setOpen(false);
    if (alreadyUsed) return setOpen(true);
    if (useHint(challengeId)) setOpen(true);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={onClick}
        disabled={noEnergy}
        className={cn(
          "inline-flex items-center gap-x-1.5 rounded-xl border-2 border-swan px-3 py-1.5 text-sm font-bold text-wolf transition hover:bg-polar disabled:opacity-50"
        )}
      >
        <Lightbulb className="h-4 w-4 text-bee" />
        {open ? "힌트 숨기기" : "힌트 보기"}
        {!alreadyUsed && (
          <span
            className="flex items-center gap-0.5 text-bee"
            title={`힌트 비용은 매번 ${HINT_COST_MIN}~${HINT_COST_MAX} 에너지 중 랜덤이에요`}
          >
            <Zap className="h-3 w-3 fill-bee" />
            {HINT_COST_MIN}~{HINT_COST_MAX}
          </span>
        )}
      </button>

      {noEnergy && (
        <p className="text-xs font-bold text-cardinal">
          에너지가 부족해요. 문제를 맞히면 충전되고, 상점에서도 충전할 수 있어요.
        </p>
      )}

      {open && (
        <div className="rounded-xl bg-macaw-light p-3 text-sm leading-relaxed text-eel">
          💡 {explanation}
        </div>
      )}
    </div>
  );
};
