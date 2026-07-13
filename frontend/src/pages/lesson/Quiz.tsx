import { useCallback, useRef, useState } from "react";

import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

import { EnergyToast } from "@/components/EnergyToast";
import { Mascot } from "@/components/Mascot";
import { LANGUAGE_LABEL } from "@/data/onboarding";
import type { Lesson } from "@/data/types";
import { getToken, progressApi } from "@/lib/api";
import { CORRECT_ENERGY_MAX, CORRECT_ENERGY_MIN, useGame } from "@/store/useGame";

/** 레슨 완료 보상 젬 */
const LESSON_GEMS = 10;

import { Footer } from "./Footer";
import { Header } from "./Header";
import { HintButton } from "./HintButton";
import { QuestionView } from "./QuestionView";
import { ResultCard } from "./ResultCard";
import { CodeChallenge } from "./challenges/CodeChallenge";
import { FillChallenge } from "./challenges/FillChallenge";
import { ParsonsChallenge } from "./challenges/ParsonsChallenge";
import { SelectChallenge } from "./challenges/SelectChallenge";
import type { ChallengeApi, Status } from "./types";

const TYPE_LABEL: Record<string, string> = {
  SELECT: "알맞은 것을 고르세요",
  FILL: "빈칸을 채우세요",
  PARSONS: "줄 순서를 맞추세요",
  BUGFIX: "버그를 고치세요",
  WRITE: "코드를 작성하세요",
};

/** 경과 시간을 "3분 12초" / "45초" 형태로 */
const formatDuration = (ms: number) => {
  const total = Math.max(0, Math.round(ms / 1000));
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return min > 0 ? `${min}분 ${sec}초` : `${sec}초`;
};

