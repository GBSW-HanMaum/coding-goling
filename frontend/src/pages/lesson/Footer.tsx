import { useEffect } from "react";

import { CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

import type { Status } from "./types";

type FooterProps = {
  status: Status | "completed";
  disabled?: boolean;
  checking?: boolean;
  message?: string;
  /** CTA 문구 직접 지정 (진단 테스트처럼 즉시 채점 피드백이 없는 흐름용) */
  label?: string;
  onCheck: () => void;
};

export const Footer = ({
  status,
  disabled,
  checking,
  message,
  label: labelOverride,
  onCheck,
}: FooterProps) => {
  // Enter 키로 진행 — 단, 코드 에디터 안에서는 줄바꿈이어야 하므로 가로채지 않는다
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || disabled || checking) return;
      // 한글 입력 조합 중의 Enter는 조합 확정이지 제출이 아니다
      if (e.isComposing) return;

      const target = e.target as HTMLElement | null;
      // CodeMirror(.cm-editor / .cm-content) 안, 또는 Enter를 직접 쓰는 입력창은 제외
      if (target?.closest?.(".cm-editor, [data-enter-ignore]")) return;

      onCheck();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [disabled, checking, onCheck]);

  const label =
    labelOverride ??
    (status === "none"
      ? checking
        ? "실행 중…"
        : "확인"
      : status === "correct"
        ? "계속"
        : status === "wrong"
          ? "다시 시도"
          : "계속");

  return (
    <footer
      className={cn(
        "border-t-2 border-swan",
        status === "correct" && "border-transparent bg-feather-light",
        status === "wrong" && "border-transparent bg-cardinal-light"
      )}
    >
      <div className="mx-auto flex h-[110px] max-w-[1140px] items-center justify-between gap-x-4 px-6 lg:h-[140px] lg:px-10">
        {status === "correct" && (
          <div className="flex items-center gap-x-3 font-extrabold text-feather lg:text-2xl">
            <CheckCircle2 className="h-7 w-7 lg:h-10 lg:w-10" />
            <div>
              <p>잘했어요!</p>
              {message && (
                <p className="text-sm font-bold opacity-80 lg:text-base">
                  {message}
                </p>
              )}
            </div>
          </div>
        )}

        {status === "wrong" && (
          <div className="flex items-center gap-x-3 font-extrabold text-cardinal lg:text-2xl">
            <XCircle className="h-7 w-7 lg:h-10 lg:w-10" />
            <div>
              <p>다시 한번!</p>
              {message && (
                <p className="text-sm font-bold opacity-80 lg:text-base">
                  {message}
                </p>
              )}
            </div>
          </div>
        )}

        <Button
          disabled={disabled || checking}
          onClick={onCheck}
          size="lg"
          variant={status === "wrong" ? "danger" : "secondary"}
          className="ml-auto min-w-[140px]"
        >
          {label}
        </Button>
      </div>
    </footer>
  );
};
