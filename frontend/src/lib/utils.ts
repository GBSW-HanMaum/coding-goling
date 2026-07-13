import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind 클래스 병합 유틸 (듀오링고 클론과 동일 패턴) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 배열을 결정적이지 않게 섞음 (Parsons 문제 셔플용) */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
