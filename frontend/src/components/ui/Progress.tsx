import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number; // 0 ~ 100
  className?: string;
};

export const Progress = ({ value, className }: ProgressProps) => {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("h-3 w-full overflow-hidden rounded-full bg-swan", className)}>
      <div
        className="relative h-full rounded-full bg-coral transition-all duration-300"
        style={{ width: `${v}%` }}
      >
        {v > 8 && (
          <span className="absolute left-1 right-1 top-[3px] hidden h-1 rounded-full bg-white/40 sm:block" />
        )}
      </div>
    </div>
  );
};