export const Quiz = ({ lesson }: { lesson: Lesson }) => {
  const navigate = useNavigate();
  const energy = useGame((s) => s.energy);
  const gainEnergy = useGame((s) => s.gainEnergy);
  const addXp = useGame((s) => s.addXp);
  const addGems = useGame((s) => s.addGems);
  const completeChallenge = useGame((s) => s.completeChallenge);
  const completeLesson = useGame((s) => s.completeLesson);
  const hydrate = useGame((s) => s.hydrate);

  const challenges = lesson.challenges;
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState<Status>("none");
  const [canCheck, setCanCheck] = useState(false);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState<string>();
  const [finished, setFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  const apiRef = useRef<ChallengeApi>();
  const wrongOnce = useRef<Set<string>>(new Set());
  // Lesson.tsx가 레슨 id로 key를 주므로 이 마운트 시점 = 레슨 시작 시점
  const startedAt = useRef(Date.now());
  // 서버로 보낼 것들 — 문제별 정답/오답과, 이번 레슨에서 충전된 에너지 총량
  const attempts = useRef<{ challengeId: string; correct: boolean }[]>([]);
  const energyGained = useRef(0);

  const challenge = challenges[activeIndex];
  const percentage = finished ? 100 : (activeIndex / challenges.length) * 100;
  // 한 번도 틀리지 않고 맞힌 문제의 비율
  const accuracy = Math.round(
    ((challenges.length - wrongOnce.current.size) / challenges.length) * 100
  );

  const finishLesson = useCallback(() => {
    const xp = challenges.length * 5;
    const scoreRatio =
      (challenges.length - wrongOnce.current.size) / challenges.length;

    setXpEarned(xp);
    setElapsedMs(Date.now() - startedAt.current);

    // 낙관적 업데이트 — 화면은 즉시 반영
    addXp(xp);
    addGems(LESSON_GEMS);
    completeLesson(lesson.id);
    setFinished(true);
    confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });

    // 서버 반영 — 한 번의 호출로 xp·젬·에너지·스트릭·완료레슨·문제별 기록이 함께 처리된다
    if (!getToken()) return;
    progressApi
      .completeLesson({
        lessonId: lesson.id,
        scoreRatio,
        xpEarned: xp,
        gemsEarned: LESSON_GEMS,
        energyDelta: energyGained.current,
        attempts: attempts.current,
      })
      .then(hydrate) // 서버가 진실 소스 — 돌아온 값으로 맞춘다
      .catch((e) => console.error("레슨 완료 서버 반영 실패", e));
  }, [challenges.length, addXp, addGems, completeLesson, hydrate, lesson.id]);

  const onCheck = async () => {
    if (finished) return navigate("/learn");

    if (status === "correct") {
      const next = activeIndex + 1;
      if (next >= challenges.length) return finishLesson();
      setActiveIndex(next);
      setStatus("none");
      setCanCheck(false);
      setMessage(undefined);
      return;
    }

    if (status === "wrong") {
      setStatus("none");
      setMessage(undefined);
      return;
    }

    if (!apiRef.current) return;
    setChecking(true);
    const res = await apiRef.current.check();
    setChecking(false);
    setMessage(res.message);

    // 문제별 정답/오답은 매 시도마다 쌓아뒀다가 레슨 완료 때 한 번에 보낸다 (취약 개념 집계용)
    attempts.current.push({ challengeId: challenge.id, correct: res.correct });

    if (res.correct) {
      setStatus("correct");
      completeChallenge(challenge.id);
      // 정답을 맞힐 때마다 에너지가 조금씩 충전된다 (충전량은 매번 랜덤)
      const charge =
        CORRECT_ENERGY_MIN +
        Math.floor(Math.random() * (CORRECT_ENERGY_MAX - CORRECT_ENERGY_MIN + 1));
      gainEnergy(charge);
      energyGained.current += charge;
    } else {
      setStatus("wrong");
      wrongOnce.current.add(challenge.id);
    }
  };

  const renderChallenge = () => {
    const props = { challenge, status, setCanCheck, apiRef };
    switch (challenge.type) {
      case "SELECT":
        return <SelectChallenge {...props} />;
      case "FILL":
        return <FillChallenge {...props} />;
      case "PARSONS":
        return <ParsonsChallenge {...props} />;
      case "WRITE":
      case "BUGFIX":
        return <CodeChallenge {...props} />;
    }
  };

  if (finished) {
    return (
      <div className="flex h-full flex-col">
        <EnergyToast />
        <div className="flex flex-1 flex-col items-center justify-center gap-y-6 px-6 text-center">
          <Mascot size={130} celebrate />
          <h1 className="text-2xl font-extrabold text-eel lg:text-3xl">
            레슨 완료! 🎉
          </h1>
          <div className="grid w-full max-w-md grid-cols-2 gap-3">
            <ResultCard variant="xp" value={xpEarned} />
            <ResultCard variant="accuracy" value={`${accuracy}%`} />
            <ResultCard variant="time" value={formatDuration(elapsedMs)} />
            <ResultCard variant="energy" value={energy} />
          </div>
          <p className="text-sm text-wolf">
            정답을 맞히는 동안 에너지는 한 칸도 줄지 않았어요.
          </p>
        </div>
        <Footer status="completed" onCheck={onCheck} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <EnergyToast />
      <Header percentage={percentage} energy={energy} onClose={() => navigate("/learn")} />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[720px] flex-col gap-y-6 px-6 pb-10 pt-10">
          <p className="text-xs font-bold uppercase tracking-wide text-hare">
            {TYPE_LABEL[challenge.type]} · {LANGUAGE_LABEL[challenge.language]}
          </p>

          <QuestionView challenge={challenge} />

          {/*
            문제가 바뀌면 통째로 갈아끼운다 — 챌린지의 선택 상태도, 열어둔 힌트도 함께 초기화된다.
            ※ key는 형제끼리 유일해야 한다. 예전엔 이 div와 HintButton에 같은 challenge.id를
              key로 줬는데, 중복 key는 재조정을 깨뜨려 이전 문제의 DOM이 안 지워진 채 남았다.
          */}
          <div key={challenge.id} className="flex flex-col gap-y-6">
            {renderChallenge()}
            <HintButton
              challengeId={challenge.id}
              explanation={challenge.explanation}
            />
          </div>
        </div>
      </div>

      <Footer
        status={status}
        disabled={!canCheck}
        checking={checking}
        message={message}
        onCheck={onCheck}
      />
    </div>
  );
};
