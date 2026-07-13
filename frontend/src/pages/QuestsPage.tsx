import { Check, Sparkles, Zap } from "lucide-react";

import { Loading, LoadError } from "@/components/AsyncState";
import { FeedWrapper, StickyWrapper } from "@/components/Layout";
import { Promo } from "@/components/Promo";
import { UserProgress } from "@/components/UserProgress";
import { Progress } from "@/components/ui/Progress";
import { useApi } from "@/hooks/useApi";
import { aiApi } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * 내 퀘스트 — POST /ai/quest 를 부른다.
 * 서버가 OpenAI 로 AI 퀘스트를 만들거나(하루 1회 캐싱), 키가 없으면 기본 퀘스트로 폴백해 준다.
 * 어느 쪽이든 항상 유효한 퀘스트 목록이 온다 (진행률은 서버가 현재 XP 기준으로 계산).
 */
export const QuestsPage = () => {
  const { data: quests, loading, error, reload } = useApi(() => aiApi.quest());

  return (
    <div className="flex flex-row-reverse gap-x-12">
      <StickyWrapper>
        <UserProgress />
        <Promo />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex flex-col items-center gap-y-2 pb-6 pt-2">
          <span className="text-5xl">🎯</span>
          <h1 className="text-2xl font-extrabold text-eel">퀘스트</h1>
          <p className="text-center text-sm text-wolf">
            XP를 모아 퀘스트를 완료하세요. 에너지는 정답에 쓰이지 않으니 마음껏
            도전해도 됩니다.
          </p>
        </div>

        {loading && <Loading />}
        {error && <LoadError message={error} onRetry={reload} />}

        {quests && quests.length === 0 && (
          <p className="py-16 text-center text-sm text-hare">
            아직 퀘스트가 없어요.
          </p>
        )}

        {quests && quests.length > 0 && (
          <ul className="space-y-3">
            {quests.map((quest) => {
              const percentage = Math.min(
                100,
                (quest.progress / quest.goalValue) * 100
              );
              return (
                <li
                  key={quest.id}
                  className="flex items-center gap-x-4 rounded-2xl border-2 border-swan p-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bee/15">
                    {quest.completed ? (
                      <Check className="h-6 w-6 stroke-[3] text-feather" />
                    ) : (
                      <Zap className="h-6 w-6 fill-bee text-bee" />
                    )}
                  </div>
                  <div className="w-full space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-x-1.5 font-bold text-eel">
                        {quest.title}
                        {/* AI가 만들어준 퀘스트임을 표시 (04번 문서에서 실제 생성 붙음) */}
                        {quest.aiGenerated && (
                          <span
                            title="AI가 만든 퀘스트"
                            className="inline-flex items-center gap-0.5 rounded-full bg-beetle/15 px-1.5 py-0.5 text-[10px] font-extrabold text-beetle"
                          >
                            <Sparkles className="h-3 w-3" />
                            AI
                          </span>
                        )}
                      </p>
                      <span className="text-sm font-bold text-hare">
                        {quest.progress}/{quest.goalValue}
                      </span>
                    </div>
                    <Progress
                      value={percentage}
                      className={cn("h-3", quest.completed && "opacity-70")}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </FeedWrapper>
    </div>
  );
};
