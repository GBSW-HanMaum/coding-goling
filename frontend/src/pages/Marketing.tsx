import { PlayCircle, ShieldCheck, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Mascot } from "@/components/Mascot";
import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useGame } from "@/store/useGame";

const FEATURES = [
  {
    icon: PlayCircle,
    color: "text-coral",
    title: "실행 기반 자동 채점",
    desc: "문자열 정확일치가 아니라, 코드를 실제로 실행해 테스트케이스 통과 여부로 채점합니다. 동작이 같으면 어떻게 짜든 정답이에요.",
  },
  {
    icon: Zap,
    color: "text-bee",
    title: "정답에 벌 주지 않는 에너지",
    desc: "정답·오답으로는 에너지가 줄지 않아요. 에너지는 힌트·AI 튜터 같은 '도움'에만 쓰고, 다시 맞히면 회복됩니다.",
  },
  {
    icon: ShieldCheck,
    color: "text-macaw",
    title: "C 시스템 트랙",
    desc: "포인터·동적 메모리·크래시 디버깅처럼 실행 환경 없이는 못 배우는 것들을 게임처럼 연습합니다.",
  },
];

export const Marketing = () => (
  <div className="flex min-h-full flex-col">
    <header className="mx-auto flex w-full max-w-[988px] items-center justify-between px-5 py-4">
      <div className="flex items-center gap-x-2">
        <Mascot size={36} />
        <span className="text-xl font-extrabold text-coral">코드런</span>
      </div>
      <Link to="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
        로그인
      </Link>
    </header>

    <main className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-8 px-5 py-10 lg:flex-row lg:gap-12">
      <Mascot size={300} className="drop-shadow-sm" />

      <div className="flex max-w-[480px] flex-col items-center gap-y-7">
        <h1 className="text-center text-2xl font-extrabold leading-snug text-eel lg:text-4xl">
          실행하며 배우는 코딩,
          <br />
          <span className="text-coral">코드런</span>과 함께.
        </h1>
        <p className="text-center text-base text-wolf">
          하루 5분, 진짜 코드를 돌려보며 파이썬과 C를 익히세요.
        </p>

        <div className="flex w-full max-w-[330px] flex-col gap-y-3">
          <Link
            to="/onboarding/language"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full")}
          >
            시작하기
          </Link>
          <Link
            to="/login"
            className={cn(buttonVariants({ variant: "primaryOutline", size: "lg" }), "w-full")}
          >
            이미 계정이 있어요
          </Link>
        </div>
      </div>
    </main>

    <section className="mx-auto grid w-full max-w-[988px] gap-4 px-5 pb-16 md:grid-cols-3">
      {FEATURES.map(({ icon: Icon, color, title, desc }) => (
        <div key={title} className="rounded-2xl border-2 border-swan p-5">
          <Icon className={cn("mb-3 h-9 w-9", color)} />
          <h3 className="mb-1.5 text-lg font-extrabold text-eel">{title}</h3>
          <p className="text-sm leading-relaxed text-wolf">{desc}</p>
        </div>
      ))}
    </section>

    <footer className="border-t-2 border-swan py-5 text-center text-xs text-hare">
      팀 글릭 · 2026 경북 SWgo 해커톤 · 학교 캡스톤용 (비상업) · 디자인은 듀오링고를
      오마주했습니다.
    </footer>
  </div>
);
