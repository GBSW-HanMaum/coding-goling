import { useState } from "react";

import { Sparkles, Zap } from "lucide-react";

import type { Challenge } from "@/data/types";
import { aiApi, ApiError, type AiHint } from "@/lib/api";
import type { GradeResult } from "@/lib/grade";
import { useGame } from "@/store/useGame";

/** AI 튜터가 소모하는 에너지 (정적 힌트보다 비싸게 — 04번 문서의 차등화) */
const AI_HINT_COST = 3;

/**
 * "AI 튜터에게 물어보기" — 오답일 때만 뜬다 (04번 문서).
 * 실패한 테스트케이스 + 사용자 코드를 백엔드로 보내 소크라테스식 힌트를 받는다.
 * AI 서버가 죽어도 백엔드가 정적 힌트로 폴백하므로 항상 뭔가는 나온다.
 */
export const AiTutorButton = ({
  challenge,
  grade,
}: {
  challenge: Challenge;
  grade: GradeResult;
}) => {
  const energy = useGame((s) => s.energy);
  const spendEnergy = useGame((s) => s.spendEnergy);

  const [hint, setHint] = useState<AiHint>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const noEnergy = energy < AI_HINT_COST;

  const ask = async () => {
    if (hint || loading) return;
    if (!spendEnergy(AI_HINT_COST)) return; // 에너지 부족 (서버 동기화는 spendEnergy 안에서)

    setLoading(true);
    setError(undefined);
    try {
      const failed = grade.results.find((r) => !r.pass);
      const result = await aiApi.hint({
        language: challenge.language,
        problemTitle: challenge.question,
        problemDescription: challenge.explanation,
        code: grade.code ?? "",
        errorMessage: failed?.error ?? "",
        failedTestCase: failed
          ? {
              input: failed.stdin ?? "",
              expectedOutput: failed.expected,
              userOutput: failed.error ?? failed.got,
            }
          : undefined,
        // AI 서버가 죽으면 문제에 써둔 정적 해설로 폴백
        fallbackExplanation: challenge.explanation,
      });
      setHint(result);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "AI 튜터 호출에 실패했어요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {!hint && (
        <button
          onClick={ask}
          disabled={loading || noEnergy}
          className="inline-flex items-center gap-x-1.5 rounded-xl border-2 border-beetle/50 bg-beetle/10 px-3 py-1.5 text-sm font-bold text-beetle transition hover:bg-beetle/20 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "AI 튜터가 보는 중…" : "AI 튜터에게 물어보기"}
          <span className="flex items-center gap-0.5">
            <Zap className="h-3 w-3 fill-beetle" />
            {AI_HINT_COST}
          </span>
        </button>
      )}

      {noEnergy && !hint && (
        <p className="text-xs font-bold text-cardinal">
          AI 튜터는 에너지 {AI_HINT_COST}가 필요해요. 문제를 맞히면 충전돼요.
        </p>
      )}

      {error && <p className="text-xs font-bold text-cardinal">{error}</p>}

      {hint && (
        <div className="space-y-2 rounded-xl border-2 border-beetle/30 bg-beetle/5 p-3">
          <div className="flex items-center gap-x-1.5 text-xs font-bold text-beetle">
            <Sparkles className="h-3.5 w-3.5" />
            AI 튜터
            {hint.source === "static" && (
              <span className="rounded-full bg-swan px-1.5 py-0.5 text-[10px] text-wolf">
                오프라인 힌트
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-eel">{hint.hint}</p>
          {hint.conceptsToReview.length > 0 && (
            <p className="text-xs text-wolf">
              복습하면 좋은 개념: {hint.conceptsToReview.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
