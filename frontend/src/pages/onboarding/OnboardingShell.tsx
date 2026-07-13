import type { ReactNode } from "react";

import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils";

type ShellProps = {
  percentage: number;
  /** 마스코트 코리의 대사 (말풍선) */
  lines: string[];
  onBack?: () => void;
  children: ReactNode;
  /** 하단 CTA — 없으면(언어 선택처럼 카드 클릭이 곧 진행) 푸터를 숨긴다 */
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
};

/**
 * 온보딩 3단계 공통 껍데기.
 * 레슨 화면(Header/Footer)과 같은 구조 — 위 진행바, 가운데 내용, 아래 CTA.
 */
export const OnboardingShell = ({
  percentage,
  lines,
  onBack,
  children,
  onNext,
  nextLabel = "다음",
  nextDisabled,
}: ShellProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <header className="mx-auto flex w-full max-w-[1140px] items-center gap-x-4 px-6 pt-6 lg:pt-10">
        <button
          onClick={() => (onBack ? onBack() : navigate("/"))}
          className="text-hare transition hover:opacity-70"
          aria-label="이전으로"
        >
          <X className="h-7 w-7 stroke-[3]" />
        </button>
        <Progress value={percentage} />
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[720px] flex-col gap-y-8 px-6 pb-10 pt-10">
          <SpeechBubble lines={lines} />
          {children}
        </div>
      </div>

      {onNext && (
        <footer className="border-t-2 border-swan">
          <div className="mx-auto flex h-[110px] max-w-[1140px] items-center justify-end px-6 lg:h-[140px] lg:px-10">
            <Button
              size="lg"
              variant="secondary"
              disabled={nextDisabled}
              onClick={onNext}
              className="min-w-[140px]"
            >
              {nextLabel}
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
};

/** 코리가 말을 거는 말풍선 — 레슨 완료 화면의 <Mascot /> 연출을 대화형으로 변형 */
export const SpeechBubble = ({ lines }: { lines: string[] }) => (
  <div className="flex items-end gap-x-3">
    <Mascot size={110} interactive className="shrink-0" />
    <div className="relative flex-1 rounded-2xl border-2 border-swan p-5">
      {/* 말풍선 꼬리 */}
      <span className="absolute -left-[9px] bottom-6 h-4 w-4 rotate-45 border-b-2 border-l-2 border-swan bg-white" />
      <div className="space-y-1.5">
        {lines.map((line, i) => (
          <p
            key={i}
            className={cn(
              "text-base font-bold leading-relaxed text-eel",
              i > 0 && "text-sm font-medium text-wolf"
            )}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  </div>
);

type ChoiceCardProps = {
  emoji: string;
  label: string;
  desc?: string;
  selected?: boolean;
  onClick: () => void;
};

/** 온보딩 전 단계에서 쓰는 선택 카드 (Marketing.tsx의 FEATURES 카드 스타일 재사용) */
export const ChoiceCard = ({
  emoji,
  label,
  desc,
  selected,
  onClick,
}: ChoiceCardProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-x-4 rounded-2xl border-2 border-b-4 border-swan p-5 text-left transition hover:bg-polar active:border-b-2",
      selected && "border-macaw-border bg-macaw-light hover:bg-macaw-light"
    )}
  >
    <span className="text-3xl">{emoji}</span>
    <span className="min-w-0">
      <span
        className={cn(
          "block font-extrabold text-eel",
          selected && "text-macaw"
        )}
      >
        {label}
      </span>
      {desc && (
        <span className="block text-sm leading-snug text-wolf">{desc}</span>
      )}
    </span>
  </button>
);
