import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import type { ChallengeProps } from "../types";

export const SelectChallenge = ({
  challenge,
  status,
  setCanCheck,
  apiRef,
}: ChallengeProps) => {
  const options = challenge.options ?? [];
  const [selected, setSelected] = useState<string>();

  useEffect(() => setCanCheck(!!selected), [selected, setCanCheck]);

  const check = useCallback(async () => {
    const opt = options.find((o) => o.id === selected);
    return { correct: !!opt?.correct };
  }, [selected, options]);
  apiRef.current = { check };

  const locked = status !== "none";

  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {options.map((o, i) => {
        const isSel = selected === o.id;
        return (
          <button
            key={o.id}
            disabled={locked}
            onClick={() => status === "none" && setSelected(o.id)}
            className={cn(
              "flex items-center justify-between gap-x-3 rounded-2xl border-2 border-b-4 border-swan p-4 text-left transition active:border-b-2",
              !locked && "hover:bg-polar",
              isSel && "border-macaw-border bg-macaw-light",
              isSel && status === "correct" && "border-feather bg-feather-light",
              isSel && status === "wrong" && "border-cardinal bg-cardinal-light",
              locked && "cursor-default"
            )}
          >
            <span
              className={cn(
                "font-bold text-eel",
                o.code && "font-mono",
                isSel && "text-macaw",
                isSel && status === "correct" && "text-feather",
                isSel && status === "wrong" && "text-cardinal"
              )}
            >
              {o.text}
            </span>
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-swan text-sm font-bold text-hare",
                isSel && "border-macaw text-macaw",
                isSel && status === "correct" && "border-feather text-feather",
                isSel && status === "wrong" && "border-cardinal text-cardinal"
              )}
            >
              {i + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
};
