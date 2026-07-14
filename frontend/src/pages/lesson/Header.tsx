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
      title="오답을 내면 에너지가 1 줄고, 정답을 3번 연속 맞히면 충전돼요. 힌트에도 쓰입니다."
    >
      <EnergyBattery size={28} />
      {energy}
    </div>
  </header>
);
