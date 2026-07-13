import { Check, Crown, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type LessonButtonProps = {
  id: string;
  index: number; // 유닛 내 순번 (구불구불 경로 계산용)
  status: "done" | "active" | "locked";
  isFinal: boolean;
  percentage: number;
};

export const LessonButton = ({
  id,
  index,
  status,
  isFinal,
  percentage,
}: LessonButtonProps) => {
  const navigate = useNavigate();

  // 듀오링고식 지그재그 경로 오프셋
  const cycleIndex = index % 8;
  let indent: number;
  if (cycleIndex <= 2) indent = cycleIndex;
  else if (cycleIndex <= 4) indent = 4 - cycleIndex;
  else if (cycleIndex <= 6) indent = 4 - cycleIndex;
  else indent = cycleIndex - 8;
  const rightPosition = indent * 40;

  const locked = status === "locked";
  const isDone = status === "done";
  const Icon = isDone ? Check : isFinal ? Crown : Star;

  const go = () => {
    if (locked) return;
    navigate(`/lesson/${id}`);
  };

  const iconEl = (
    <Icon
      className={cn(
        "h-10 w-10",
        locked ? "fill-hare/40 text-hare" : "fill-white text-white",
        isDone && "fill-none stroke-[3]"
      )}
    />
  );

  return (
    <div
      className="relative"
      style={{
        right: `${rightPosition}px`,
        marginTop: index === 0 && status === "active" ? 52 : 24,
      }}
    >
      {status === "active" ? (
        <div className="relative h-[102px] w-[102px]">
          <div className="absolute -top-5 left-2.5 z-10 animate-bounce rounded-xl border-2 border-swan bg-white px-3 py-2 text-sm font-extrabold uppercase tracking-wide text-coral">
            시작
            <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-swan" />
          </div>
          <CircularProgressbarWithChildren
            value={Number.isNaN(percentage) ? 0 : percentage}
            styles={{
              path: { stroke: "#ff6b4a" },
              trail: { stroke: "#e5e5e5" },
            }}
          >
            <Button
              size="rounded"
              variant="secondary"
              onClick={go}
              className="h-[70px] w-[70px] border-b-8"
            >
              {iconEl}
            </Button>
          </CircularProgressbarWithChildren>
        </div>
      ) : (
        <Button
          size="rounded"
          variant={locked ? "locked" : "secondary"}
          onClick={go}
          className="h-[70px] w-[70px] border-b-8"
        >
          {iconEl}
        </Button>
      )}
    </div>
  );
};
