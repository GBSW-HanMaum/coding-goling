import { Clock, Star, Target, Zap, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "xp" | "energy" | "time" | "accuracy";

type ResultCardProps = {
  value: number | string;
  variant: Variant;
};

const CONFIG: Record<
  Variant,
  { label: string; Icon: LucideIcon; frame: string; text: string; fill: boolean }
> = {
  xp: {
    label: "획득 XP",
    Icon: Star,
    frame: "border-bee bg-bee",
    text: "text-bee",
    fill: true,
  },
  energy: {
    label: "남은 에너지",
    Icon: Zap,
    frame: "border-macaw bg-macaw",
    text: "text-macaw",
    fill: true,
  },
  accuracy: {
    label: "정답률",
    Icon: Target,
    frame: "border-feather bg-feather",
    text: "text-feather",
    fill: false,
  },
  time: {
    label: "걸린 시간",
    Icon: Clock,
    frame: "border-violet bg-violet",
    text: "text-violet",
    fill: false,
  },
};

export const ResultCard = ({ value, variant }: ResultCardProps) => {
  const { label, Icon, frame, text, fill } = CONFIG[variant];

  return (
    <div className={cn("w-full rounded-2xl border-2", frame)}>
      <div className="rounded-t-xl p-1.5 text-center text-xs font-extrabold uppercase tracking-wide text-white">
        {label}
      </div>
      <div
        className={cn(
          "flex items-center justify-center gap-x-1.5 rounded-2xl bg-white p-5 text-lg font-extrabold",
          text
        )}
      >
        <Icon className={cn("h-6 w-6 shrink-0", fill && "fill-current")} />
        {value}
      </div>
    </div>
  );
};
