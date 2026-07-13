import { useNavigate } from "react-router-dom";

import { isLoggedIn, useAuth } from "@/store/useAuth";
import { useGame, type OnboardingResult } from "@/store/useGame";

/**
 * 온보딩 마지막 단계에서 부른다.
 *
 * - 게스트(대부분): 결과를 로컬에 저장하고 회원가입 화면으로 → 가입 시점에 서버로 넘어간다.
 * - 이미 로그인한 유저(온보딩만 다시 탄 경우): 곧바로 서버에 반영하고 학습으로.
 */
export const useFinishOnboarding = () => {
  const navigate = useNavigate();
  const completeOnboarding = useGame((s) => s.completeOnboarding);
  const syncOnboarding = useAuth((s) => s.syncOnboarding);

  return async (result: OnboardingResult) => {
    completeOnboarding(result);

    if (!isLoggedIn()) {
      navigate("/signup");
      return;
    }

    try {
      await syncOnboarding();
    } catch {
      // 서버 반영이 실패해도 로컬 진행은 살려둔다 (데모 중 끊기지 않게)
    }
    navigate("/learn");
  };
};
