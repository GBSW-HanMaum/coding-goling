import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import type { ChallengeProps } from "../types";

type Token = { type: "text"; value: string } | { type: "blank"; index: number };

function tokenize(template: string): Token[] {
  const tokens: Token[] = [];
  const re = /\{\{(\d+)\}\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(template))) {
    if (m.index > last)
      tokens.push({ type: "text", value: template.slice(last, m.index) });
    tokens.push({ type: "blank", index: Number(m[1]) });
    last = m.index + m[0].length;
  }
  if (last < template.length)
    tokens.push({ type: "text", value: template.slice(last) });
  return tokens;
}

const squash = (s: string) => s.replace(/\s+/g, "").trim();

export const FillChallenge = ({
  challenge,
  status,
  setCanCheck,
  apiRef,
}: ChallengeProps) => {
  const tokens = useMemo(() => tokenize(challenge.fillCode ?? ""), [challenge]);
  const answers = challenge.fillAnswers ?? [];
  const [vals, setVals] = useState<string[]>(() => answers.map(() => ""));

  useEffect(
    () => setCanCheck(vals.every((v) => v.trim() !== "")),
    [vals, setCanCheck]
  );

  const check = useCallback(async () => {
    const correct = answers.every((accepted, i) =>
      accepted.map(squash).includes(squash(vals[i] ?? ""))
    );
    return { correct };
  }, [vals, answers]);
  apiRef.current = { check };

  const locked = status !== "none";

  return (
    <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl border-2 border-swan bg-[#fbfbfb] p-5 font-mono text-sm leading-7 text-eel">
      {tokens.map((t, i) =>
        t.type === "text" ? (
          <span key={i}>{t.value}</span>
        ) : (
          <input
            key={i}
            value={vals[t.index] ?? ""}
            disabled={locked}
            onChange={(e) =>
              setVals((prev) => {
                const next = [...prev];
                next[t.index] = e.target.value;
                return next;
              })
            }
            size={Math.max(3, (vals[t.index] ?? "").length + 1)}
            spellCheck={false}
            className={cn(
              "mx-1 inline-block rounded-md border-2 border-macaw bg-macaw-light px-1 text-center font-mono text-macaw outline-none",
              status === "correct" && "border-feather bg-feather-light text-feather",
              status === "wrong" && "border-cardinal bg-cardinal-light text-cardinal"
            )}
          />
        )
      )}
    </pre>
  );
};
