import { Loader2 } from "lucide-react";

import { Button } from "./ui/Button";

/** 서버에서 불러오는 중 */
export const Loading = ({ label = "불러오는 중…" }: { label?: string }) => (
  <div className="flex flex-col items-center gap-y-3 py-16 text-hare">
    <Loader2 className="h-8 w-8 animate-spin" />
    <p className="text-sm font-bold">{label}</p>
  </div>
);

/** 불러오기 실패 — 재시도 버튼 제공 (백엔드가 꺼져 있어도 앱이 죽지 않게) */
export const LoadError = ({
  message,
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center gap-y-4 rounded-2xl border-2 border-cardinal/40 bg-cardinal-light py-12">
    <p className="text-sm font-bold text-cardinal">
      {message ?? "불러오지 못했어요."}
    </p>
    <Button variant="dangerOutline" size="sm" onClick={onRetry}>
      다시 시도
    </Button>
  </div>
);
