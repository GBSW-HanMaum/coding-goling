import { useCallback, useEffect, useMemo, useState } from "react";

import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";
import { Loader2, Play } from "lucide-react";

import type { Language } from "@/data/types";
import { gradeCode, type GradeResult } from "@/lib/grade";
import { initPython } from "@/lib/pyRunner";
import { isClientSide, runnerFor } from "@/lib/runner";
import { cn } from "@/lib/utils";

import { AiTutorButton } from "../AiTutorButton";
import type { ChallengeProps } from "../types";

const LANG_META: Record<Language, { ext: string; label: string }> = {
  python: { ext: "py", label: "Python" },
  c: { ext: "c", label: "C" },
  java: { ext: "java", label: "Java" },
  javascript: { ext: "js", label: "JavaScript" },
};

const codeMirrorLang = (language: Language) => {
  switch (language) {
    case "python":
      return python();
    case "c":
      return cpp();
    case "java":
      return java();
    default:
      return javascript();
  }
};

export const CodeChallenge = ({
  challenge,
  status,
  setCanCheck,
  apiRef,
}: ChallengeProps) => {
  const [code, setCode] = useState(challenge.starterCode ?? "");
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [grade, setGrade] = useState<GradeResult | null>(null);
  // "실행해보기" 미리보기에 쓸 표준입력 — 첫 테스트케이스 입력으로 시작하되 직접 고칠 수 있다.
  // (채점은 아래 gradeCode가 testCases 기준으로 그대로 수행하므로 여기 값과 무관)
  const [stdin, setStdin] = useState(challenge.testCases?.[0]?.stdin ?? "");

  const language = challenge.language;
  const clientSide = isClientSide(language); // Python 은 브라우저, C/Java 는 서버
  const meta = LANG_META[language];
  const langExt = useMemo(() => codeMirrorLang(language), [language]);
  const run = useMemo(() => runnerFor(language), [language]);

  useEffect(() => {
    setCanCheck(code.trim().length > 0);
  }, [code, setCanCheck]);

  useEffect(() => {
    // Pyodide만 무거워서 미리 로딩해둔다. JS/서버 실행 언어는 준비 과정이 없다.
    if (language === "python") initPython().then(() => setReady(true));
    else setReady(true);
  }, [language]);

  const check = useCallback(async () => {
    const res = await gradeCode(code, challenge.testCases ?? [], language);
    setGrade(res);
    const pct = Math.round(res.ratio * 100);
    return {
      correct: res.correct,
      message: res.correct
        ? `테스트 ${res.passed}/${res.total} 통과!`
        : `테스트 ${res.passed}/${res.total} 통과 · 부분 점수 ${pct}%`,
    };
  }, [code, challenge, language]);
  apiRef.current = { check };

  const onRun = async () => {
    setRunning(true);
    setOutput(null);
    // 한 줄짜리 입력창이라 여러 줄은 "\n" 이스케이프로 받는다
    const { stdout, stderr, timedOut } = await run(
      code,
      stdin.replace(/\\n/g, "\n")
    );
    setRunning(false);
    const text = [stdout, stderr].filter(Boolean).join("\n").trim();
    setOutput(timedOut ? "⏱️ 실행 시간이 초과되었어요." : text || "(출력 없음)");
  };

  const locked = status === "correct";

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border-2 border-swan">
        <div className="flex items-center justify-between border-b-2 border-swan bg-polar px-3 py-1.5">
          <span className="font-mono text-xs font-bold text-wolf">
            solution.{meta.ext}
          </span>
          <span className="text-xs font-bold text-hare">
            {clientSide
              ? ready
                ? `🟢 ${meta.label} 실행 준비됨`
                : "⏳ 실행 엔진 불러오는 중…"
              : `🐳 ${meta.label} — 서버 샌드박스 실행`}
          </span>
        </div>
        <CodeMirror
          value={code}
          height="200px"
          extensions={[langExt]}
          editable={!locked}
          onChange={setCode}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: !locked,
            foldGutter: false,
          }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onRun}
            disabled={!ready || running || locked}
            className="inline-flex shrink-0 items-center gap-x-1.5 rounded-xl border-2 border-b-4 border-swan bg-white px-3 py-1.5 text-sm font-bold text-eel transition hover:bg-polar active:border-b-2 disabled:opacity-50"
          >
            {running ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4 fill-feather text-feather" />
            )}
            실행해보기
          </button>

          {/* 표준입력 — input() 이 있는 문제를 직접 입력하며 돌려볼 수 있게. 채점에는 안 쓰인다 */}
          <label className="flex min-w-[200px] flex-1 items-center gap-x-2 rounded-xl border-2 border-swan bg-white px-3 py-1.5">
            <span className="shrink-0 text-xs font-bold text-hare">입력</span>
            <input
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              disabled={locked}
              data-enter-ignore
              onKeyDown={(e) => {
                // Enter는 여러 줄 입력을 만드는 데 쓰이므로 채점 단축키로 새어나가지 않게
                if (e.key === "Enter") e.stopPropagation();
              }}
              placeholder="input() 에 넣을 값 (여러 줄은 \n 으로 구분)"
              className="w-full bg-transparent font-mono text-sm text-eel outline-none placeholder:font-sans placeholder:text-hare disabled:opacity-50"
            />
          </label>
      </div>

      {output !== null && (
        <div className="rounded-xl bg-[#1f2937] p-3 font-mono text-xs leading-relaxed text-[#d7ffb8]">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-hare">
            출력 {stdin ? `(입력: ${stdin})` : "(입력 없음)"}
          </p>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}

      {grade && status !== "none" && (
        <div className="space-y-1.5">
          {grade.results.map((r, i) => (
            <div
              key={i}
              className={cn(
                "flex items-start gap-x-2 rounded-lg border-2 px-3 py-2 text-xs",
                r.pass
                  ? "border-feather/40 bg-feather-light"
                  : "border-cardinal/40 bg-cardinal-light"
              )}
            >
              <span className="font-bold">{r.pass ? "✅" : "❌"}</span>
              <div className="min-w-0 flex-1 font-mono">
                {r.hidden ? (
                  <span className="text-wolf">
                    숨김 테스트 #{i + 1} — {r.pass ? "통과" : "실패"}
                  </span>
                ) : (
                  <>
                    {r.stdin != null && r.stdin !== "" && (
                      <div className="text-wolf">입력: {r.stdin}</div>
                    )}
                    <div className="text-wolf">
                      기대: <span className="text-eel">{r.expected || "∅"}</span>
                    </div>
                    <div className="text-wolf">
                      출력:{" "}
                      <span className={r.pass ? "text-feather" : "text-cardinal"}>
                        {r.error ?? r.got ?? "∅"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 오답일 때만 AI 튜터 — 실패 로그 기반 힌트 (04번 문서) */}
      {grade && status === "wrong" && !grade.correct && (
        <AiTutorButton challenge={challenge} grade={grade} />
      )}
    </div>
  );
};
