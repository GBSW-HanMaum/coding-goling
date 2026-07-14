import { Flame, Gem } from "lucide-react";
import { Link } from "react-router-dom";

import { courseById } from "@/data/content";
import { cn } from "@/lib/utils";
import { useGame } from "@/store/useGame";

import { EnergyBattery } from "./EnergyBattery";
import { buttonVariants } from "./ui/Button";

/** 상단/우측 레일에 뜨는 스탯: 코스 · 연속 · 젬 · 에너지. */
export const UserProgress = () => {
  const activeCourse = useGame((s) => s.activeCourse);
  const streak = useGame((s) => s.streak);
  const gems = useGame((s) => s.gems);
  const energy = useGame((s) => s.energy);
  const course = courseById(activeCourse);

  const pill = cn(buttonVariants({ variant: "ghost" }), "gap-x-1.5 px-2");

  return (
    <div className="flex items-center justify-between gap-x-1">
      <Link to="/learn" className={cn(pill, "text-2xl")} title={course.title}>
        {course.emoji}
      </Link>

      <Link to="/quests" className={cn(pill, "text-violet")} title="연속 학습">
        <Flame className="h-6 w-6 fill-violet" />
        <span className="font-extrabold">{streak}</span>
      </Link>

      <Link to="/shop" className={cn(pill, "text-macaw")} title="젬">
        <Gem className="h-6 w-6 fill-macaw/20" />
        <span className="font-extrabold">{gems}</span>
      </Link>

      <Link
        to="/shop"
        className={cn(pill, "text-coral")}
        title="에너지 — 오답 시 1 감소, 정답 3연속 시 충전돼요. 힌트에도 사용해요"
      >
        <EnergyBattery size={26} />
        <span className="font-extrabold">{energy}</span>
      </Link>
    </div>
  );
};
