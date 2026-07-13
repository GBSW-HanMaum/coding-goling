import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { courseById } from "@/data/content";
import {
  DAILY_GOALS,
  LANGUAGE_LABEL,
  LEARNING_GOALS,
  SELF_LEVELS,
  buildRecommendation,
} from "@/data/onboarding";
import { useFinishOnboarding } from "@/hooks/useFinishOnboarding";
import { useGame } from "@/store/useGame";

import { ChoiceCard, OnboardingShell } from "./OnboardingShell";

/** 진단 테스트로 넘어갈 때 답변을 실어 보내는 형태 */
export type ProfileAnswers = {
  learningGoal?: string;
  selfReportedLevel?: string;
  dailyGoalMinutes?: number;
};

const STEPS = ["goal", "level", "summary", "daily", "start"] as const;
type Step = (typeof STEPS)[number];

/**
 * 온보딩 Step 2 — 코리와의 5단계 대화.
 * 이유 → 사전 지식 → (규칙 기반) 추천 요약 → 일일 목표 → 시작점 선택.
 */
export const OnboardingProfile = () => {
  const navigate = useNavigate();
  const activeCourse = useGame((s) => s.activeCourse);
  const finishOnboarding = useFinishOnboarding();

  const [stepIdx, setStepIdx] = useState(0);
  const [goal, setGoal] = useState<string>();
  const [level, setLevel] = useState<string>();
  const [daily, setDaily] = useState<string>();

  const step: Step = STEPS[stepIdx];
  const langLabel = LANGUAGE_LABEL[activeCourse];
  const answers: ProfileAnswers = {
    learningGoal: goal,
    selfReportedLevel: level,
    dailyGoalMinutes: daily ? Number(daily) : undefined,
  };

  const back = () =>
    stepIdx === 0
      ? navigate("/onboarding/language")
      : setStepIdx((i) => i - 1);
  const next = () => setStepIdx((i) => i + 1);

  const shell = {
    percentage: 20 + stepIdx * 10,
    onBack: back,
  };

  /** "기초부터 시작" — 진단 없이 바로 (건너뛰는 레슨 없음). 게스트면 회원가입 화면으로 간다 */
  const startFromBasics = () =>
    finishOnboarding({
      ...answers,
      startingUnitId: courseById(activeCourse).units[0]?.id,
    });

  switch (step) {
    case "goal":
      return (
        <OnboardingShell
          {...shell}
          lines={[`왜 ${langLabel}를 배우려고 해?`, "목표에 맞춰서 문제를 골라줄게."]}
          onNext={next}
          nextDisabled={!goal}
        >
          <div className="grid gap-3">
            {LEARNING_GOALS.map((o) => (
              <ChoiceCard
                key={o.id}
                {...o}
                selected={goal === o.id}
                onClick={() => setGoal(o.id)}
              />
            ))}
          </div>
        </OnboardingShell>
      );

    case "level":
      return (
        <OnboardingShell
          {...shell}
          lines={[`${langLabel}를 얼마나 알고 있어?`, "솔직하게 골라도 괜찮아. 여기서 시작점이 갈려."]}
          onNext={next}
          nextDisabled={!level}
        >
          <div className="grid gap-3">
            {SELF_LEVELS.map((o) => (
              <ChoiceCard
                key={o.id}
                {...o}
                selected={level === o.id}
                onClick={() => setLevel(o.id)}
              />
            ))}
          </div>
        </OnboardingShell>
      );

    case "summary":
      return (
        <OnboardingShell
          {...shell}
          lines={buildRecommendation(activeCourse, goal, level)}
          onNext={next}
          nextLabel="좋아!"
        >
          <div className="rounded-2xl border-2 border-swan bg-polar p-5 text-center">
            <p className="text-sm font-bold text-wolf">
              네 답변에 맞춰 학습 계획을 짰어. 이제 하루에 얼마나 할지만 정하면 돼!
            </p>
          </div>
        </OnboardingShell>
      );

    case "daily":
      return (
        <OnboardingShell
          {...shell}
          lines={["하루에 얼마나 해볼까?", "짧아도 매일 하는 게 제일 빨라. 스트릭은 그렇게 쌓여."]}
          onNext={next}
          nextDisabled={!daily}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {DAILY_GOALS.map((o) => (
              <ChoiceCard
                key={o.id}
                {...o}
                selected={daily === o.id}
                onClick={() => setDaily(o.id)}
              />
            ))}
          </div>
        </OnboardingShell>
      );

    case "start":
      return (
        <OnboardingShell
          {...shell}
          lines={[
            "마지막! 어디서부터 시작할까?",
            "이미 좀 아는 것 같으면 짧은 진단 테스트로 네 레벨을 찾아줄게.",
          ]}
        >
          <div className="grid gap-3">
            <ChoiceCard
              emoji="🌱"
              label="기초부터 시작하기"
              desc="처음부터 차근차근 할래요"
              onClick={startFromBasics}
            />
            <ChoiceCard
              emoji="🎯"
              label="내 레벨 찾기 (진단 테스트)"
              desc="6문제 풀고 시작 지점을 정해요 · 약 2분"
              onClick={() =>
                navigate("/onboarding/diagnostic", { state: answers })
              }
            />
          </div>
        </OnboardingShell>
      );
  }
};
