import type { ReactNode } from "react";

import { Link } from "react-router-dom";

import { Mascot } from "@/components/Mascot";
import { cn } from "@/lib/utils";

/** 로그인/회원가입 공통 껍데기 — 기존 카드 스타일(rounded-2xl border-2 border-swan) 재사용 */
export const AuthShell = ({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) => (
  <div className="flex min-h-full flex-col">
    <header className="mx-auto flex w-full max-w-[988px] items-center justify-between px-5 py-4">
      <Link to="/" className="flex items-center gap-x-2">
        <Mascot size={36} />
        <span className="text-xl font-extrabold text-coral">코드런</span>
      </Link>
    </header>

    <main className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center gap-y-6 px-5 pb-16">
      <div className="flex flex-col items-center gap-y-3 text-center">
        <Mascot size={110} interactive />
        <h1 className="text-2xl font-extrabold text-eel">{title}</h1>
        <p className="text-sm text-wolf">{subtitle}</p>
      </div>

      {children}

      <p className="text-center text-sm text-wolf">{footer}</p>
    </main>
  </div>
);

type FieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
};

export const Field = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}: FieldProps) => (
  <label className="block space-y-1.5">
    <span className="text-xs font-bold uppercase tracking-wide text-hare">
      {label}
    </span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={cn(
        "w-full rounded-2xl border-2 border-swan bg-polar px-4 py-3 font-bold text-eel outline-none transition placeholder:font-medium placeholder:text-hare focus:border-macaw focus:bg-white",
        error && "border-cardinal bg-cardinal-light"
      )}
    />
    {error && <span className="block text-xs font-bold text-cardinal">{error}</span>}
  </label>
);

/** 서버가 내려준 에러 메시지 박스 (기존 오답 박스 톤 재사용) */
export const FormError = ({ message }: { message: string }) => (
  <div className="rounded-xl border-2 border-cardinal/40 bg-cardinal-light p-3 text-sm font-bold text-cardinal">
    {message}
  </div>
);
