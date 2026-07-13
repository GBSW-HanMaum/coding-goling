import { Trophy } from "lucide-react";

import { Loading, LoadError } from "@/components/AsyncState";
import { FeedWrapper, StickyWrapper } from "@/components/Layout";
import { Promo } from "@/components/Promo";
import { UserProgress } from "@/components/UserProgress";
import { useApi } from "@/hooks/useApi";
import { leaderboardApi } from "@/lib/api";
import { avatarFor } from "@/lib/avatar";
import { cn } from "@/lib/utils";

const medal = (rank: number) =>
  rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `${rank}`;

/** 실제 유저 랭킹 (GET /leaderboard) — user_progress.xp 기준 상위 20명 */
export const Leaderboard = () => {
  const { data: rankers, loading, error, reload } = useApi(() => leaderboardApi.get());

  return (
    <div className="flex flex-row-reverse gap-x-12">
      <StickyWrapper>
        <UserProgress />
        <Promo />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex flex-col items-center gap-y-2 pb-6 pt-2">
          <Trophy className="h-16 w-16 fill-bee/20 text-bee" />
          <h1 className="text-2xl font-extrabold text-eel">리더보드</h1>
          <p className="text-sm text-wolf">이번 주 XP로 다른 학습자와 경쟁해요.</p>
        </div>

        {loading && <Loading />}
        {error && <LoadError message={error} onRetry={reload} />}

        {rankers && (
          <ul className="space-y-1">
            {rankers.map((r) => (
              <li
                key={`${r.rank}-${r.nickname}`}
                className={cn(
                  "flex items-center gap-x-4 rounded-xl px-4 py-3",
                  r.isMe ? "bg-macaw-light" : "hover:bg-polar"
                )}
              >
                <span className="w-8 text-center text-lg font-extrabold text-wolf">
                  {medal(r.rank)}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm ring-2 ring-swan">
                  {avatarFor(r.nickname)}
                </span>
                <span
                  className={cn(
                    "flex-1 font-bold",
                    r.isMe ? "text-macaw" : "text-eel"
                  )}
                >
                  {r.nickname}
                  {r.isMe && <span className="ml-1.5 text-xs">(나)</span>}
                </span>
                <span className="font-extrabold text-hare">{r.xp} XP</span>
              </li>
            ))}
          </ul>
        )}
      </FeedWrapper>
    </div>
  );
};
