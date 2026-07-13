import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

import { useApi } from "@/hooks/useApi";
import { questApi } from "@/lib/api";

import { Progress } from "./ui/Progress";

/** 우측 레일의 퀘스트 요약 (GET /quests 상위 3개). */
export const QuestsRail = () => {
  const { data: quests } = useApi(() => questApi.list());

  // 로딩/실패 시엔 레일을 아예 숨긴다 (사이드 위젯이라 빈 껍데기를 보일 이유가 없다)
  if (!quests || quests.length === 0) return null;

  return (
    <div className="space-y-4 rounded-2xl border-2 border-swan p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-eel">퀘스트</h3>
        <Link
          to="/quests"
          className="text-sm font-bold uppercase tracking-wide text-macaw hover:opacity-80"
        >
          전체 보기
        </Link>
      </div>

      <ul className="space-y-4">
        {quests.slice(0, 3).map((quest) => (
          <li key={quest.id} className="flex items-center gap-x-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bee/15">
              <Zap className="h-6 w-6 fill-bee text-bee" />
            </div>
            <div className="w-full space-y-1.5">
              <p className="text-sm font-bold text-eel">{quest.title}</p>
              <Progress
                value={Math.min(100, (quest.progress / quest.goalValue) * 100)}
                className="h-2.5"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
