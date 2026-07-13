import { X } from "lucide-react";

import { EnergyBattery } from "@/components/EnergyBattery";
import { Progress } from "@/components/ui/Progress";

type HeaderProps = {
  percentage: number;
  energy: number;
  onClose: () => void;
};

export const Header = ({ percentage, energy, onClose }: HeaderProps) => (
  <header className="mx-auto flex w-full max-w-[1140px] items-center gap-x-4 px-6 pt-6 lg:pt-10">
    <button
      onClick={onClose}
      className="text-hare transition hover:opacity-70"
      aria-label="레슨 나가기"
    >
      <X className="h-7 w-7 stroke-[3]" />
    </button>

    <Progress value={percentage} />

    <div
      className="flex items-center gap-x-1 font-extrabold text-coral"
      title="정답·오답으로는 에너지가 줄지 않아요. 힌트/AI 튜터에만 사용되고, 정답을 맞히면 충전됩니다."
    >
      <EnergyBattery size={28} />
      {energy}
    </div>
  </header>
);
