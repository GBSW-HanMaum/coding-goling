import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/store/useAuth";
import { useGame } from "@/store/useGame";

import { AuthShell, Field, FormError } from "./AuthForm";

/**
 * 회원가입 — 온보딩을 마친 게스트가 도착하는 화면.
 * 가입에 성공하면 useAuth.signup 이 곧바로 /onboarding/sync 로 온보딩 결과를 넘긴다.
 */
export const Signup = () => {
  const navigate = useNavigate();
  const signup = useAuth((s) => s.signup);
  // 온보딩을 마치고 온 경우에만 "진행상황을 지켜준다"는 안내를 띄운다
  const onboardingCompleted = useGame((s) => s.onboardingCompleted);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setFields({});
    setLoading(true);
    try {
      await signup(email, password, nickname);
      navigate("/learn");
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
      title="거의 다 왔어요!"
      subtitle={
        onboardingCompleted
          ? "계정을 만들면 지금까지의 학습 설정과 진행상황이 저장돼요."
          : "계정을 만들고 학습을 시작하세요."
      }
      footer={
        <>
          이미 계정이 있나요?{" "}
          <Link to="/login" className="font-extrabold text-macaw hover:underline">
            로그인
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border-2 border-swan p-5">
        {error && <FormError message={error} />}

        <Field
          label="닉네임"
          value={nickname}
          onChange={setNickname}
          placeholder="코리와 함께할 이름"
          error={fields.nickname}
          autoComplete="nickname"
        />
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
          placeholder="8자 이상"
          error={fields.password}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          disabled={loading}
          className="w-full"
        >
          {loading ? "가입 중…" : "가입하고 시작하기"}
        </Button>
      </form>
    </AuthShell>
  );
};
