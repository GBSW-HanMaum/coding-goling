import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/store/useAuth";

import { AuthShell, Field, FormError } from "./AuthForm";

export const Login = () => {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setFields({});
    setLoading(true);
    try {
      const me = await login(email, password);
      // 서버 기준으로 온보딩을 아직 안 끝냈으면 온보딩부터
      navigate(me.onboardingCompleted ? "/learn" : "/onboarding/language");
    } catch (err) {
      if (err instanceof ApiError) {
        setFields(err.fields ?? {});
        setError(err.fields ? undefined : err.message);
      } else {
        setError("알 수 없는 오류가 발생했어요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="다시 만나서 반가워요!"
      subtitle="이어서 학습을 시작해요."
      footer={
        <>
          계정이 없나요?{" "}
          <Link to="/onboarding/language" className="font-extrabold text-macaw hover:underline">
            시작하기
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border-2 border-swan p-5">
        {error && <FormError message={error} />}

        <Field
          label="이메일"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          error={fields.email}
          autoComplete="email"
        />
        <Field
          label="비밀번호"
          type="password"
          value={password}
          onChange={setPassword}
          error={fields.password}
          autoComplete="current-password"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-full"
        >
          {loading ? "로그인 중…" : "로그인"}
        </Button>
      </form>
    </AuthShell>
  );
};
