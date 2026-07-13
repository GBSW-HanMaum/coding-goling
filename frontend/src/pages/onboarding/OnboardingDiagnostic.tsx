import { useRef, useState } from "react";

import { Star, Target } from "lucide-react";
import { useLocation } from "react-router-dom";

import { Mascot } from "@/components/Mascot";
import { Progress } from "@/components/ui/Progress";
import { courseById, diagnosticChallenges, placementFor } from "@/data/content";
import { useFinishOnboarding } from "@/hooks/useFinishOnboarding";
import { useGame } from "@/store/useGame";

import { Footer } from "../lesson/Footer";
import { QuestionView } from "../lesson/QuestionView";
import { ParsonsChallenge } from "../lesson/challenges/ParsonsChallenge";
import { SelectChallenge } from "../lesson/challenges/SelectChallenge";
import type { ChallengeApi } from "../lesson/types";
import type { ProfileAnswers } from "./OnboardingProfile";

/**
 * 온보딩 Step 3 — 진단 테스트.
 * 레슨과 달리 문항별 정답/오답 피드백을 주지 않는다 (레벨 측정이 목적이라 힌트가 되면 안 됨).
 * 채점은 기존 SelectChallenge/ParsonsChallenge의 apiRef.check() 를 그대로 재사용한다.
 */
export const OnboardingDiagnostic = () => {
  const { state } = useLocation();
  const answers = (state ?? {}) as ProfileAnswers;

  const activeCourse = useGame((s) => s.activeCourse);
  const finishOnboarding = useFinishOnboarding();

  const course = courseById(activeCourse);
  const challenges = diagnosticChallenges[activeCourse];

  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [canCheck, setCanCheck] = useState(false);
  const [finished, setFinished] = useState(false);
  const apiRef = useRef<ChallengeApi>();

  const challenge = challenges[index];
  const total = challenges.length;
  const accuracy = correctCount / total;
  const { startingUnit, unitIdx, unlockedLessonIds } = placementFor(
    course,
    accuracy
  );

  const onNext = async () => {
    if (!apiRef.current) return;
    const res = await apiRef.current.check();
    const nextCorrect = correctCount + (res.correct ? 1 : 0);
    setCorrectCount(nextCorrect);

    if (index + 1 >= total) {
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    setCanCheck(false);
  };

  const start = () =>
    finishOnboarding({
      ...answers,
      startingUnitId: startingUnit?.id,
      diagnosticScoreRatio: accuracy,
      unlockedLessonIds,
    });

  if (finished) {
    const pct = Math.round(accuracy * 100);
    return (
      <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-y-6 px-6 text-center">
          <Mascot size={130} celebrate />
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-eel lg:text-3xl">
              진단 완료!
            </h1>
            <p className="text-sm text-wolf">
              {total}문제 중 {correctCount}문제를 맞혔어. 여기서부터 시작하면 딱 좋겠어!
            </p>
          </div>

          <div className="flex w-full max-w-md items-stretch gap-x-4">
            <div className="w-full rounded-2xl border-2 border-bee bg-bee">
              <div className="p-1.5 text-center text-xs font-extrabold uppercase tracking-wide text-white">
                정답률
              </div>
              <div className="flex items-center justify-center gap-x-1.5 rounded-2xl bg-white p-5 text-lg font-extrabold text-bee">
                <Star className="h-6 w-6 fill-bee" />
                {pct}%
              </div>
            </div>

            <div className="w-full rounded-2xl border-2 border-macaw bg-macaw">
              <div className="p-1.5 text-center text-xs font-extrabold uppercase tracking-wide text-white">
                추천 시작점
              </div>
              <div className="flex items-center justify-center gap-x-1.5 rounded-2xl bg-white p-5 text-lg font-extrabold text-macaw">
                <Target className="h-6 w-6" />
                유닛 {unitIdx + 1}
              </div>
            </div>
          </div>

          <p className="max-w-md text-sm text-wolf">
            <span className="font-bold text-eel">{startingUnit?.title}</span>
            {unlockedLessonIds.length > 0
              ? ` — 앞선 레슨 ${unlockedLessonIds.length}개는 이미 아는 걸로 보고 건너뛸게.`
              : " — 기초부터 탄탄히 가자."}
          </p>
        </div>
        <Footer status="completed" label="학습 시작하기" onCheck={start} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <header className="mx-auto flex w-full max-w-[1140px] items-center gap-x-4 px-6 pt-6 lg:pt-10">
        <Progress value={(index / total) * 100} />
        <span className="shrink-0 text-sm font-extrabold text-hare">
          {index + 1} / {total}
        </span>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[720px] flex-col gap-y-6 px-6 pb-10 pt-10">
          <p className="text-xs font-bold uppercase tracking-wide text-hare">
            진단 테스트 · 정답을 몰라도 괜찮아요
          </p>

          <QuestionView challenge={challenge} />

          {/* key 로 문항 전환 시 로컬 상태 초기화 (Quiz.tsx와 동일 패턴) */}
          <div key={challenge.id}>
            {challenge.type === "PARSONS" ? (
              <ParsonsChallenge
                challenge={challenge}
                status="none"
                setCanCheck={setCanCheck}
                apiRef={apiRef}
              />
            ) : (
              <SelectChallenge
                challenge={challenge}
                status="none"
                setCanCheck={setCanCheck}
                apiRef={apiRef}
              />
            )}
          </div>
        </div>
      </div>

      <Footer
        status="none"
        disabled={!canCheck}
        label={index + 1 === total ? "결과 보기" : "다음"}
        onCheck={onNext}
      />
    </div>
  );
};
