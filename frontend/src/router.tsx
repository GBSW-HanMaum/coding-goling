import { useEffect, type ReactElement } from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "@/components/Layout";
import { MascotLoader } from "@/components/MascotLoader";
import { Learn } from "@/pages/Learn";
import { Leaderboard } from "@/pages/Leaderboard";
import { Lesson } from "@/pages/Lesson";
import { Marketing } from "@/pages/Marketing";
import { Profile } from "@/pages/Profile";
import { QuestsPage } from "@/pages/QuestsPage";
import { Shop } from "@/pages/Shop";
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { OnboardingDiagnostic } from "@/pages/onboarding/OnboardingDiagnostic";
import { OnboardingLanguage } from "@/pages/onboarding/OnboardingLanguage";
import { OnboardingProfile } from "@/pages/onboarding/OnboardingProfile";
import { useAuth } from "@/store/useAuth";
import { useGame } from "@/store/useGame";

const FullPageLoader = () => (
  <div className="flex h-full flex-col items-center justify-center">
    <MascotLoader size={130} label="불러오는 중…" />
  </div>
);

/**
 * 로그인 게이트. 토큰이 있으면 /users/me 로 아직 살아있는 세션인지 한 번 확인하고 통과시킨다.
 * (만료된 토큰만 들고 화면이 열려 있는 상태를 막기 위함)
 */
const RequireAuth = ({ children }: { children: ReactElement }) => {
  const status = useAuth((s) => s.status);
  const bootstrap = useAuth((s) => s.bootstrap);

  useEffect(() => {
    if (status === "loading") void bootstrap();
  }, [status, bootstrap]);

  if (status === "loading") return <FullPageLoader />;
  if (status === "guest") return <Navigate to="/login" replace />;
  return children;
};

/** 온보딩 게이트 — 로그인은 됐는데 온보딩을 안 끝냈으면 언어 선택부터 */
const RequireOnboarding = ({ children }: { children: ReactElement }) => {
  const completed = useGame((s) => s.onboardingCompleted);
  return completed ? children : <Navigate to="/onboarding/language" replace />;
};

const Protected = ({ children }: { children: ReactElement }) => (
  <RequireAuth>
    <RequireOnboarding>{children}</RequireOnboarding>
  </RequireAuth>
);

export const router = createBrowserRouter([
  { path: "/", element: <Marketing /> },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // 온보딩은 게스트로 진행한다 (가입은 온보딩을 마친 뒤 /signup 에서)
  { path: "/onboarding/language", element: <OnboardingLanguage /> },
  { path: "/onboarding/profile", element: <OnboardingProfile /> },
  { path: "/onboarding/diagnostic", element: <OnboardingDiagnostic /> },

  {
    element: (
      <Protected>
        <MainLayout />
      </Protected>
    ),
    children: [
      { path: "/learn", element: <Learn /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/quests", element: <QuestsPage /> },
      { path: "/shop", element: <Shop /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    path: "/lesson/:lessonId",
    element: (
      <Protected>
        <Lesson />
      </Protected>
    ),
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
