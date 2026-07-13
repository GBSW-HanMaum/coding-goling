import type { Config } from "tailwindcss";

/**
 * 코드런 디자인 토큰 — 듀오링고 브랜드 시스템 재현
 * 색: design.duolingo.com 공식 팔레트 / 폰트: Nunito (Feather Bold 무료 대체)
 * ※ 학교 캡스톤 / 비상업 용도
 */
const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 브랜드 (듀오링고 공식 색)
        feather: {
          DEFAULT: "#58cc02", // 주 브랜드 / 버튼
          hover: "#61e002",
          shadow: "#58a700", // 3D 버튼 아래 그림자
          light: "#d7ffb8",
        },
        macaw: {
          DEFAULT: "#1cb0f6", // 파랑
          shadow: "#1899d6",
          light: "#ddf4ff", // 선택 배경
          border: "#84d8ff",
        },
        cardinal: {
          DEFAULT: "#ff4b4b", // 빨강 (하트/오답)
          shadow: "#ea2b2b",
          light: "#ffdfe0",
        },
        bee: { DEFAULT: "#ffc800", shadow: "#e6a600" }, // 골드 (XP/젬/에너지)
        fox: "#ff9600", // 주황 (예비)
        beetle: { DEFAULT: "#ce82ff", shadow: "#a568cc" }, // 보라 (Super)
        // 브랜드 리프레시: 코랄(앵무새 테마) — 주 색/버튼. 초록(feather)은 '정답' 전용.
        coral: {
          DEFAULT: "#ff6b4a",
          hover: "#ff7f62",
          shadow: "#e14b2a",
          light: "#ffe7e0",
        },
        violet: { DEFAULT: "#7c6bf0", shadow: "#5b4bd0" }, // 연속(streak)
        // 중립 (그레이스케일)
        eel: "#4b4b4b", // 기본 텍스트
        wolf: "#777777", // 보조 텍스트
        hare: "#afafaf", // 흐린 텍스트/아이콘
        swan: "#e5e5e5", // 테두리/구분선
        polar: "#f7f7f7", // 옅은 배경
        snow: "#ffffff",
      },
      fontFamily: {
        sans: [
          "Nunito",
          "-apple-system",
          "BlinkMacSystemFont",
          "Malgun Gothic",
          "Apple SD Gothic Neo",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "D2Coding",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      keyframes: {
        "bounce-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "60%": { transform: "scale(1.02)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        "bounce-in": "bounce-in 0.3s ease-out",
        wiggle: "wiggle 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
