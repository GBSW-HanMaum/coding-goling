import { BookCheck, Flame, Gem, Star, Target } from "lucide-react";

import { Loading, LoadError } from "@/components/AsyncState";
import { EnergyBattery } from "@/components/EnergyBattery";
import { FeedWrapper, StickyWrapper } from "@/components/Layout";
import { Mascot } from "@/components/Mascot";
import { Promo } from "@/components/Promo";
import { UserProgress } from "@/components/UserProgress";
import { Progress } from "@/components/ui/Progress";
import { courseById } from "@/data/content";
import { LANGUAGE_LABEL } from "@/data/onboarding";
import { useApi } from "@/hooks/useApi";
import { profileApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import { rollUpByConcept } from "@/lib/weakConcepts";
import { useAuth } from "@/store/useAuth";
import { useGame } from "@/store/useGame";

const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) => (
  <div className="flex items-center gap-x-3 rounded-2xl border-2 border-swan p-4">
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
        color
      )}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-wide text-hare">
        {label}
      </p>
      <p className="text-lg font-extrabold text-eel">{value}</p>
    </div>
  </div>
);

/** 화면7 마이페이지 — 프로필 요약 + 취약 개념 (GET /profile/weak-concepts) */
export const Profile = () => {
  const user = useAuth((s) => s.user);
  const activeCourse = useGame((s) => s.activeCourse);
  const xp = useGame((s) => s.xp);
  const gems = useGame((s) => s.gems);
  const streak = useGame((s) => s.streak);
  const dailyGoalMinutes = useGame((s) => s.dailyGoalMinutes);
  const completedLessons = useGame((s) => s.completedLessons);

  const {
    data: rows,
    loading,
    error,
    reload,
  } = useApi(() => profileApi.weakConcepts());

  const course = courseById(activeCourse);
  const doneCount = Object.values(completedLessons).filter(Boolean).length;
  const concepts = rows ? rollUpByConcept(rows) : [];

  return (
    <div className="flex flex-row-reverse gap-x-12">
      <StickyWrapper>
        <UserProgress />
        <Promo />
      </StickyWrapper>

      <FeedWrapper>
        {/* 프로필 헤더 */}
        <div className="flex flex-col items-center gap-y-2 pb-6 pt-2">
          <Mascot size={96} interactive />
          <h1 className="text-2xl font-extrabold text-eel">
            {user?.nickname ?? "게스트"}
          </h1>
          <p className="text-sm text-wolf">{user?.email}</p>
          <div className="mt-1 flex items-center gap-x-2 rounded-full border-2 border-swan px-3 py-1">
            <span className="text-lg">{course.emoji}</span>
            <span className="text-sm font-bold text-eel">
              {LANGUAGE_LABEL[activeCourse]} 학습 중
            </span>
            {dailyGoalMinutes && (
              <span className="text-sm text-hare">· 하루 {dailyGoalMinutes}분</span>
            )}
          </div>
        </div>

        {/* 요약 통계 */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          <StatCard
            icon={<Star className="h-6 w-6 fill-bee text-bee" />}
            label="총 XP"
            value={xp}
            color="bg-bee/15"
          />
          <StatCard
            icon={<Flame className="h-6 w-6 fill-violet text-violet" />}
            label="연속 학습"
            value={`${streak}일`}
            color="bg-violet/15"
          />
          <StatCard
            icon={<BookCheck className="h-6 w-6 text-feather" />}
            label="완료한 레슨"
            value={`${doneCount}개`}
            color="bg-feather/15"
          />
          <StatCard
            icon={<Gem className="h-6 w-6 fill-macaw/20 text-macaw" />}
            label="젬"
            value={gems}
            color="bg-macaw/15"
          />
        </div>

        {/* 취약 개념 */}
        <div className="mb-3 flex items-center gap-x-2">
          <Target className="h-5 w-5 text-coral" />
          <h2 className="text-lg font-extrabold text-eel">약한 개념</h2>
        </div>

        {loading && <Loading />}
        {error && <LoadError message={error} onRetry={reload} />}

        {rows && concepts.length === 0 && (
          <div className="flex flex-col items-center gap-y-2 rounded-2xl border-2 border-swan py-12">
            <EnergyBattery size={40} />
            <p className="text-sm font-bold text-wolf">
              아직 약한 개념이 없어요.
            </p>
            <p className="text-xs text-hare">
              문제를 더 풀면 자주 틀리는 개념을 짚어줄게요.
            </p>
          </div>
        )}

        {concepts.length > 0 && (
          <>
            <p className="mb-3 text-sm text-wolf">
              <span className="font-extrabold text-coral">
                {concepts[0].label}
              </span>
              에서 가장 자주 틀려요. 이 개념부터 복습해 보세요.
            </p>

            <ul className="space-y-3">
              {concepts.map((c) => {
                const accuracyPct = Math.round(c.accuracy * 100);
                return (
                  <li
                    key={c.tag}
                    className="rounded-2xl border-2 border-swan p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-extrabold text-eel">{c.label}</p>
                      <span className="text-sm font-bold text-hare">
                        {c.wrong}회 오답 · 정답률 {accuracyPct}%
                      </span>
                    </div>
                    <Progress
                      value={accuracyPct}
                      className={cn(
                        "h-3",
                        // 정답률이 낮을수록 위험하게 보이도록
                        accuracyPct < 50 && "bg-cardinal-light"
                      )}
                    />
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </FeedWrapper>
    </div>
  );
};
