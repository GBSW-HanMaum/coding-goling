import { useNavigate } from "react-router-dom";

import { courses } from "@/data/content";
import { useGame } from "@/store/useGame";

import { ChoiceCard, OnboardingShell } from "./OnboardingShell";

/**
 * 온보딩 Step 1 — 언어 선택.
 * 카드는 courses 배열에서 생성한다 (하드코딩 X).
 * 02번 문서로 Java/JS Course를 추가하면 이 화면은 자동으로 4개가 된다.
 */
export const OnboardingLanguage = () => {
  const navigate = useNavigate();
  const setCourse = useGame((s) => s.setCourse);

  const pick = (id: (typeof courses)[number]["id"]) => {
    setCourse(id);
    navigate("/onboarding/profile");
  };

  return (
    <OnboardingShell
      percentage={10}
      lines={[
        "안녕! 나는 코리야. 🦜",
        "어떤 언어부터 시작해볼까? 나중에 언제든 바꿀 수 있어.",
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {courses.map((co) => (
          <ChoiceCard
            key={co.id}
            emoji={co.emoji}
            label={co.title}
            desc={co.description}
            onClick={() => pick(co.id)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
};
