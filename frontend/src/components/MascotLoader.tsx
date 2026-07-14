import { useState } from "react";

import { cn } from "@/lib/utils";

const MASCOTS = [
  "/mascots/bunny-pink-run.png",
  "/mascots/snake-blue.png",
  "/mascots/squirrel-orange.png",
  "/mascots/bunny-white-sit.png",
  "/mascots/whale-blue.png",
];

type MascotLoaderProps = {
  size?: number;
  /** 아래에 표시할 문구. 안 주면 텍스트 없이 캐릭터만 보여준다. */
  label?: string;
  className?: string;
};

/**
 * 로딩 화면용 랜덤 마스코트 — 매번 새로 뜰 때마다 5마리 중 하나가 통통 튀며 기다림을 달래준다.
 * PNG가 흰 배경이라 mix-blend-mode: multiply 로 배경에 자연스럽게 녹아들게 한다.
 */
export const MascotLoader = ({ size = 96, label, className }: MascotLoaderProps) => {
  const [src] = useState(() => MASCOTS[Math.floor(Math.random() * MASCOTS.length)]);

  return (
    <div className={cn("flex flex-col items-center gap-y-3", className)}>
      <div
        className="relative shrink-0"
        style={{ width: size, height: size * 1.15 }}
      >
        <div
          className="ml-shadow absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-black/60"
          style={{ width: size * 0.55, height: size * 0.1 }}
        />
        <img
          src={src}
          alt=""
          className="ml-bounce absolute inset-x-0 top-0"
          style={{ width: size, height: size, objectFit: "contain", mixBlendMode: "multiply" }}
        />
      </div>
      {label && <p className="text-sm font-bold text-hare">{label}</p>}

      <style>{`
        .ml-bounce{animation:mlBounce 1.1s cubic-bezier(.45,0,.55,1) infinite;transform-box:fill-box;transform-origin:center}
        .ml-shadow{animation:mlShadow 1.1s cubic-bezier(.45,0,.55,1) infinite;opacity:.16}
        @keyframes mlBounce{
          0%,100%{transform:translateY(0) scale(1,1)}
          25%{transform:translateY(-8%) scale(1.02,.98)}
          50%{transform:translateY(-22%) scale(.97,1.04)}
          75%{transform:translateY(-8%) scale(1.02,.98)}
        }
        @keyframes mlShadow{
          0%,100%{transform:translateX(-50%) scaleX(1);opacity:.16}
          50%{transform:translateX(-50%) scaleX(.72);opacity:.09}
        }
        @media (prefers-reduced-motion: reduce){.ml-bounce,.ml-shadow{animation:none!important}}
      `}</style>
    </div>
  );
};
